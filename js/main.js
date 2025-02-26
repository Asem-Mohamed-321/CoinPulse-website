onload =()=>{
    var t = document.getElementsByTagName("tbody")[0];

    function formatCurrency(fetchedString){
        return parseFloat(fetchedString).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    function formatImpact(fetchedString){
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            compactDisplay: 'short',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(parseFloat(fetchedString));
    }
    
    function formatPrecentage(fetchedString){
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(parseFloat(fetchedString)/100);
    }

    let a = fetch("https://api.coincap.io/v2/assets");
    a.then((data) => {
        let j = data.text();
        j.then((p) => {
            let parsed = JSON.parse(p);
            for(let i=0;i<20;i++){
                // document.getElementsByTagName("p")[0].innerHTML= document.getElementsByTagName("p")[0].innerHTML +"<br>"+ parsed.data[k]["id"];
                var r = t.appendChild(document.createElement("tr"));
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(parsed.data[i]["rank"]));
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(parsed.data[i]["id"]));
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(formatCurrency(parsed.data[i]["priceUsd"])))
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(formatImpact(parsed.data[i]["marketCapUsd"])));
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(formatCurrency(parsed.data[i]["vwap24Hr"])));
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(formatImpact(parsed.data[i]["supply"])));
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(formatImpact(parsed.data[i]["volumeUsd24Hr"])));
                var d = r.appendChild(document.createElement("td"));
                d.appendChild(document.createTextNode(formatPrecentage(parsed.data[i]["changePercent24Hr"])));
            }
            // console.log(parsed[0])
        })
    }).catch((err) => console.log(err));
}