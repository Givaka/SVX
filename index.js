// Маска для телефона
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(
    document.querySelectorAll("input[type=tel]"),
    function (input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        var reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );
});

// Показ/Скрытие пароля
function show_hide_password(target) {
  // var input = document.getElementById("password-input");
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
// header = {"frameName": String, "show": boolean}
function swapPage(from, to, header) {
  document.getElementById(from).hidden = true;
  document.getElementById(to).hidden = false;
  
  if (Object.entries(header).length != 0) {
    console.log(header.frameName.getElementsByTagName("header")[0]);
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
    back.onclick = function () { seeService(this, false); }
    menu.prepend(back);
    menu.getElementsByClassName("title")[0].hidden = true;
    document.getElementById("services").hidden = true;
    document.getElementById("descriptions").hidden = false;
    document.getElementById(when).hidden = false;
  } else{
    menu.getElementsByClassName("back")[0].remove();
    menu.getElementsByClassName("title")[0].hidden = false;
    document.getElementById(when).hidden = true;
    document.getElementById("descriptions").hidden = true;
    document.getElementById("services").hidden = false;
  }
}


// Переход со скрытием всех открытых
function footerSwap(to) {
  let allSelection = document.getElementsByTagName('section');

  for (let selection of allSelection) {
    selection.hidden = true;
  }
  for (let service of document.getElementsByClassName("service")) {
    service.hidden = true;

    // Убераем кнопку назад со страниц описания при переходе с кнопки домой
    let menu = document.querySelector("header >.menu");
    menu.getElementsByClassName("title")[0].hidden = false;
    if (menu.getElementsByClassName("back").length != 0) {
      menu.getElementsByClassName("back")[0].remove();
    }
  }

  document.getElementById(to).hidden = false;
}