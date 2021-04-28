let navBtns = document.querySelectorAll('.nav-btn'),
  newInput = document.querySelector('.new-input'),
  list = document.querySelector('.list'),
  //dlt = document.querySelector('.delete-btn'),
  //noItems = document.querySelector('.no-items'),
  userInputArray = new Array();

//window.localStorage.setItem('Home', '');
//window.localStorage.setItem('Important', '');
//window.localStorage.setItem('Project', '');

populateList(navBtns[0]);

//functionality for nav buttons
navBtns.forEach(btn => {
  console.log(btn.innerText + window.localStorage.getItem(btn.innerText));

  btn.onclick = function () {
    for (i = 0; i < navBtns.length; i++) {
      navBtns[i].classList.remove('nav-btn_active');
    }
    this.classList.add('nav-btn_active');
    //list.childNodes.forEach(e => {
    //  e.remove()
    //});
    //Array.from(list).forEach(el => el.remove());
    list.innerHTML = "";
    populateList(btn);

  }
});
function populateList(btn) {
  if (btn.className == 'nav-btn nav-btn_active') {
    let selectNav = document.querySelector('.nav-btn_active').innerText;
    let arrayElement = new Array();
    let storedElements = new Array();
    if (window.localStorage.getItem(selectNav)) {
      storedElements = JSON.parse(window.localStorage.getItem(selectNav));
    }
    storedElements.forEach(elem => arrayElement.push(elem));
    for (let i = 0; i < arrayElement.length; i++) {
      let newElement = '<li><span class="check"><i class="fa fa-check"></i></span>' + arrayElement[i] + '<div class="space-holder"></div><span class="delete-btn"><i class="fa fa-trash-alt"></i></span></li>'
      list.insertAdjacentHTML('beforeend', newElement);
    }
    //console.log(window.localStorage.getItem(selectNav));
  }
}

newInput.addEventListener('keypress', ev => {
  if (ev.keyCode == 13 && ev.target.value !== '') {
    let userInput = ev.target.value,
      newElement = '<li><span class="check"><i class="fa fa-check"></i></span>' + userInput + '<div class="space-holder"></div><span class="delete-btn"><i class="fa fa-trash-alt"></i></span></li>'
    list.insertAdjacentHTML('beforeend', newElement);
    ev.target.value = '';
    //window.localStorage.setItem('home',userInput)
    //checkForToDos();
    let selectNav = document.querySelector('.nav-btn_active').innerText;
    let arrayElement = new Array();
    let storedElements = new Array();
    if (window.localStorage.getItem(selectNav)) {
      storedElements = JSON.parse(window.localStorage.getItem(selectNav));
    }
    storedElements.forEach(elem => arrayElement.push(elem));
    arrayElement.push(userInput);
    console.log(selectNav + " : " + JSON.stringify(arrayElement));
    window.localStorage.setItem(selectNav, JSON.stringify(arrayElement));
    //userInputArray = new Array();
  }
});

list.onclick = ev => {
  if (ev.target.classList.contains('no-items') || ev.target.tagName == 'UL') {
    return;
  } else if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  } else if (ev.target.tagName === 'svg') {
    ev.target.parentElement.parentElement.classList.add('shrink');
    setTimeout(function () {
      ev.target.parentElement.parentElement.remove();
    }, 250);
  } else if (ev.target.tagName === 'path') {
    ev.target.parentElement.parentElement.parentElement.classList.add('shrink');
    setTimeout(function () {
      ev.target.parentElement.parentElement.parentElement.remove();
    }, 250);
  }
  //checkForToDos();
}

function checkForToDos() {
  let listLength = list.childNodes.length - 3;
  if (listLength > 0) {
    noItems.style.display = 'none';
  } else {
    noItems.style.display = 'block';
  }
}