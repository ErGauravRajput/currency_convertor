import axios from "axios";
const api=axios.create({
    baseURL:"https://v6.exchangerate-api.com/v6/19c17d96c00cd0253d58603a",
});

export const currencyConvertor=(fromCurrency,toCurrency,amount)=>{
    return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
};