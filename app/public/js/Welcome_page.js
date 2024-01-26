import{UndoManager}from "../js/undo-manager.js";


var j=0;

let  scene_post = new THREE.Scene();
let renderer;
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let canvas;
let camera;
let obj;
let controls;
let objectdata=[];
let objectdata1=[];
let oldObjData = null;
let newObjData = null;
let nowObj;
let newObj;
let editorHistory = new UndoManager();

document.getElementById("next").onclick = function() {changebox();j++};


function changebox(){
if(j==0){
    document.getElementById("par").innerHTML="Let's take a journey through the application and its features, ready?";
}else if(j==1){
    const container_vid = document.createElement("video");
    document.getElementById("welcome_box").appendChild(container_vid);
    container_vid.setAttribute('id', 'container_vid');

          container_vid.setAttribute('width', '720');
          container_vid.setAttribute('height', '480');
          container_vid.setAttribute('controls','controls');
          const container_source = document.createElement("source");
          container_source.setAttribute('src', 'textures/home_vid.mp4');
          container_source.setAttribute('type', 'video/mp4');
          container_vid.appendChild(container_source);
          document.getElementById("welcome_box").style.top="-126%";
          document.getElementById("next").style.bottom="-586px;";
          document.getElementById("next").style.left="94%";
          document.getElementById("paragraph").style.width="46%";
          document.getElementById("paragraph").style.left="2%";

    document.getElementById("par").innerHTML="This is the home page. Here, you can post your designs and receive feedback from the community.";
}else if(j==2){

    var rmv_vid= document.getElementById("welcome_box");
    rmv_vid.removeChild(rmv_vid.lastElementChild);

    document.getElementById("par").innerHTML="You work your designs on a 3d space. You can try to hold left click and rotate through the scene, hold right click to move your point on view and go back and forth with the cursor to zoom in and out.";
    document.getElementById("next").style.bottom="-410px";

    const windo_scene = document.createElement("div");
    document.getElementById("welcome_box").appendChild(windo_scene);
    windo_scene.setAttribute('class', 'windo_scene');

    canvas = document.createElement("canvas");
    windo_scene.appendChild(canvas);
    canvas.setAttribute('class', "c1");
    canvas.setAttribute('id', "cc1");

  

    scene_post.background = new THREE.Color('#f1f1f1');
    //scene_post.add(new THREE.GridHelper(100,50));

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 1;
    const far = 30000000;
     camera = new THREE.PerspectiveCamera(fov, aspect, near, far);         
     renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas });

     camera.position.z = 27;
     camera.position.x = 0;
     camera.position.y = 10;

     function resizeRendererToDisplaySize(renderer) {
       const canvas = renderer.domElement;
       const width = canvas.clientWidth;
       const height = canvas.clientHeight;
       const needResize = canvas.width !== width || canvas.height !== height;
       if (needResize) {
         renderer.setSize(width, height, false);
       }
       return needResize;
     }

     
      function setScissorForElement(elem) {
       const canvasRect = canvas.getBoundingClientRect();
       const elemRect = elem.getBoundingClientRect();
     
       // compute a canvas relative rectangle
       const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
       const left = Math.max(0, elemRect.left - canvasRect.left);
       const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
       const top = Math.max(0, elemRect.top - canvasRect.top);
     
       const width = Math.min(canvasRect.width, right - left);
       const height = Math.min(canvasRect.height, bottom - top);
     
       // setup the scissor to only render to that part of the canvas
       const positiveYUpBottom = canvasRect.height - bottom;
       renderer.setScissor(left, positiveYUpBottom, width, height);
       renderer.setViewport(left, positiveYUpBottom, width, height);
     
       // return the aspect
       return width / height;
     }


     function fix(){
       resizeRendererToDisplaySize(renderer);
        // turn on the scissor
        renderer.setScissorTest(true);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure=2.3;
        renderer.shadowMap.enabled=true;
        // render the original view
        {
          const aspect = setScissorForElement(canvas);
    
          // adjust the camera for this aspect
          camera.aspect = aspect;
          camera.updateProjectionMatrix();
    
          // don't draw the camera helper in the original view
    
          //scene.background.set('#f1f1f1');
          
          // render
          
          renderer.render(scene_post, camera);
    }
    }
         // Skybox
 var sun = new THREE.Vector3();
 sun.castShadow=true;
         const sky = new THREE.Sky();
         sky.scale.setScalar( 10000 );
 sky.userData.name="Sky";
         scene_post.add( sky );

         const skyUniforms = sky.material.uniforms;

         skyUniforms[ 'turbidity' ].value = 0.3;
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
     //	if(water!=null)	water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

             if ( renderTarget !== undefined ) renderTarget.dispose();

             sceneEnv.add( sky );
             renderTarget = pmremGenerator.fromScene( sceneEnv );
             scene_post.add( sky );

             scene_post.environment = renderTarget.texture;

         }

         updateSun();
 var spotLight;
 function lights (){     const intensity =4;
 var light=new THREE.DirectionalLight(0xffa95c,1);
   spotLight= new THREE.SpotLight(0xffa95c,intensity);
     const color = 0xFFFFFF;
     const hemilight = new THREE.HemisphereLight(0xffeeb1,0x000000, intensity);
     //light.position.set(0, 10, 10);
     //light.target.position.set(-5, 0, 0);
     scene_post.add(hemilight);
       spotLight.castShadow = true;
       spotLight.shadow.bias = -0.0001;
       spotLight.shadow.mapSize.width=1024*4;
       spotLight.shadow.mapSize.height=1024*4;
 
       scene_post.add(spotLight);
       scene_post.add(light);
     //scene.add(light.target);
     //light.castShadow=true;
   }lights ();
    function anime(){
        // render from the 2nd camera
        window.requestAnimationFrame(render);
      }
      
    let start;
    start=performance.now();

    function render() {
     fix();
        
    anime();
    spotLight.position.set(

     camera.position.x +10,
     camera.position.y +10,
     camera.position.z +10,

   ) 
     }
    anime();
     let timelaplse=performance.now()-start;
    console.log(timelaplse);

controls = new THREE.OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);controls.panSpeed = 1.0;

controls.update();
}else if(j==3){
var transformControls = new THREE.TransformControls( camera, canvas);
transformControls.addEventListener( 'dragging-changed', function ( event ) {

  controls.enabled = ! event.value;

} );
    document.getElementById("par").innerHTML="You can load 3d objects on the scene. Try to click on the cube. These are your controls where you can move the object wherever you want in space. By pressing 's' you can rescale the object, 'r' to rotate it and 't' to move through x,y,z axis.";
var welcome_page_objects = [];
    const cubeSize = 2;
    const object = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshStandardMaterial({color: 'grey',side: THREE.DoubleSide});
    var cube = new THREE.Mesh(object, cubeMat);
    cube.position.set(cubeSize + 1, cubeSize / 2, 0);
    cube.castShadow=true;
    cube.receiveShadow=true;
    welcome_page_objects.push(cube);
    scene_post.add(cube);
    cube.userData.editable =true;
    window.addEventListener('click',  function (event) {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
    
    
      mouse.x = ( x / canvas.clientWidth ) *  2 - 1;
      mouse.y = ( y / canvas.clientHeight) * - 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const found = raycaster.intersectObjects(welcome_page_objects);
    
      if(found.length>0 && found[0].object.userData.editable){
       obj = found[0].object;
      //obj.material.color.set( 'green' ); 
      transformControls.attach(obj);
      transformControls.setMode('translate');
      scene_post.add(transformControls);

    }
      } )
      
      transformControls.addEventListener( 'mouseDown', function(e) {
             oldObjData = getObjectData(obj);
             console.log(oldObjData);
              objectdata.push(oldObjData);
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
      

      window.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 't':
                transformControls.setMode('translate')
                break
            case 'r':
                transformControls.setMode('rotate')
                break
            case 's':
                transformControls.setMode('scale')
                break
                case 'z':
                    /*if(newObjData==null){
                        objects.pop(obj);
                        scene.remove(obj);
                        scene.remove(transformControls);
                        console.log(obj.position);
        
                    }else{ */
                     
                    editorHistory.undo();
                   
                //}
                
                    //obj.position.set()
                break
                case 'y':
                    editorHistory.redo();
                    break
        
                case 'c':
                    scene_post.remove(transformControls);
                    
                      const objclone = obj.clone();
                      objclone.position.copy(obj.position)
                      objclone.scale.copy( obj.scale );
                      objclone.rotation.copy(obj.rotation );
                      objclone.castShadow=true;
                      objclone.receiveShadow=true;
                      welcome_page_objects.push(objclone);
                      scene_post.add(objclone);
                      objclone.userData.editable =true;                    
                  
                      break
        
                    case'd':
                    transformControls.detach(obj);
                    scene_post.remove(obj);                    
                    break
                        /*case'`':
                if(togl){
                            document.getElementById('view1').style.width="100%";
                          togl=false;      
                  }else{
                            document.getElementById('view1').style.width="200%";
                            document.getElementById('view2').style.width="0%";  
                          togl=true;
                  }    
            break*/
        
        }
        })
}else if(j==4){
  document.getElementById("par").innerHTML="You can use 'z' to undo a move and 'y' to redo.";
}else if(j==5){
  document.getElementById("par").innerHTML="Now try to press 'c' to clone the object. If you want to delete an object from the scene press 'd'.";
}else if(j==6){
  document.getElementById("par").innerHTML="This is your colour pallete, where you can color your objects. Try it!";

  var lbl = document.createElement("label");
  lbl.setAttribute('for', "colorpicker22");
  document.getElementById("welcome_box").appendChild(lbl);

  var inputt = document.createElement("input");
  inputt.setAttribute('type', "color");
  inputt.setAttribute('id', "colorpicker22");

  document.getElementById("welcome_box").appendChild(inputt);

  let colorpicker22=document.getElementById("colorpicker22");
  let defaultColor2 = "#D2CBCB";
  colorpicker22.value=defaultColor2;
    colorpicker22 = document.getElementById("colorpicker22");
    colorpicker22.value = defaultColor2;
    colorpicker22.addEventListener("input",function(event){
      obj.material.color.set( event.target.value );
    });
   // colorpicker2.select();

}else if(j=7){
  document.getElementById("par").innerHTML="You can also dress up your objects by adding textures on them. This helps, so they look like a material of your choice";
  var rmv_pallete= document.getElementById("welcome_box");
  rmv_pallete.removeChild(rmv_pallete.lastElementChild);
  rmv_pallete.removeChild(rmv_pallete.lastElementChild);

  var Add_Texture = document.createElement("button");
  Add_Texture.setAttribute('id', "texture");
  document.getElementById("welcome_box").appendChild(Add_Texture);
  document.getElementById("texture").innerHTML="Add Texture";
  var In_Texture = document.createElement("input");
  In_Texture.setAttribute('type', "file");

  In_Texture.setAttribute('id', "texture-input");
  In_Texture.setAttribute('accept', "image/jpeg, image/png, image/jpg, image/gif");

  document.getElementById("welcome_box").appendChild(In_Texture);

  var divIn_Texture= document.createElement("div");
  divIn_Texture.setAttribute('id', "uploadtexture");

///////////////////texture load//////////////////
var uploaded_texture;
var up_text;
var loader3= new THREE.TextureLoader();
const input3 = document.querySelector("#texture-input");
input3.addEventListener("change", (event) => {
  const file3 = event.target.files[0];

  
   uploaded_texture = URL.createObjectURL(file3);  
   
  const reader3 = new FileReader();
  reader3.addEventListener("load", () => {
    up_text = reader3.result;
   // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
    
  });
  reader3.readAsArrayBuffer(file3); //read contents of the file
  document.getElementById("texture").onclick = function() {

  loader3.load(uploaded_texture,
    
    function ( texture ) {
		// in this example we create the material when the texture is loaded
		obj.material = new THREE.MeshBasicMaterial( {
			map: texture,
      side:THREE.DoubleSide
		 } );
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.error( 'An error happened.' );
	}
);
      }
      });
      document.getElementById("texture").onclick = function() {document.getElementById("texture-input").style.display="inline-grid";};


}else if(j==7){
  document.getElementById("par").innerHTML="These are the very basics, hit next and explore more inside the application :)";
}else if(j==8){
  var a = document.getElementById('next'); 
  a.href = "https://giraffe-design-tt8d.onrender.com/editor"}

}