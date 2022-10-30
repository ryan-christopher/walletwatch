import React from "react";
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
//import Currency from "./components/Currency"
import useSound from 'use-sound';
import c3 from './sounds/pizzC3.mp3';
import cs3 from './sounds/pizzCs3.mp3';
import d3 from './sounds/pizzD3.mp3';
import eb3 from './sounds/pizzEb3.mp3';
import e3 from './sounds/pizzE3.mp3';
import f3 from './sounds/pizzF3.mp3';
import fs3 from './sounds/pizzFs3.mp3';
import g3 from './sounds/pizzG3.mp3';
import gs3 from './sounds/pizzG3.mp3';
import a3 from './sounds/pizzGs3.mp3';
import bb3 from './sounds/pizzBb3.mp3';
import b3 from './sounds/pizzB3.mp3';
import c4 from './sounds/pizzC4.mp3';
import cs4 from './sounds/pizzCs4.mp3';
import d4 from './sounds/pizzD4.mp3';
import eb4 from './sounds/pizzEb4.mp3';
import e4 from './sounds/pizzE4.mp3';
import f4 from './sounds/pizzF4.mp3';
import fs4 from './sounds/pizzFs4.mp3';
import g4 from './sounds/pizzG4.mp3';
import gs4 from './sounds/pizzG4.mp3';
import a4 from './sounds/pizzGs4.mp3';
import bb4 from './sounds/pizzBb4.mp3';
import b4 from './sounds/pizzB4.mp3';
import c5 from './sounds/pizzC5.mp3';
const ws = new W3CWebSocket('wss://stream.binance.com:9443/ws');
let currPrice;
let currName;
let priceStyle1 = {
  color: "white",
};
let priceStyle2 = {
  color: "white",
};
let sopranoVal = 0;
let altoVal = 0;

let volNum = 0.5;


function App() {
  //const [coins, setCoins] = React.useState(null);
  //const [socketReady, setSocketReady] = React.useState(null)
  const [playC3] = useSound(c3, { interrupt: true, volume: volNum });
  const [playCs3] = useSound(cs3, { interrupt: true, volume: volNum });
  const [playD3] = useSound(d3, { interrupt: true, volume: volNum });
  const [playEb3] = useSound(eb3, { interrupt: true, volume: volNum });
  const [playE3] = useSound(e3, { interrupt: true, volume: volNum });
  const [playF3] = useSound(f3, { interrupt: true, volume: volNum });
  const [playFs3] = useSound(fs3, { interrupt: true, volume: volNum });
  const [playG3] = useSound(g3, { interrupt: true, volume: volNum });
  const [playGs3] = useSound(gs3, { interrupt: true, volume: volNum });
  const [playA3] = useSound(a3, { interrupt: true, volume: volNum });
  const [playBb3] = useSound(bb3, { interrupt: true, volume: volNum });
  const [playB3] = useSound(b3, { interrupt: true, volume: volNum });
  const [playC4] = useSound(c4, { interrupt: true, volume: volNum });
  const [playCs4] = useSound(cs4, { interrupt: true, volume: volNum });
  const [playD4] = useSound(d4, { interrupt: true, volume: volNum });
  const [playEb4] = useSound(eb4, { interrupt: true, volume: volNum });
  const [playE4] = useSound(e4, { interrupt: true, volume: volNum });
  const [playF4] = useSound(f4, { interrupt: true, volume: volNum });
  const [playFs4] = useSound(fs4, { interrupt: true, volume: volNum });
  const [playG4] = useSound(g4, { interrupt: true, volume: volNum });
  const [playGs4] = useSound(gs4, { interrupt: true, volume: volNum });
  const [playA4] = useSound(a4, { interrupt: true, volume: volNum });
  const [playBb4] = useSound(bb4, { interrupt: true, volume: volNum });
  const [playB4] = useSound(b4, { interrupt: true, volume: volNum });
  const [playC5] = useSound(c5, { interrupt: true, volume: volNum });

  const [ethPrice, setEthPrice] = React.useState(null);
  const [btcPrice, setBtcPrice] = React.useState(null);
  useSound()
  //const sopranoRange = { 1: playFs4(), 2: playG4() }
  const sopranoPlay = {
    play: function (val) {
      if (val === 0) {
        playC4();
      }
      else if (val === 1) {
        playCs4();
      }
      else if (val === 2) {
        playD4();
      }
      else if (val === 3) {
        playEb4();
      }
      else if (val === 4) {
        playE4();
      }
      else if (val === 5) {
        playF4();
      }
      else if (val === 6) {
        playFs4();
      }
      else if (val === 7) {
        playG4();
      }
      else if (val === 8) {
        playGs4();
      }
      else if (val === 9) {
        playA4();
      }
      else if (val === 10) {
        playBb4();
      }
      else if (val === 11) {
        playB4();
      }
      else if (val === 12) {
        playC5();
      }
    }
  }
  const altoPlay = {
    play: function (val) {
      if (val === 0) {
        playC3();
      }
      else if (val === 1) {
        playCs3();
      }
      else if (val === 2) {
        playD3();
      }
      else if (val === 3) {
        playEb3();
      }
      else if (val === 4) {
        playE3();
      }
      else if (val === 5) {
        playF3();
      }
      else if (val === 6) {
        playFs3();
      }
      else if (val === 7) {
        playG3();
      }
      else if (val === 8) {
        playGs3();
      }
      else if (val === 9) {
        playA3();
      }
      else if (val === 10) {
        playBb3();
      }
      else if (val === 11) {
        playB3();
      }
      else if (val === 12) {
        playC4();
      }
    }
  }

  //-----------------WEBSOCKET-----------------

  ws.onopen = () => {
    console.log('WebSocket Client Connected');
    //setSocketReady(true);

    ws.send(`{
          "method": "SUBSCRIBE",
          "params": [
            "btcusdt@miniTicker",
            "ethusdt@miniTicker"
          ],
          "id": 1
        }`)


  };
  ws.onmessage = (message) => {

    currPrice = JSON.parse(message.data)
    if (currPrice.s) {
      currName = currPrice.s.slice(0, 3).toLowerCase();
    }
    currPrice = parseFloat(currPrice.c).toFixed(2);
    if (currName === "eth") {
      if (currPrice < ethPrice) {
        priceStyle1 = { color: "rgb(255, 82, 82)" };
        sopranoVal--;
        if (sopranoVal < 0) {
          sopranoVal = 13;
        }
        else if (sopranoVal > 14) {
          sopranoVal = 1;
        }
        sopranoPlay.play((sopranoVal % 14));
      }
      else if (currPrice > ethPrice) {
        priceStyle1 = { color: "rgb(42, 222, 42)" };
        sopranoVal++;
        if (sopranoVal < 0) {
          sopranoVal = 13;
        }
        else if (sopranoVal > 14) {
          sopranoVal = 1;
        }
        sopranoPlay.play((sopranoVal % 14));
      }
      setEthPrice(currPrice);
    }
    else if (currName === "btc") {
      if (currPrice < btcPrice) {
        priceStyle2 = { color: "rgb(255, 82, 82)" };
        altoVal--;
        if (altoVal < 0) {
          altoVal = 13;
        }
        else if (altoVal > 14) {
          altoVal = 1;
        }
        altoPlay.play((altoVal % 14));
      }
      else if (currPrice > btcPrice) {
        priceStyle2 = { color: "rgb(42, 222, 42)" };
        altoVal++;
        if (altoVal < 0) {
          altoVal = 13;
        }
        else if (altoVal > 14) {
          altoVal = 1;
        }
        altoPlay.play((altoVal % 14));
      }
      setBtcPrice(currPrice);
    }
  };

  //console.log(ws)
  //-------------------------------------------
  /*
    React.useEffect(() => {
      fetch("/getAPIResponse")
        .then((res) => res.json())
        // .then((coins) => setCoins(coins.data[1].name))
        //.then(console.log("It works!"))
        //.then((coins) => console.log(coins))
        .then((coins) => setCoins(coins.data))
    }, []);
  */
  return (
    <div className="App">
      <header className="App-header">
        {/*
        {socketReady && <div>
          <Currency name="eth" socket={ws} />
        </div>}
        */}

        <h3>ETH</h3> <br /> <hr /><span style={priceStyle1}>{ethPrice && !isNaN(ethPrice) ? ethPrice : "---"}</span>
        <h3>BTC</h3> <br /> <hr /><span style={priceStyle2}>{btcPrice && !isNaN(btcPrice) ? btcPrice : "---"}</span>


        {/* 
        {coins &&
          <div>

            <h3 className="directionheader">CoinLore 100</h3>
            {Object.keys(coins).map((index) => (
              (<p key={index}>{coins[index].name} : {coins[index].price_usd}</p>)
            ))}

          </div>}
          */}
      </header>

    </div>
  );
}



export default App;
