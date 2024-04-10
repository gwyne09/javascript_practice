// DOM
const hamburger_button = document.querySelector('.hamburger_button');
const nav_bar_elements = document.querySelector('.nav_elements');

const display_app = document.querySelector('.display_app');
// if any of the apps are clicked, make it the selected app
const selected_app = document.querySelector('.nav_dropdown');

// show nav_bar when hamburger button is clicked
hamburger_button.onclick = (Element) => {
    if(nav_bar_elements.style.display === "none") {
        nav_bar_elements.style.display = "flex";
    } else {
        nav_bar_elements.style.display = "none"
    }
};

// load app function
const load_app = (html_loc, css_loc, js_loc) => {
    fetch(html_loc)
        .then(res => {
            if(res.ok) {
                return res.text();
            }
        })
        .then(html => {
            display_app.innerHTML = html;

            // Load external CSS file
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = css_loc;
            cssLink.id = "loaded_app_css";
            document.head.appendChild(cssLink);

            // Load external JavaScript file
            const script = document.createElement('script');
            script.src = js_loc;
            script.id = "loaded_app_script";
            document.body.appendChild(script);
        })
};

// load if clicked
// load_timer.onclick = (event) => { // Correct the parameter name to 'event'
//     event.preventDefault();
//     load_app('/timer/timer.html');
//     console.log("anchor clicked");
// };

load_app('/calculator/calculator.html', '/calculator/calculator.css', '/calculator/calculator.js')