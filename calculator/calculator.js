// DOM
const calculator_input = document.querySelector('.buttons');
const text_display = document.getElementById('text_display');
// const auto_result_display = document.getElementById('auto_result_display');

// logic is to save first number and operator when + or - or / or * is clicked
// once = is pressed, save the second number and perform operation base on operator
// continuous operation is allowed since the displayed output is same as the result of the previous operation

let output = ""; // what is displayed in the screen
let first_number = "";
let second_number = "";
let operator = "";

// event delegation
calculator_input.onclick = (event) => {
    const input = event.target.textContent; // check the textContent of the clicked button
    switch(true) {
        case event.target.classList.contains('button_number'):
            output += input;
            display_output();
        case event.target.classList.contains('button_function'):
            switch(input) {
                case "AC":
                    clear_input();
                    reset(); // ensures that the first_number is not saved if ever AC is used after clicking an operator
                    break;
                case "+/-":
                    change_sign();
                    break;
                case "%":
                    convert_to_percent();
                    break;
            }
        case event.target.classList.contains('button_operator'):
            switch(input) {
                case "+":
                    if (first_number === "") {
                        first_number += output;
                        operator += "+";
                        // console.log(`1st: ${first_number}`);
                        // console.log(`operator: ${operator}`);
                    }
                    clear_input(); // clears what is typed by the user as it is now transferred to the first_number
                    break;
                case "-":
                    if (first_number === "") {
                        first_number += output;
                        operator += "-";
                        // console.log(`1st: ${first_number}`);
                        // console.log(`operator: ${operator}`);
                    }
                    clear_input();
                    break;
                case "÷":
                    if (first_number === "") {
                        first_number += output;
                        operator += "/";
                        // console.log(`1st: ${first_number}`);
                        // console.log(`operator: ${operator}`);
                    }
                    clear_input();
                    break;
                case "×":
                    if (first_number === "") {
                        first_number += output;
                        operator += "*";
                        // console.log(`1st: ${first_number}`);
                        // console.log(`operator: ${operator}`);
                    }
                    clear_input();
                    break;
                case "=":
                    if (second_number === "" && operator !== "") {
                        second_number += output;
                        clear_input(); // ensures no conflict if another operation is used
                        // console.log(`2nd: ${second_number}`);
                        switch(operator) {
                            case "+":
                                output += (Number(first_number)+Number(second_number));
                                break;
                            case "-":
                                output += (Number(first_number)-Number(second_number));
                                break;
                            case "/":
                                output += (Number(first_number)/Number(second_number));
                                break;
                            case "*":
                                output += (Number(first_number)*Number(second_number));
                                break;
                        }
                        display_output(); // this allows for continuous operation
                        reset(); // after an operation is done, reset
                        break;
                    } else {
                        output += first_number; // ensures that when user has number typed, when he clicks =, it only displays that and not empty string
                    }
            }
    }
};

const max_decimal = 5; // later feature (settings)
function display_output() {
    if (output === "") {
        text_display.textContent = "0"; // Display 0 if output is empty
    } else {
        convert_to_decimal();
    }
}

function convert_to_decimal() {
    const parsedOutput = parseFloat(output); // Parse output as float
    if (!isNaN(parsedOutput)) {
        // Check if the number has more than 2 decimal places
        const decimalCount = (output.split('.')[1] || '').length;
        if (decimalCount > max_decimal) {
            // If the number has more than 2 decimal places, round it to 2 decimal places
            text_display.textContent = parsedOutput.toFixed(max_decimal);
        } else {
            // If the number has 2 or fewer decimal places, display it as is
            text_display.textContent = parsedOutput.toString();
        }
    } else {
        text_display.textContent = "0."; // Display decimal when it is clicked first
    }
}

function clear_input() {
    output = "";
    display_output();
}

function change_sign() {
    if (output !== "") {
        // Parse output as float
        const parsedOutput = parseFloat(output);
        // Check if the output is already negative
        if (output.charAt(0) === '-') {
            // If it's negative, remove the negative sign
            output = output.slice(1);
        } else {
            // If it's positive, add a negative sign
            output = '-' + output;
        }
        display_output();
    }
}

function convert_to_percent() {
    if (output !== "") {
        // Parse output as float
        const parsedOutput = parseFloat(output);
        // Convert to percent by multiplying by 100
        output = (parsedOutput / 100).toString();
        display_output();
    }
}

function reset() {
    first_number = "";
    second_number = "";
    operator = "";
}