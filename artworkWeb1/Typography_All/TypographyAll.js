let back = document.querySelector('.back');
let button = document.querySelectorAll('.aTag');
let WIC = true;

back.addEventListener('click', () => {
    if(WIC == true) {
        back.style.backgroundColor = '#fbfbff';
        back.style.transition = '0.3s';
        WIC = false;
    } else {
        back.style.backgroundColor = '#201335';
        back.style.transition = '0.3s';
        WIC = true;
    }
});

button.addEventListener('click', () => {
    if(WIC == true) back.style.backgroundColor = '#201335';
    else back.style.backgroundColor = '#fbfbff';
});