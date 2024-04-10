// dom
const html_body = document.body;

// set background random every 1 min
setInterval(() => {
    const rand_photo = (Math.floor(Math.random()*4) + 1);
    console.log(rand_photo);
    html_body.style.setProperty('background-image', `url("/resources/bg/${rand_photo}.jpg")`);
}, 60000);

// nav