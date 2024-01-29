import {_GLTFExporter} from "./three-gltf-exporter/index.js";
import { scene } from "./scene.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { Loop } from "./Loop.js";
var loop = new Loop(camera, scene, renderer);
import{camera} from"./camera.js"
import { renderer } from "./renderer.js";
import{STLExporter} from "./stlexporter.js";
import{objects,editable} from "./3dobjects.js";
import { transformControls,obj,controls, addocean } from "./controls.js";
export var gltf_model_counter_signal;
export var obj_model_counter_signal;

export var pos=[];
export var rot=[];
export var scl=[];
export var check=false;
const exportbutton = document.getElementById('export');
exportbutton.addEventListener('click', exportmodel);
export var model;
const exportbutton2 = document.getElementById('export_Stl');
exportbutton2.addEventListener('click', stlExporter);
export var mtlLoader= new THREE.MTLLoader();

//////////////////////////Export scene to gltf////////////////////////////////

function exportmodel() {

  const exporter = new _GLTFExporter();
  // Parse the input and generate the glTF output
  scene.remove(transformControls);
  const clonedScene = new THREE.Scene();    
  
      scene.children.forEach((child) => {if ( child.userData.name!='Sky' && child.type!='CameraHelper'){
        const clonedObject = child.clone();
        clonedScene.add(clonedObject);
      }
      });  

  exporter.parse(clonedScene, function(gltf) {
	
		const output = JSON.stringify( gltf, null, 2 );
		saveString( output, 'scene.gltf' );
  }, {});
}

function saveString(text, filename) {

  save(new Blob([text], {
    type: 'text/plain'
  }), filename);
}
const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); // Firefox workaround, see #6594

function save(blob, filename) {

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // URL.revokeObjectURL( url ); breaks Firefox...

}
///////////////////////////////////////////////////////////////////////


//////////////////////////Load 3D-model////////////////////////////////
const loader = new GLTFLoader();
export var loader2 = new THREE.OBJLoader();

var uploaded_model;
var uploaded_model_obj;

export var uploaded;
export var uploaded_obj;
export var uploadedmtl;
const input = document.querySelector("#model-input");
input.addEventListener("change", (event) => { 
  var file = event.target.files[0];
  if(file.name.includes("glb")){
    var upmodel = URL.createObjectURL(file);  
 
    const reader = new FileReader();
    reader.addEventListener("load", () => {
     var upload = reader.result;
     // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
      
    });
    reader.readAsArrayBuffer(file); //read contents of the file
    document.getElementById("model").onclick = function() {
      loader.load(upmodel, (glb) => {
       
            let hasMesh = false;
     /*       for(var j=0;j<gltf.scene.children[2].children.length-1;j++){
              gltf.scene.children[2].children[j].geometry.computeBoundingSphere(); 
              if(isNaN(gltf.scene.children[2].children[j].geometry.boundingSphere.radius))  gltf.scene.children[2].children[j].geometry.boundingSphere.radius=0;
            }
        */
         //scene.add(glb.scene.children[0])
         
      model = glb.scene;      
      
      scene.add(model);
      checkthewildcards2();
      if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
      const clip = glb.animations[0];
    
      const mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(clip);
      action.play();
    
      model.tick = (delta) => mixer.update(delta);    
      loop.updatables.push(model);
      loop.start();
//scene.add(model)
     //flamingo =model;
    //var updatables=[];
      // move the target to the center of the front bird
     // controls.target.copy(flamingo.position);
    
      //loop.updatables.push(flamingo);
        //if(gltf.scene.children[2]==null){

         // }else{
        /*for(var j=0;gltf.scene.children[2].children.length;j++){
          if ( gltf.scene.children[2].children[j].isMesh  ) objects.push( gltf.scene.children[2].children[j] );
          if ( gltf.scene.children[2].children[j].isMesh ) gltf.scene.children[2].children[j].castShadow = true;  if (gltf.scene.children[2].children[j].isMesh) hasMesh = true;      
          gltf.scene.children[2].children[j].userData.editable=true;    
        }*/
        
    //  }
    });
    
      }
    
    //scene.add( upmodel);

    
  }
  if(file.name.includes("gltf")){
    gltf_model_counter_signal=1;
    obj_model_counter_signal=0;
    console.log((file.size/1024)/1024);
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('/js/draco/');
    loader.setDRACOLoader(dracoLoader);

    scene.remove(transformControls);

   uploaded_model = URL.createObjectURL(file);  
   
  const reader = new FileReader();
  reader.addEventListener("load", () => {
   uploaded = reader.result;
   // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
    
  });
  reader.readAsArrayBuffer(file); //read contents of the file
  console.log((file.size/1024)/1024);

  document.getElementById("model").onclick = function() {
  loader.load(uploaded_model, (gltf) => {
   
        let hasMesh = false;
 /*       for(var j=0;j<gltf.scene.children[2].children.length-1;j++){
          gltf.scene.children[2].children[j].geometry.computeBoundingSphere(); 
          if(isNaN(gltf.scene.children[2].children[j].geometry.boundingSphere.radius))  gltf.scene.children[2].children[j].geometry.boundingSphere.radius=0;
        }
    */
   if(gltf.scene.children.length===1){
if(gltf.scene.children[0].userData.name==="Sky"){ 
  gltf.scene.remove(gltf.scene.children[0]);
scene.add(gltf.scene);
if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
 iterate();
}
        else{
          for(var k=gltf.scene.children.length-1;k>=0;k--){
            if(gltf.scene.children[k].type==='DirectionalLight'|| gltf.scene.children[k].type==='CameraHelper' || gltf.scene.children[k].userData.name==='Sky' ||gltf.scene.children[k].type==='HemisphereLight' || gltf.scene.children[k].type==='SpotLight')
            gltf.scene.remove(gltf.scene.children[k]);
        }scene.add(gltf.scene);
        if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
           iterate();
       
      }
        if(lnt!=null){

          if(scene.children[scene.children.length-1]!=null){
            scene.remove(transformControls);

            const layer = document.createElement("button");
            layer.setAttribute('id', scene.children.length-1+lnt);
            layer.setAttribute('class', "layer");
            layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

            document.body.appendChild(layer);
            const node = document.getElementById(scene.children.length-1+lnt);
            document.getElementById("layers").appendChild(node);
            document.getElementById(scene.children.length-1+lnt).innerHTML = file.name.split('.').slice(0, -1).join('.');
          }
          }else{
  
            if(scene.children[scene.children.length-1]!=null){
      scene.remove(transformControls);
              const layer = document.createElement("button");
              layer.setAttribute('id', scene.children.length-1);
              layer.setAttribute('class', "layer");
              layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

              document.body.appendChild(layer);
              const node = document.getElementById(scene.children.length-1);
              document.getElementById("layers").appendChild(node);
              document.getElementById(scene.children.length-1).innerHTML = file.name.split('.').slice(0, -1).join('.');
          }
        }
     // }else{   if(gltf.scene.children[0].userData.name==="Sky"){ 
     // gltf.scene.remove(gltf.scene.children[0]);
    //scene.add(gltf.scene);
    }else{
      if(gltf.scene.children[0].userData.name==="Sky"){ 
  gltf.scene.remove(gltf.scene.children[0]);
scene.add(gltf.scene);
if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
 iterate();
}
        else{
          for(var k=gltf.scene.children.length-1;k>=0;k--){
            if(gltf.scene.children[k].type==='DirectionalLight'|| gltf.scene.children[k].type==='CameraHelper' || gltf.scene.children[k].userData.name==='Sky' ||gltf.scene.children[k].type==='HemisphereLight' || gltf.scene.children[k].type==='SpotLight')
            gltf.scene.remove(gltf.scene.children[k]);
        }scene.add(gltf.scene);
        if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
           iterate();
       
      }
        if(lnt!=null){
          scene.remove(transformControls);

          for(var c=0;c<scene.children[scene.children.length-1].children.length/*to teleytaio poy piraja length-1*/;c++){
            const layer = document.createElement("button");
            layer.setAttribute('id', scene.children.length-1 + c + lnt);
            layer.setAttribute('class', "layer");
            layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

            document.body.appendChild(layer);
            const node = document.getElementById(scene.children.length-1 + c +lnt);
            document.getElementById("layers").appendChild(node);
            if(scene.children[scene.children.length-1].children[c].type==="Object3D"){
              document.getElementById(scene.children.length-1 + c +lnt).innerHTML = scene.children[scene.children.length-1].children[c].children[0].name;

            }else if(scene.children[scene.children.length-1].children[c].type==="Mesh"){
              document.getElementById(scene.children.length-1 + c +lnt).innerHTML = scene.children[scene.children.length-1].children[c].name;
            }else{
              scene.children[scene.children.length-1].children[c].name="model_tuc"
            document.getElementById(scene.children.length-1 + c+lnt).innerHTML = scene.children[scene.children.length-1].children[c].name;
            }
          }
          }else{
  
         /*   if(scene.children[scene.children.length-1]!=null){
      
              const layer = document.createElement("button");
              layer.setAttribute('id', scene.children.length-1);
              layer.setAttribute('class', "layer");
              document.body.appendChild(layer);
              const node = document.getElementById(scene.children.length-1);
              document.getElementById("layers").appendChild(node);
              document.getElementById(scene.children.length-1).innerHTML = file.name.split('.').slice(0, -1).join('.');
          }*/
          scene.remove(transformControls);

          for(var c=0;c<scene.children[scene.children.length-1].children.length-1;c++){
            const layer = document.createElement("button");
            layer.setAttribute('id', scene.children.length-1 + c);
            layer.setAttribute('class', "layer");
            layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

            document.body.appendChild(layer);
            const node = document.getElementById(scene.children.length-1 + c);
            document.getElementById("layers").appendChild(node);
            if(scene.children[scene.children.length-1].children[c].type==="Object3D"){
              document.getElementById(scene.children.length-1 + c).innerHTML = scene.children[scene.children.length-1].children[c].children[0].name;

            }else{
            document.getElementById(scene.children.length-1 + c).innerHTML = scene.children[scene.children.length-1].children[c].name;
            }
          }
        }     

    }
/*
  const geoms=[]
  const meshes=[]
  gltf.scene.updateMatrixWorld(true,true)
  gltf.scene.traverse(e=>e.isMesh && meshes.push(e) && (geoms.push(( e.geometry.index ) ? e.geometry.toNonIndexed() : e.geometry().clone())));
  geoms.forEach((g,i)=>g.applyMatrix4(meshes[i].matrixWorld));
  const gg = new THREE.BufferGeometryUtils.mergeBufferGeometries(geoms,true);
  gg.applyMatrix4(gltf.scene.matrix.clone().invert());
  gg.userData.materials = meshes.map(m=>m.material);
  const mesh = new THREE.Mesh( gg,gg.userData.materials);
  objects.push(mesh);
  //mesh.children=meshes;
    mesh.castShadow = true; 
    mesh.receiveShadow = true; 

    mesh.userData.editable=true;
 //iterate();
scene.add(mesh);
if(lnt!=null){

  if(scene.children[scene.children.length-1]!=null){

    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+lnt);
    layer.setAttribute('class', "layer");
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+lnt);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+lnt).innerHTML = file.name.split('.').slice(0, -1).join('.');
  }
  for(var c=1;c<meshes.length-1;c++){
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+lnt+c);
    layer.setAttribute('class', "layer");
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+lnt+c);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+lnt+c).innerHTML = meshes[c].name;
  }*/




//}
//}
      function iterate(){
 gltf.scene.traverse( function( object ) {
					if ( object.isMesh  ) objects.push( object );
					if ( object.isMesh )  object.castShadow = true;  
         if ( object.isMesh ) object.receiveShadow = true;
          if (object.isMesh) hasMesh = true;      
          if (object.isMesh) object.userData.editable=true;    
          if (object.isMesh) object.material.side=THREE.DoubleSide
        } );}
        
    
console.log(objects[0]);
console.log(hasMesh ? 'Found meshes!' : 'No meshes.');
     // }else{
    /*for(var j=0;gltf.scene.children[2].children.length;j++){
      if ( gltf.scene.children[2].children[j].isMesh  ) objects.push( gltf.scene.children[2].children[j] );
      if ( gltf.scene.children[2].children[j].isMesh ) gltf.scene.children[2].children[j].castShadow = true;  if (gltf.scene.children[2].children[j].isMesh) hasMesh = true;      
      gltf.scene.children[2].children[j].userData.editable=true;    
    }*/
    
//  }
  checkthewildcards2();
});

  }

  }else if(file.name.includes("obj")){
    gltf_model_counter_signal=0;
    obj_model_counter_signal=1;

   uploaded_model_obj = URL.createObjectURL(file);  
   
   
  const reader2 = new FileReader();
  reader2.addEventListener("load", () => {
   uploaded_obj = reader2.result;
   // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
    
  });
  reader2.readAsArrayBuffer(file); //read contents of the file
  
  input.addEventListener("change", (event) => {
    if(event.target.files[0].name.includes("mtl")){
    const file2 = event.target.files[0];
    var uploaded_mtl = URL.createObjectURL(file2);  
   
   
  const reader2 = new FileReader();
  reader2.addEventListener("load", () => {
    uploadedmtl = reader2.result;
   // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
    
  });
  reader2.readAsArrayBuffer(file2); //read contents of the file
/////////////////////////////////////////////////////////////////////////////////obj loader//////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("model").onclick = function() {
  
mtlLoader.load(
    uploaded_mtl,
    (materials) => {
        materials.preload();
        console.log(materials);                         
loader2.setMaterials(materials);
        // const objLoader = new OBJLoader()            
          loader2.load( uploaded_model_obj, (obj) => {   
      let hasMesh = false;
      if(obj.children[0].type=='Mesh'){
        obj.children[0].geometry.computeFaceNormals();
        obj.children[0].geometry.computeVertexNormals();
  scene.add(obj);
  if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
  if(lnt!=null){
    scene.remove(transformControls);

    if(scene.children[scene.children.length-1]!=null){

      const layer = document.createElement("div");
      layer.setAttribute('id', scene.children.length-1);
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].children[0].id);

      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1).innerHTML = file.name.split('.').slice(0, -1).join('.');
    }
    }else{
      scene.remove(transformControls);

      if(scene.children[scene.children.length-1]!=null){

        const layer = document.createElement("div");
        layer.setAttribute('id', scene.children.length-1);
        layer.setAttribute("wildcard", scene.children[scene.children.length-1].children[0].id);

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
      obj.children[0].geometry.computeFaceNormals();
      obj.children[0].geometry.computeVertexNormals();     

    const groupArray=[];
var mat=[];
var vertices=[];
    
         for ( var n = 0; n < obj.children[0].geometry.groups.length; n++) {

      var group_obj=obj.children[0].geometry.groups[n];

      groupArray.push( group_obj );

      }


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
 
    
    geometry.groups= groupArray;

    const material = mat;
    const points = new THREE.Points( geometry, material );

const geom= new THREE.BufferGeometry( points);

geom.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices,3 ));


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
    mesh.name=file.name.split('.').slice(0, -1).join('.');
    }

scene.add(mesh);
if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible"
if(lnt!=null){
  scene.remove(transformControls);

  if(scene.children[scene.children.length-1]!=null){

    const layer = document.createElement("div");
    layer.setAttribute('id', scene.children.length-1);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1).innerHTML = file.name.split('.').slice(0, -1).join('.');
  }
  }else{
    scene.remove(transformControls);

    if(scene.children[scene.children.length-1]!=null){

      const layer = document.createElement("div");
      layer.setAttribute('id', scene.children.length-1);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1).innerHTML = file.name.split('.').slice(0, -1).join('.');
  }
}
checkthewildcards2();
});
  });

}
}
  });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////Export scene to stl///////////////////////////

function stlExporter (){

var exporterstl= new STLExporter();
const clonedScene = new THREE.Scene();    
  
      scene.children.forEach((child) => {if ( child.userData.name!='Sky' && child.type!='CameraHelper'){
        const clonedObject = child.clone();
        clonedScene.add(clonedObject);
      }
      });
var str = exporterstl.parse( clonedScene ); // Export the scene
var blob = new Blob( [str], { type : 'text/plain' } ); // Generate Blob from the string
//saveAs( blob, 'file.stl' ); //Save the Blob to file.stl

//Following code will help to save the file without FileSaver.js
var link1 = document.createElement('a');
link1.style.display = 'none';

document.body.appendChild(link1);
link1.href = URL.createObjectURL(blob);
link1.download = 'Scene.stl';
link1.click();
}
///////////////////////////////////////////////////////////////////////


/////////////////////////save to our mongoDB///////////////////////////
var project_name=document.getElementById("form");
console.log(project_name.value);

var team_name=document.getElementById("form2");
console.log(project_name.value);

var join_team_name=document.getElementById("form3");
console.log(project_name.value);

var post_name=document.getElementById("form4");
console.log(post_name.value);
/*if(scened){

if(document.getElementById("form").value=data[0].projects[catchid].project_name.valueOf()){

  const btn_ovrt = document.getElementById('save_button');
  btn_ovrt.addEventListener('click', function(e) {
    console.log('button was clicked');
    transformControls.detach(obj);
    fetch('/overwrite', {method: 'POST',body: JSON.stringify({scene,project_name:project_name.value}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'}})
  
      .then(function(response) {
        if(response.ok) {
          console.log('saved');
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });
  });
}

}else{*/
var user_username;
const btn_save = document.getElementById('save_button');
btn_save.addEventListener('click', function(e) {
  console.log('button was clicked');
  transformControls.detach(obj);
/*
var sceneeeeee= JSON.stringify(scene);
  
  const scene_tosave = new Blob([sceneeeeee], {type: 'text/plain'});


  var reader3 = new FileReader();
  var fileByteArray = [];
  reader3.readAsArrayBuffer(scene_tosave);
  reader3.onloadend = function (evt) {
      if (evt.target.readyState == FileReader.DONE) {
         var arrayBuffer = evt.target.result,
             array = new Uint8Array(arrayBuffer);
         for (var i = 0; i < array.length; i++) {
             fileByteArray.push(array[i]);
          }
      }
      
      */
      const size = new TextEncoder().encode(JSON.stringify(scene)).length
      const kiloBytes = size / 1024;
      const megaBytes = kiloBytes / 1024;
     console.log(megaBytes);
     if(megaBytes>16){
      const forma = document.createElement('form');

      forma.setAttribute('action', '/save_file_grid_fs');
      forma.setAttribute('method', 'POST');
      forma.setAttribute('enctype', 'multipart/form-data');
      document.body.appendChild(forma);


      const big_data_file = document.createElement('input');
      big_data_file.setAttribute('type', 'file');
      big_data_file.setAttribute('name', 'big_data_file');
      big_data_file.setAttribute('id', 'scene_input');
      forma.appendChild(big_data_file);

      const sub = document.createElement('input');
      sub.setAttribute('type', 'Submit');
      sub.setAttribute('id', 'sub');
      forma.appendChild(sub);

          let fileName = project_name.value;
          let file = new File([JSON.stringify(scene)], fileName,{type: 'text/plain', lastModified:new Date().getTime()}, 'utf-8');
          let container = new DataTransfer(); 
          container.items.add(file);
          document.querySelector('#scene_input').files = container.files;
      /*    
      fetch('/save_file_grid_fs', {method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'}})
    
        .then(function(response) {
          if(response.ok) {
            console.log('saved');
            return;
          }
          throw new Error('Request failed.');
        })
        .catch(function(error) {
          console.log(error);
        });*/
     }else{
     fetch('/saved', {method: 'POST',body: JSON.stringify({scene,project_name:project_name.value}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    .then(function(response) {
      if(response.ok) {
        console.log('saved');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
//////////////non blocking example//////////
console.log('non blocking example');
  }
});


const btn_save2 = document.getElementById('save_button2');
btn_save2.addEventListener('click', function(e) {
  console.log('button was clicked');
  transformControls.detach(obj);
  fetch('/save_team', {method: 'POST',body: JSON.stringify({team_name:team_name.value}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    .then(function(response) {
      if(response.ok) {
        console.log('saved');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
  
});

const btn_save3 = document.getElementById('save_button3');
btn_save3.addEventListener('click', function(e) {
  console.log('button was clicked');
  transformControls.detach(obj);
  fetch('/join_team', {method: 'POST',body: JSON.stringify({team_name:join_team_name.value}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    .then(function(response) {
      if(response.ok) {
        console.log('saved');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});
/////////////////////////////////looad-save/////////////////////
const btn_save4 = document.getElementById('save_button4');
btn_save4.addEventListener('click', function(e) {
  console.log('button was clicked');
  transformControls.detach(obj);
  const size = new TextEncoder().encode(JSON.stringify(scene)).length
      const kiloBytes = size / 1024;
      const megaBytes = kiloBytes / 1024;
     console.log(megaBytes);
     if(megaBytes>16){
      {fetch('/get_files_grid_fs', {method: 'GET'})
      .then(function(response) {
         if(response.ok) return response.json();
         throw new Error('Request failed.');
       })
       .then(function(data) {
      
        for (var g = 0; g < data.length; g++) {
           if(data[g].filename===document.getElementById("form").value){
            const filetopost=data[g].filename;
            fetch('/big_data_post', {method: 'POST',body: JSON.stringify({filetopost,post_name:post_name.value}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'}})
           }
         }      
      
      })
      }

     }else{
  fetch('/posts', {method: 'POST',body: JSON.stringify({scene,post_name:post_name.value}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    .then(function(response) {
      if(response.ok) {
        console.log('saved');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
  }
});

////////////////////////////////////////////////////////////////////


///////////////////load from our mongoDB////////////////////////////
/*const btn_load_projects = document.getElementById('pop');
btn_load_projects.addEventListener('click', function(e) {

  {fetch('/projects', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {        console.log('loaded');
      return response.json();}
      throw new Error('Request failed.');
    })
    .then(function(data) {

      for (var j = 0; j < data[0].projects.length; j++) {
       console.log(data[0].projects[j])
        document.getElementById("more").innerHTML += '<button>' + data[0].projects[j].project_name.valueOf() + '</button>';
      }
addids();
    })

    .catch(function(error) {
   console.log(error);
 });
}

});
*/
let projects_big_data;
let projects_small;
export var all_saved_projects;
var projects_counter;
var big_projects_counter;

export function fetchDataAndInitialize() {

 {return fetch('/projects', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {        console.log('loaded');
      return response.json();}
      throw new Error('Request failed.');
    })
    .then(function(data) {
      projects_small= data.length;
      if(data[0].projects.length==0){

      document.getElementById("more").innerHTML = "No projects yet";
      }else{
      for (var j = 0; j < data[0].projects.length; j++) {
       console.log(data[0].projects[j])
        document.getElementById("more").innerHTML += '<button>' + data[0].projects[j].project_name.valueOf() + '</button>';
      //let project_counter=j;
    }
addids();
      } projects_counter=data[0].projects.length;
    })
  
    .catch(function(error) {
   console.log(error);
 });
}}

//////////////non blocking example//////////
console.log('non blocking example');
export function fetchbigDataAndInitialize() {
{return fetch('/get_files_grid_fs', {method: 'GET'})
.then(function(response) {
   if(response.ok) return response.json();
   throw new Error('Request failed.');
 })
 .then(function(data) {
     projects_big_data=data.length;
if(data.length>0&&document.getElementById("more").innerHTML==="No projects yet"){
  document.getElementById("more").innerHTML=""
}
  for (var b = 0; b < data.length; b++) {
     document.getElementById("more").innerHTML += '<button>' + data[b].filename.valueOf() + '</button>';
   }
   big_projects_counter = data.length;
all_saved_projects = big_projects_counter+ projects_counter;
addids();



})

}

}
export var lnt=null;
function addids() {
var cls = document.getElementById("more");
var length=cls.children.length;
lnt=length;
for ( var n=0; n < length; n++) {
    cls.children[n].id= (n + 1); 
}
}
//reach requested project//
const btn_load = document.getElementById('more');
export var scened;
btn_load.addEventListener('click', function(event) {
const  thisisthefilerequested= event.target.innerHTML;

  console.log('button was clicked');
if(event.target.id<=projects_big_data){
  document.getElementById("form").value=thisisthefilerequested;
  {fetch('/get_file_grid_fs', {method: 'POST', body: JSON.stringify({thisisthefilerequested}),/*})
  .then(function(response) {
     if(response.ok) return response.json();
     throw new Error('Request failed.');
   }) .then(function(data) {
   
    const serializedScene = JSON.stringify(data);
  var big_data_scened = new THREE.ObjectLoader().parse(JSON.parse(serializedScene));

  scene.add(big_data_scened);
  big_data_scened.traverse( function( object ) {       
    if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') objects.push( object );
    if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.castShadow = true;
    if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.receiveShadow = true;
   
} ); 
  
  });
  }*/
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})
    .then(function (response) {
      if (response.ok) {
        // If the response is successful, handle the data here
        return response.json(); // Parse the response as JSON
      }
      throw new Error('Request failed.');
    })
    .then(function (jsonData) {
      // Handle the JSON data here
      console.log('Received JSON data:', jsonData);
      // You can work with the JSON data here
      const serializedScene = JSON.stringify(jsonData);
      var big_data_scened = new THREE.ObjectLoader().parse(JSON.parse(serializedScene));
    
      scene.add(big_data_scened);
      if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
      big_data_scened.traverse( function( object ) {       
        if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') objects.push( object );
        if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.castShadow = true;
        if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.receiveShadow = true;
       
    } ); 
    })
    .catch(function (error) {
      // Handle errors here
      console.error('Error:', error);
    });
   }
}else{
 {fetch('/projects', {method: 'GET'})
   .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      //console.log(data[0].projects[19].scene); 
       
      const serializedScene = JSON.stringify( data[0].projects[event.target.id -1-projects_big_data].scene);
      let catchid=event.target.id-1;
      scened = new THREE.ObjectLoader().parse( JSON.parse( serializedScene ) );
      scene.add(scened);
      if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
      if(data[0].projects[event.target.id -1].project_name.length>0){
        document.getElementById("form").value=data[0].projects[event.target.id -1-projects_big_data].project_name.valueOf();
      }
      scened.traverse( function( object ) {       
        if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') objects.push( object );
        if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.castShadow = true;
        if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.receiveShadow = true;
       
    } );     
    for(var k=scened.children.length-1;k>=0;k--){
      if(scened.children[k].type==='Object3D'||scened.children[k].type==='DirectionalLight'|| scened.children[k].type==='CameraHelper' || scened.children[k].userData.name==='Sky' ||scened.children[k].type==='HemisphereLight' || scened.children[k].type==='SpotLight')
    scened.remove(scened.children[k]);
    else if(scened.children[k].name==='Water'){
       check=true;
        const x = scened.children[k].position.x;
        const y = scened.children[k].position.y;
        const z = scened.children[k].position.z;

        const _x = scened.children[k].rotation._x;
        const _y = scened.children[k].rotation._y;
        const _z = scened.children[k].rotation._z;

        const ex = scened.children[k].scale.x;
        const yi = scened.children[k].scale.y;
        const zed = scened.children[k].scale.z;

        pos.push( x, y, z );
        rot.push(_x,_y,_z);
        scl.push(ex,yi,zed);
            scened.remove(scened.children[k]);

addocean();
   check=false; }
  }
/////////////////////////////////////add loaded scene to layers////////////////////////////////////////

  if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+lnt);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+lnt);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+lnt).innerHTML = scene.children[scene.children.length-1].name;
    
    }
}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}



   return catchid;})
    .catch(function(error) {
      console.log(error);
    });
}
}
  });
  
/////////////////////////////////////////////////////////////////

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
var counter_wild=0;
var counter_wild2=0;
var counter_wilds=0;

///////////////check wildcards2/////////////
function checkthewildcards2(){
  //const dynamicAttribute = 'wildcard';
  //const attributeValue = mesh.id; 
  
  // all elements with the attribute "wildcard"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {
counter_wilds++;  
  });counter_wild=0;counter_wild2=0;
  for (var n = scene.children.length-1; n < scene.children.length; n++) {
    if (scene.children[n] instanceof THREE.Scene || scene.children[n].type==="Group") {
      for (var l = 0; l < counter_wilds; l++) {
        scene.children[n].children[l].userData.layerid = l + 199 + scene.children.length-6 + lnt;// 199 + l
        var elementId = l+scene.children.length-1 +lnt; // Replace 'yourElementIdPrefix' with your actual ID prefix
  var currentElement = document.getElementById(elementId);
  if(scene.children[n].children[l].isMesh){      
  if (currentElement && currentElement.innerHTML === scene.children[n].children[l].name)  {
    // Change the 'wildcard' attribute to something
    currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );
  }else if(currentElement && currentElement.innerHTML === scene.children[n].children[l].name.split('_').slice(0, -1).join('.')){
    currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );

  }
}else{
  if (currentElement && currentElement.innerHTML === scene.children[n].children[l].children[0].name) {
    // Change the 'wildcard' attribute to something
    currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );
  }
}
      }
    }else if(scene.children[n].type==="Mesh"){
      scene.children[n].userData.layerid =  199 + scene.children.length-6 + lnt;// 199 + l
      var elementId =scene.children.length-1 +lnt; // Replace 'yourElementIdPrefix' with your actual ID prefix
var currentElement = document.getElementById(elementId);
//if (currentElement && currentElement.innerHTML === scene.children[n].name.split('_').slice(0, -1).join('.'))  {
  // Change the 'wildcard' attribute to something
  currentElement.setAttribute('wildcard',scene.children[n].userData.layerid );
  console.log("den mpainei kan?");

//}
    }
  }
  counter_wilds=0;
  }
