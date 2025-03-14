const api = 'https://api.coincap.io/v2/assets';
let t = document.getElementsByTagName("tbody")[0];
let previousePrices = {};
let socketCoins="";
let coinExpanded = false ;





// fetch crypto 

async function fetchCryptoOptions() {
  const response = await fetch(api);
  const data = await response.json();

  const select = document.getElementById('coinSelect');
  select.innerHTML = '<option disabled selected>Select a coin</option>'; 

  
  
  if (data.data && Array.isArray(data.data)) {
    data.data.forEach(coin => {
      const option = document.createElement('option');
      option.value = coin.id;
      option.dataset.symbol=coin.symbol
      option.textContent = `${coin.name} (${coin.symbol})`;
      select.appendChild(option);
    });

  }


}

// Add coin to user watchlist
async function addCoinToWatchlist() {
  
  const select = document.getElementById('coinSelect');
  const coinId = select.value;

  if (!coinId) return;

  const response = await fetch(`${api}/${coinId}`);
  const data = await response.json();
  const coin = [data.data.symbol];

  if (coin) {
    const sessionUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!sessionUser) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === sessionUser.email);

    if (userIndex !== -1) {
      const userWatchlist = users[userIndex].watchList;

      // 
      //  duplicates
      console.log(coin)
      const alreadyExists = userWatchlist.some(item => item === coin[0]);
      if (alreadyExists) {
        alert(`${coin[0]} is already in your watchlist!`);
        return;
      }

      // Add coin to watchlist
      userWatchlist.push(coin[0]);
      users[userIndex].watchList = userWatchlist;
      localStorage.setItem('users', JSON.stringify(users));
      sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

      // renderWatchlist(userWatchlist);
      // console.log(coinId)
      // updateTable(select.getAttribute("data-symbol"));
      updateTable(coin)

      // Close 
      const modal = bootstrap.Modal.getInstance(document.getElementById('addCoinModal'));
      modal.hide();
    }
  }
}

// Remove coin
function removeCoinFromWatchlist(event,coinsymbol) {
  event.stopPropagation()
  const sessionUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  if (!sessionUser) return;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(user => user.email === sessionUser.email);

  
  
  if (userIndex !== -1) {
    const userWatchlist = users[userIndex].watchList.filter(coin => coin !== coinsymbol);
    console.log(userWatchlist)

    users[userIndex].watchList = userWatchlist;

    
    localStorage.setItem('users', JSON.stringify(users));
    
    sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

    
    event.target.parentElement.parentElement.remove()

    // updateTable(userWatchlist)
  }
}

function RemoveAll(){
  const sessionUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  if (!sessionUser) return;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(user => user.email === sessionUser.email);
  if (userIndex !== -1) {
    const userWatchlist = [];

    users[userIndex].watchList = userWatchlist;

    
    localStorage.setItem('users', JSON.stringify(users));
    
    sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

    let rows=document.getElementsByTagName("tbody")[0].querySelectorAll("tr");
    for(let i = rows.length - 1; i >= 0; i--){
      rows[i].remove()
    }
    // renderWatchlist(userWatchlist);
    // updateTable(userWatchlist)
  }
}

// Render twatchlist

// function renderWatchlist(watchList) {
//   const tableBody = document.querySelector('tbody');
//   tableBody.innerHTML = '';

//   if (watchList.length === 0) {
//     tableBody.innerHTML = '<tr><td colspan="9" class="text-center">Your watchlist is empty</td></tr>';
//     return;
//   }

//   watchList.forEach(coin => {
//     const row = tableBody.insertRow();
//     row.innerHTML = `
//       <td class="d-none d-sm-table-cell">${coin.rank}</td>
//       <td>${coin.name} (${coin.symbol})</td>
//       <td>$${parseFloat(coin.priceUsd).toFixed(2)}</td>
//       <td class="d-none d-sm-table-cell">$${(coin.marketCapUsd / 1e9).toFixed(2)} B</td>
//       <td class="d-none d-sm-table-cell">$${parseFloat(coin.vwap24Hr).toFixed(2)}</td>
//       <td class="d-none d-sm-table-cell">${(coin.supply / 1e6).toFixed(2)} M</td>
//       <td class="d-none d-sm-table-cell">$${(coin.volumeUsd24Hr / 1e9).toFixed(2)} B</td>
//       <td>${parseFloat(coin.changePercent24Hr).toFixed(2)}%</td>
    
//       <td>
//         <button class="btn btn-danger btn-sm" onclick="removeCoinFromWatchlist('${coin.id}')">Remove</button>
//       </td>
//     `;
//   });
// }

// Handle user login
function handleLogin() {
  //
  //const sessionUser = sessionStorage.getItem('loggedInUser');
  const sessionUser = sessionStorage.getItem('loggedInUser');
  if (sessionUser) {
    const user = JSON.parse(sessionUser);
    updateTable(user.watchList);
  } else {
    updateTable([]);
  }
}

// Check session 
function checkUserSession() {
  const sessionUser = sessionStorage.getItem('loggedInUser');
  if (!sessionUser) {
    renderWatchlist([]);
  } else {
    const user = JSON.parse(sessionUser);
    updateTable(user.watchList);
  }
}

// setInterval(checkUserSession, 500);

window.onload = function () {
  fetchCryptoOptions();
  // updateTable()
  handleLogin();
};




let updateTable = function(coin){    //takes the first row to be updated
  // for (let i=0;i<t.children.length;i++){
  //     t.children[0].remove();
  // }
  
  let a = fetch("https://api.coincap.io/v2/assets");
  a.then((data) => {
      let j = data.text();
      j.then((p) => {
          let parsed = JSON.parse(p);
          coinsdata = parsed; // passing the data to a global variable to use it in different functions
          // let logosJson;
          let logosPromise = fetch("../json/logos.json")
          logosPromise.then((logos)=>{
              let logosText = logos.text();
              logosText.then((l)=> {
                  logosJson=JSON.parse(l)

                  
                  console.log(coin)
                  for(let i=0 ; i<coin.length ; i++){
                      let coinInfo = parsed.data.find(c => c.symbol===coin[i])
                      console.log(coinInfo)

                      // document.getElementsByTagName("p")[0].innerHTML= document.getElementsByTagName("p")[0].innerHTML +"<br>"+ parsed.data[k]["id"];
                      var r = t.appendChild(document.createElement("tr"));
                      r.addEventListener("click", expandCoin )
                      r.dataset.coin = coinInfo.id //adding -data attribute to make the websocket lookup easier
                      var d = r.appendChild(document.createElement("td"));
                      d.appendChild(document.createTextNode(coinInfo.rank));
                      d.classList.add("d-none","d-md-table-cell");
                      var d = r.appendChild(document.createElement("td"));
                      // d.appendChild(document.createTextNode(`<a>${parsed.data[i]["id"]}</a>`));
                      // console.log(`../pages/coinProfile.html?coin=${parsed.data[i]["id"]}`.onerror)
                      d.innerHTML=`
                      <img src="${logosJson[coinInfo.symbol]}" onerror="this.src='../images/logos/symbol/not-found.png'">
                      <a href="../pages/coinProfile.html?coin=${coinInfo.id}">${coinInfo.id}</a>`
                      
                      
                      var d = r.appendChild(document.createElement("td"));
                      d.appendChild(document.createTextNode(formatCurrency(coinInfo.priceUsd)))
                      var d = r.appendChild(document.createElement("td"));
                      d.appendChild(document.createTextNode(formatImpact(coinInfo.marketCapUsd)));
                      d.classList.add("d-none","d-md-table-cell");
                      var d = r.appendChild(document.createElement("td"));
                      d.appendChild(document.createTextNode(formatCurrency(coinInfo.vwap24Hr)));
                      d.classList.add("d-none","d-md-table-cell");
                      var d = r.appendChild(document.createElement("td"));
                      d.appendChild(document.createTextNode(formatImpact(coinInfo.supply)));
                      d.classList.add("d-none","d-md-table-cell");
                      var d = r.appendChild(document.createElement("td"));
                      d.appendChild(document.createTextNode(formatImpact(coinInfo.volumeUsd24Hr)));
                      d.classList.add("d-none","d-md-table-cell");
                      var d = r.appendChild(document.createElement("td"));
                      d.appendChild(document.createTextNode(formatPrecentage(coinInfo.changePercent24Hr)));
                      var d = r.appendChild(document.createElement("td"));
                      console.log(coinInfo.symbol)
                      d.innerHTML=`
                      <td>
                        <button class="btn btn-danger btn-sm" onclick="removeCoinFromWatchlist(event,'${coinInfo.symbol}')">Remove</button>
                      </td>
                      `

                      // if(previousePrices === null){
                      //     continue
                      // }
                      // else if( parsed.data[i]["priceUsd"] > previousePrices[`${parsed.data[i]["symbol"]}`])
                      // {
                      //     r.classList.add("glow-green")
                      // }
                      // else if( parsed.data[i]["priceUsd"] < previousePrices[`${parsed.data[i]["symbol"]}`])
                      // {
                      //         r.classList.add("glow-red")
                      // }
                      previousePrices[`${coinInfo.id}`] = coinInfo.priceUsd

                      socketCoins+=`,${coinInfo.id}`
                      
                  }

                  console.log(socketCoins.slice(1))
                  startWebSocket(socketCoins.slice(1));
                  // startWebSocket("bitcoin"); to debug the websocket on one coin
                  console.log(previousePrices)
                  // console.log(parsed[0])

          })
          })
          // console.log(logosJson)
          
      })
  }).catch((err) => console.log(err));
}

let coinId;
let coinName ;
let coinSymbol ;

function expandCoin(){

    
  let coin = this.querySelectorAll('a')[0].innerText;
  let coinImage = this.querySelectorAll('img')[0].cloneNode(true);
  coinImage.classList.add("mx-sm-0", "mx-md-2", "mx-lg-3", "mx-4")
  
  console.log(coinImage )

  

  console.log(coinId)

  if(coinExpanded === false || (coinExpanded === true && coinId!==coin)){
      if(document.getElementById("addedRow")){
          document.getElementById("addedRow").remove()

      }
      coinExpanded = true ;

      

      var tr = document.createElement("tr");
      tr.setAttribute("id","addedRow")

      var td = document.createElement("td");

      td.colSpan = this.children.length; // Make the cell span the entire row
      td.style.backgroundColor = "rgb(255,255,240)";
      td.style.height = "100px";

      //getting some data to display in the info section
      
      for (let i =0 ; i<coin.length ; i++){
          if(coin === coinsdata.data[i]["id"]){
              coinName = coinsdata.data[i]["name"];
              coinSymbol = coinsdata.data[i]["symbol"];
              coinId = coinsdata.data[i]["id"]
              console.log(coinName)
              console.log(coinId)
              console.log(coin)
              


              break ;
          }
      }
      // let coinInfo = parsed.data.find(c => c.symbol===coin)

      // coinName = parsed.data.find(cid => coin === cid.id).data
      // coinSymbol = coinsdata.data[i]["symbol"];


      td.innerHTML=`
      <div id="chart" class="container mx-auto">
          <div class="row align-middle">
              <div class="offset-3 offset-md-0 col-1  mx-auto">
                  ${coinImage.outerHTML}
              </div>

              <div class="  col-8 col-md-3 d-md-inline d-inline ">
                  <p class="h3">${coinName}(${coinSymbol})</p>
                  <p id="DATE">${(new Date).toLocaleString()}</p>
              </div>


              <div class="offset-2 offset-md-0 col-4">
                  <p class="h5" id="HIGH"></p>
                  <p class="h5" id="LOW"></p>
              </div>

              <div class="col-4 ">
                  <p class="h5" id="AVG"></p>
                  <p class="h5" id="CHANGE"></p>
              </div>

              <!-- chart : -->
          </div>
          <div class="row">
              <canvas id="myChart" ></canvas>

          </div>
      </div>
      `

      tr.appendChild(td);
      this.insertAdjacentElement("afterend", tr);



      //creating the chart and the info on top of it :

      let yData = [];
      let xData = [];


      let a = fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=h2`)
      a.then((data)=>{
          let j = data.text();
          j.then((p)=>{
              let parsed = JSON.parse(p);
              console.log(parsed);
              dataObject=parsed["data"][0]["priceUsd"];
              for(let i=0;i<parsed["data"].length;i++){
                  yData[i] = parseFloat(parsed["data"][i]["priceUsd"])
                  xData[i] = new Date(parsed["data"][i]["date"]).toLocaleString()
              }
              // console.log(yData)
              // console.log(xData)

              //drawing on the canvas
              const canvas = document.getElementById('myChart');
              const ctx = canvas.getContext('2d');


              const myChart = new Chart("myChart", {
                  type: "line",
                  data: {
                      labels: xData,
                      datasets: [{
                          fill: false,
                          pointRadius: 0.5,
                          // pointStyle : false,
                          pointBackgroundColor: "rgba(0,0,255,0.5)",
                          pointBorderColor: "rgba(0,0,255,0.5)",
                          backgroundColor: "rgba(0,0,255,0.5)",
                          borderColor: "rgba(0,0,255,0.5)",
                          data: yData
                      }]
                  },
                  options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {display:false},
                  }
              });



              

              //fill data top of the chart
              document.getElementById("HIGH").innerHTML=`HIGH &nbsp; ${formatCurrency(Math.max(...yData).toString())}`
              document.getElementById("LOW").innerHTML=`LOW &nbsp; ${formatCurrency(Math.min(...yData))}`
              let total=0;
              for(let i = 0; i < yData.length; i++) {
                  total += yData[i]
              }
              let avg = total / yData.length;
              document.getElementById("AVG").innerHTML=`AVERAGE &nbsp; ${formatCurrency(avg)}`
              let change = ((yData[yData.length-1]-yData[0])/yData[0])*100;
              document.getElementById("CHANGE").innerHTML=`CHANGE &nbsp; ${formatPrecentage(change).toString()}`

          })
          console.log("finished ")
      }).catch(err=>console.log(err))
  }
  else if (coinExpanded === true && coinId===coin){ //if the user clicked on the same coin .. just close the info row
      console.log("same")
      document.getElementById("addedRow").remove()
      coinExpanded = false ;
  }
  


}


let formatCurrency = function (fetchedString){
  return parseFloat(fetchedString).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  })
}

let formatImpact = function (fetchedString){
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  }).format(parseFloat(fetchedString));
}

let formatPrecentage = function (fetchedString){
  return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  }).format(parseFloat(fetchedString)/100);
}

let latestUpdates = {};

function startWebSocket(socketCoins){
    pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${socketCoins}`)
    pricesWs.onmessage = function (msg) {
        // console.log(msg.data)
        let priceUpdates = JSON.parse(msg.data);
        latestUpdates = {...latestUpdates, ...priceUpdates};
    }
    intervalId = setInterval(()=>{
        for ( let [k,v] of Object.entries(latestUpdates)){
            let r = document.querySelector(`[data-coin="${k}"]`)
            // console.log(`Checking row for ${k}:`, r);


            if (r) {
                if( v > previousePrices[k])
                    {
                        r.querySelectorAll("td")[2].textContent=formatCurrency(v)
                        r.querySelectorAll("td").forEach((cell)=>{
                            cell.classList.add("glow-green")
                        })
                        
                    }
                    else if( v < previousePrices[k])
                    {
                        r.querySelectorAll("td")[2].textContent=formatCurrency(v)
                        r.querySelectorAll("td").forEach((cell)=>{
                            cell.classList.add("glow-red")
                        })
                    }
                }
                else {
                console.warn("Row disappeared for", k);
            }

            
            previousePrices[k]=v
            timeOutId = setTimeout(() => {
                r.querySelectorAll("td").forEach((cell)=>{
                    cell.classList.remove("glow-green", "glow-red");
                })
            }, 900);
        }

        latestUpdates = {};

    },1000)
    // intervalIdTest = setInterval(()=>{
    //     console.log("5 sec")
    // },1000)
}