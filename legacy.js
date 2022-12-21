// // Маска для телефона
// window.addEventListener("DOMContentLoaded", function () {
//   [].forEach.call(
//     document.querySelectorAll("input[type=tel]"),
//     function (input) {
//       var keyCode;
//       function mask(event) {
//         event.keyCode && (keyCode = event.keyCode);
//         var pos = this.selectionStart;
//         if (pos < 3) event.preventDefault();
//         var matrix = "+7 (___) ___-__-__",
//           i = 0,
//           def = matrix.replace(/\D/g, ""),
//           val = this.value.replace(/\D/g, ""),
//           new_value = matrix.replace(/[_\d]/g, function (a) {
//             return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
//           });
//         i = new_value.indexOf("_");
//         if (i != -1) {
//           i < 5 && (i = 3);
//           new_value = new_value.slice(0, i);
//         }
//         var reg = matrix
//           .substr(0, this.value.length)
//           .replace(/_+/g, function (a) {
//             return "\\d{1," + a.length + "}";
//           })
//           .replace(/[+()]/g, "\\$&");
//         reg = new RegExp("^" + reg + "$");
//         if (
//           !reg.test(this.value) ||
//           this.value.length < 5 ||
//           (keyCode > 47 && keyCode < 58)
//         )
//           this.value = new_value;
//         if (event.type == "blur" && this.value.length < 5) this.value = "";
//       }

//       input.addEventListener("input", mask, false);
//       input.addEventListener("focus", mask, false);
//       input.addEventListener("blur", mask, false);
//       input.addEventListener("keydown", mask, false);
//     }
//   );
// });


// Копирование изображения
// {
//   // let startOffsetX, startOffsetY,
//   //   canvasLeft, canvasTop;

//   // let canvas, ctx, image;

//   // function editAvatar() {
//   //   canvas = document.getElementById('canvas');
//   //   ctx = canvas.getContext('2d');

//   //   canvasLeft = canvas.offsetLeft;
//   //   canvasTop = canvas.offsetTop;
//   //   console.log(canvasLeft);
//   //   console.log(canvasTop);

//   //   canvas.ondrop = drop;
//   //   canvas.ondragover = allowDrop;

//   //   image = document.querySelector('#editImage');
//   //   canvas.width = image.width * 5;
//   //   canvas.height = image.height;
//   //   image.onmousedown = mousedown;
//   //   image.ondragstart = dragstart;

//   //   console.log("eA");
//   // }

//   // function allowDrop(ev) {
//   //   ev.preventDefault();
//   //   console.log("aD");
//   // }

//   // function mousedown(ev) {
//   //   startOffsetX = ev.offsetX;
//   //   startOffsetY = ev.offsetY;
//   //   console.log("md: " + startOffsetX + "|" + startOffsetY);
//   // }

//   // function dragstart(ev) {
//   //   ev.dataTransfer.setData("Text", ev.target.id);
//   //   console.log("ds: " + ev.dataTransfer.getData("Text"));
//   // }

//   // function drop(ev) {
//   //   ev.preventDefault();

//   //   var dropX = ev.clientX - canvasLeft - startOffsetX;
//   //   var dropY = ev.clientY - canvasTop - startOffsetY;
//   //   var id = ev.dataTransfer.getData("Text");
//   //   var dropElement = document.getElementById(id);

//   //   console.log(dropElement);
//   //   console.log(dropX + "|" + dropY);

//   //   // draw the drag image at the drop coordinates
//   //   ctx.drawImage(dropElement, dropX, dropY);
//   //   console.log("d");
//   // }
// }