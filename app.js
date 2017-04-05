//Get window size
var ww = window.innerWidth,
    wh = window.innerHeight;

//Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});
renderer.setSize(ww, wh);

//Create an empty scene
var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000,100,200);

//Create a perpsective camera
var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 200);
camera.position.z = 400;

//Hard coded array of points
var points = [
  [935, 0],
  [1287, 251],
  [1007, 341],
  [785, 801],
  [506, 369],
  [0, 510],
  [42, 138],
  [618, 203]
];

//Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0];
  var y = (Math.random()-i)*250;
  var z = points[i][1];
  points[i] = new THREE.Vector3(x, y, z);
}
//Create a path from the points
var path = new THREE.CatmullRomCurve3(points);

//Create the tube geometry from the path
//1st param is the path
//2nd param is the amount of segments we want to make the tube
//3rd param is the radius of the tube
//4th param is the amount of segment along the radius
//5th param specify if we want the tube to be closed or not
var geometry = new THREE.TubeGeometry( path, 600, 6, 30, true );

//Set a different color on each face
for(var i=0,j=geometry.faces.length;i<j;i++){
  geometry.faces[i].color = new THREE.Color("hsl("+Math.floor(Math.random()*360)+",50%,50%)");
}
//Basic
//Basic red material
// var material = new THREE.MeshNormalMaterial({
//   // color: 0xff0000, //Red color
//   side : THREE.BackSide, //Reverse the sides
//   wireframe:false //Display the tube as a wireframe
// });

// var material = new THREE.MeshLambertMaterial({
//   color: 0xff0000,
//   side : THREE.BackSide
// });

var material = new THREE.MeshLambertMaterial({
  wireframe: false,
  side : THREE.BackSide,
  vertexColors : THREE.FaceColors //We need to tell ThreeJs that the colors are coming from the faces
});

//Create a mesh
var tube = new THREE.Mesh( geometry, material );
//Add tube into the scene
scene.add( tube );

var light = new THREE.PointLight(0xffffff,6, 200);
scene.add(light);

var percentage = 0;
function render(){

  percentage += 0.0004;
  var p1 = path.getPointAt(percentage%1);
  var p2 = path.getPointAt((percentage + 0.03)%1);
  camera.position.set(p1.x,p1.y,p1.z);
  camera.lookAt(p2);
  light.position.set(p2.x, p2.y, p2.z);

  //Render the scene
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
