import React from "react";
import Stock from "./Stock";

function PortfolioContainer({portfolio, sellStock}) {
  const renderPortfolio = portfolio.map((stock) => {
    return <Stock stock={stock} handleFuncion={sellStock} key={"portfolioStock-" + stock.id}/>
  })

  return (
    <div>
      <h2>My Portfolio</h2>
      {
        renderPortfolio
      }
    </div>
  );
}

export default PortfolioContainer;
