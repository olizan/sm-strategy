const Binance = require("node-binance-api");

// Configuração do intervalo de vela e par de moeda
const intervalo = "15m";
const par = "LINKUSDT";

// Configuração da API (Produção ou Teste)
const binance = new Binance().options({
  APIKEY: "YOUR_API_KEY",
  APISECRET: "YOUR_API_SECRET",
  recvWindow: 60000,
});

// Função para calcular velas Heikin-Ashi
function calcularHeikinAshi({ open, high, low, close }) {
  const heikinAshiCloses = close.map((_, i) => (open[i] + high[i] + low[i] + close[i]) / 4);
  const heikinAshiOpens = close.map((_, i) =>
    i === 0 ? open[i] : (heikinAshiOpens[i - 1] + heikinAshiCloses[i - 1]) / 2
  );
  const heikinAshiHighs = close.map((_, i) => Math.max(high[i], heikinAshiOpens[i], heikinAshiCloses[i]));
  const heikinAshiLows = close.map((_, i) => Math.min(low[i], heikinAshiOpens[i], heikinAshiCloses[i]));

  return { heikinAshiOpens, heikinAshiHighs, heikinAshiLows, heikinAshiCloses };
}

// Função para extrair dados das últimas velas
function pegarDadosVelas(heikinAshi, n = 7) {
  const dados = [];
  for (let i = 1; i <= n; i++) {
    dados.push({
      open: heikinAshi.heikinAshiOpens[heikinAshi.heikinAshiOpens.length - i],
      high: heikinAshi.heikinAshiHighs[heikinAshi.heikinAshiHighs.length - i],
      low: heikinAshi.heikinAshiLows[heikinAshi.heikinAshiLows.length - i],
      close: heikinAshi.heikinAshiCloses[heikinAshi.heikinAshiCloses.length - i],
    });
  }
  return dados;
}

// Função para verificar a estratégia
function verificarEstrategia(velas, volumes) {
  const [v5, v4, v3, v2] = velas.slice(0, 4);
  const volume2 = volumes[volumes.length - 2];
  const volume3 = volumes[volumes.length - 3];

  return (
    v5.close < v5.open &&
    v4.close <= v4.open &&
    v3.close <= v3.open &&
    v2.close > v2.open &&
    volume2 > volume3
  );
}

// Inicialização da estratégia
binance.websockets.chart(par, intervalo, (symbol, interval, chart) => {
  const ohlc = binance.ohlc(chart);
  const heikinAshi = calcularHeikinAshi(ohlc);
  const velas = pegarDadosVelas(heikinAshi);
  const volumes = ohlc.volume;

  const strategy = verificarEstrategia(velas, volumes);
  atualizarEstrategia(strategy);
});

// Variável global para sinal da estratégia
let sinalEstrategia = false;

// Atualizar estratégia
function atualizarEstrategia(strategy) {
  sinalEstrategia = strategy;
}

// Função para executar a compra
function comprar() {
  console.log("Sinal de compra detectado! Executando ordem...");
  // Lógica de compra aqui
}

// Função para monitorar a estratégia
function verificar() {
  if (sinalEstrategia) {
    comprar();
  } else {
    console.log("Sem sinal de entrada");
  }
}

// Intervalo para verificação
setInterval(verificar, 16000);
