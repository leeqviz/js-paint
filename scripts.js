window.onload = function () {

    // Definitions
    var canvas = document.getElementById("paint-canvas");
    var context = canvas.getContext("2d");
    var boundings = canvas.getBoundingClientRect();
  
    // Specifications
    var mouseX = 0;
    var mouseY = 0;
    context.strokeStyle = 'black'; // initial brush color
    context.fillStyle = 'black'; // initial brush color
    context.lineWidth = 1; // initial brush width
    var isDrawing = false;
    var tool = 0;
    var isAnimated = false;

    var image = new Image();
    //image.crossOrigin = "anonymous";
    image.src = "1.png";
    
  
    // Handle Colors
    var colors = document.getElementsByClassName('colors')[0];
  
    colors.addEventListener('click', function(event) {
      context.strokeStyle = event.target.value || 'black';
      context.fillStyle = event.target.value || 'black';
      tool = 0;
      //alert(event.target.value);
    });
  
    // Handle Brushes
    var brushes = document.getElementsByClassName('brushes')[0];
  
    brushes.addEventListener('click', function(event) {
      context.lineWidth = event.target.value || 1;
      tool = 0;
      //alert(event.target.value);
    });

    var pens = document.getElementsByClassName('pens')[0];

    pens.addEventListener('click', function(event) {
        tool = event.target.value || 0;
        //alert(event.target.value);
        if (tool >= 1) image.src = tool + '.png';
    });
  
    // Mouse Down Event
    canvas.addEventListener('mousedown', function(event) {
      setMouseCoordinates(event);
      isDrawing = true;
  
      // Start Drawing
      context.beginPath();
      //context.moveTo(mouseX, mouseY);
    });
  
    // Mouse Move Event
    canvas.addEventListener('mousemove', function(event) {
      setMouseCoordinates(event);
  
      if(isDrawing){
            if (tool == 0) {
                context.lineTo(mouseX, mouseY);
            }
            else {
                context.drawImage(image, mouseX, mouseY);
                //context.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
                //context.fill();
                //context.beginPath();
            }
        context.stroke();
      }
    });
  
    // Mouse Up Event
    canvas.addEventListener('mouseup', function(event) {
      setMouseCoordinates(event);
      //context.closePath();
      isDrawing = false;
    });
  
    // Handle Mouse Coordinates
    function setMouseCoordinates(event) {
      mouseX = event.clientX - boundings.left;
      mouseY = event.clientY - boundings.top;
    }

    var animButton = document.getElementById('animation');
    let ax, ay;
    let aa = 0;
    let intId = 0;
    animButton.addEventListener('click', function() {
        
        if (!isAnimated) {
            isAnimated = !isAnimated;
            ax = 250; ay = 250;

            intId = window.setInterval(function() {
                  let r = 15;
                    aa -= 1;
                  context.clearRect(0, 0, canvas.width, canvas.height);
                  
                  for (let a = 0; a < Math.PI * 2 + 0.01; a += Math.PI / 4) {
                      r *= 1.01;
                      let x = ax + r * Math.sin(a + aa)/ Math.PI * Math.sqrt(r);
                      let y = ay + r * Math.cos(a + aa)/ Math.PI * Math.sqrt(r);
                      context.drawImage(image, x - r / 2, y - r / 2, r, r);
                  }
                  
              }, 5);
        }
        else if (isAnimated) {
            isAnimated = !isAnimated;
            window.clearInterval(intId);
            context.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
      
    });

    // Handle Clear Button
    var clearButton = document.getElementById('clear');
  
    clearButton.addEventListener('click', function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    // Handle Save Button
    var saveButton = document.getElementById('save');
  
    saveButton.addEventListener('click', function() {
      var imageName = prompt('Please enter image name');
      var canvasDataURL = canvas.toDataURL();
      var a = document.createElement('a');
      a.href = canvasDataURL;
      a.download = imageName || 'drawing';
      a.click();
    });
  };
  