function add(num1, num2) {
    return num1 + num2; 
}

function subtract(num1, num2) {
    return num1 - num2; 
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function operate (num1,operator, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
            break;

        case "-":
            return subtract(num1, num2);
            break;

        case "*": 
            return multiply(num1, num2);
            break;

        case "/":
            return divide(num1, num2);
            break;
     }
}

function numPress (num1) {
    return num1;
}

const numButtonRef = document.querySelectorAll(".button-num");
const displayRef = document.querySelector(".calculator-display-num");
let displayVal = '';

numButtonRef.forEach(function(element){
    element.addEventListener('click', ()=> {
        displayVal = displayVal + element.innerHTML;
        displayRef.textContent = displayVal;
    })
});
    
const eqButtonRef = document.querySelector(".button-equals");
eqButtonRef.addEventListener('click', () => {
   let displayValArray = displayVal.split(" ");

//Checking for operation order 

while (displayValArray.includes("*")) {
    indexForSubCalc = displayValArray.indexOf("*") - 1;
    SubCalcArr = displayValArray.slice(indexForSubCalc, indexForSubCalc + 3);
    SubCalcResult = operate (SubCalcArr[0], SubCalcArr[1], SubCalcArr[2]);
    displayValArray.splice(indexForSubCalc, 3, SubCalcResult);
    console.log("Hi");
   
    if (displayValArray.length === 1) {
        displayValsum = displayValArray[0];
    }
}

while (displayValArray.includes("/")) {
    indexForSubCalc = displayValArray.indexOf("/") - 1;
    SubCalcArr = displayValArray.slice(indexForSubCalc, indexForSubCalc + 3);
    SubCalcResult = operate (SubCalcArr[0], SubCalcArr[1], SubCalcArr[2]);
    displayValArray.splice(indexForSubCalc, 3, SubCalcResult);

    if (displayValArray.length === 1) {
        displayValsum = displayValArray[0];
    }

}

//Reading style calculation
    while(displayValArray[1]) {
        displayValsum = operate(parseFloat(displayValArray[0]),displayValArray[1], parseFloat(displayValArray[2]));
        displayValArray.splice(0,3);
        displayValArray.unshift(displayValsum);
        
        
    }
    displayVal = displayValsum;
    displayValsum = '';
   displayRef.textContent = displayVal, + " ";
});

const clearButtonRef = document.querySelector(".button-clear");
clearButtonRef.addEventListener('click', () => {
    displayVal = '';
    displayRef.textContent = displayVal;
})

const clearButtonDel = document.querySelector(".button-del");
clearButtonDel.addEventListener('click', () => {
    displayVal = displayVal.substring(0, displayVal.length-1);
    displayRef.textContent = displayVal;
});

const dotButtonRef = document.querySelector(".button-dot");
dotButtonRef.addEventListener('click', () => {

    for (i=displayVal.length; i >= 0; i--) {
        if (displayVal[i] === ' ') {
            let okWithDot = true;
            break;
        }
        else if (displayVal[i] === '.') {
          let okWithDot = false;
          break;
        }

    }
    
    if (displayVal.slice(-1) !== ".") {
        displayVal = displayVal + dotButtonRef.innerHTML;
        displayRef.textContent = displayVal;

    }
});
