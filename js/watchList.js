
const api = 'https://api.coincap.io/v2/assets';


async function fetchCryptoOptions() {
  const response = await fetch(api);
  const data = await response.json();

  const select = document.getElementById('coinSelect');
  select.innerHTML = '<option disabled selected>Select a coin</option>'; // Clear

  if (data.data && Array.isArray(data.data)) {
    data.data.forEach(coin => {
      const option = document.createElement('option');
      option.value = coin.id;
      option.textContent = `${coin.name} (${coin.symbol})`;
      select.appendChild(option);
    });
  }
}



async function addCoinToWatchlist() {
  const select = document.getElementById('coinSelect');
  const coinId = select.value;

  if (!coinId) return;

  const response = await fetch(`${api}/${coinId}`);
  const data = await response.json();
  const coin = data.data;

  if (coin) {
    const sessionUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!sessionUser) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === sessionUser.email);

    if (userIndex !== -1) {
      const userWatchlist = users[userIndex].watchList;

      // duplicate
      const alreadyExists = userWatchlist.some(item => item.id === coin.id);
      if (alreadyExists) {
        alert(`${coin.name} is already in your watchlist!`)
        return;
      }

      // Add coin to watchlist
      userWatchlist.push(coin);
      users[userIndex].watchList = userWatchlist;
      localStorage.setItem('users', JSON.stringify(users));
      sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

      // Update table
      renderWatchlist(userWatchlist);

      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('addCoinModal'));
      modal.hide();
    }
  }
}




/// the watchlist to be shown

function renderWatchlist(watchList) {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';

  if (watchList.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="8" class="text-center">Your watchlist is empty</td></tr>';
    return;
  }

  watchList.forEach(coin => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td class="d-none d-sm-table-cell">${coin.rank}</td>
      <td>${coin.name} (${coin.symbol})</td>
      <td>$${parseFloat(coin.priceUsd).toFixed(2)}</td>
      <td class="d-none d-sm-table-cell">$${(coin.marketCapUsd / 1e9).toFixed(2)} B</td>
      <td class="d-none d-sm-table-cell">$${parseFloat(coin.vwap24Hr).toFixed(2)}</td>
      <td class="d-none d-sm-table-cell">${(coin.supply / 1e6).toFixed(2)} M</td>
      <td class="d-none d-sm-table-cell">$${(coin.volumeUsd24Hr / 1e9).toFixed(2)} B</td>
      <td>${parseFloat(coin.changePercent24Hr).toFixed(2)}%</td>
    `;
  });
}





// for checking 
function handleLogin() {
  const sessionUser = sessionStorage.getItem('loggedInUser');
  if (sessionUser) {
    const user = JSON.parse(sessionUser);
    renderWatchlist(user.watchList);
  } else {
    
    // Show empty table if logged out
    renderWatchlist([]); 
  }
}

function checkUserSession() {
  const sessionUser = sessionStorage.getItem('loggedInUser');
  if (!sessionUser) {
    renderWatchlist([]); // Clear table 
  }
  else {  const user = JSON.parse(sessionUser);
    renderWatchlist(user.watchList);}
}
setInterval(checkUserSession, 500);



window.onload = function () {
  fetchCryptoOptions();
  handleLogin();
};




