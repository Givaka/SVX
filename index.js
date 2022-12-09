// window.onload = function () {
//   setTimeout(progressSetup(), 100)

//   // let progress = document.getElementsByTagName("progress")[0];
//   // while (progress.value != 100){
//   //   setTimeout(() => progress.value++, 1000)
//   // }
// }

// function progressSetup() {
//   if (document.getElementsByTagName("progress")[0].value != 100) {
//     document.getElementsByTagName("progress")[0].value =
//       document.getElementsByTagName("progress")[0].value + 1;
//     console.log(document.getElementsByTagName("progress")[0].value);
//     setTimeout(progressSetup(), 1000);
//   }
// }

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
  console.log("test");
  var input = document.getElementById("password-input");
  if (input.getAttribute("type") == "password") {
    target.classList.add("view");
    input.setAttribute("type", "text");
  } else {
    target.classList.remove("view");
    input.setAttribute("type", "password");
  }
  return false;
}

