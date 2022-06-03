function update() {
    fetch("https://api.covid19india.org/data.json")
    .then((response) => response.json())
    .then((home) => {
        console.log(home.statewise);
      // home.statewise[10].for(element => {})
       let a = home.statewise[0].confirmed;
       let b = home.statewise[0].active;
       let c = home.statewise[0].recovered;
       let d = home.statewise[0].deaths;
       document.getElementById("condas").innerHTML=a
       document.getElementById("actdas").innerHTML=b
       document.getElementById("actrec").innerHTML=c
       document.getElementById("deadas").innerHTML=d
       let e = home.statewise[9].active;
       let f = home.statewise[10].active;
       let g = home.statewise[12].active;
      // let h = home.statewise[14].active;
       let i = home.statewise[16].active;
       let j = home.statewise[20].active;
       let k = home.statewise[21].active;
       let l = home.statewise[35].active;
       let m = home.statewise[37].active;
       document.getElementById("delhi").innerHTML=e
       document.getElementById("goa").innerHTML=f
       document.getElementById("haryana").innerHTML=g
       //document.getElementById("jandk").innerHTML=h
       document.getElementById("karnataka").innerHTML=i
       document.getElementById("mp").innerHTML=j
       document.getElementById("mumbai").innerHTML=k
       document.getElementById("up").innerHTML=l
       document.getElementById("bengal").innerHTML=m

    })
}

update();
setInterval(update,400000);