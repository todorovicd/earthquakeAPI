var mapimg;
var clat = 0;

var clon = 0;

//44.7866° N, 20.4489° E
var lat = 44.7866;
var lon = 20.4489;

var zoom = 1;
var earthquakes;

function preload() {
  //load world map (may need to change certain parameters(lat/long, zoom, angle), read documentation on mapbox website)
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0, 0, 1,0,0/1024x512?access_token=pk.eyJ1IjoidG9kb3JvdmljZCIsImEiOiJjam92djVtNXcwdW43M3ZycTAwM2hqMGFiIn0.uJ-0qhQLT3WIgUxWPFfw_g');
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(1024, 512);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  for (var i = 0; i < earthquakes.length; i++) {
      var data = earthquakes[i].split(/,/);

      var lat = data[1];
      var lon = data[2];
      var mag = data[4];
      var x = mercX(lon) - cx;
      var y = mercY(lat) - cy;

      mag = pow(10, mag);
      mag = sqrt(mag);

      var magmax = sqrt(pow(10, 10));

      var d = map(mag, 0, magmax, 0, 360);
      stroke(255, 0, 255)
      fill(255, 0, 255, 200);
      ellipse(x, y, d, d);

  }
}
