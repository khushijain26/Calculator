document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.querySelector('.input');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    
    function updateDisplay(value) {
        inputField.textContent = value;
    }
    
    function handleNumberInput(value) {
        if (currentInput.includes('.') && value === '.') return;
        currentInput += value;
        updateDisplay(currentInput);
    }
    
    function handleOperatorInput(value) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    }
    

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'X':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        
        currentInput = result;
        operator = '';
        previousInput = '';
        updateDisplay(result);
    }
    
    function handleSpecialInput(id) {
        switch (id) {
            case 'ac':
                currentInput = '';
                operator = '';
                previousInput = '';
                updateDisplay('0');
                break;
            case 'posneg':
                currentInput = (currentInput.charAt(0) === '-') ? currentInput.slice(1) : `-${currentInput}`;
                updateDisplay(currentInput);
                break;
            case 'percentage':
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay(currentInput);
                break;
        }
    }
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const buttonId = button.id;
            if (button.classList.contains('number') || button.classList.contains('decimal')) {
                handleNumberInput(button.textContent.trim());
            } else if (button.classList.contains('operator') && buttonId !== 'equalsto') {
                handleOperatorInput(button.textContent.trim());
            } else if (buttonId === 'equalsto') {
                calculate();
            } else if (button.classList.contains('special')) {
                handleSpecialInput(buttonId);
            }
        });
    });
});
