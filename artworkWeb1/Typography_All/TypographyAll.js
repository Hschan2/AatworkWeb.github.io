let element = document.body;
let back = element.style.backgroundColor;
back = '#201335';

element.addEventListener('click', () => {
    if(back == '#201335') {
        element.style.backgroundColor = '#f3f1f7';
        element.style.transition = '0.3s';
        back = '#f3f1f7';
    } else {
        element.style.backgroundColor = '#201335';
        element.style.transition = '0.3s';
        back = '#201335';
    }
});