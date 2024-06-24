var fgimage = null;
var bgimage = null;

function loadForegroundImage() {
  var imgFile = document.getElementById("fgfile");
  fgimage = new SimpleImage(imgFile);
  var canvas = document.getElementById("fgcan");
  fgimage.drawTo(canvas);
}

function loadBackgroundImage() {
  var imgFile = document.getElementById("bgfile");
  bgimage = new SimpleImage(imgFile);
  var canvas = document.getElementById("bgcan");
  bgimage.drawTo(canvas);
}

function greenScreen() {
  if (fgimage == null || ! fgimage.complete()) {
    alert('foreground not loaded');
    return;
  }
  if (bgimage == null || ! bgimage.complete()) {
    alert('background not loaded');
    return;
  }
  clearCanvas();
  
  var output = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  
  for (var pixel of fgimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    
    if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
      var bgPixel = bgimage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else {
      output.setPixel(x,y,pixel);
    }
  }
  var canvas = document.getElementById("fgcan");
  output.drawTo(canvas);
}

function clearCanvas() {
  var ctx1 = document.getElementById("fgcan").getContext("2d");
  var ctx2 = document.getElementById("bgcan").getContext("2d");
  
  ctx1.clearRect(0,0,document.getElementById("fgcan").width,document.getElementById("fgcan").height);
  ctx2.clearRect(0,0,document.getElementById("bgcan").width,document.getElementById("bgcan").height);
}