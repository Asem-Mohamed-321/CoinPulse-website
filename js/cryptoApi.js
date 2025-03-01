import { currencies } from './currencies.js';
const api = 'https://api.coincap.io/v2/assets';

async function fetchCrypto() {
    const response = await fetch(api);
    const data = await response.json();

    const selectBar = document.getElementById('fromCurrency');

    if (data.data && Array.isArray(data.data)) {
      data.data.forEach(crypto => {
        const option = document.createElement('option');
        option.value = crypto.id;
        option.textContent = `${crypto.symbol} - ${crypto.name}`;
        selectBar.appendChild(option);
      });
    }
}

function fetchCurrency() {
    
  
    const result = currencies;
    const toBar = document.getElementById('toCurrency');
    Object.keys(result.exchange_rates).forEach(currency => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = `${currency}`;
      toBar.appendChild(option);
    });

}



window.onload= function(){
fetchCrypto();
fetchCurrency();
};














