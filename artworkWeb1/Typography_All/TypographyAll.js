let back = document.querySelector('.back');
let WIC = true;

back.addEventListener('click', () => {
    if(WIC == true) {
        back.style.backgroundColor = '#e7e2ee';
        back.style.transition = '0.3s';
        WIC = false;
    } else {
        back.style.backgroundColor = '#201335';
        back.style.transition = '0.3s';
        WIC = true;
    }
});