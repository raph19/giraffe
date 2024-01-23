import{canvas,renderer}from "./renderer.js";
import{mouse,view1Elem,transformControls,obj,controls,colorpicker,colorpicker2, uploaded_image}from"./controls.js";
import{camera}from"./camera.js";
import{objects,geometry}from"./3dobjects.js";
import{scene}from"./scene.js";
import{render}from"./render.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { uploaded,uploaded_obj,uploadedmtl,mtlLoader,loader2,gltf_model_counter_signal,obj_model_counter_signal} from "./imp-exp.js";


let socket = io.connect('https://localhost:3000');
let startButton = document.getElementById("startButton");
var check=false;
let count;
const loader_team = new THREE.TextureLoader();
const loader = new GLTFLoader();


function getCurrentURL () {
  return window.location.href
}

// Example
const roomurl = getCurrentURL()

socket.on('connect', function() {
  // Connected, let's sign-up for to receive messages for this room
  socket.emit('room', roomurl);

/*socket.on('startGame-1', (arg) => {
  var newscene = new THREE.ObjectLoader().parse( JSON.parse( arg ) );
   scene.add(newscene); 
   
       });*/
}); 



const serializedScene2 = JSON.stringify(scene);

socket.emit('startGame-1',serializedScene2, (err) => {
  if (err) {
    alert(err);
  }
});
       
Object.keys(window).forEach(key => {
    if ( /^on(?!mouse|pointer)/) {check=false;
        window.addEventListener(key.slice(2), event => {if(!check){ 
            //console.log(event)
 

/////////////////////////////////simulate clicks//////////////////////////////////////
            if(event.type==='click' && event.target.id!='view1' && (event.target.id==='cube' || event.target.id==='sphere' || event.target.id==='tetrahedron' || event.target.id==='cylinder'|| event.target.id==='ocean')){
                //console.log(event.target.id, key);
            var clickdata={
                id:event.target.id,
                timeStamp:event.timeStamp,
                type:event.type,
                clientX:event.clientX,
                clientY:event.clientY
            };
            
            socket.emit('startGame',clickdata, (err) => {
                if (err) {
                  alert(err);
                }
              });
            }
              else if(event.type==='click' && event.target.id==='image' && uploaded_image!=null){

                /*var byteArray = new Uint8Array(uploaded_image.length);
                for (var b = 0; b < uploaded_image.length; b++) {
                     byteArray[b] = uploaded_image.charCodeAt(b);
                }*/
              
//.replace(/^data[^,]+,/,'')
 /*var byteArray = new Uint8Array(uploaded_image.length);
                for (var b = 0; b < uploaded_image.length; b++) {
                     byteArray[b] = uploaded_image.charCodeAt(b);
                }*/
                
              const blob = new Blob([uploaded_image], {type: 'text/plain'});

            //    var img_clickdata={
             //     id:event.target.id,
              //base64:blob
            //    };
                  socket.emit('startGame2',blob, (err) => {
                    if (err) {
                      alert(err);
                    }
                  });
              }else if(event.type==='click' && event.target.id==='model' && gltf_model_counter_signal===1){
                // upload a file to the server.

                socket.emit('startGame3',uploaded, (err) => {
                  if (err) {
                    alert(err);
                  }
                })
                //uploaded=null;
              }else if(event.type==='click' && event.target.id==='model' && obj_model_counter_signal===1){
                var up_obj={
                  mtl:uploadedmtl,
                  obj:uploaded_obj
              };
                socket.emit('startGame7',up_obj, (err) => {
                  if (err) {
                    alert(err);
                  }
                })
              //  uploaded_obj=null;
              }
            
            else if(event.target.id==='colorpicker'){
              var colour={
              
                back_colour:colorpicker.value
              
              };
              socket.emit('startGame5',colour, (err) => {
                if (err) {
                  alert(err);
                }
              });
            }else if(event.target.id==='colorpicker2'){
              for (var i=0;i<objects.length;i++){
                if(obj.uuid===objects[i].uuid){
                 var count1=i;
                  break;
                }
              }
              var colour_obj={
              counter:count1,
                obj_colour:colorpicker2.value
              
              };
              socket.emit('startGame6',colour_obj, (err) => {
                if (err) {
                  alert(err);
                }
              });
            }
            
            
            ///////////////simulate window//////////////////////
            else if ( event.target.id==='view1'){
///////////////////////////////////put arrows////////////////////////////////////////
                    /*if(event.type==='click' && obj!=null){
                      console.log(event,event.target.id, key);
                        for (var i=0;i<objects.length;i++){
                          if(obj.uuid===objects[i].uuid){
                            count=i;
                            break;
                          }
                        }
                      socket.emit('startGame2',count, (err) => {
                        if (err) {
                          alert(err);
                        }
                      });
                     }/*///////////////////////////////////////////////
                       if(event.type==='mousemove'){
                      
                      console.log(event);
                      /*var orbitcontrol={
                        positionx:controls.object.position.x,                
                        positiony:controls.object.position.y,
                        positionz:controls.object.position.z,

                        rotationx:controls.object.rotation.x,
                        rotationy:controls.object.rotation.y,
                        rotationz:controls.object.rotation.z

                      };
                      console.log(controls);
                      socket.emit('startGame3',orbitcontrol, (err) => {
                        if (err) {
                          alert(err);
                        }
                      });  */for (var i=0;i<objects.length;i++){
                          if(obj.uuid===objects[i].uuid){
                            count=i;
                            break;
                          }
                        }
                                  var transform={
                                    counter:count,
                                    positionx:transformControls.children[0].object.position.x,                
                                    positiony:transformControls.children[0].object.position.y,
                                    positionz:transformControls.children[0].object.position.z,

                                    rotationx:transformControls.children[0].object.rotation.x,
                                    rotationy:transformControls.children[0].object.rotation.y,
                                    rotationz:transformControls.children[0].object.rotation.z,

                                    scalex:transformControls.children[0].object.scale.x,
                                    scaley:transformControls.children[0].object.scale.y,
                                    scalez:transformControls.children[0].object.scale.z
                          };
                          
                          console.log(controls);
                          socket.emit('startGame4',transform, (err) => {
                            if (err) {
                              alert(err);
                            }
                          });

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

                          
            }
          
            }
          }else{
            check=false;
          }
    });
            }
});
//}



socket.on('startGame', (arg) => {

  if(arg.type==='click'){
            console.log(arg.id);
            const bat=document.getElementById(arg.id);
            check=true;
    bat.click(); 
  }
      });

socket.on('startGame2', (arg) => {
  var url1;
  function arrayBufferToBase64( arg ) {
    var binary = '';
    var bytes = new Uint8Array( arg );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return url1 = binary ;
  }arrayBufferToBase64(arg);

  //document.querySelector("#uploadimage").style.backgroundImage = `url(${url1})`;
function makeInstance(geometry, color, rotY, url) {
  const texture = loader_team.load(url, 1);
  const material = new THREE.MeshStandardMaterial({
    color,
    map: texture,
    alphaTest: 0.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  objects.push(mesh)
  scene.add(mesh);
  mesh.userData.editable =true;
  mesh.userData.name = 'img';
  mesh.rotation.y = rotY;
}
makeInstance(geometry, 'white', 0,url1);  
//check=true;
//bat2.click();
  });

  socket.on('startGame3', (arg) => {

    const blob = new Blob([arg], {type: 'text/plain'});
    var upload = URL.createObjectURL(blob);  

    loader.load(upload, (gltf) => {
      let hasMesh = false;
  scene.add(gltf.scene);
gltf.scene.traverse( function( object ) {
        if ( object.isMesh  ) objects.push( object );
        if ( object.isMesh ) objects.castShadow = true;  if (object.isMesh) hasMesh = true;      
        object.userData.editable=true;    
      } );
     
console.log(objects[0]);
console.log(hasMesh ? 'Found meshes!' : 'No meshes.');
});
  /*load.traverse( function( object ) {
        if ( object.isMesh  ) objects.push( object );
        if ( object.isMesh ) objects.castShadow = true;  if (object.isMesh) hasMesh = true;      
        object.userData.editable=true;    
      } );
     
console.log(objects[0]);
console.log(hasMesh ? 'Found meshes!' : 'No meshes.');*/
    });
//gltf.scene.traverse( function( object ) {
 //       if ( object.isMesh  ) objects.push( object );
   //     if ( object.isMesh ) objects.castShadow = true;  if (object.isMesh) hasMesh = true;      
   //     object.userData.editable=true;    
   //   } );
     
//console.log(objects[0]);
//console.log(hasMesh ? 'Found meshes!' : 'No meshes.');

/*socket.on('startGame2', (arg) => {
console.log(arg);

    /*transformControls.attach(objects[arg]);
    transformControls.setMode('translate');
    scene.add(transformControls);
 
    document.getElementById("uuid1").innerHTML = objects[arg].uuid;
    document.getElementById("x").value = objects[arg].position.x;
    document.getElementById("y").value = objects[arg].position.y;
    document.getElementById("z").value = objects[arg].position.z;
    document.getElementById("x_r").value = objects[arg].rotation.x;
    document.getElementById("y_r").value = objects[arg].rotation.y;
    document.getElementById("z_r").value = objects[arg].rotation.z;
    document.getElementById("x_s").value = objects[arg].scale.x;
    document.getElementById("y_s").value = objects[arg].scale.y;
    document.getElementById("z_s").value = objects[arg].scale.z;


  });
*/
//////////////////////////////////////////////

/*socket.on('startGame3', (arg) => {
 console.log(arg.position);
 controls.object.position.x=arg.positionx
 controls.object.position.y=arg.positiony
 controls.object.position.z=arg.positionz

 controls.object.rotation.x=arg.rotationx 
 controls.object.rotation.y=arg.rotationy
 controls.object.rotation.z=arg.rotationz


// controls.update();
console.log(controls);
});*/

socket.on('startGame4', (arg) => {
  console.log(arg.position);
  /*transformControls.children[0].*/objects[arg.counter].position.x=arg.positionx
  objects[arg.counter].position.y=arg.positiony
  objects[arg.counter].position.z=arg.positionz
 
  objects[arg.counter].rotation.x=arg.rotationx 
  objects[arg.counter].rotation.y=arg.rotationy
  objects[arg.counter].rotation.z=arg.rotationz
  objects[arg.counter].scale.x=arg.scalex 
  objects[arg.counter].scale.y=arg.scaley
  objects[arg.counter].scale.z=arg.scalez
 // controls.update();
 document.getElementById("uuid1").innerHTML = objects[arg.counter].uuid;
 document.getElementById("x").value = objects[arg.counter].position.x;
 document.getElementById("y").value = objects[arg.counter].position.y;
 document.getElementById("z").value = objects[arg.counter].position.z;
 document.getElementById("x_r").value = objects[arg.counter].rotation.x;
 document.getElementById("y_r").value = objects[arg.counter].rotation.y;
 document.getElementById("z_r").value = objects[arg.counter].rotation.z;
 document.getElementById("x_s").value = objects[arg.counter].scale.x;
 document.getElementById("y_s").value = objects[arg.counter].scale.y;
 document.getElementById("z_s").value = objects[arg.counter].scale.z; 
 });

 socket.on('startGame5', (arg) => {
  scene.background.set(arg.back_colour);

  });

  socket.on('startGame6', (arg) => {

    objects[arg.counter].material.color.set(arg.obj_colour);
  
    });
    socket.on('startGame7', (arg) => {

      const blob_obj = new Blob([arg.obj], {type: 'text/plain'});
      var upload_obj = URL.createObjectURL(blob_obj);  
  
      const blob_mtl = new Blob([arg.mtl], {type: 'text/plain'});
      var upload_mtl = URL.createObjectURL(blob_mtl);  

      mtlLoader.load(
        upload_mtl,
        (materials) => {
            materials.preload();
            console.log(materials);
            // const objLoader = new OBJLoader()            
    loader2.setMaterials(materials);
              loader2.load( upload_obj, (obj) => {   
                             
    materials.vertexColors = true
          let hasMesh = false;
          if(obj.children[0].type=='Mesh'){
            
      scene.add(obj);
    
      if(lnt!=null){
    
        if(scene.children[scene.children.length-1]!=null){
    
          const layer = document.createElement("div");
          layer.setAttribute('id', scene.children.length-1);
          document.body.appendChild(layer);
          const node = document.getElementById(scene.children.length-1);
          document.getElementById("layers").appendChild(node);
          document.getElementById(scene.children.length-1).innerHTML = file.name.split('.').slice(0, -1).join('.');
        }
        }else{
    
          if(scene.children[scene.children.length-1]!=null){
    
            const layer = document.createElement("div");
            layer.setAttribute('id', scene.children.length-1);
            document.body.appendChild(layer);
            const node = document.getElementById(scene.children.length-1);
            document.getElementById("layers").appendChild(node);
            document.getElementById(scene.children.length-1).innerHTML = file.name.split('.').slice(0, -1).join('.');
        }
      }
    
    
    obj.traverse( function( object ) {
            if ( object.isMesh  ) objects.push( object );
            if ( object.isMesh ) object.castShadow = true;  
            if ( object.isMesh ) object.receiveShadow = true;
            if (object.isMesh) hasMesh = true;      
            object.userData.editable=true;    
            if (object.isMesh) object.material.side=THREE.DoubleSide;
          } );
         
    console.log(objects[0]);
    console.log(hasMesh ? 'Found meshes!' : 'No meshes.');
        }else if(obj.children[0].type=='Points'){ 
          obj.layers.disable();
         // for(var i=0;i<obj.children[0].geometry.groups.length;i++){
      //   var geometry = new THREE.ConvexGeometry( );
        const groupArray=[];
    var mat=[];
    var vertices=[];
        /* for ( let i = 0; i < obj.children[0].geometry.attributes.position.array.length; ) {
    
          var x = obj.children[0].geometry.attributes.position.array[i];
          var y = obj.children[0].geometry.attributes.position.array[i+1];
          var z = obj.children[0].geometry.attributes.position.array[i+2];
          vertices.push( x, y, z );
           i+=3;
     
      
          }
    
        const geometry = new THREE.BufferGeometry();
        // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        const material = new THREE.PointsMaterial( { color: 0x888888 } );
        geometry.setAttribute(
                  'position',
                  new THREE.Float32BufferAttribute(new Float32Array(vertices), 3)
                );
                geometry.verticesNeedUpdate = true;
                geometry.computeVertexNormals();
                geometry.setDrawRange( 0, vertices.length );  
                geometry.boundingSphere=0;
              //  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
              material=mat;
                const points = new THREE.Points( geometry, material );
                scene.add( points );
                
         // const mesh = new THREE.Mesh( geometry, material1 );
         // scene.add( mesh );
        //}*/ 
             for ( var n = 0; n < obj.children[0].geometry.groups.length; n++) {
    
          var group_obj=obj.children[0].geometry.groups[n];
    
          groupArray.push( group_obj );
    
          }
    /*    for ( let i = 0; i < obj.children[0].geometry.attributes.position.array.length; ) {
          const x = obj.children[0].geometry.attributes.position.array[i]/10000;
          const y = obj.children[0].geometry.attributes.position.array[i+1]/10000;
          const z = obj.children[0].geometry.attributes.position.array[i+2]/10000;
        
          vertices.push( x, y, z );
          i=i+3;
        }*/
    
        for ( let i = 0; i < obj.children[0].geometry.attributes.position.array.length; ) {
          const x = obj.children[0].geometry.attributes.position.array[i]/545;
          const y = obj.children[0].geometry.attributes.position.array[i+1]/545;
          const z = obj.children[0].geometry.attributes.position.array[i+2]/545;
        
          vertices.push( x, y, z );
          i=i+3;
        }
        
          for ( var count = 0; count < obj.children[0].material.length; count++) {
    
            var material_obj=obj.children[0].material[count];
      
            mat.push( material_obj );
      
            }
    
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices,3 ));
        //geometry.computeVertexNormals();
        //geometry.normalizeNormals();
                geometry.groups= groupArray;
               // geometry.boundingSphere=0;
        const material = mat;
        const points = new THREE.Points( geometry, material );
        /*
    
    
            const Shape = new THREE.Shape(vertices);
        const geom = new THREE.ShapeBufferGeometry(Shape);
    
    
    */
    const geom= new THREE.BufferGeometry( points);
    
    geom.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices,3 ));
    //geom.computeVertexNormals();
    //geometry.normalizeNormals();
    geom.groups= groupArray;
    
    geom.computeBoundingBox();
    geom.translate(
            -geom.boundingBox.min.x,
            -geom.boundingBox.min.y,
            -geom.boundingBox.min.z);
    
          /*  const geoms=[]
            const point=[]
            obj.updateMatrixWorld(true,true)
            obj.traverse(e=>e.isPoints && point.push(e) && (geoms.push(( e.geometry.index ) ? e.geometry.toNonIndexed() : e.geometry().clone())));
            geoms.forEach((g,i)=>g.applyMatrix4(point[i].matrixWorld));
            const gg = new THREE.BufferGeometryUtils.mergeBufferGeometries(geoms,true);
            gg.applyMatrix4(obj.matrix.clone().invert());
            gg.userData.materials = point.map(m=>m.material);
            const mesh = new THREE.Mesh( gg,gg.userData.materials);
            objects.push(mesh);
              mesh.castShadow = true; 
              mesh.receiveShadow = true; 
          
              mesh.userData.editable=true;
                
          scene.add(mesh);
    */
    
            
        var mesh = new THREE.Mesh( geom,material );
        //mesh.traverse( function( object ) {       
        
       //  if ( object.material[i].type==='PointsMaterial' ) {
      //  objects.push(mesh);
      //  mesh.castShadow = true; 
       // mesh.receiveShadow = true; 
    
      //  mesh.userData.editable=true;
          
          //mesh.boundingSphere.setFromPoints( vertices )
    
       // }}
          //
         // if( object.type ==='DirectionalLight' || object.type==='CameraHelper' || object.type==='GridHelper' ){
         //   scened.remove(object);
    
     // } );
        }
     
    
    
    scene.add(mesh);
    if(lnt!=null){
    
      if(scene.children[scene.children.length-1]!=null){
    
        const layer = document.createElement("div");
        layer.setAttribute('id', scene.children.length-1);
        layer.setAttribute('class', "layer");
        document.body.appendChild(layer);
        const node = document.getElementById(scene.children.length-1);
        document.getElementById("layers").appendChild(node);
        document.getElementById(scene.children.length-1).innerHTML = file.name.split('.').slice(0, -1).join('.');;
      }
      }else{
    
        if(scene.children[scene.children.length-1]!=null){
    
          const layer = document.createElement("div");
          layer.setAttribute('id', scene.children.length-1);
          layer.setAttribute('class', "layer");
          document.body.appendChild(layer);
          const node = document.getElementById(scene.children.length-1);
          document.getElementById("layers").appendChild(node);
          document.getElementById(scene.children.length-1).innerHTML = file.name.split('.').slice(0, -1).join('.');;
      }
    }
    });
      });
});
function hideStartButton() {
    startButton.style.display = "none";
}

