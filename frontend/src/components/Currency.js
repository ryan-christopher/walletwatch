import React from 'react'
let currPrice;
let priceStyle = {
    color: "white",
};

function Currency(props) {
    const [price, setPrice] = React.useState(null);



    props.socket.send(`{
            "method": "SUBSCRIBE",
            "params": [
              "${props.name}usdt@miniTicker"
            ],
            "id": 1
          }`)



    props.socket.onmessage = (message) => {
        currPrice = JSON.parse(message.data)
        //currPrice = parseFloat(currPrice.c).toFixed(2);
        if (!("result" in currPrice) && (currPrice.s === (`${props.name}usdt`.toUpperCase()))) {
            currPrice = parseFloat(currPrice.c).toFixed(2);

            if (currPrice < price) {
                priceStyle = { color: "rgb(255, 82, 82)" };

            }
            else if (currPrice > price) {
                priceStyle = { color: "rgb(42, 222, 42)" };
            }
            setPrice(currPrice);

        }

    };

    return (
        <div>
            <h3>{props.name}</h3> <hr /><span style={priceStyle}>{price && !isNaN(price) ? price : "---"}</span>
        </div>
    )
}

export default Currency