// DOM
const calculator_input = document.querySelector('.buttons');
const text_display = document.getElementById('text_display');

// 
let output = "";
let temp_operand = "";
let temp_operator = "";

calculator_input.onclick = (event) => {
    const input = event.target.textContent;
    if (event.target.classList.contains('button_number')) {
        output += input;
        console.log(`converted to no: ${Number(output)}`);
        display_output();
    }

    else if (event.target.classList.contains('button_function')) {
        switch(input) {
            case "AC":
                clear_input();
                break;
            case "+/-":
                change_sign();
                break;
            case "%":
                convert_to_percent();
                break;
        }
    }

    else if (event.target.classList.contains('button_operator')) {
        switch(input) {
            case "÷":
                temp_operand === "" ? temp_operand += output : () => {
                    console.log("okay");
                    console.log(Number(temp_operand)/Number(output));
                }
                clear_input();
                console.log(temp_operand);
            case "+":
                if (temp_operand === "") {
                    temp_operand += output
                }
        }
    }
};

function display_output() {
    text_display.textContent = output;
}

function clear_input() {
    output = "";
    display_output();
}

function change_sign() {

}

function convert_to_percent() {

}

function add(curr_operand) {
    // temp_operand
}
