console.log("hello wor");
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
async function showWeater(){
    // let latitude=15.3333;
    // let longitude=74.3333;
    try{
        let city='kanpur';
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data=await response.json();
        console.log(data);
        let newpara=document.createElement('p');
        newpara.textContent=`${data?.main?.temp.toFixed(2)} C`;
        document.body.appendChild(newpara);    
    }
    catch(err){

    }
}