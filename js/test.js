// // let a = fetch("https://api.coincap.io/v2/assets");
// // a.then((data) => {
// //     // console.log(data)
// //     let j = data.text();
// //     // console.log(j)         j is a promise
// //     j.then((p) => {
// //         let parsed = JSON.parse(p);
// //         // console.log(parsed.data[0]["id"])
// //         console.log(parsed.data)
// //         let sum=0;
// //         for(k in parsed.data){
// //             // console.log(k)
// //             // console.log(parsed.data[k])
// //             sum+=parseFloat(parsed.data[k]["marketCapUsd"])
// //             console.log( new Intl.NumberFormat('en-US', {
// //                 style: 'currency',
// //                 currency: 'USD',
// //                 notation: 'compact',
// //                 compactDisplay: 'short',
// //                 minimumFractionDigits: 2,
// //                 maximumFractionDigits: 2,
// //             }).format(sum));
            
// //             // document.getElementsByTagName("p")[0].innerHTML= document.getElementsByTagName("p")[0].innerHTML +"<br>"+ parsed.data[k]["id"];
// //         }
// //         console.log(sum)
// //         // console.log(parsed[0])
// //     })
// // }).catch((err) => console.log(err));


// // onload = function(){
// //     const ctx = document.getElementById('cryptoChart').getContext('2d');

// // async function fetchCryptoData() {
// //     try {
// //         // const response = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json');   //closed api
// //         const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30');

// //         const data = await response.json();
            
// //             const prices = data.prices.map(entry => entry[1]); // Extract price values
// //             const labels = data.prices.map(entry => new Date(entry[0]).toLocaleDateString()); // Convert timestamps to dates
// //             console.log(data.prices)
            
// //             new Chart(ctx, {
// //                 type: 'line',
// //                 data: {
// //                     labels: labels,
// //                     datasets: [{
// //                         label: 'Bitcoin Price (USD)',
// //                         data: prices,
// //                         borderColor: 'blue',
// //                         borderWidth: 2,
// //                         fill: false
// //                     }]
// //                 },
// //                 options: {
// //                     responsive: true,
// //                     scales: {
// //                         x: { display: true, title: { display: true, text: 'Date' } },
// //                         y: { display: true, title: { display: true, text: 'Price (USD)' } }
// //                     }
// //                 }
// //             });
// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //     }
// // }

// // fetchCryptoData();

// // }


// onload =function(){
//     let yData = [];
//     let xData = [];
//     const canvas = document.getElementById('myChart');
//     const ctx = canvas.getContext('2d');


//     let a = this.fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=h2")
//     a.then((data)=>{
//         let j = data.text();
//         j.then((p)=>{
//             let parsed = JSON.parse(p);
//             // console.log(parsed);
//             dataObject=parsed["data"][0]["priceUsd"];
//             // console.log(typeof(dataObject))
//             // console.log(dataObject)
//             for(let i=0;i<parsed["data"].length;i++){
//                 yData[i] = parseFloat(parsed["data"][i]["priceUsd"])
//                 xData[i] = new Date(parsed["data"][i]["date"]).toLocaleString()
//             }
//             // console.log(yData)
//             // console.log(xData)

            
//         //drawing on the canvas

//         const myChart = new Chart("myChart", {
//         type: "line",
//         data: {
//             labels: xData,
//             datasets: [{
//                 fill: false,
//                 pointRadius: 0.5,
//                 // pointStyle : false,
//                 pointBackgroundColor: "rgba(0,0,255,0.5)",
//                 pointBorderColor: "rgba(0,0,255,0.5)",
//                 backgroundColor: "rgba(0,0,255,0.5)",
//                 borderColor: "rgba(0,0,255,0.5)",
//                 data: yData
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             legend: {display:false}
            
//         }
//     });

//         })

//     }).catch(err=>console.log(err))


//     const unixTime36HoursAgo = Date.now() - (24*30 * 60 * 60 * 1000);
//     console.log(Date.now())
//     console.log(unixTime36HoursAgo)
    
// }
let logosObj;
let coinsObj;
let newlogos = new Array;
let c=0;



let b = fetch("https://api.coincap.io/v2/assets");
    b.then((data) => {
        let j = data.text();
        j.then((p) => {
            let parsed = JSON.parse(p);
            coinsObj = parsed
            let a = fetch("../json/cryptos.json");
            a.then((response)=>{
            let txt = response.text();
            txt.then((p)=>{
                let parsed = JSON.parse(p);
                // console.log(parsed)
                logosObj=parsed
                for(let i =0;i<100;i++){
                    // console.log(coinsObj.data[i].symbol)
                
                    for(let j=0 ; j<logosObj.length ; j++)
                    if(coinsObj.data[i].symbol===logosObj[j].symbol){
                        // console.log(coinsObj.data[i].symbol)
                        newlogos = [...newlogos,{symbol:logosObj[j].symbol ,logo:logosObj[j].icon}]
                        break
                    }else if(coinsObj.data[i].symbol!==logosObj[j].symbol && j===499){
                        newlogos = [...newlogos,{symbol:logosObj[j].symbol ,logo:"../images/not-found.png"}]
                        c++;
                        // console.log(coinsObj.data[i].symbol +" is not found ")
                    }
                    
                }
                // console.log(c)
                for (let i=0 ; i<coinsObj.data.length ; i++){
                    document.getElementsByTagName("p")[0].innerHTML=document.getElementsByTagName("p")[0].innerHTML+`"${coinsObj.data[i].symbol}":"../images/logos/symbol/${coinsObj.data[i].symbol}.PNG",\n`
                }
                // console.log(coinsObj.data)
        
    })
})
        })})

// coinsObj.forEach(coinsObj => {
//     const match = objArray.find(logosObj => logosObj.symbol === coinsObj.symbol);
//     if (match) {
//         console.log(`Symbol: ${coinsObj.symbol}, ID: ${match.icon}`);
//     } })

    

    // for( k,v in  coinsObj,coinsObj.values ){
    //     console.log(k)
    // }