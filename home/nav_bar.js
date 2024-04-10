// DOM
const hamburger_button = document.querySelector('.hamburger_button');
const nav_bar_elements = document.querySelector('.nav_elements');

const display_app = document.querySelector('.display_app');
// if any of the apps are clicked, make it the selected app
const selected_app = document.querySelector('.nav_dropdown');

// show nav_bar when hamburger button is clicked
hamburger_button.onclick = (Element) => {
    console.log("okay");
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

// unload app function
const unload_app = () => {
    // Clear HTML content
    display_app.innerHTML = '';

    // Remove dynamically loaded CSS file
    const loadedCss = document.getElementById("loaded_app_css");
    if (loadedCss) {
        loadedCss.parentNode.removeChild(loadedCss);
        console.log("css unloaded");
    }

    // Remove dynamically loaded JavaScript file
    const loadedScript = document.getElementById("loaded_app_script");
    if (loadedScript) {
        loadedScript.parentNode.removeChild(loadedScript);
        console.log("scripts unloaded");
    }
    // Disable all elements with class '.app'
    document.querySelectorAll(".app").forEach(element => {
        element.disabled = false;
    });
};


// load if selected app is clicked
// !! make sure the name of the app matches the locations in the repository
selected_app.onclick = (event) => { 
    if (display_app.innerHTML != '') {
        unload_app();
    }
    const app = event.target.textContent.toLowerCase();
    load_app(`/${app}/${app}.html`, `/${app}/${app}.css`, `/${app}/${app}.js`);
    console.log(`${app} loaded`);
    document.getElementById(app).disabled = true;
};