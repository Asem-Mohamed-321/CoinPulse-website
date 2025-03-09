let rows=20; //number of displayed rows
let t = document.getElementsByTagName("tbody")[0];
let coinExpanded = false ;
let coinsdata;
let logosJson;

let updateTable = function(updateStart=0){    //takes the first row to be updated
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

                    for(i=updateStart;i<rows;i++){
                        // document.getElementsByTagName("p")[0].innerHTML= document.getElementsByTagName("p")[0].innerHTML +"<br>"+ parsed.data[k]["id"];
                        var r = t.appendChild(document.createElement("tr"));
                        r.addEventListener("click", expandCoin )
                        var d = r.appendChild(document.createElement("td"));
                        d.appendChild(document.createTextNode(parsed.data[i]["rank"]));
                        d.classList.add("d-none","d-md-table-cell");
                        var d = r.appendChild(document.createElement("td"));
                        // d.appendChild(document.createTextNode(`<a>${parsed.data[i]["id"]}</a>`));
                        // console.log(`../pages/coinProfile.html?coin=${parsed.data[i]["id"]}`.onerror)
                        d.innerHTML=`
                        <img src="${logosJson[parsed.data[i].symbol]}" onerror="this.src='../images/logos/symbol/not-found.png'">
                        <a href="../pages/coinProfile.html?coin=${parsed.data[i]["id"]}">${parsed.data[i]["id"]}</a>`
                        
                        
                        var d = r.appendChild(document.createElement("td"));
                        d.appendChild(document.createTextNode(formatCurrency(parsed.data[i]["priceUsd"])))
                        var d = r.appendChild(document.createElement("td"));
                        d.appendChild(document.createTextNode(formatImpact(parsed.data[i]["marketCapUsd"])));
                        d.classList.add("d-none","d-md-table-cell");
                        var d = r.appendChild(document.createElement("td"));
                        d.appendChild(document.createTextNode(formatCurrency(parsed.data[i]["vwap24Hr"])));
                        d.classList.add("d-none","d-md-table-cell");
                        var d = r.appendChild(document.createElement("td"));
                        d.appendChild(document.createTextNode(formatImpact(parsed.data[i]["supply"])));
                        d.classList.add("d-none","d-md-table-cell");
                        var d = r.appendChild(document.createElement("td"));
                        d.appendChild(document.createTextNode(formatImpact(parsed.data[i]["volumeUsd24Hr"])));
                        d.classList.add("d-none","d-md-table-cell");
                        var d = r.appendChild(document.createElement("td"));
                        d.appendChild(document.createTextNode(formatPrecentage(parsed.data[i]["changePercent24Hr"])));
                    }
                    // console.log(parsed[0])

            })
            })
            // console.log(logosJson)
            
        })
    }).catch((err) => console.log(err));
}

onload =()=>{
    updateTable();
}


let viewMore = function(){
    console.log("btn")
    if(rows===20){
        document.getElementById("viewLess").toggleAttribute("disabled");
    }
    if(rows<=100){
        rows += 20;
        updateTable(t.children.length);
    }
    else{
        document.getElementById("viewMore").value="View less"
    }
    if(rows===100){
        document.getElementById("viewMore").toggleAttribute("disabled");
    }
}

let viewLess = function(){
    console.log(t.children.length)
    if(rows===100){
        document.getElementById("viewMore").toggleAttribute("disabled");
    }
    for(let i=0;i<20;i++){
        t.lastElementChild.remove()
    }
    rows-=20;
    if(rows===20){
        document.getElementById("viewLess").toggleAttribute("disabled");
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


// saved data of the open coin info .. because it will be used to check to close the current info
//name symbol and logo
let coinId;
let coinName ;
let coinSymbol ;
//let coinlogo ;                                       ///////////////////////////////////


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
        
        for (let i =0 ; i<rows ; i++){
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



function displayChart(url){

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
} 
