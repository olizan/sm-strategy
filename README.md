Estratégia de Compra de Criptomoedas com Heikin-Ashi
Este projeto implementa uma estratégia de compra de criptomoedas utilizando velas Heikin-Ashi.

Descrição
A Binance não fornece diretamente o tipo de vela Heikin-Ashi, então este projeto inclui uma conversão de velas padrão (OHLC) para o formato Heikin-Ashi.

A análise consiste em identificar uma sequência de velas indicando baixa, seguida por uma vela positiva Heikin-Ashi. Se o volume confirmar uma possível reversão nesse momento, um sinal de entrada é disparado.

Pré-requisitos
Node.js instalado.
Conta na Binance com chave de API configurada.
Instalação
Clone este repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git  
Navegue até o diretório do projeto:

bash
Copiar código
cd seu-repositorio  
Instale as dependências:

bash
Copiar código
npm install  
Configuração
Substitua YOUR_API_KEY e YOUR_API_SECRET no código pelo seu par de chaves da Binance.
Ajuste os parâmetros de intervalo de velas e o par de moedas, se necessário.
Execução
Inicie o projeto com o seguinte comando:

bash
Copiar código
npm start  
Como Funciona
As velas padrão da Binance (OHLC) são convertidas para o formato Heikin-Ashi.
A estratégia analisa:
Sequências de velas indicando baixa.
Presença de uma vela positiva Heikin-Ashi.
Volume financeiro indicando reversão.
Se todos os critérios forem atendidos, o sistema sinaliza uma possível entrada no mercado.
Observações
Este projeto não executa ordens de compra automaticamente. Ele é apenas uma base para análise.
Certifique-se de testar em contas de simulação antes de aplicar em ambiente de produção.
Contribuições
Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias.
