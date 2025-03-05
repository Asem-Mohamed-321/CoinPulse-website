let rows=20; //number of displayed rows
var t = document.getElementsByTagName("tbody")[0];

let updateTable = function(updateStart=0){    //takes the first row to be updated
    // for (let i=0;i<t.children.length;i++){
    //     t.children[0].remove();
    // }
    
    let a = fetch("https://api.coincap.io/v2/assets");
    a.then((data) => {
        let j = data.text();
        j.then((p) => {
            let parsed = JSON.parse(p);
            for(i=updateStart;i<rows;i++){
                // document.getElementsByTagName("p")[0].innerHTML= document.getElementsByTagName("p")[0].innerHTML +"<br>"+ parsed.data[k]["id"];
                var r = t.appendChild(document.createElement("tr"));
                r.addEventListener("click", expandCoin )
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(parsed.data[i]["rank"]));
                d.classList.add("d-none","d-md-table-cell");
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(parsed.data[i]["id"]));
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



function expandCoin(){

    


    var tr = document.createElement("tr");
    var td = document.createElement("td");

    td.colSpan = this.children.length; // Make the cell span the entire row
    td.style.backgroundColor = "rgb(255,255,240)";
    td.style.height = "100px";
    td.innerHTML=`<div id="chart" class="container mx-auto">
        <div class="row align-middle">
            <div class="offset-3 offset-md-0 col-1">
                <img src="../images/bitcoin-btc-logo.png" >
            </div>

            <div class="  col-8 col-md-3 d-md-inline d-inline ">
                <p class="h3">Bitcoin(BTC)</p>
                <p>17 February 2025</p>
            </div>
            

            <div class="offset-2 offset-md-0 col-4">
                <p class="h5">HIGH $97,183.78</p>
                <p class="h5">LOW $95,296.54</p>
            </div>

            <div class="col-4 ">
                <p class="h5">AVERAGE $96,271.68</p>
                <p class="h5">CHANGE -0.83%</p>
            </div>

            <!-- chart : -->
        </div>
        <div class="row">
            <!-- <img src="../images/test.PNG" class="img-fluid"> -->
            <canvas id="myChart" ></canvas>

        </div>
    </div>`
    tr.appendChild(td);
    this.insertAdjacentElement("afterend", tr);



    let yData = [];
    let xData = [];


    let a = fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=h2")
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
                    // x:{
                    //     reverse:true
                    // },
                    // y:{
                    //     reverse:true
                    // }
                }
            });

        })

    }).catch(err=>console.log(err))
}