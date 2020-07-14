document.addEventListener('DOMContentLoaded', function () {
    let img = document.querySelector('img');
    let heightWindow = document.documentElement.clientHeight - img.offsetHeight;
    let widthWindow = document.documentElement.clientWidth - img.offsetWidth;
    
    function getRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    }

    img.onmouseover = function(e) {
        img.style.top = `${getRandomInt(heightWindow)}px`;
        img.style.left = `${getRandomInt(widthWindow)}px`;
      };

    img.onclick = function(e){
        document.body.style.background = 'url(img/end.jpg) no-repeat';
        document.body.style.backgroundSize = 'cover';
        img.style.display = 'none';
        let win = document.querySelector('.win');
        win.classList.remove('win');
    }


});