const resultEl = document.querySelector('#passwordInput input[type="text"]');
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
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
    symbol: getRandomSymbol
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

    resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

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
