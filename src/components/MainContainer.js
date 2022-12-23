import React from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [portKey, setPortKey] = useState(0);
  const [sortBy, setSoryBy] = useState(false);
  const [filter, setFilter] = useState("All")

  const fetchData = async () => {
    try {
      const resp = await fetch("http://localhost:3001/stocks")
      const data = await resp.json()
      setStocks(data)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchData()
    
  }, []);

  const addStock = (stock) => {
    setPortfolio(current => [...current, {...stock, id:portKey}])
    setPortKey(current => current + 1)
  }

  const sellStock = (stock) => {
    setPortfolio(current =>  current.filter((s) => {
      return s !== stock
    }))
  }

  const sortStocks = stocks.sort((stock1, stock2) => {
    if(sortBy && sortBy == "Price"){
      return stock1.price - stock2.price
    }
    else{
      if(stock1.ticker < stock2.ticker){
        return -1;
      }
      if(stock1.ticker > stock2.ticker){
        return 1;
      }

      return 0;
    }
  })

  const finalStocks = filter==="All" ? sortStocks : sortStocks.filter((stock) => {
    return stock.type === filter
  })

  return (
    <div>
      <SearchBar sortBy={sortBy} setSoryBy={setSoryBy} setFilter={setFilter}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={finalStocks} addStock={addStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} sellStock={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
