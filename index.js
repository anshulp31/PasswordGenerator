const inputslider=document.querySelector("[dataLengthSlider]");
const lengthDisplay=document.querySelector("[dataLengthNumber]");
const passwordDisplay=document.querySelector("[dataPasswordDisplay]");
const dataIndicator=document.querySelector("[dataIndicator]");
const upperCaseChecked=document.querySelector("#uppercase");
const lowerCaseChecked=document.querySelector("#lowercase"); 
const numChecked=document.querySelector("#numbers"); 
const symbolChecked=document.querySelector("#symbols"); 
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const generateBtn=document.querySelector(".generateButton");

let str="!@#$%^&*()_+={}[]|';,.<>?/";

let passLength=10;
let password="";
let checkCount=0;

function handleSlider(){
    inputslider.value=passLength;
    lengthDisplay.textContent=passLength;
}
handleSlider();

function indicatorColor(color){
      dataIndicator.style.backGroundColor=color;
}


function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getRandomNumber(){
    return getRandomInteger(0,9);
}

function getRandomLowerCaseLetter(){
    return String.fromCharCode(getRandomInteger(97,122));
}

function getRandomUpperCaseLetter(){
    return String.fromCharCode(getRandomInteger(65,90));
}

function getRandomSymbols(){
    return str.charAt(getRandomInteger(0,str.length));
}


// function calcStrength(){

//     let hasUpper=false;
//     let hasLower=false;
//     let hasNum=false;
//     let hasSymbol=false;

//     if(upperCaseChecked.checked)hasUpper=true;
//     if(lowerCaseChecked.checked)hasLower=true;
//     if(numChecked.checked)hasNum=true;
//     if(symbolChecked.checked)hasSymbol=true;

//     if(hasUpper && hasLower &&(hasNum || hasSymbol) && passLength>=8){
//         indicatorColor("#0f0");
//     }
//     else if((hasLower || hasUpper) && (hasNum || hasSymbol)&& passLength>=6){
//         indicatorColor("#ff0")
//     }
//     else{
//         indicatorColor("#f00")
//     }

// }


inputslider.addEventListener('input',(e)=>{
    passLength=e.target.value;
    console.log("moving input slider ");
    handleSlider();
});


function handleCheckBoxChange(){
    checkCount=0;
    
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;  
        }
    });
    console.log(checkCount);
    if(passLength < checkCount){
        passLength=checkCount;
       handleSlider();
    }
    
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
    
});


function shufflePassword(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random())*(i+1);
        const tmp=array[i];
        array[i]=array[j];
        array[j]=tmp;
    }
    let st="";
    array.forEach((el)=>(st+=el));
    return st;
}


generateBtn.addEventListener('click',()=>{
        if(checkCount<=0){
            return;
        }
        if(passLength<checkCount){
            passLength=checkCount;
            handleSlider();
        }
  
        //New Password
        console.log("start jtnry")
        password="";
        let arr=[];

        //compalsory addition

        if(upperCaseChecked.checked){
            arr.push(getRandomUpperCaseLetter);
        }
        if(lowerCaseChecked.checked){
            arr.push(getRandomLowerCaseLetter);
        }
        if(numChecked.checked){
            arr.push(getRandomNumber);
        }
        if(symbolChecked.checked){
            arr.push(getRandomSymbols);
        }

        console.log("compalsary add dn");

        for(let i=0;i<arr.length;i++){
            password+=arr[i]();
        }

        //remaining char

        for(let i=0;i<passLength-arr.length;i++){
            let randomIndex=getRandomInteger(0,arr.length);
            password+=arr[randomIndex]();
        }

        console.log("rem chr dn");

        console.log("password="+password);
        //shuffle the character of password

        password=shufflePassword(Array.from(password));
        console.log("password="+password);
        passwordDisplay.value=password;

 //       calcStrength();
});