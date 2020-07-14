document.addEventListener('DOMContentLoaded', function () {

    let img1 = document.querySelector('#img1');
    let img2 = document.querySelector('#img2');
    let img3 = document.querySelector('#img3');

    document.body.className = localStorage.getItem('background') || 'background1';
    
    img1.onclick = function () {
        document.body.className = 'background1';
        localStorage.setItem('background', 'background1');
    }

    img2.onclick = function () {
        document.body.className = 'background2';
        localStorage.setItem('background', 'background2');
    }

    img3.onclick = function () {
        document.body.className = 'background3';
        localStorage.setItem('background', 'background3');
        
    }





});