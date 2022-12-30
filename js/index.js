// Блокирование form
function cancelSubmit(event) { event.preventDefault(); }

// Показ/Скрытие пароля
function show_hide_password(target) {
  var input = target.previousElementSibling;
  if (input.getAttribute("type") == "password") {
    target.classList.add("view");
    input.setAttribute("type", "text");
  } else {
    target.classList.remove("view");
    input.setAttribute("type", "password");
  }
  return false;
}

// Переключение страниц
// header = {"frameName": Node, "show": boolean}
function swapPage(from, to, header) {
  document.getElementById(from).hidden = true;
  document.getElementById(to).hidden = false;
  
  if (Object.entries(header).length != 0) {
    header.frameName.getElementsByTagName('header')[0].hidden = !header.show;
  }
}

// Отображение услуг в выбранной категории
function sliderPage(all, to) {
  pages = document.getElementsByClassName(all);
  for (let page in pages){
    pages[page].hidden = true;
  }
  document.getElementById(to).hidden = false;
}

// Раскрытие описание услуги
function seeService(when, inside=true) {
  let menu = document.querySelector("header >.menu");
  when = when.getAttribute("service");
  if(inside){
    let back = document.createElement("a");
    back.href = "#";
    back.classList.add('back');
    back.setAttribute("service", when);
    back.onclick = function () {
      back.remove();
      seeService(this, false); 
    }
    menu.prepend(back);
    menu.getElementsByClassName("title")[0].hidden = true;
    document.getElementById("services").hidden = true;
    document.getElementById("descriptions").hidden = false;
    document.querySelector('article#'+when).hidden = false;
  } else{
    menu.getElementsByClassName("title")[0].hidden = false;
    document.querySelector('article#' + when).hidden = true;
    document.getElementById("descriptions").hidden = true;
    document.getElementById("services").hidden = false;
  }
}

// Переход со скрытием всех открытых
function footerSwap(to) {
  document.querySelector('main>header').hidden = false;
  document.querySelector('header .notifications').hidden = false;
  if (document.querySelector('header .settings'))
    document.querySelector('header .settings').remove();

  for (let selection of document.getElementsByTagName('section'))
    selection.hidden = true;

  clearService();

  document.getElementById(to).hidden = false;
}

// Переход на профиль
function toProfile() {
  document.querySelector('main>header').hidden = false;

  for (let selection of document.getElementsByTagName("section"))
    selection.hidden = true;
  document.querySelector('#profile').hidden = false;

  let menu = document.querySelector('header>.menu');
  menu.getElementsByClassName('notifications')[0].hidden = true;

  if (menu.querySelectorAll('.settings').length < 1){
    let settings = document.createElement('a');
    settings.classList.add('settings');
    settings.href = '#';
    settings.onclick = function () {
      settings.remove();
      swapPage('profile','settings', {});
    }
    menu.append(settings);
  }
}

function toNotifications(){
  for (let selection of document.getElementsByTagName('section'))
    selection.hidden = true;

  clearService();
  document.querySelector('header .notifications').hidden = true;
  document.getElementById('notifications').hidden = false;
}

// Уберает все открытые страницы с описанием услуг
function clearService() {
  for (let service of document.getElementsByClassName("service")) {
    service.hidden = true;

    // Убераем кнопку назад со страниц описания при переходе с кнопки домой
    let menu = document.querySelector("header >.menu");
    menu.getElementsByClassName("title")[0].hidden = false;
    if (menu.getElementsByClassName("back").length != 0) {
      menu.getElementsByClassName("back")[0].remove();
    }
  }
}

// Развернуть карту
function expandMap() {
  let target = event.target;
  if (target.closest('div.map-big')){
    target.closest('div.map').classList.remove("map-big");
    target.src = 'image/map.png';
    document.querySelector('#contact>.addresses').hidden = false;
    document.querySelector('#contact>.social').hidden = false;
    document.querySelector('#contact>.email').hidden = false;
  } else {
    target.closest('div.map').classList.add("map-big");
    target.src = 'image/map-big.png';
    document.querySelector('#contact>.addresses').hidden = true;
    document.querySelector('#contact>.social').hidden = true;
    document.querySelector('#contact>.email').hidden = true;
  }
}

// Редактирование профеля
function editProfile() {
  let account = document.querySelector('#profile>#account>.account');
  let garage = document.querySelector('#profile>#account>.garage');
  let btn_edit = account.querySelector('a#editProfile');


  if (btn_edit.innerHTML == "Готово"){
    // Выход из меню редактирования профиля
    btn_edit.innerHTML = "Ред.";
    account.querySelector('img').classList.remove('account-edit');
    account.querySelector('.account-edit-icon').remove();
    document.querySelector('#profile>#account>.history').hidden = false;
    account.querySelector('input.name').readOnly = true;
    account.querySelector('input.phone').readOnly = true;
    account.querySelector('input.name+div').remove();
    account.querySelector('input.phone+div').remove();
    garage.querySelector('#garage-new').remove();
    garage.querySelector('#create_garage').hidden = true;
    return;
  }
  // Формирование меню редактирования профиля
  
  account.querySelector('img').classList.add('account-edit');
  // Иконка редактирования изображения
  let icon = document.createElement('a');
  icon.href = '#';
  icon.classList.add('account-edit-icon');
  icon.onclick = function () {
    swapPage('profile', 'editAvatar', { "frameName": main, "show": false });
    editAvatar();
  }
  account.append(icon);

  // Редактирование имени и номера телефона
  let editName = document.createElement('div');
  editName.href = "#";
  editName.classList.add('edit');
  account.querySelector('input.name').readOnly = 
    !account.querySelector('input.name').readOnly;
  account.querySelector('input.name').after(editName);

  let editPhone = document.createElement('div');
  editPhone.href = "#";
  editPhone.classList.add('edit');
  account.querySelector('input.phone').readOnly =
    !account.querySelector('input.phone').readOnly;
  account.querySelector('input.phone').after(editPhone);

  btn_edit.innerHTML = "Готово";
  document.querySelector('#profile>#account>.history').hidden = true;

  // Изменение гаража
  let del_btn = document.createElement('a');  // Кнопка удаления элемента
  del_btn.href = "#";
  del_btn.innerHTML = "Удалить";
  del_btn.classList.add('btn');
  del_btn.classList.add('enable');
  del_btn.classList.add('del_auto');


  // Создание нового транспорта
  let new_auto_create = document.createElement('a');
  new_auto_create.href = '#';
  new_auto_create.innerHTML = '+';
  new_auto_create.classList = 'btn';
  
  let new_auto = document.createElement('div');
  new_auto.classList.add('auto');
  new_auto.id = 'garage-new';
  new_auto.appendChild(new_auto_create);
  new_auto.onclick = function () {
    garage.querySelector('#create_garage').hidden = false;
    garage.querySelector('#garage-new').hidden = true;
  }

  garage.querySelectorAll('div.auto').forEach(element => {
    element.querySelector('.btn').after(del_btn.cloneNode(true));
  }); 
  garage.appendChild(new_auto);

  garage.querySelectorAll('div.auto>.del_auto').forEach(element => {
    element.addEventListener('click', function () {
      event.target.parentNode.remove();
    })
  });
}

// Выбор услуги
function signUp() {
  let serviceID = event.target.closest('.service').id;
  let service = document.querySelector('div[service = ' + serviceID + ']')
  let replaced = document.querySelector('#appointment .services label');

  document.querySelector("header >.menu .title").hidden = false;
  document.querySelectorAll("#descriptions article").forEach(element => {
    element.hidden = true;
  });
  document.getElementById("descriptions").hidden = true;
  document.getElementById("appointment").hidden = false;

  document.querySelector('header .back').remove();
  
  replaced.replaceChildren(service.cloneNode(true));
  let selectedService = document.querySelector('#appointment .services [service]');
  selectedService.removeAttribute('onclick');
  document.querySelector('#appointment .services input').id = serviceID;
  document.querySelector('#appointment .services input').checked = true;
  replaced.setAttribute('for', serviceID);

  swapPage('descriptions', 'appointment', {});

  if (document.querySelector('#appointment .services a')){
    document.querySelector('#appointment .services a').remove();
  }

  let changeService = document.createElement('a');
  changeService.href = '#';
  changeService.innerText = "Изменить";
  changeService.classList.add('btn');
  changeService.onclick = function () {
    swapPage('appointment', 'services', {})
  }

  document.querySelector('#appointment .services').append(changeService);
}

// Создание итоговой формы записи
function setRecords () {
  // 0:Салон; 1:Авто; 2:Услуга; 3:День; 4:Время;
  let formInput = document.querySelectorAll('#appointment input:checked'),
      formLabel = document.querySelectorAll('#appointment input:checked+label');

  // Когда записан и сколько стоит
  let recordsDate = new Date(formInput[3].id);
  document.querySelector('#recordsDate input').id = formInput[3].id;
  document.querySelector('#recordsDate label').setAttribute('for', formInput[3].id)
  document.querySelector('#recordsDate label').innerText = Intl.DateTimeFormat("ru", { dateStyle: "long" }).format(recordsDate);
  
  document.querySelector('#recordsTime input').id = formInput[4].id;
  document.querySelector('#recordsTime label').setAttribute('for', formInput[4].id)
  document.querySelector('#recordsTime label').innerText = formLabel[4].innerText;

  document.querySelector('#recordsPrice input').id = formInput[2].id;
  document.querySelector('#recordsPrice label').setAttribute('for', formInput[2].id)
  document.querySelector('#recordsPrice label').innerText = (document.querySelector('#descriptions article#' + formLabel[2].querySelector('div.card').getAttribute('service') + ' .price').innerText.substring(2));
  
  // Где записа и что записано
  document.querySelector('#recordsService input').id = formInput[2].id;
  document.querySelector('#recordsService label').setAttribute('for', formInput[2].id)
  document.querySelector('#recordsService label h2').textContent = formLabel[2].querySelector('.preview + div').innerText;

  document.querySelector('#recordsSalon input').id = formInput[0].id;
  document.querySelector('#recordsSalon label').setAttribute('for', formInput[0].id)
  document.querySelector('#recordsSalon label').replaceChildren(formLabel[0].querySelector('.card').cloneNode(true)); 
}


// Тест страницы с ошибкой записи
function successfulEROOR() {
  let testPage = Math.round(Math.random());
  console.log(testPage);
  if (testPage){
    document.querySelector('#EROOR-successful #successful').hidden = true;
    document.querySelector('#EROOR-successful #EROOR').hidden = false;
  }
}