var navBtns = document.querySelectorAll('.nav-btn'),
newInput = document.querySelector('.new-input'),
list = document.querySelector('.list'),
noItems = document.querySelector('.no-items');

//functionality for nav buttons
navBtns.forEach(btn => {
  btn.onclick = function(){
    for(i = 0; i < navBtns.length; i++){
      navBtns[i].classList.remove('nav-btn_active');
    }
    this.classList.add('nav-btn_active');
  }
});

newInput.addEventListener('keypress', ev => {
  if(ev.keyCode == 13 && ev.target.value !== ''){
    var userInput = ev.target.value,
        newElement = '<li><span class="check"><i class="fa fa-check"></i></span>' + userInput + '<div class="space-holder"></div><span class="delete-btn"><i class="fa fa-trash-alt"></i></span></li>'
    list.insertAdjacentHTML('beforeend', newElement);
    ev.target.value = '';
    checkForToDos();
  }
});

list.onclick = ev => {
  if(ev.target.classList.contains('no-items') || ev.target.tagName == 'UL'){
     return;
  } else if(ev.target.tagName === 'LI'){
    ev.target.classList.toggle('checked');
  } else if(ev.target.tagName === 'svg'){
    ev.target.parentElement.parentElement.classList.add('shrink');
    setTimeout(function(){
      ev.target.parentElement.parentElement.remove();
    }, 250);
  } else if(ev.target.tagName === 'path'){
    ev.target.parentElement.parentElement.parentElement.classList.add('shrink');
    setTimeout(function(){
      ev.target.parentElement.parentElement.parentElement.remove();
    }, 250);
  }
  checkForToDos();
}

  function checkForToDos(){
    var listLength = list.childNodes.length - 3;
    if(listLength > 0){
      noItems.style.display = 'none';
    } else {
      noItems.style.display = 'block';
    }
  }