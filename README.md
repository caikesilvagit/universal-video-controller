# universal-video-controller

# Ultimate Video Controller (Userscript)

Uma solução completa de acessibilidade e controle para vídeos HTML5 na web.

## 🎯 O Problema
A web moderna está repleta de reprodutores de vídeo proprietários (cursos online, sites de notícias, plataformas de streaming) que frequentemente:
1.  Removem controles nativos (barra de progresso, volume).
2.  Não oferecem controle de velocidade (playback speed).
3.  Não suportam atalhos de teclado padrões.
4.  Têm interfaces de usuário (UI) ruins ou quebradas.

## 💡 A Solução
O **Ultimate Video Controller** é um userscript "install-and-forget". Ele injeta uma camada de controle invisível sobre qualquer site que tenha uma tag `<video>`.
Ele não substitui o player do site, mas intercepta comandos do teclado para forçar o vídeo a obedecer ao usuário.

## ✨ Funcionalidades Principais

*   **Universalidade:** Funciona em qualquer player HTML5 (YouTube, Vimeo, Players Customizados, Sites de Cursos, etc).
*   **Safe-Typing:** O script detecta automaticamente se você está digitando em um campo de texto ou caixa de comentários e desativa os atalhos para não interferir na escrita.
*   **Feedback Visual Moderno:** Uma notificação discreta (Toast) aparece no topo da tela confirmando a ação (ex: "⚡ 2.0x"), similar à experiência de TVs Smart.
*   **Menu de Ajuda:** Esqueceu os atalhos? Pressione `H` para ver a lista.

## ⌨️ Atalhos (Shortcuts)

| Tecla | Função |
| :--- | :--- |
| **Espaço** | Play / Pause |
| **Seta Direita** | Adiantar 5 segundos |
| **Seta Esquerda** | Voltar 5 segundos |
| **Seta Cima** | Aumentar Volume |
| **Seta Baixo** | Diminuir Volume |
| **D** | Aumentar Velocidade (+0.25x) |
| **S** | Diminuir Velocidade (-0.25x) |
| **R** | Resetar Velocidade (1.0x) |
| **H** | Mostrar/Esconder Menu de Ajuda |

## 🚀 Instalação e Uso

1. Instale uma extensão gerenciadora de scripts (Violentmonkey, Tampermonkey ou AdGuard Desktop).
2. Adicione o arquivo `ultimate-video-controller.user.js`.
3. Navegue para qualquer site com vídeo.
4. Teste pressionando `D` para acelerar ou `H` para ver o menu.

---
*Este script é Open Source e foi desenvolvido com foco em privacidade e performance, não contendo rastreadores externos.*
