document.addEventListener('DOMContentLoaded', function () {


    const API_KEY = '690ba623a99212437085cb365bd91cbd';
    let divT = document.querySelector('.today');
    let button = document.querySelector('button');
    let fiveDays = document.querySelector('.fiveDays');

    let promise = new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);

    })
        .finally(() => {
        let cssload = document.querySelector(".cssload-thecube");
        cssload.style.display = "none";
    });
    promise.then(result => {
        let lat = result.coords.latitude;
        let lon = result.coords.longitude;
        ymaps.ready(function () {
            var myMap = new ymaps.Map('map', {
                center: [lat, lon],
                zoom: 15
            }, {
                searchControlProvider: 'yandex#search'
            }),
                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    hintContent: 'Вы находитесь здесь',
                    balloonContent: 'красивая метка'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: 'img/oc.png',
                    // Размеры метки.
                    iconImageSize: [30, 32],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-15, -32]
                });

            myMap.geoObjects
                .add(myPlacemark);
        });
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(result => {
                let todayWeaherObj = result;
                divT.classList.remove('none');
                divT.append(city(todayWeaherObj));
                divT.append(date(todayWeaherObj));
                divT.append(img(todayWeaherObj));
                divT.append(temp(todayWeaherObj));
                divT.append(tempFL(todayWeaherObj));
                divT.append(wind(todayWeaherObj));

                button.onclick = function () {
                    fiveDays.classList.toggle('none');
                }
            });
    },
        error => {
            console.log(error.message);
        });
    promise.then(result => {
        let lat = result.coords.latitude;
        let lon = result.coords.longitude;
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then(response => response.json());
    })
        .then(result => {
            let weatherObj = result;

            for (let i = 0; i < weatherObj.list.length; i += 8) {
                let newDiv = document.createElement('div');
                let fivedt = new Date(weatherObj.list[i].dt * 1000);
                let fivedate = document.createElement('p');
                fivedate.textContent = fivedt.toLocaleString().slice(0, -3);
                fivedate.style.fontSize = '20px';
                newDiv.append(fivedate);
                let fiveimg = document.createElement('img');
                let fiveicon = weatherObj.list[i].weather[0].icon;
                fiveimg.setAttribute('src', `http://openweathermap.org/img/wn/${fiveicon}@2x.png`);
                newDiv.append(fiveimg);
                let fivetemp = document.createElement('p');
                fivetemp.textContent = `${Math.round(weatherObj.list[i].main.temp)} ℃`;
                fivetemp.style.fontSize = '30px';
                newDiv.append(fivetemp);
                newDiv.classList.add('oneDay')
                fiveDays.append(newDiv);
            }
        },
        error => {
            alert('Пользователь отказал в геолокации');
        });

    function city(obj) {
        let h1 = document.createElement('h1');
        h1.textContent = obj.name + ', ' + obj.sys.country;
        h1.style.top = '5px';
        h1.style.left = '15px';
        return h1;
    }

    function date(obj) {
        let dt = new Date(obj.dt * 1000);
        let date = document.createElement('p');
        date.textContent = dt.toLocaleTimeString().slice(0, -3);
        date.style.top = '40px';
        date.style.left = '15px';
        date.style.fontSize = '20px';
        return date;
    }

    function img(obj) {
        let img = document.createElement('img');
        let icon = obj.weather[0].icon;
        img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
        img.style.width = '150px';
        img.style.top = '15px';
        img.style.left = '5px';
        return img;
    }

    function temp(obj) {
        let temp = document.createElement('p');
        temp.textContent = `${Math.round(obj.main.temp)} ℃`;
        temp.style.top = '35px';
        temp.style.left = '160px';
        temp.style.fontSize = '60px';
        return temp;
    }

    function tempFL(obj) {
        let tempFL = document.createElement('p');
        tempFL.textContent = `Ощущается как: ${Math.round(obj.main.feels_like)} ℃`;
        tempFL.style.top = '105px';
        tempFL.style.left = '125px';
        tempFL.style.fontSize = '18px';
        return tempFL;
    }

    function wind(obj) {
        let wind = document.createElement('p');
        let deg = obj.wind.deg;
        let speed = obj.wind.speed;
        switch (true) {
            case (deg >= 338 && deg <= 22): wind.textContent = `Ветер: Северный ${Math.round(speed)} м/с`; break;
            case (deg > 22 && deg < 68): wind.textContent = `Ветер: Северo-Восточный ${Math.round(speed)} м/с`; break;
            case (deg >= 68 && deg <= 112): wind.textContent = `Ветер: Восточный ${Math.round(speed)} м/с`; break;
            case (deg > 112 && deg < 158): wind.textContent = `Ветер: Юго-Восточный ${Math.round(speed)} м/с`; break;
            case (deg >= 158 && deg <= 202): wind.textContent = `Ветер: Южный ${Math.round(speed)} м/с`; break;
            case (deg > 202 && deg < 248): wind.textContent = `Ветер: Юго-Западный ${Math.round(speed)} м/с`; break;
            case (deg >= 248 && deg <= 292): wind.textContent = `Ветер: Западный ${Math.round(speed)} м/с`; break;
            case (deg > 292 && deg < 338): wind.textContent = `Ветер: Северо-Западный ${Math.round(speed)} м/с`; break;
            default: console.log('Error');
        }
        wind.style.bottom = '43px';
        wind.style.left = '15px';
        wind.style.fontSize = '20px';
        return wind;
    }

});