const resultEl = document.querySelector('#passwordInput input[type="text"]');
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const carsEl = document.getElementById('cars')
const dpassEl = document.getElementById('dpass')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')
let passwordStrength= document.getElementById('passwordStrength');
let poor = document.querySelector('#passwordStrength #poor');
let weak = document.querySelector('#passwordStrength #weak');
let strong = document.querySelector('#passwordStrength #strong');
let passwordInfo = document.getElementById('passwordInfo');

let poorRegExp = /[a-z]/;
let PPOORRegExp = /(?=.*?[A-Z])/;
let weakRegExp = /(?=.*?[0-9])/;
let strongRegExp = /(?=.*?[#{}?!@$%^&*-])/;
let whitespaceRegExp = /^$|\s+/;

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
    car: getRandomCar,
    dpas: getRandomDesignPass,
    carn: getRandomCarNmb
}

clipboardEl.addEventListener('click', () => {
    const password = resultEl.value;
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked
    const hasCar = carsEl.checked
    const hasDpass = dpassEl.checked

    if(hasDpass)
    {
        resultEl.value = getRandomDesignPass()
    }
    else if(hasCar && hasSymbol && hasNumber){
        resultEl.value = getRandomCarNmb()
    }
    else{
    resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, hasCar, length)
    }    
})

function generatePassword(lower, upper, number, symbol, car, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol + car
    const typesArr = [{lower}, {upper}, {number}, {symbol}, {car}].filter(item => Object.values(item)[0])

    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function getRandomCar() {
    const carBrands = ["Ford", "Toyota", "Honda", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Ferrari", "Lamborghini", "Porsche"];
    const carModels = ["Mustang", "Camry", "Civic", "Corvette", "3-Series", "S-Class", "A4", "458-Italia", "Aventador", "911"];
    const randomBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
    const randomModel = carModels[Math.floor(Math.random() * carModels.length)];
    return `${randomBrand}${randomModel}`
}

function getRandomCarNmb(){
    const carBrands = ["Ford", "Toyota", "Honda", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Ferrari", "Lamborghini", "Porsche"];
    const carModels = ["Mustang", "Camry", "Civic", "Corvette", "3-Series", "S-Class", "A4", "458-Italia", "Aventador", "911"];
    const symbols = '!@#$%^&*(){}<>'
    const randomBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
    const randomModel = carModels[Math.floor(Math.random() * carModels.length)];
    const lenBrd = randomBrand.length;
    const lenMod = randomModel.length;
    const randomsymbol = symbols[Math.floor(Math.random() * symbols.length)];
    var randomnum = '';
    for(let i=1; i < (lengthEl.value-(lenBrd+lenMod)); i++ ){
        randomnum = randomnum + String.fromCharCode(Math.floor(Math.random() * 10) + 48)
    }
    
    return `${randomBrand}${randomsymbol}${randomModel}${randomnum}`
}

function getRandomDesignPass() {
    const Dpass = ["B3stPassw0rdEva!", "MyD0g$N@m31sCh@rli3", "P@ssw0rd123", "IL0v3C@ts&dogs", "Tr0ub4dor&3", "B1gM@c&Ch33s3", "4llF0r0n3&0n3F0r4ll!", "R@inbowC0l0rs!", "P@ssw0rd&Secur1ty", "3xTr@Str0ngP@ssword", "#1M3etMy@ccount!", "Fr33D0m&L1b3rty", "B3$tP@$$w0rdEva!", "$uper$ecur3P@$$", "D0ntF0rgetTh3P@$$", "Th3M@st3r0fP@ssw0rds", "1L0v3P@ssw0rds!", "C0ffee!sL0veD", "4bund@nceOfL0ve", "5@lad&Dre$$ing","B3@ch3s!nMa!n3", "H4ppyB!rthday#", "F!sHing@ndCh!ps" ];
    
    return Dpass[Math.floor(Math.random() * Dpass.length)]
}
generateEl.onclick= function(){

     let passwordValue= resultEl.value;
     let passwordLength= passwordValue.length;

     let poorPassword= passwordValue.match(poorRegExp);
     let PPOORPassword= passwordValue.match(PPOORRegExp);
     let weakPassword= passwordValue.match(weakRegExp);
     let strongPassword= passwordValue.match(strongRegExp);
     let whitespace= passwordValue.match(whitespaceRegExp);

if(passwordValue != ""){

 passwordStrength.style.display = "block";
 passwordStrength.style.display = "flex";
 passwordInfo.style.display = "block";
 passwordInfo.style.color = "black";

 if(whitespace)
 {
  passwordInfo.textContent = "whitespaces are not allowed";
 }else{
 poorPasswordStrength(passwordLength, poorPassword, PPOORPassword, weakPassword, strongPassword);
 weakPasswordStrength(passwordLength, poorPassword, PPOORPassword, weakPassword, strongPassword);
 strongPasswordStrength(passwordLength, poorPassword, PPOORPassword, weakPassword, strongPassword);
}

 
}else{
 
 passwordStrength.style.display = "none";
 passwordInfo.style.display = "none";

}
}

resultEl.oninput= function(){

    let passwordValue= resultEl.value;
    let passwordLength= passwordValue.length;

    let poorPassword= passwordValue.match(poorRegExp);
    let PPOORPassword= passwordValue.match(PPOORRegExp);
    let weakPassword= passwordValue.match(weakRegExp);
    let strongPassword= passwordValue.match(strongRegExp);
    let whitespace= passwordValue.match(whitespaceRegExp);

if(passwordValue != ""){

passwordStrength.style.display = "block";
passwordStrength.style.display = "flex";
passwordInfo.style.display = "block";
passwordInfo.style.color = "black";

if(whitespace)
{
 passwordInfo.textContent = "whitespaces are not allowed";
}else{
poorPasswordStrength(passwordLength, poorPassword, PPOORPassword, weakPassword, strongPassword);
weakPasswordStrength(passwordLength, poorPassword, PPOORPassword, weakPassword, strongPassword);
strongPasswordStrength(passwordLength, poorPassword, PPOORPassword, weakPassword, strongPassword);
}


}else{

passwordStrength.style.display = "none";
passwordInfo.style.display = "none";

}
}
function poorPasswordStrength(passwordLength, poorPassword, PPOORPassword, weakPassword, strongPassword){

  if(passwordLength <= 3 && (poorPassword || PPOORPassword || weakPassword || strongPassword))
    {
   poor.classList.add("active");
   passwordInfo.style.display = "block";
   passwordInfo.style.color = "red";
   passwordInfo.textContent = "Your password is too Poor";
      
    }
}

function weakPasswordStrength(passwordLength, poorPassword, PPOORPassword, weakPassword, strongPassword){
if(passwordLength>= 4 && (poorPassword || PPOORPassword) && (weakPassword || strongPassword))
{
 weak.classList.add("active");
 passwordInfo.textContent = "Your password is Weak";
 passwordInfo.style.color = "orange";

}else{
 weak.classList.remove("active");
 
}
}

function strongPasswordStrength(passwordLength, poorPassword, PPOORPassword, weakPassword, strongPassword){

if(passwordLength >= 6 && ((poorPassword || PPOORPassword) && weakPassword) && strongPassword)
{
 poor.classList.add("active");
 weak.classList.add("active");
 strong.classList.add("active");
 passwordInfo.textContent = "Your password is strong";
 passwordInfo.style.color = "green";
}else{
 strong.classList.remove("active");
 
}
}