import { useState } from "react";
import "./App.css";
import { currencyConvertor } from "./Api/PostApi";
const App=()=>{

  const [amount ,setAmount]=useState(0);
  const [fromCurrency,setFromCurrency]=useState("USD");
  const [toCurrency,setToCurrency]=useState("INR");
  const [convertAmount,setConvertedAmount]=useState(null);
  const [loading ,setLoading]=useState(false);
  const [error,setError]=useState(null);

  const handleConvertCurrency=async()=>{
    setLoading(true);
    setError(null);
    try {
      const res=await currencyConvertor(fromCurrency,toCurrency,amount);
      const {conversion_result}=res.data;
      setLoading(false);
      setConvertedAmount(conversion_result);
      
      // console.log(data);
      
    } catch (error) {
      setError("got error in converting the given amount");
      console.log(error);
      setLoading(false);
      
    }
   
  }
  return (
    <section className="currency-convertor">
      <div className="currency-div">
        <h1>Currency Convertor</h1>
        <div>
          <label htmlFor="currency_amount">
            Amount:
            <input type="number" id="currency_amount" value={amount}
            onChange={(e)=>setAmount(e.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            From:
            <select value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            To:
            <select value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
            </select>
          </label>
        </div>
        <button disabled={loading || amount<=0} onClick={handleConvertCurrency}> 
          {loading?"converting...":"Convert"}
        </button>
      
      <hr/>
      {convertAmount && (
        <div>
          <h2>
            {amount} {fromCurrency} = {convertAmount.toFixed(2)} {toCurrency}
          </h2>
        </div>
      )}
      {error && <p>{error}</p>}
      </div>
    </section>
  );
}
export default App;