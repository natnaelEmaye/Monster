// ==========================================  class =======
class Calculator{
    constructor(previousOperandText,currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        // ======================================  SelectElement=====
        const numberButton = document.querySelectorAll('[data-number]');
        const operationButton = document.querySelectorAll('[data-operator]');
        // single Button
        const allClearButton = document.querySelector("[data-all-clear]");
        const deleteButton = document.querySelector("[data-delete]");
        const equalButton = document.querySelector('[data-equal]');
        // initial
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
        
        //<<delete>>
        this.delete= function(){
            this.currentOperand = this.currentOperand.toString().slice(0,this.currentOperand.length-1);
        }

        //<<Append>>
        this.appendNumber = function(number){
            if(number=="." && this.currentOperandText.innerHTML.includes(".")) return;
            this.currentOperand += number.toString();
        }

        //<<Operation>>
        this.chooseOperation = function(operation){
            if(this.currentOperand == "") return;
            if(this.previousOperand !=='') this.compute();
            this.operation = operation;
            this.previousOperand = this.currentOperand + " " + this.operation;
            this.currentOperand = "";
        }

        //<<compute>>
        this.compute = function(){
            let computation;
            const previous = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if(isNaN(previous) || isNaN(current)) return;
            switch(this.operation){
                case "+":
                    computation =previous+current;
                    break;
                case "-":
                    computation =previous-current;
                    break;
                case "/":
                    computation =previous/current;
                    break;
                case "*":
                    computation =previous*current;
                    break;
                   default:
                       return; 
            }
            this.currentOperand = computation;
            this.previousOperand = "";
            // this.operation = undefined;
        }
        this.getDisplay = function(number){
            const stringNumber = number.toString();
            const integerNumber = stringNumber.split('.')[0]
            const decimalDigit = stringNumber.split('.')[1];
            let integerDisplay;
            if(isNaN(integerNumber)) {
                integerDisplay = '';
            } else{
                integerDisplay = integerNumber.toLocaleString("en",{maximumFractionDigits:0})
            }
            if(decimalDigit !=null){
                return `${integerNumber}.${decimalDigit}`
            }else{
                return integerDisplay;
            }
        }
        //<<Update>>
        this.updateDisplay = function(){
            this.currentOperandText.innerHTML =this.getDisplay(this.currentOperand);
            this.previousOperandText.innerHTML = this.previousOperand;
        }

        //<<number>> 
        numberButton.forEach(btn=>{
            btn.addEventListener('click',()=>{
                this.appendNumber(btn.textContent);
                this.updateDisplay();
            })
        })

        //<<operation>>
        operationButton.forEach((operation)=>{
            operation.addEventListener('click',()=>{
                this.chooseOperation(operation.textContent);
                this.updateDisplay();
            })
        })

        //<<equal>>
        equalButton.addEventListener('click',()=>{
            this.compute();
            this.updateDisplay();
        })

        // <<clear>>
        allClearButton.addEventListener('click',()=>{
            this.currentOperand = "";
            this.previousOperand = "";
            this.updateDisplay();
        })

        // <<Delete>>
        deleteButton.addEventListener('click',()=>{
            this.delete();
            this.updateDisplay();
        })
    }
}


// =========================================================
const previousOperandText = document.querySelector(".previous-operand");
const currentOperandText = document.querySelector(".current-operand");
const calculator = new Calculator(previousOperandText,currentOperandText);
