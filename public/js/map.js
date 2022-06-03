let color_india;
let arr =[];
let i=0;
let j=1;
let cases;
function update_world_map() {
    fetch("https://corona-api.com/countries")
        .then((response) => response.json())
        .then((number) => {
            number.data.forEach(element => {
                cases = element.latest_data.confirmed;
                if (cases > 200) {
                    color = "rgb(255,0,0)";
                    // console.log("a");
                }

                else {
                    color = `rgb(0,200,200)`;
                    // console.log(cases);
                }
                
            })
        })
    //console.log(arr);

    fetch("https://corona-api.com/countries")
        .then((response1) => response1.json()
        )
        .then((rsp) => {
            rsp.data.forEach(element => {
                // console.log(element.coordinates.latitude);
                let lat = element.coordinates.latitude;
                let lon = element.coordinates.longitude;

                new mapboxgl.Marker({
                    color: `rgb(150,0,0)`
                })
                    .setLngLat([lon, lat])
                    .addTo(map);

            });
        })
}

update_world_map();
setInterval(update_world_map, 30000);


async function update_map_india() {
    await fetch("https://api.covid19india.org/data.json")
         .then((response) => response.json())
         .then((number) => {
             //console.log(number.statewise);
             number.statewise.forEach(element => {
                 arr[i] = element.active;
                 i++;
             })
         })
     //console.log(arr);
 
     await fetch("map.json")
         .then((response1) => response1.json()
         )
         .then((rsp) => {
             //console.log(rsp);
             rsp.data.forEach(element => {
                 let lat = element.lat;
                 let lon = element.lon;
 
                 //console.log(lat);
                 //console.log("a");
 
                 cases = arr[j];
                 if(cases>100000){
                    color_india = "rgb(255,-8,0)" ;
                    // 8 no of state and terrotories having this data
                  }
                  else if(cases<100000 && cases>50000){
                      color_india = "rgb(200,20,20)" ;
                      //10 no of state and terrotories having this data
                  }
                  else if(cases<50000 && cases>10000){
                      color_india = "rgb(175,40,40)" ;
                      //6 no of state and terrotories having this data
                  }
                //   else if(cases<25000 && cases>20000){
                //       color_india = "rgb(223,142,11)" ;
                //       //1 no of state and terrotories having this data
                //     }
                //     else if(cases<20000 && cases>10000){
                //         color_india = "rgb(180,80,48)" ;
                //         //1 no of state and terrotories having this data
                //     }
                  else{
                    color_india = `rgb(180,80,20)`;
                    //13 no of state and terrotories having this data
                  }
   
 
                 //console.log(cases);
                //  color_india = (cases / 300500) * 250;
                //  console.log(color_india);
                 new mapboxgl.Marker({
                     color: color_india
                 })
                     .setLngLat([lon, lat])
                     .addTo(map);
                 //console.log("b");
                 j++
             });
         })
 }
 
 update_map_india();
 setInterval(update_map_india,30000);