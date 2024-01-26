import {camera} from "./camera.js";
import{render} from "./render.js";
import { canvas,renderer } from "./renderer.js";
import { objects ,counter_cube,counter_sphere,counter_cylinder,counter_tetrahedron,counter_img} from "./3dobjects.js";
import { scene } from "./scene.js";
import{UndoManager}from "../js/undo-manager.js";
import { createImage } from "./3dobjects.js";
import{Water} from "./Water.js";
import{Sky} from "./Sky.js";
import{GUI} from "./gui.js";
import{check,pos,rot,scl,lnt} from"./imp-exp.js";
export const raycaster = new THREE.Raycaster();
export const mouse = new THREE.Vector2(); //x,y pos of mouseclick
const moveMouse = new THREE.Vector2();
function getCurrentURL () {
  return window.location.href
}
var load_water;
// Example
const roomurl = getCurrentURL()

if(roomurl==='https://giraffe-design-tt8d.onrender.com'){
  load_water='/app/public/Textures/waternormals.jpg';
}else{
  var matched = roomurl.match(/([^/]*\/){3}/);
  console.log(matched[0]);
  load_water=`${matched[0]}`+'/app/public/Textures/waternormals.jpg';
}
export var obj;
export var nowObj;
export var newObj;

var objdata;

var objectdata=[];
var objectdata1=[];
var nowobjectdata=[];


export var view1Elem = document.querySelector('#view1');
export const view2Elem = document.querySelector('#view2');

export var controls = new THREE.OrbitControls(camera, view1Elem);
controls.target.set(0, 5, 0);
controls.maxDistance = 900;

controls.update();
export var editorHistory = new UndoManager();

export var transformControls = new THREE.TransformControls( camera, view1Elem);

transformControls.addEventListener( 'dragging-changed', function ( event ) {

  controls.enabled = ! event.value;

} );

window.addEventListener('click',  function (event) {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  /*if(!togl){  

  mouse.x = (( x / (canvas.clientWidth/2)) *  2 - 1);
  mouse.y = ( y / canvas.clientHeight) * - 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const found = raycaster.intersectObjects(objects);
  if(found.length>0 && found[0].object.userData.editable){

  console.log(found[0].object.userData.name);
  found[0].object.material.color.set( 'green' ); 
  transformControls.attach(found[0].object);
  transformControls.setMode('translate');
  scene.add(transformControls);
}
}else{*/


  mouse.x = ( x / canvas.clientWidth ) *  2 - 1;
  mouse.y = ( y / canvas.clientHeight) * - 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const found = raycaster.intersectObjects(objects);

  if(found.length>0 && found[0].object.userData.editable){
   obj = found[0].object;
  //obj.material.color.set( 'green' ); 
  transformControls.attach(obj);
  transformControls.setMode('translate');
  scene.add(transformControls);

  document.getElementById("uuid1").innerHTML = obj.uuid;
  document.getElementById("x").value = obj.position.x;
  document.getElementById("y").value = obj.position.y;
  document.getElementById("z").value = obj.position.z;
  document.getElementById("x_r").value = obj.rotation.x;
  document.getElementById("y_r").value = obj.rotation.y;
  document.getElementById("z_r").value = obj.rotation.z;
  document.getElementById("x_s").value = obj.scale.x;
  document.getElementById("y_s").value = obj.scale.y;
  document.getElementById("z_s").value = obj.scale.z;
 /* for(var i=0;i<objectdata.length;i++){
    console.log(objectdata[i]);
  }
if(objectdata.length>1 && objectdata[this.length]!=objectdata[this.length+1])
{
  console.log(objectdata[this.length+1]);
  objdata=getObjectData(obj);
//  }*/
}
  } )

/////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////control_toolbar//////////////////////////////////////////
  var inX = document.getElementById('x');
  inX.addEventListener('input', function() {
    obj.position.x= inX.value;
});
var inY = document.getElementById('y');
inY.addEventListener('input', function() {
  obj.position.y= inY.value;
});
var inZ = document.getElementById('z');
inZ.addEventListener('input', function() {
  obj.position.z= inZ.value;
});
var inX1 = document.getElementById('x_r');
inX1.addEventListener('input', function() {
  obj.rotation.x= inX1.value;
});
var inY1 = document.getElementById('y_r');
inY1.addEventListener('input', function() {
  obj.rotation.y= inY1.value;
});
var inZ1 = document.getElementById('z_r');
inZ1.addEventListener('input', function() {
  obj.rotation.z= inZ1.value;
});
var inX2 = document.getElementById('x_s');
inX2.addEventListener('input', function() {
  obj.scale.x= inX2.value;
});
var inY2 = document.getElementById('y_s');
inY2.addEventListener('input', function() {
  obj.scale.y= inY2.value;
});
var inZ2 = document.getElementById('z_s');
inZ2.addEventListener('input', function() {
  obj.scale.z= inZ2.value;
});
/////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////undo_redo//////////////////////////////////////////////
var oldObjData = null;
var newObjData = null;

transformControls.addEventListener( 'mouseDown', function(e) {
       oldObjData = getObjectData(obj);
       console.log(oldObjData);
        objectdata.push(oldObjData);

       document.getElementById("uuid1").innerHTML = transformControls.children[0].object.uuid;
       document.getElementById("x").value = transformControls.children[0].object.position.x;
       document.getElementById("y").value = transformControls.children[0].object.position.y;
       document.getElementById("z").value = transformControls.children[0].object.position.z;
       document.getElementById("x_r").value = transformControls.children[0].object.rotation.x;
       document.getElementById("y_r").value = transformControls.children[0].object.rotation.y;
       document.getElementById("z_r").value = transformControls.children[0].object.rotation.z;
       document.getElementById("x_s").value = transformControls.children[0].object.scale.x;
       document.getElementById("y_s").value = transformControls.children[0].object.scale.y;
       document.getElementById("z_s").value = transformControls.children[0].object.scale.z;
 } );
 transformControls.addEventListener( 'mouseUp', function(e) {
        newObjData = getObjectData(obj);
        console.log(oldObjData)
 objectdata1.push(newObjData);

 } );

 transformControls.addEventListener( 'dragging-changed', function ( e ) {
        if(e.value === false) { // End dragging
          addHistory(oldObjData, newObjData); // Store undo/redo  
          console.log("4")  
        }
 } );


function getObjectData(obj) {
  var data = {
        uuid: obj.uuid, // !Important, used in addHistory.
        position: ({x: obj.position.x, y: obj.position.y, z: obj.position.z}),
        rotation: ({x: obj.rotation._x, y: obj.rotation._y, z: obj.rotation._z}),
        scale: ({x: obj.scale.x, y: obj.scale.y, z: obj.scale.z}),
       // opacity: Number(obj.userData.opacity),
    };
    return data;
}

export function removeobj()
{
  transformControls.detach(obj);
scene.remove(obj);

}


function addHistory(oldObjData , newObjData ) {      
  
  if(oldObjData && newObjData && oldObjData.uuid == newObjData.uuid) {
   editorHistory.add({
            undo: function() {    
              if(oldObjData.uuid==obj.uuid){
                resetObject(oldObjData);
                obj.position.copy( nowObj.position );
                obj.scale.copy( nowObj.scale );
               // obj.rotation._x.copy(nowObj.rotation.x);

              }else{                
                var check=true;         

                while(check){

                for(var i=0;i<objectdata.length;i++){
                  console.log(objectdata[i]);
                  if(objectdata[i].uuid==obj.uuid && objectdata[i].position!=obj.position)             
                {
                  objdata=getObjectData(objectdata[i]);
                //  }{
                  resetObject(objdata);
                  obj.position.copy( nowObj.position );
                  obj.scale.copy( nowObj.scale );
                  obj.rotation.copy( nowObj.rotation );
                  check=false;                
                }
                  
              }
              }
            }
              },
            redo: function() {
              if(newObjData.uuid==obj.uuid){
                resetObject(newObjData);
                obj.position.copy( nowObj.position );
                obj.scale.copy( nowObj.scale );
                obj.rotation.copy( nowObj.rotation );  
              }else{                
                var check=true;         

                while(check){

                for(var i=0;i<objectdata1.length;i++){
                  console.log(objectdata1[i]);
                  if(objectdata1[i].uuid==obj.uuid)             
                {
                  objdata=getObjectData(objectdata1[i]);
                //  }{
                  resetObject(objdata);
                  obj.position.copy( nowObj.position );
                  obj.scale.copy( nowObj.scale );
                  obj.rotation.copy( nowObj.rotation );

                  check=false;
                  }
              }
              }
            }            }
        });
    }
}
function resetObject(data) {
   nowObj = {
    
    uuid:data.uuid,// you can find object by data.uuid.
    position: ({x: data.position.x, y: data.position.y, z: data.position.z}), 
    rotation: ({x: data.rotation.x, y: data.rotation.y, z: data.rotation.z}),
    scale: ({x: data.scale.x, y: data.scale.y, z: data.scale.z}),
}; 
return nowObj;
}
//////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////copy_paste/////////////////////////////////////////
var i=0;
export function cloning(){
i++;
scene.remove(transformControls);

  const objclone = obj.clone();
  objclone.position.copy(obj.position)
  objclone.scale.copy( obj.scale );
  objclone.rotation.copy(obj.rotation );
  objclone.castShadow=true;
  objclone.receiveShadow=true;
  objects.push(objclone);
  scene.add(objclone);
  objclone.userData.editable =true;
  
  if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer_kiddo = document.createElement("button");
      layer_kiddo.setAttribute('id', scene.children.length-1+lnt);
      layer_kiddo.setAttribute('class', "layer");
      document.body.appendChild(layer_kiddo);
      const node = document.getElementById(scene.children.length-1+lnt);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+lnt).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer_kiddo = document.createElement("button");
    layer_kiddo.setAttribute('id', scene.children.length-1);
    layer_kiddo.setAttribute('class', "layer");
    document.body.appendChild(layer_kiddo);
    const node = document.getElementById(scene.children.length-1);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}

}
export var uploaded_image;

const image_input = document.querySelector("#image-input");
image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;

    document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
    
  });
  reader.readAsDataURL(this.files[0]); //read contents of the file
////for obj textures///////////// edw kalytera na stelnw to up adi to uploaded image
//var up = URL.createObjectURL(this.files[0]);  
}); 

///////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////colour_palette///////////////////////////////////////

export let colorpicker;
const defaultColor = "#f1f1f1";

window.addEventListener("load", startup, false);

function startup() {
  colorpicker = document.getElementById("colorpicker");
  colorpicker.value = defaultColor;
  colorpicker.addEventListener("input", updateFirst, false);
  colorpicker.select();
}

function updateFirst(event) {
  const sb = scene.background;
    sb.set(event.target.value);
}

export let colorpicker2;
const defaultColor2 = "#025702";

window.addEventListener("load", startup1, false);

function startup1() {
  colorpicker2 = document.getElementById("colorpicker2");
  colorpicker2.value = defaultColor2;
  colorpicker2.addEventListener("input", updateFirst1, false);
  colorpicker2.select();
}

function updateFirst1(event) {
  obj.material.color.set( event.target.value );
}
/////////////////////////////////////////////////////////////////////////////////
//const gui = new GUI();


var sun = new THREE.Vector3();
sun.castShadow=true;

/*
var ground;

var rgb=new THREE.RGBELoader().load('textures/small_empty_room_1_8k.hdr', texture => {
  const gen = new THREE.PMREMGenerator(renderer)
  const envMap = gen.fromEquirectangular(texture).texture
  scene.environment = envMap
  scene.background = envMap
  
  texture.dispose()
  gen.dispose()
})
*/

export	var	water;
				// Water
       export function addocean(){
if(check===false){
				const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

			water = new THREE.Water(
					waterGeometry,
					{
						textureWidth: 512,
						textureHeight: 512,
						waterNormals: new THREE.TextureLoader().load( load_water, function ( texture ) {

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

						} ),
						sunDirection: new THREE.Vector3(),
						sunColor: 0xffffff,
						waterColor: 0x001e0f,
            side:THREE.DoubleSide,
						distortionScale: 1.1,
						fog: scene.fog !== undefined
					}
				);

				water.rotation.x = - Math.PI / 2;
objects.push(water);
water.userData.editable =true;
water.name="Water";

				scene.add( water );

        const waterUniforms = water.material.uniforms;
				waterUniforms[ 'size' ].value = 10;

				/*const folderWater = gui.addFolder( 'Water' );
				folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
				folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
				folderWater.open();
        */
        
      }else{
        const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

        water = new THREE.Water(
            waterGeometry,
            {
              textureWidth: 512,
              textureHeight: 512,
              waterNormals: new THREE.TextureLoader().load( load_water, function ( texture ) {
  
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  
              } ),
              sunDirection: new THREE.Vector3(),
              sunColor: 0xffffff,
              waterColor: 0x001e0f,
              side:THREE.DoubleSide,
              distortionScale: 1.1,
              fog: scene.fog !== undefined
            }
          );
  
          water.rotation.x = - Math.PI / 2;
  objects.push(water);
  water.userData.editable =true;
  water.name="Water";
 // water.geometry.deleteAtrribute('position');
  water.position.x=pos[0]
  water.position.y=pos[1]
  water.position.z=pos[2]

  water.rotation.x=rot[0]
  water.rotation.y=rot[1]
  water.rotation.z=rot[2]

  water.scale.x=scl[0]
  water.scale.y=scl[1]
  water.scale.z=scl[2]

          scene.add( water );
  
          const waterUniforms = water.material.uniforms;
          waterUniforms[ 'size' ].value = 10;
//check=false;
      }
    }
				// Skybox

				const sky = new THREE.Sky();
				sky.scale.setScalar( 10000 );
        sky.userData.name="Sky";
				scene.add( sky );

				const skyUniforms = sky.material.uniforms;

				skyUniforms[ 'turbidity' ].value = 7;
				skyUniforms[ 'rayleigh' ].value = 2;
				skyUniforms[ 'mieCoefficient' ].value = 0.005;
				skyUniforms[ 'mieDirectionalG' ].value = 0.8;

				const parameters = {
					elevation: 2,
					azimuth: 180
				};

				const pmremGenerator = new THREE.PMREMGenerator( renderer );
				const sceneEnv = new THREE.Scene();

				let renderTarget;

				function updateSun() {

					const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
					const theta = THREE.MathUtils.degToRad( parameters.azimuth );

					sun.setFromSphericalCoords( 1, phi, theta );

					sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
				if(water!=null)	water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

					if ( renderTarget !== undefined ) renderTarget.dispose();

					sceneEnv.add( sky );
					renderTarget = pmremGenerator.fromScene( sceneEnv );
					scene.add( sky );

					scene.environment = renderTarget.texture;

				}

				updateSun();

		//		const geometry = new THREE.BoxGeometry( 30, 30, 30 );
		//		const material = new THREE.MeshStandardMaterial( { roughness: 0 } );

		//	var	mesh = new THREE.Mesh( geometry, material );
		//		scene.add( mesh );

				//

				/*controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.495;
				controls.target.set( 0, 10, 0 );
				controls.minDistance = 40.0;
				controls.maxDistance = 200.0;
				controls.update();
*/
				//

			/*	stats = new Stats();
				container.appendChild( stats.dom );
*/
				// GUI

/*
				const folderSky = gui.addFolder( 'Sky' );
				folderSky.add( parameters, 'elevation', 0, 90, 0.1 ).onChange( updateSun );
				folderSky.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
				folderSky.open();
*/
       // water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

				//

///////////////////layers//////////////////////

var btn_layer = document.getElementById('layers');
btn_layer.addEventListener('click', function(event) {
console.log(event.target);
if(lnt===null){
  if(event.target.id>scene.children.length-3 && scene.children[scene.children.length-2].children.length>1){
    if(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)].type==="Object3D"){
    transformControls.attach(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)].children[0]);
    obj=null;
    obj=scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)].children[0];
    }else{
      transformControls.attach(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)]);
      obj=null;
      obj=scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)];

    }
  }else{
if(scene.children[event.target.id].type!="Scene"){
transformControls.attach(scene.children[event.target.id]);
obj=null;
obj=scene.children[event.target.id];
}else{
  transformControls.attach(scene.children[event.target.id].children[0]);
  obj=null;
  obj=scene.children[event.target.id].children[0]

}}
}else{
  if(event.target.id>scene.children.length-3 && scene.children[scene.children.length-2].children.length>1){
    if(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt].type==="Object3D"){
    transformControls.attach(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt].children[0]);
    obj=null;
    obj=scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt].children[0];
    }else{
      transformControls.attach(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt]);
      obj=null;
      obj=scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt];

    }
  }else{
  if(scene.children[event.target.id-lnt].type!="Scene"){
    transformControls.attach(scene.children[event.target.id-lnt]);
    obj=null;
    obj=scene.children[event.target.id-lnt];

    }else{
      transformControls.attach(scene.children[event.target.id-lnt].children[0]);
      obj=null;
      obj=scene.children[event.target.id-lnt].children[0];
    }
}
}
});