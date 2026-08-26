/* ============================================
   Ferramentas ADM | Postos Graciosa
   js/app.js — lógica do portal
   ============================================ */
(function () {
  'use strict';

  /* ===== Templates de resposta (IA local) ===== */
  var templates = {
    'Confirmação de pagamento': function (info) {
      return 'Olá! Confirmamos o recebimento do seu pagamento.' +
        (info ? ' ' + info : '') +
        ' Qualquer dúvida, estamos à disposição.';
    },
    'Solicitação de documento': function (info) {
      return 'Olá! Para darmos continuidade, solicitamos o envio do seguinte documento: ' +
        (info || 'documento pendente') +
        '. Assim que recebermos, retornaremos o contato.';
    },
    'Divergência de informação': function (info) {
      return 'Olá! Identificamos uma divergência nas informações: ' +
        (info || 'dados divergentes') +
        '. Pedimos a gentileza de verificar e nos retornar com os dados corretos.';
    },
    'Aguardando retorno': function (info) {
      return 'Olá! Estamos aguardando o retorno referente a: ' +
        (info || 'sua solicitação') +
        '. Assim que tivermos novidades, entraremos em contato.';
    },
    'Encaminhamento ao setor responsável': function (info) {
      return 'Olá! Sua solicitação foi encaminhada ao setor responsável' +
        (info ? ' (' + info + ')' : '') +
        '. Em breve retornaremos com o posicionamento.';
    },
    'Agradecimento': function (info) {
      return 'Olá! Agradecemos o seu contato.' +
        (info ? ' ' + info : '') +
        ' Estamos à disposição para qualquer dúvida.';
    },
    'Resposta personalizada': function (info) {
      return 'Olá! ' + (info || 'Informe os detalhes da sua resposta personalizada.');
    }
  };

  /* ===== Elementos ===== */
  var tipoResposta = document.getElementById('tipoResposta');
  var infoExtra = document.getElementById('infoExtra');
  var resultado = document.getElementById('resultado');
  var btnGerar = document.getElementById('btnGerar');
  var btnLimpar = document.getElementById('btnLimpar');
  var btnCopiar = document.getElementById('btnCopiar');
  var searchInput = document.getElementById('searchInput');
  var emptyState = document.getElementById('emptyState');
  var dropdownCard = document.querySelector('.dropdown');
  var portaisToggle = document.getElementById('portaisToggle');

  var PLACEHOLDER = 'A resposta gerada aparecerá aqui.';

  /* ===== Persistência local (localStorage) ===== */
  function salvarPreferencias() {
    try {
      localStorage.setItem('ferramentasAdm.tipo', tipoResposta.value);
      localStorage.setItem('ferramentasAdm.busca', searchInput.value);
    } catch (e) { /* armazenamento indisponível */ }
  }

  function carregarPreferencias() {
    try {
      var tipoSalvo = localStorage.getItem('ferramentasAdm.tipo');
      var buscaSalva = localStorage.getItem('ferramentasAdm.busca');
      if (tipoSalvo && templates[tipoSalvo]) tipoResposta.value = tipoSalvo;
      if
