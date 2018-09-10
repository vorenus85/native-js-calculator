(function () {
    Calculator = function(){
        this.display = document.getElementById('display');
        this.clearBtn = document.getElementById('clear');
        this.numberBtns = document.getElementsByClassName("numberBtn");
        this.operatorBtns = document.getElementsByClassName("operatorBtn");
        this.displayHistory = document.getElementById('displayHistory');
        this.equalBtn = document.getElementById('equals');
    };
    
    Calculator.prototype = {
        numberFn: function(){
            function numberToDisplay(elem) {
                let haveDot = (/\./g).test(this.display.innerHTML);
                
                console.log(elem);
                console.log(haveDot);
                
                if( elem == '.' && haveDot){
                    return false;
                }else {
                    let quantity = elem;
                    if(this.display.innerHTML == "Error"){
                        this.display.innerHTML = quantity;
                    }
                    else if(this.display.innerHTML === '0'){
                        this.display.innerHTML = quantity;
                    }else{
                        this.display.innerHTML += quantity;
                    }
                }
                
                
            }
            
            Array.from(this.numberBtns).forEach(function(element) {
                element.onclick = function(){
                    let number = element.innerHTML;
                    numberToDisplay(number);
                }
            });
            
        },
        operatorFn: function(){
            
            function calculationPartToHistory(elem){
                let haveEqualOperator = (/=/g).test(this.displayHistory.innerHTML);
                // if have equal char in displayHistory, start new calculation
                if( haveEqualOperator ){
                    this.displayHistory.innerHTML = this.display.innerHTML + elem;
                    this.display.innerHTML = 0;
                }
                // if display show zero replace last operator in historyDisplay
                else if(this.display.innerHTML === '0'){
                    this.displayHistory.innerHTML = this.displayHistory.innerHTML.replace(/.$/,elem);
                    this.display.innerHTML = 0;
                }else{
                    this.displayHistory.innerHTML += this.display.innerHTML + elem;
                    this.display.innerHTML = 0;
                }
                
            }
            
            Array.from(this.operatorBtns).forEach(function(element) {
                element.onclick = function(){
                    let operator = element.innerHTML;
                    calculationPartToHistory(operator);
                }
            });
        },
        equalFn: function(){
            
            function makeResult(){
                
                let haveEqualOperator = (/=/g).test(this.displayHistory.innerHTML);
                
                if( !haveEqualOperator ){
                    this.displayHistory.innerHTML += this.display.innerHTML;
                    let calcResult = eval(this.displayHistory.innerHTML);
                    
                    if(calcResult == 'Infinity'){
                        this.displayHistory.innerHTML = "";
                        this.display.innerHTML = "Error";
                    }else{
                        this.display.innerHTML = calcResult;
                        this.displayHistory.innerHTML += '=' + calcResult;
                    }
                }
            }
            
            this.equalBtn.onclick = function(){
                makeResult();
            }
        },
        clearFn: function(){
            function clearDisplay(){
                this.displayHistory.innerHTML = '';
                this.display.innerHTML = "0";
            }
            
            this.clearBtn.onclick = function(){
                clearDisplay();
            }
            
        },
        init: function(){
            this.numberFn();
            this.clearFn();
            this.operatorFn();
            this.equalFn();
        }
    }
})();