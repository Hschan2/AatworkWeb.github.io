const black  = '#201335';
const white = '#f3f1f7';

const element = document.body;
let back = element.style.backgroundColor;
back = black

element.addEventListener('click', () => {
    if(back == black) {
        element.style.backgroundColor = white;
        element.style.transition = '0.3s';
        back = white;
    } else {
        element.style.backgroundColor = black;
        element.style.transition = '0.3s';
        back = black;
    }
});

