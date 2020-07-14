document.addEventListener('DOMContentLoaded', function () { 
    let hours = document.querySelector('.hours');
    let minutes = document.querySelector('.minutes');
    let seconds = document.querySelector('.seconds');
 
    setInterval(function () {
        let now = new Date();
        let deg1 = now.getHours();
        let deg2 = now.getMinutes();
        let deg3 = now.getSeconds();
        hours.style.transform = `rotate(${deg1 * 30 + deg2 / 2}deg)`;
        minutes.style.transform = `rotate(${deg2 * 6}deg)`;
        seconds.style.transform = `rotate(${deg3 * 6}deg)`;
    }, 1000);
});