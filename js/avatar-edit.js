function editAvatar() {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let image = document.getElementById('editImage');

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.width = image.width;
  ctx.height = image.height;

  let canvas_width = canvas.width;
  let canvas_height = canvas.height;
  let offset_x, offset_y;

  let get_offset = function () {
    let canvas_offsets = canvas.getBoundingClientRect();
    offset_x = canvas_offsets.left;
    offset_y = canvas_offsets.top;
  }

  get_offset();
  window.onscroll = function () { get_offset(); }
  window.onresize = function () { get_offset(); }
  canvas.onresize = function () { get_offset(); }


  let startX, startY;
  let is_dragging = false;


  let shape_width = parseInt(image.width * 0.96);
  let edit_width = parseInt(window.innerWidth * 0.5);

  let shape = { x: 20, y: 40, width: shape_width, height: shape_width, color: 'red' };

  let is_mouse_in_shape = function (x, y, shape) {
    let shape_left = shape.x;
    let shape_right = shape.x + shape.width;
    let shape_top = shape.y;
    let shape_bottom = shape.y + shape.height

    if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom)
      return true;
  }

  let mouse_down = function (event) {
    event.preventDefault();

    startX = parseInt(event.clientX - offset_x);
    startY = parseInt(event.clientY - offset_y);

    if (is_mouse_in_shape(startX, startY, shape)) {
      is_dragging = true;
      return;
    }
  }

  let mouse_up = function (event) {
    if (!is_dragging)
      return

    event.preventDefault();
    is_dragging = false;
  }

  let mouse_out = function (event) {
    if (!is_dragging)
      return

    event.preventDefault();
    is_dragging = false;
  }

  let mouse_move = function () {
    if (!is_dragging) {
      return;
    } else {
      event.preventDefault();
      let mouseX = parseInt(event.clientX - offset_x);
      let mouseY = parseInt(event.clientY - offset_y);

      let dx = mouseX - startX;
      let dy = mouseY - startY;

      let current_shape = shape;
      current_shape.x += dx;
      current_shape.y += dy;

      draw_shapes();

      startX = mouseX;
      startY = mouseY;
    }
  }

  canvas.onmousedown = mouse_down;
  canvas.onmouseup = mouse_up;
  canvas.onmouseout = mouse_out;
  canvas.onmousemove = mouse_move;
  

  let touch_start = function (event) {
    event.preventDefault();

    startX = parseInt(event.changedTouches[0].clientX - offset_x);
    startY = parseInt(event.changedTouches[0].clientY - offset_y);

    if (is_mouse_in_shape(startX, startY, shape)) {
      is_dragging = true;
      return;
    }
  }
  
  let touch_end = function (event) {
    if (!is_dragging)
    return
    
    event.preventDefault();
    is_dragging = false;
  }
  
  let touch_move = function (event) {
    if (!is_dragging) {
      return;
    } else {
      event.preventDefault();
      let mouseX = parseInt(event.changedTouches[0].clientX - offset_x);
      let mouseY = parseInt(event.changedTouches[0].clientY - offset_y);

      let dx = mouseX - startX;
      let dy = mouseY - startY;

      let current_shape = shape;
      current_shape.x += dx;
      current_shape.y += dy;

      draw_shapes();

      startX = mouseX;
      startY = mouseY;
    }
  }
  
  canvas.ontouchstart = touch_start;
  canvas.ontouchend = touch_end;
  canvas.ontouchmove = touch_move;


  let draw_shapes = function () {
    ctx.clearRect(0, 0, canvas_width, canvas_height);

    console.log(edit_width);

    ctx.drawImage(image, shape.x, shape.y, shape.width, shape.height , shape.x, shape.y, edit_width, edit_width);
  }

  draw_shapes();
}