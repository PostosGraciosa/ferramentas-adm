/* =========================================
   ABRIR CHATGPT
========================================= */

if (btnAbrirChatGPT) {

    btnAbrirChatGPT.addEventListener(
        'click',
        function () {

            var texto =
                chatgptPrompt
                    ? chatgptPrompt.value.trim()
                    : '';


            /* ==============================
               VERIFICAÇÃO
            =============================== */

            if (!texto) {

                if (chatgptPrompt) {

                    chatgptPrompt.focus();

                }

                mostrarFeedback(
                    btnAbrirChatGPT,
                    'Digite um prompt primeiro'
                );

                return;

            }


            /* ==============================
               COPIAR PROMPT
            =============================== */

            copiarTextoSilencioso(texto);


            /* ==============================
               ABRIR CHATGPT
            =============================== */

            window.open(
                'https://chatgpt.com/',
                '_blank'
            );


            /* ==============================
               FEEDBACK
            =============================== */

            mostrarFeedback(
                btnAbrirChatGPT,
                '✓ Prompt copiado'
            );

        }
    );

}
