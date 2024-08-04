let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        const btnText = e.target.innerHTML;

        if (btnText === '=') {
            try {
                let expression = string
                    .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)')
                    .replace(/\^/g, '**')
                    .replace(/log\(([^)]+)\)/g, 'Math.log10($1)')
                    .replace(/10\^/g, 'Math.pow(10, ')
                    .replace(/(\d+)!/g, (match, p1) => `factorial(${p1})`)
                    .replace(/\|([^|]+)\|/g, 'Math.abs($1)')
                    .replace(/π/g, 'Math.PI'); // Replace π with Math.PI

                if (expression.includes('Math.pow(10,')) {
                    expression += ')';
                }

                // Evaluating the expression
                let result = eval(expression);
                input.value = result;
                string = result.toString();
            } catch (error) {
                input.value = 'Error';
                string = '';
            }
        } 
        else if (btnText === 'AC') {
            string = "";
            input.value = string;
        } 
        else if (btnText === 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
        } 
        else if (btnText === '√') {
            string += 'sqrt(';
            input.value = string;
        } 
        else if (btnText === '^') {
            string += '^';
            input.value = string;
        } 
        else if (btnText === 'log') {
            string += 'log(';
            input.value = string;
        } 
        else if (btnText === '10^') {
            string += '10^';
            input.value = string;
        } 
        else if (btnText === 'x!') {
            string += '!';
            input.value = string;
        } 
        else if (btnText === 'abs') {
            string += '|';
            input.value = string;
        }
        else if (btnText === 'π') {
            string += 'π'; 
            input.value = string;
        }
        else if (btnText === 'sin' || btnText === 'cos' || btnText === 'tan' ||
            btnText === 'csc' || btnText === 'sec' || btnText === 'cot') {
            let radians = string.includes('deg') ? (parseFloat(string) * Math.PI / 180) : parseFloat(string);
            let result;
            switch (btnText) {
                case 'sin':
                    result = Math.sin(radians);
                    break;
                case 'cos':
                    result = Math.cos(radians);
                    break;
                case 'tan':
                    result = Math.tan(radians);
                    break;
                case 'csc':
                    result = 1 / Math.sin(radians);
                    break;
                case 'sec':
                    result = 1 / Math.cos(radians);
                    break;
                case 'cot':
                    result = 1 / Math.tan(radians);
                    break;
            }
            string = result.toString();
            input.value = string;
        }
        else {
            string += btnText;
            input.value = string;
        }
    });
});