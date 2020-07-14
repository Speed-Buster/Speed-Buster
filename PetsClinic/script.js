document.addEventListener('DOMContentLoaded',function(){
    let inputName = document.querySelector('input[name=name]');
    let inputSurname = document.querySelector('input[name=surname]');
    let inputSearh = document.querySelector('input[name=searh]');
    let inputDate = document.querySelector('input[name=date]');
    let inputTime = document.querySelector('input[name=time]');
    let textarea = document.querySelector('textarea');
    let ul = document.querySelector('ul');
    let form = document.querySelector('form'); 
    let select = document.querySelector('select');
    select.style.background = 'skyblue';
    select.style.borderRadius = '0 5px 5px 0';
    select.style.fontWeight = 'bold';
    select.style.color = 'white';
    inputSearh.style.borderRadius = '5px 0 0 5px';
    inputSearh.style.width = '300px';
    let userPet1 = {
        name: 'Bobik', 
        surname: 'Victor Semenov',
        date: '1997-04-26',
        time: '13:10',
        notes: 'no vaccinations'
    }
    let userPet2 = {
        name: 'Geon', 
        surname: 'Sasha Petrov',
        date: '1998-03-12',
        time: '11:30',
        notes: 'pitbul'
    }

    let userPet3 = {
        name: 'Geran', 
        surname: 'Pet Smirnov',
        date: '1998-03-14',
        time: '10:15',
        notes: 'kot'
    }
    let userData = [userPet1, userPet2, userPet3];
    let fulteredData = userData.slice();

    updateMarkup();

    function updateMarkup(tempArr = userData){
        ul.innerHTML = '';
        // for(let i = 0; i < tempArr.length; i++){
        //     ul.append(createOneLiMarkup(tempArr[i],i));
        // }
        tempArr.forEach(function(item, index, array){
            ul.append(createOneLiMarkup(item,index));
        });
    }
    
    function createOneLiMarkup(userObj, index){
        let newLi = document.createElement('li');
        let newDiv = document.createElement('div');
        let newDivPet = document.createElement('div');
        let newPname = document.createElement('p');
        let newPsurname = document.createElement('p');
        let newPnotes = document.createElement('p');
        let newDivTime = document.createElement('div');
        let newDate = document.createElement('p');
        newPname.textContent = userObj.name;
        newPname.style.color = 'blue';
        newPname.style.fontSize = '24px';
        newPname.style.fontWeight = 'bold';
        newPsurname.textContent ='Owner: ' + userObj.surname;
        newPsurname.style.fontWeight = 'bold';
        newPnotes.textContent = userObj.notes;
        newDate.textContent = userObj.date + ' ' + userObj.time;
        newDivPet.append(newPname,newPsurname,newPnotes);
        newDiv.append(newDivPet);
        newDiv.style.display = 'flex';
        newDivTime.append(newDate);
        newLi.append(newDiv,newDivTime);
        newLi.classList.add('petNumber');
        let deleteBtn = document.createElement('img');
        deleteBtn.setAttribute('src', 'img/cross.png');
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.width = '25px';
        deleteBtn.style.height = '25px';
        deleteBtn.onclick = function(){
            userData.splice(index,1);
            updateMarkup();
        }
        newDiv.prepend(deleteBtn);
        return newLi;
    }

    form.onsubmit = function(e){
        e.preventDefault();
        let userPet = {
            name: inputName.value, 
            surname: inputSurname.value,
            date: inputDate.value,
            time: inputTime.value,
            notes: textarea.value
        }
        if(userPet.name != '' && userPet.surname != '' && userPet.date != '' && userPet.time != ''){
            userData.push(userPet);
            updateMarkup();
            inputName.value = '';
            inputSurname.value = '';
            inputDate.value = '';
            inputTime.value = '';
            textarea.value = '';
        }
        else{
            alert('Заполните все поля');
        }
    }

    select.onchange = function(e){
        let userSelect = select.value;
        fulteredData.sort(function(a,b){
            if(a[userSelect].toLowerCase() > b[userSelect].toLowerCase()) return 1;
            return -1;
        });
        updateMarkup(fulteredData);
    }

    inputSearh.onkeyup = function (e){
        let userSearh = inputSearh.value.toLowerCase().trim();
        fulteredData = userData.filter(function(item){
            let strFromObj = item.name + ' ' + item.surname;
            strFromObj = strFromObj.toLowerCase();
            if(strFromObj.includes(userSearh) || strFromObj.includes(userSearh)) return true;
            return false;
        });
        updateMarkup(fulteredData);
    }

    let button = document.querySelector('i');
    button.onclick = function(){
        form.classList.toggle('open')
    }
    
});