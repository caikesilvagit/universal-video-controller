// ==UserScript==
// @name         Ultimate Video Controller (Keyboard & UI)
// @namespace    http://tampermonkey.net/
// @version      3.1
// @description  Adiciona controlador de video universal com atalhos de teclado (Velocidade, Volume, Seek) e interface visual moderna.
// @author       caikesilvagit
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // --- CONFIGURAÇÕES VISUAIS (CSS) ---
    const STYLES = `
        .uvc-toast {
            position: fixed;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 16px;
            font-weight: 500;
            z-index: 2147483647;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(5px);
        }
        .uvc-visible { opacity: 1; }
        .uvc-help-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #1a1a1a;
            color: #eee;
            padding: 25px;
            border-radius: 12px;
            z-index: 2147483647;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            font-family: sans-serif;
            display: none;
            border: 1px solid #333;
            min-width: 300px;
        }
        .uvc-help-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            border-bottom: 1px solid #333;
            padding-bottom: 4px;
        }
        .uvc-key {
            background: #333;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: monospace;
            font-weight: bold;
            color: #fff;
        }
    `;

    // Injeta CSS na página
    const styleSheet = document.createElement("style");
    styleSheet.innerText = STYLES;
    document.head.appendChild(styleSheet);

    // Cria Elementos de UI
    const toast = document.createElement('div');
    toast.className = 'uvc-toast';
    document.body.appendChild(toast);

    const helpModal = document.createElement('div');
    helpModal.className = 'uvc-help-modal';
    helpModal.innerHTML = `
        <h3 style="margin-top:0; color:#4caf50;">Video Controller Help</h3>
        <div class="uvc-help-row"><span>Play / Pause</span> <span class="uvc-key">Espaço</span></div>
        <div class="uvc-help-row"><span>Adiantar 5s</span> <span class="uvc-key">→</span></div>
        <div class="uvc-help-row"><span>Voltar 5s</span> <span class="uvc-key">←</span></div>
        <div class="uvc-help-row"><span>Aumentar Volume</span> <span class="uvc-key">↑</span></div>
        <div class="uvc-help-row"><span>Diminuir Volume</span> <span class="uvc-key">↓</span></div>
        <div class="uvc-help-row"><span>Aumentar Velocidade</span> <span class="uvc-key">D</span></div>
        <div class="uvc-help-row"><span>Diminuir Velocidade</span> <span class="uvc-key">S</span></div>
        <div class="uvc-help-row"><span>Resetar Velocidade</span> <span class="uvc-key">R</span></div>
        <div style="text-align:center; margin-top:15px; font-size:12px; color:#888;">Pressione H para fechar</div>
    `;
    document.body.appendChild(helpModal);

    // --- LÓGICA DO CONTROLADOR ---
    let timer;

    function showToast(icon, text) {
        toast.innerHTML = `<span style="color:#4caf50; font-size:1.2em;">${icon}</span> <span>${text}</span>`;
        toast.classList.add('uvc-visible');
        clearTimeout(timer);
        timer = setTimeout(() => toast.classList.remove('uvc-visible'), 2000);
    }

    function getVideos() {
        return Array.from(document.querySelectorAll('video'));
    }

    function toggleHelp() {
        if (helpModal.style.display === 'block') {
            helpModal.style.display = 'none';
        } else {
            helpModal.style.display = 'block';
        }
    }

    // --- ESCUTA DE EVENTOS ---
    document.addEventListener('keydown', (e) => {
        // 1. Verifica se o usuário está digitando (Segurança)
        const active = document.activeElement;
        if (['INPUT', 'TEXTAREA'].includes(active.tagName) || active.isContentEditable) return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        const videos = getVideos();
        if (videos.length === 0 && e.key.toLowerCase() !== 'h') return;

        let handled = true;

        switch(e.key.toLowerCase()) {
            case ' ': // Play/Pause
                videos.forEach(v => {
                    if(v.paused) { v.play(); showToast('▶', 'Play'); }
                    else { v.pause(); showToast('⏸', 'Pause'); }
                });
                break;
            case 'arrowright': // Seek +
                videos.forEach(v => { v.currentTime += 5; });
                showToast('⏩', '+5s');
                break;
            case 'arrowleft': // Seek -
                videos.forEach(v => { v.currentTime -= 5; });
                showToast('⏪', '-5s');
                break;
            case 'arrowup': // Volume +
                videos.forEach(v => { v.volume = Math.min(1, v.volume + 0.1); });
                showToast('🔊', 'Volume Up');
                break;
            case 'arrowdown': // Volume -
                videos.forEach(v => { v.volume = Math.max(0, v.volume - 0.1); });
                showToast('🔉', 'Volume Down');
                break;
            case 'd': // Speed +
                videos.forEach(v => {
                    v.playbackRate = Math.min(16, v.playbackRate + 0.25);
                    showToast('⚡', `${v.playbackRate.toFixed(2)}x`);
                });
                break;
            case 's': // Speed -
                videos.forEach(v => {
                    v.playbackRate = Math.max(0.1, v.playbackRate - 0.25);
                    showToast('🐢', `${v.playbackRate.toFixed(2)}x`);
                });
                break;
            case 'r': // Reset
                videos.forEach(v => {
                    v.playbackRate = 1.0;
                    showToast('ik', 'Normal Speed (1.0x)');
                });
                break;
            case 'h': // Help
                toggleHelp();
                break;
            default:
                handled = false;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, { capture: true });

    // Mensagem de log para debug
    console.log('Ultimate Video Controller Active. Press "H" for help.');
})();
