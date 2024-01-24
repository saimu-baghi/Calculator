const numBtn = document.querySelectorAll('[data-num]');
const opBtn = document.querySelectorAll('[data-op]');
const equalBtn = document.querySelector('[data-equal]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const prevOpTxtEm = document.querySelector('[data-prev-op]');
const currOpTxtEm = document.querySelector('[data-curr-op]');

window.onload = function () {
    const calculatorGrid = document.querySelector('.calculator-grid');
    const mobileMessage = document.createElement('p');
    mobileMessage.innerText = 'If you see this, please turn on Desktop Site';
    mobileMessage.style.textAlign = 'center';
    mobileMessage.style.fontSize = '24px';

    const handleResize = () => {
        const tabletWidthThreshold = 768;
        const isMobile = window.innerWidth < tabletWidthThreshold;

        if (isMobile) {
            calculatorGrid.style.display = 'none';
            document.body.appendChild(mobileMessage);
        } else {
            calculatorGrid.style.display = 'grid';
            if (document.body.contains(mobileMessage)) {
                document.body.removeChild(mobileMessage);
            }
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
};

class Calculator {
    constructor(prevOpTxtEm, currOpTxtEm) {
        this.prevOpTxtEm = prevOpTxtEm;
        this.currOpTxtEm = currOpTxtEm;
        this.clear();
    }

    clear() {
        this.currOp = '';
        this.prevOp = '';
        this.operation = undefined;
    }

    delete() {
        this.currOp = this.currOp.toString().slice(0, -1);
    }

    appendNum(number) {
        if (number === '.' && this.currOp.includes('.')) return;
        this.currOp = this.currOp.toString() + number.toString();
    }

    chooseOp(operation) {
        if (this.currOp === '') return;
        if (this.currOp !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOp = this.currOp;
        this.currOp = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevOp);
        const curr = parseFloat(this.currOp);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '−':
                computation = prev - curr;
                break;
            case '×':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currOp = computation;
        this.operation = undefined;
        this.prevOp = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const [integerDigits, decimalDigits] = stringNumber.split('.');

        let integerDisplay = integerDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currOpTxtEm.innerText =
            this.getDisplayNumber(this.currOp);
        if (this.operation != null) {
            this.prevOpTxtEm.innerText =
                `${this.getDisplayNumber(this.prevOp)} ${this.operation}`;
        }
        else {
            this.prevOpTxtEm.innerText = '';
        }
    }
}

// const calculator = new Calculator(prevOpTxtEm, currOpTxtEm);

numBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})

opBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

const squareBtn = document.querySelector('[data-square]');
const powerOfYBtn = document.querySelector('[data-power-of-y]');
const logBtn = document.querySelector('[data-log]');
const lnBtn = document.querySelector('[data-ln]');
const factorialBtn = document.querySelector('[data-factorial]');
const piBtn = document.querySelector('[data-pi]');
const eBtn = document.querySelector('[data-e]');
const sinBtn = document.querySelector('[data-sin]');
const cosBtn = document.querySelector('[data-cos]');
const tanBtn = document.querySelector('[data-tan]');
const hypBtn = document.querySelector('[data-hyp]');

class ScientificCalculator extends Calculator {
    constructor(prevOpTxtEm, currOpTxtEm) {
        super(prevOpTxtEm, currOpTxtEm);
        this.pendingParentheses = 0;
    }

    square() {
        const operand = parseFloat(this.currOp);
        if (isNaN(operand)) return;
        this.currOp = Math.pow(operand, 2);
    }

    powerOfY() {
        const base = parseFloat(this.prevOp);
        const exponent = parseFloat(this.currOp);
        if (isNaN(base) || isNaN(exponent)) return;
        this.currOp = Math.pow(base, exponent);
        this.operation = undefined;
        this.prevOp = '';
    }

    log() {
        const operand = parseFloat(this.currOp);
        if (isNaN(operand) || operand <= 0) return;
        this.currOp = Math.log10(operand);
    }

    ln() {
        const operand = parseFloat(this.currOp);
        if (isNaN(operand) || operand <= 0) return;
        this.currOp = Math.log(operand);
    }

    factorial() {
        const operand = parseFloat(this.currOp);
        if (isNaN(operand) || operand < 0) return;
        this.currOp = this.computeFactorial(operand);
    }

    computeFactorial(num) {
        if (num === 0 || num === 1) return 1;
        return num * this.computeFactorial(num - 1);
    }

    pi() {
        this.currOp = Math.PI;
    }

    e() {
        this.currOp = Math.E;
    }

    sin() {
        const operand = parseFloat(this.currOp);
        if (!isNaN(operand)) {
            this.currOp = Math.sin(operand * (Math.PI / 180)); // Convert degrees to radians
        }
    }

    cos() {
        const operand = parseFloat(this.currOp);
        if (!isNaN(operand)) {
            this.currOp = Math.cos(operand * (Math.PI / 180)); // Convert degrees to radians
        }
    }

    tan() {
        const operand = parseFloat(this.currOp);
        if (!isNaN(operand)) {
            this.currOp = Math.tan(operand * (Math.PI / 180)); // Convert degrees to radians
        }
    }

    // Hyperbolic Function (Placeholder)
    hyp() {
        const operand = parseFloat(this.currOp);
        if (!isNaN(operand)) {
            // Placeholder logic for hyperbolic function
            // You may replace this with the actual hyperbolic function logic
            this.currOp = Math.sinh(operand);
        }
    }

    

    
}

const calculator = new ScientificCalculator(prevOpTxtEm, currOpTxtEm);

squareBtn.addEventListener('click', () => {
    calculator.square();
    calculator.updateDisplay();
});

powerOfYBtn.addEventListener('click', () => {
    calculator.chooseOp('^');
    calculator.updateDisplay();
});

logBtn.addEventListener('click', () => {
    calculator.log();
    calculator.updateDisplay();
});

lnBtn.addEventListener('click', () => {
    calculator.ln();
    calculator.updateDisplay();
});

factorialBtn.addEventListener('click', () => {
    calculator.factorial();
    calculator.updateDisplay();
});

piBtn.addEventListener('click', () => {
    calculator.pi();
    calculator.updateDisplay();
});

eBtn.addEventListener('click', () => {
    calculator.e();
    calculator.updateDisplay();
});

sinBtn.addEventListener('click', () => {
    calculator.sin();
    calculator.updateDisplay();
});

cosBtn.addEventListener('click', () => {
    calculator.cos();
    calculator.updateDisplay();
});

tanBtn.addEventListener('click', () => {
    calculator.tan();
    calculator.updateDisplay();
});

hypBtn.addEventListener('click', () => {
    calculator.chooseOp('hyp'); // You can use a different symbol or logic for hyperbolic functions
    calculator.updateDisplay();
});