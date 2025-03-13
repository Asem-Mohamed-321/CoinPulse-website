// currencies exported
//import { currencies } from './currencies.js';

const api = 'https://api.coincap.io/v2/assets';
const currency = 'https://api.coincap.io/v2/rates'; 

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

async function fetchCurrency() {

    //const result = currencies;
    const response = await fetch(currency);
    const data = await response.json();
    
    const toBar = document.getElementById('toCurrency');
    
    // for the offcanvas
    //const menu = document.getElementById('dropmenu'); XXXX
    const offcanvasSelect = document.getElementById('convertSelect');

/*
    Object.keys(result.exchange_rates).forEach(currency => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = `${currency}`;
      toBar.appendChild(option);
                  

      const offcanvasOption = document.createElement('option');
      offcanvasOption.value = currency;
      offcanvasOption.textContent =`${currency}`;
      offcanvasSelect.appendChild(offcanvasOption);
    });*/

    if (data.data && Array.isArray(data.data)) {
      data.data.forEach(currency  => {
        const option = document.createElement('option');
        option.value = currency.symbol;
        option.textContent = `${currency.symbol}`;
        toBar.appendChild(option);

        const offcanvasOption = document.createElement('option');
        offcanvasOption.value = currency.symbol;
        offcanvasOption.textContent =`${currency.symbol}`;
        offcanvasSelect.appendChild(offcanvasOption);
      });
    }

}


async function convert() {

  const amount = parseFloat(document.getElementById('amount').value);   // amount input field
  const fromCurrency=document.getElementById('fromCurrency').value;    // from select field
  const toCurrency=document.getElementById('toCurrency').value;       // to select field
  const result = document.getElementById('result');                  // result <p>
  
  const response = await fetch (api);
  const data = await response.json();
//////////////////////////////////////////

  const res = await fetch(currency);
  const curr = await res.json();
/////////////////////////////////////////////


  const crypto = data.data.find(item=> item.id === fromCurrency);
  const selectedCurrency = curr.data.find(curr => curr.symbol === toCurrency);


  if (crypto.priceUsd && selectedCurrency.rateUsd) {
    const priceInUsd = amount * parseFloat(crypto.priceUsd);
    const convertedAmount = priceInUsd / parseFloat(selectedCurrency.rateUsd);

    
    
    //console.log(convertedAmount);


    // result to be shown // Converstiona Rate: x BTC x USD
    result.innerHTML = `Conversion Rate: ${amount} ${crypto.symbol} = ${convertedAmount.toFixed(2)} ${toCurrency}`;

  }

}



async function fetchConversions() {
  
  // fetch crypto 
  const response = await fetch(api);
  const data = await response.json();


  // fetch currency
  const res = await fetch(currency);
  const curr = await res.json();
  console.log(curr);

  const div = document.getElementById('conversions');
  const toCurrency=document.getElementById('convertSelect').value; 

  div.innerHTML = ''; // very important

  if (data.data && Array.isArray(data.data)) {
    const rowDiv = document.createElement('div');
    rowDiv.className='row g-4';
    data.data.forEach(crypto => {

      const colDiv = document.createElement('div');
      colDiv.className = 'col-4 col-md-2';
      
      // input creation
      const input = document.createElement('input');
      input.type= 'text';
      input.className='form-control mt-1 col-2 rounded-pill bg-light';
      const selectedCurrency = curr.data.find(item => item.symbol === toCurrency);
      const convertedAmount = parseFloat(crypto.priceUsd) / parseFloat(selectedCurrency.rateUsd);
      input.value = `1 ${crypto.symbol} | ${convertedAmount.toFixed(2)} ${toCurrency}`;      
      input.readOnly = true;
      colDiv.appendChild(input);
      rowDiv.appendChild(colDiv);
    });
    div.appendChild(rowDiv);
  }
}




window.onload= function(){
fetchCrypto();
fetchCurrency();
fetchConversions();
const offcanvasSelect = document.getElementById('convertSelect');
  offcanvasSelect.addEventListener('change', fetchConversions);

};

window.convert = convert;













