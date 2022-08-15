import React from "react";
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Currency from "./components/Currency"
const ws = new W3CWebSocket('wss://stream.binance.com:9443/ws');
//let currPrice;

//let priceStyle = {
//  color: "white",
//};

function App() {
  const [coins, setCoins] = React.useState(null);
  const [socketReady, setSocketReady] = React.useState(null)
  //  const [ethPrice, setEthPrice] = React.useState(null);


  //-----------------WEBSOCKET-----------------

  ws.onopen = () => {
    console.log('WebSocket Client Connected');
    setSocketReady(true);
    /*
    ws.send(`{
        "method": "SUBSCRIBE",
        "params": [
          "ethusdt@miniTicker"
        ],
        "id": 1
      }`)
      */
  };
  ws.onmessage = (message) => {
    /*
    currPrice = JSON.parse(message.data)
    currPrice = parseFloat(currPrice.c).toFixed(2);
    if (currPrice < ethPrice) {
      priceStyle = { color: "rgb(255, 82, 82)" };

    }
    else if (currPrice > ethPrice) {
      priceStyle = { color: "rgb(42, 222, 42)" };
    }
    setEthPrice(currPrice);
    */
    console.log("AAHH")
    console.log(ws.readyState)
  };

  //console.log(ws)
  //-------------------------------------------

  React.useEffect(() => {
    fetch("/getAPIResponse")
      .then((res) => res.json())
      // .then((coins) => setCoins(coins.data[1].name))
      //.then(console.log("It works!"))
      //.then((coins) => console.log(coins))
      .then((coins) => setCoins(coins.data))
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        {socketReady && <div>
          <Currency name="eth" socket={ws} />
        </div>}
        {/*
        <h3>ETH</h3> <br /> <hr /><span style={priceStyle}>{ethPrice && !isNaN(ethPrice) ? ethPrice : "---"}</span>
        */}
        {coins &&
          <div>
            {/*
            <h3 className="directionheader">CoinLore 100</h3>
            {Object.keys(coins).map((index) => (
              (<p key={index}>{coins[index].name} : {coins[index].price_usd}</p>)
            ))}
            */}
          </div>}
      </header>

    </div>
  );
}

export default App;
