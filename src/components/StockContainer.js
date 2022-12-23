import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, addStock}) {
  const renderStocks = stocks.map((stock) => {
    return <Stock stock={stock} handleFuncion={addStock} key={"stock-" + stock.id}/>
  })

  return (
    <div>
      <h2>Stocks</h2>
      {renderStocks}
    </div>
  );
}

export default StockContainer;
