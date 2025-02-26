let a = fetch("https://api.coincap.io/v2/assets");
a.then((data) => {
    // console.log(data)
    let j = data.text();
    // console.log(j)         j is a promise
    j.then((p) => {
        let parsed = JSON.parse(p);
        // console.log(parsed.data[0]["id"])
        console.log(parsed.data)
        let sum=0;
        for(k in parsed.data){
            // console.log(k)
            // console.log(parsed.data[k])
            sum+=parseFloat(parsed.data[k]["marketCapUsd"])
            console.log( new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                compactDisplay: 'short',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(sum));
            
            // document.getElementsByTagName("p")[0].innerHTML= document.getElementsByTagName("p")[0].innerHTML +"<br>"+ parsed.data[k]["id"];
        }
        console.log(sum)
        // console.log(parsed[0])
    })
}).catch((err) => console.log(err));

