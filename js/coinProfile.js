let coin; //this is the passed coin id from the calling page
let coindata ; //will store the info about the coin here when fetched

onload =function(){
    const params = new URLSearchParams(window.location.search); //this is a js library that makes it easier to work with query parameters in a URL.
    coin = params.get("coin")


    
    this.document.getElementById("defaultbtn").click(); //shows the default chart of 1 day 
    this.document.getElementById("DATE").innerHTML=`${(new Date).toLocaleString()}`

    

    DisplayCoinInfo(coin);
    ExchangeTable();

}

var t = document.getElementsByTagName("tbody")[0];
let rows = 10;


let myChart = null; // Global variable to store the Chart instance so we can check if it exist before creating new charts to avoid errors

function test(){
    console.log("this is the function test")
}
function displayChart(url){
    // console.log("called")

    let yData = [];
    let xData = [];


    let a = fetch(url)
    console.log(url)
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
            if(myChart!==null){
                myChart.destroy();
            }

            myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: xData,
                    datasets: [{
                        fill: false,
                        pointRadius: 0.5,
                        // lineTension: 0,
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
                    legend: {display:false},
                    // x:{
                    //     reverse:true
                    // },
                }
            });


            //fill data top of the chart
            document.getElementById("coinNameInfo").innerHTML=`${coindata.data.name}(${coindata.data.symbol})`
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

    }).catch(err=>console.log(err))

    // console.log(document.getElementById("HIGH").innerHTML=Math.max(...yData))
    // console.log(document.getElementById("LOW").innerHTML=Math.min(...yData))

    

    
} 

function newDisplay(intervalPassed,startTime){
    let interval = intervalPassed;
    let end = Date.now().toString(); //getting the unix time to pass it to the url (it needs the UNIX time in ms)
    let start = (end - (startTime*60*60*1000)).toString();              // before certain time hours
    console.log(start)
    console.log(end)
    let url = "https://api.coincap.io/v2/assets/"+coin+"/history?interval="+interval+"&start="+start+"&end="+end;
    // console.log(url)
    displayChart(url)

}


let formatCurrency = function (fetchedString){
    return parseFloat(fetchedString).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}
let formatPrecentage = function (fetchedString){
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(parseFloat(fetchedString)/100);
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



function DisplayCoinInfo(coin){
    let url="https://api.coincap.io/v2/assets/"+coin
    console.log(url)
    let a =fetch(url)
    a.then((data)=>{
        let j = data.text()
        j.then((p)=>{
            let parsed=JSON.parse(p)
            coindata = parsed ;
            console.log(parsed)

            //fills the data on top

            document.getElementById("CoinName").innerHTML=parsed.data.name+" ("+parsed.data.symbol+")"
            document.getElementById("CoinPriceAndChange").innerHTML=formatCurrency(parsed.data.priceUsd)+`&nbsp; &nbsp; &nbsp;`+formatPrecentage(parsed.data.changePercent24Hr)
            document.getElementById("CoinMarketCap").innerHTML=`<b>${formatImpact(parsed.data.marketCapUsd)}</b>`
            document.getElementById("CoinWebsite").onclick=()=>window.open("https://"+parsed.data.name+".org")
            document.getElementById("CoinVolume24").innerHTML=`<b>${formatImpact(parsed.data.volumeUsd24Hr)}</b>`
            document.getElementById("CoinExplorer").onclick=()=>window.open(parsed.data.explorer)
            document.getElementById("CoinSupply").innerHTML=`<b>${formatImpact(parsed.data.supply).substring(1)} &nbsp; ${parsed.data.symbol}</b>`


        })
    }).catch((e)=>console.log(e))
}


function ExchangeTable(updateStart=0){
    let a =fetch("https://api.coincap.io/v2/exchanges")
    a.then((data)=>{
        let j = data.text()
        j.then((p)=>{
            let parsed=JSON.parse(p)
            console.log(parsed)

            for(i=updateStart;i<rows;i++){
                var r = t.appendChild(document.createElement("tr"));

                var d = r.appendChild(document.createElement("td"));
                d.innerHTML=`<a href="${parsed.data[i].exchangeUrl}">${parsed.data[i]["name"]}</a>`
                // d.appendChild(document.createTextNode(parsed.data[i]["name"]));

                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(parsed.data[i]["tradingPairs"]));

                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(formatImpact(parsed.data[i]["volumeUsd"])));

                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(formatPrecentage(parsed.data[i]["percentTotalVolume"])));
                d.classList.add("d-none", "d-sm-table-cell");

                var d = r.appendChild(document.createElement("td"));
                if(!parsed.data[i]["socket"])
                    d.innerHTML=`<img src="../images/icons8-red-circle-48.png"></img>`
                else
                    d.innerHTML=`<img src="../images/icons8-green-circle-48.png">`
            }
        })
    }).catch((e)=>console.log(e))
}


let viewMore = function(){
    // console.log("btn")
    if(rows<=100){
        rows += 10;
        ExchangeTable(t.children.length);
    }
    
    if(rows===100){
        document.getElementById("viewMore").toggleAttribute("disabled");
    }
}
