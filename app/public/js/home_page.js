
import { EmojiPicker } from "./Emoji.js";
var check=false;
var likers_array=[];
let socket = io.connect('https://giraffe-design-tt8d.onrender.com');
function getCurrentURL () {
  return window.location.href
}
let user_username;
let projects_small
// Example
const homeurl = getCurrentURL()
socket.on('connect', function() {
  // Connected, let's sign-up for to receive messages for this room
  socket.emit('home', homeurl);

}); 

document.getElementById("moon_home").onclick = function() {darkmode()};
function darkmode(){
  document.body.classList.toggle("night_mode");
  if( document.getElementsByClassName("night_mode").length > 0 ) {
    document.body.style.transition="1s";
  }
}   
window.onload = function() {

  {fetch('/profile', {method: 'GET'})
  .then(function(response) {
     if(response.ok) return response.json();
     throw new Error('Request failed.');
   })         .then(function(data){
    //var liker =data[0].username;
   user_username=data.user.username;
   console.log(user_username);

     })}

    {fetch('/posts_homepage', {method: 'GET'})
    .then(function(response) {
       if(response.ok) return response.json();
       throw new Error('Request failed.');
     })
       .then(function(data){
 //       for(var i=0;i<=data.length-1;i++){        
         // for(
          //        if (data[i].posts!=null){
var j;
             projects_small=data.length;

for(j=data.length-1;j>=0;j--){
          //j<data[i].posts.length;j++){
const k=j;
const n= j;
const l= j;
const f=j;
const q=j;
const s=j;
const t=j;

          const container_post = document.createElement("div");
          document.body.appendChild(container_post);
          container_post.setAttribute('class', 'container_post');


          const windo_post = document.createElement("div");
          container_post.appendChild(windo_post);
          windo_post.setAttribute('class', 'windo_post');
          windo_post.setAttribute('id', j);

          const canvas = document.createElement("canvas");
          windo_post.appendChild(canvas);
          canvas.setAttribute('class', "c1");

          const mycanvas=document.getElementById(j).firstChild;

          const users_name = document.createElement("h9");
          windo_post.appendChild(users_name);

          const header = document.createElement("h10");
          windo_post.appendChild(header);

          /*const comments= document.createElement("comments");
          windo_post.appendChild(comments);*/
          const reactions = document.createElement("button");
          reactions.setAttribute('class', 'reactions');
          reactions.setAttribute('id', s);

          reactions.innerHTML="Like";
          windo_post.appendChild(reactions);

          const reactions_box = document.createElement("div");
          reactions_box.setAttribute('id', 'reactions_box');
          reactions.appendChild(reactions_box);

              let img = document.createElement('img');
              img.src =
              "textures/like.png";
              img.setAttribute('id', f);
              img.setAttribute('class', "img_like");

              reactions_box.appendChild(img);
              const btn_like = document.getElementById(f).getElementsByClassName("img_like")[0];
              const kiddo = document.getElementById(f).children;
              
console.log(kiddo);
const fourth = kiddo.item(3);
fourth.style.color="rgb(51, 51, 51)";
              btn_like.addEventListener('click', function(event) {

                  //var liker =data[0].username;
                  var   likes_area= document.getElementById(event.target.id).getElementsByClassName("little_like")[0];

                if(fourth.style.color==="rgb(51, 51, 51)"){
                if(!likes_area){
  const like_Area=document.createElement("div");
  like_Area.setAttribute('id', 'like_Area');
  document.getElementById(event.target.id).appendChild(like_Area);

  let img_like = document.createElement('img');
  img_like.src =
  "textures/like.png";
  img_like.setAttribute('id', q);
  img_like.setAttribute('class', "little_like");

  like_Area.appendChild(img_like);

  var likez=document.createElement("div");
  likez.setAttribute('id', t);
  likez.setAttribute('class',"likez");

  likez.innerHTML=data[event.target.id].likes+1;
  like_Area.appendChild(likez);

  fourth.style.color="green";

                }else{
                  const counter_likes=document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML;
                const curlike=Number(counter_likes)+1;
                document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML=curlike;
  fourth.style.color="green";
check=false;
}
if(!check){
  var dat1;
  {fetch('/posts_homepage', {method: 'GET'})
  .then(function(response) {
     if(response.ok) return response.json();
     throw new Error('Request failed.');
   })
     .then(function(data){
   //var liker =data[0].username;
   dat1=data[event.target.id]._id;
  fetch('/save_likes', {method: 'POST',body: JSON.stringify({dat1}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})
    })}

    var liketosendviasocket={
      id:event.target.id,
  };
  
  socket.emit('start_like',liketosendviasocket, (err) => {
      if (err) {
        alert(err);
      }
    });}else{
      check=false;
    }
}else{
  const counter_likes=document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML;
                const curlike=Number(counter_likes)-1;
    if(curlike===0){
    
      var rmv=document.getElementById(event.target.id);
  rmv.removeChild(rmv.lastElementChild);
      fourth.style.color="rgb(51, 51, 51)";
           check=false;

    }else{
      const counter_likes=document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML;
      const curlike=Number(counter_likes)-1;
      document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML=curlike;     
      fourth.style.color="rgb(51, 51, 51)";
       check=false;
    }

    if(!check){
      var dat1;
      {fetch('/posts_homepage', {method: 'GET'})
      .then(function(response) {
         if(response.ok) return response.json();
         throw new Error('Request failed.');
       })
         .then(function(data){
       //var liker =data[0].username;
       dat1=data[event.target.id]._id;
      fetch('/save_likes_decrease', {method: 'POST',body: JSON.stringify({dat1}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'}})
        })}
        if(!check){

          var liketosendviasocket={
            id:event.target.id,
        };
        
        socket.emit('start_like_dec',liketosendviasocket, (err) => {
            if (err) {
              alert(err);
            }
          });}else{
            check=false;
          }
      }
  }


});


  let img2 = document.createElement('img');
  img2.src =
  "textures/heart.png";
  img2.setAttribute('id', 'img_heart');

  reactions_box.appendChild(img2);

let img3 = document.createElement('img');
img3.src =
"textures/wow.png";
img3.setAttribute('id', 'img_wow');

reactions_box.appendChild(img3);

const reactions2 = document.createElement("button");
          reactions2.setAttribute('id', 'reactions2');
          reactions2.innerHTML="Dislike";
          windo_post.appendChild(reactions2);

          const reactions_box2 = document.createElement("div");
          reactions_box2.setAttribute('id', 'reactions_box2');
          reactions2.appendChild(reactions_box2);

              let img4 = document.createElement('img');
              img4.src =
              "textures/dislike.png";
              img4.setAttribute('id', 'img_dislike');

              reactions_box2.appendChild(img4);
          

          const line= document.createElement("div");

          line.setAttribute('class', "line");
          windo_post.appendChild(line);
          const comment= document.createElement("div");

          comment.setAttribute('class', "comment_area");

          comment.setAttribute('id', l);


          windo_post.appendChild(comment);

          const line2= document.createElement("div");

          line2.setAttribute('class', "line2");
          windo_post.appendChild(line2);


          const input = document.createElement("input");
          comment.appendChild(input);
          input.setAttribute('type', "text");
          input.setAttribute('class', "form-control");
          input.setAttribute('placeholder', "Write your Comment");
          input.setAttribute('name', "comment");
          input.setAttribute('id', k);
          input.setAttribute('aria-describedby', "basic-addon1");


          const submit= document.createElement("button");
          submit.setAttribute('type', "submit");
          submit.setAttribute('class', "btn btn-default navbar-btn");
          submit.setAttribute('name', 'Submit');
          submit.setAttribute('id', n);

          //submit.setAttribute('value', "Submit");
          submit.innerHTML='&#11166';	

          comment.appendChild(submit);
var array=[];

for(var h=0;h<data.length;h++){
  array.push(document.getElementsByClassName('form-control')[h]);
}



submit.addEventListener('click', function(e) {
  array.reverse();
var dat;
const id=e.target.id;


  var comment_for_post = array[id];

 console.log('button was clicked');

 {fetch('/save_comments', {method: 'GET'})
 .then(function(response) {
    if(response.ok) return response.json();
    throw new Error('Request failed.');
  })
    .then(function(data){
        // for(
       dat=data[id]._id;           ///////gia poio post milaw?
      var data_post_admin=data[id].admin_id; ////poios exei kanei to post?
      fetch('/save_comments', {method: 'POST',body: JSON.stringify({dat,comments:comment_for_post.value}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    .then(function(response) {
      if(response.ok) {
        console.log('saved');        
        
        var comments_r_t=document.getElementById(id);

        {fetch('/posts_admin', {method: 'GET'})
        .then(function(response) {
           if(response.ok) return response.json();
           throw new Error('Request failed.');
         })
           .then(function(data){
         var commentor =data[0].username;
                 const commentor_area=document.createElement("div");
        commentor_area.setAttribute('class', 'commentor_area');
        commentor_area.innerHTML=commentor;
        comments_r_t.appendChild(commentor_area);
        const windo_com = document.createElement("div");
        windo_com.setAttribute('class', 'windo_com');


        comments_r_t.appendChild(windo_com);
     
        windo_com.innerHTML=comment_for_post.value; 
        var datatosendviasocket={
          id:id,
          commentor:commentor,
          comment_post:comment_for_post.value
      };
      
      socket.emit('start',datatosendviasocket, (err) => {
          if (err) {
            alert(err);
          }
        });
      
          
          });
        }






     


        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
    });
  
 }
  

});
          
          var emoji_btn= document.createElement("button");
         emoji_btn.setAttribute('id', "emoji");
          emoji_btn.innerHTML= "&#128512";
          comment.appendChild(emoji_btn);

          emoji_btn.addEventListener('click', function handleClick(event) {

            if(document.getElementsByClassName("emoji_btn_home").length>0){
              const allChildElementsOfParentWithId = document.querySelectorAll('#emoji');
              allChildElementsOfParentWithId.forEach((element) => {
                element.classList.remove('emoji_btn_home');
              });
              const allChildElementsOfParentWithId_form = document.querySelectorAll(j);
              allChildElementsOfParentWithId_form.forEach((element) => {
                element.classList.remove('form_control');
              });
            }
            console.log('user clicked: ', event.target);
          
            event.target.classList.add('emoji_btn_home');
            input.classList.add("form_control")
          });

          if(data[j].likes>0){

            const like_Area=document.createElement("div");
            like_Area.setAttribute('id', 'like_Area');
            document.getElementById(j).appendChild(like_Area);
          
            let img_like = document.createElement('img');
            img_like.src =
            "textures/like.png";
            img_like.setAttribute('id', q);
            img_like.setAttribute('class', "little_like");
          
            like_Area.appendChild(img_like);
          
            var likez=document.createElement("div");
            likez.setAttribute('id', t);
            likez.setAttribute('class',"likez");
          
            likez.innerHTML=data[j].likes;
            like_Area.appendChild(likez);
          likers_array=data[j].likers;
                  for(var g=0;g<likers_array.length;g++){
                    if(likers_array[g]===user_username){
                        // has_liked=true;
                         fourth.style.color="green";
                    }
                  }
                  var   like_area= document.getElementById("like_Area");

                }
          

          
          
         const  scene_post = new THREE.Scene();

           scene_post.background = new THREE.Color('#f1f1f1');
           //scene_post.add(new THREE.GridHelper(100,50));

           const fov = 45;
           const aspect = 2;  // the canvas default
           const near = 1;
           const far = 30000000;
            const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);         
            const renderer = new THREE.WebGLRenderer({antialias: true, canvas: mycanvas });

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
              const canvasRect = mycanvas.getBoundingClientRect();
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
                 const aspect = setScissorForElement(mycanvas);
           
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




            const serializedDescription=  data[j].post.post_name;
            const serializedusersName=data[j].user;
            header.innerHTML=serializedDescription;
            users_name.innerHTML=serializedusersName;
    const serializedScene = JSON.stringify( data[j].post.scene);
   var scene_home = new THREE.ObjectLoader().parse( JSON.parse( serializedScene ) );
   scene_post.add(scene_home);
   for(var w=scene_home.children.length-1;w>=0;w--)
    if( scene_home.children[w].type ==='Object3D' ||  scene_home.children[w].type==='DirectionalLight'||  scene_home.children[w].type==='SpotLight' ||  scene_home.children[w].type==='HemisphereLight'||  scene_home.children[w].type==='CameraHelper'||  scene_home.children[w].userData.name==='Sky' ){
      scene_home.remove( scene_home.children[w]);
    }

    var controls = new THREE.OrbitControls(camera, mycanvas);
controls.target.set(0, 5, 0);controls.panSpeed = 1.0;

controls.update();
        }
   //-   }
   //   }
    //  }

      {fetch('/save_comments', {method: 'GET'})
      .then(function(response) {
         if(response.ok) return response.json();
         throw new Error('Request failed.');
       })
         .then(function(data){
          for(var i=data.length-1;i>=0;i--){      
       if(data[i].comments.length>0){      

            for(var k=0;k<=data[i].names.length-1;k++){

              const commentor_area=document.createElement("div");
              commentor_area.setAttribute('class', 'commentor_area');
              commentor_area.innerHTML=data[i].names[k];
           var   el1=document.getElementById(i);
              el1.appendChild(commentor_area);
 var comments= document.createElement("h12");
                  comments.innerHTML=data[i].comments[k];
                  var el = document.getElementById(i);

                  el.appendChild(comments);
                  }
         /*   for(var j=0;j<data[i].comments.length;j++){
                 
            
              }  */
            }
          }
        
        });
      }


       })
    }
    ///////////////////////////////////////////////////big_data_files////////////////////////////////////////////
    fetch('/get_files_grid_fs_home_page', { method: 'GET' })
    .then(function(response) {
      if (response.ok) return response.blob(); // Fetch as a Blob
      throw new Error('Request failed.');
    })
    .then(function(zipBlob) {
      const zip = new JSZip();
  
      return zip.loadAsync(zipBlob).then(function(contents) {
        const allFiles = [];
  
        contents.forEach(function(relativePath, zipEntry) {
          allFiles.push(
            zipEntry.async('string').then(function(fileContent) {
              try {
                const jsonData = JSON.parse(fileContent);
                return {
                  filename: zipEntry.name,
                  data: jsonData
                };
              } catch (error) {
                // Ignore non-JSON files
                return null;
              }
            })
          );
        });
  
        return Promise.all(allFiles);
      });
    })
    .then(function(allFiles) {
      // 'allFiles' contains an array of objects with filename and parsed JSON data
      const jsonFiles = allFiles.filter(file => file !== null);
      console.log('Parsed JSON files:', jsonFiles);
      // Handle the JSON data as needed

       

      for(var m=0;m<jsonFiles.length;m++){
                //j<data[i].posts.length;j++){
      const k=m+projects_small
      const n= m+projects_small
      const l= m+projects_small
      const f=m+projects_small
      const q=m+projects_small
      const s=m+projects_small
      const t=m+projects_small
      
                const container_post = document.createElement("div");
                document.body.appendChild(container_post);
                container_post.setAttribute('class', 'container_post');
      
      
                const windo_post = document.createElement("div");
                container_post.appendChild(windo_post);
                windo_post.setAttribute('class', 'windo_post');
                windo_post.setAttribute('id', m+projects_small);
      
                const canvas = document.createElement("canvas");
                windo_post.appendChild(canvas);
                canvas.setAttribute('class', "c1");
      
                const mycanvas=document.getElementById(m+projects_small).firstChild;
      
                const users_name = document.createElement("h9");
                users_name.setAttribute('id', m+projects_small);
                users_name.setAttribute('class', "h9");

                windo_post.appendChild(users_name);
      
                const header = document.createElement("h10");
                header.setAttribute('id', m+projects_small);
                header.setAttribute('class', "h10");

                windo_post.appendChild(header);
      
                /*const comments= document.createElement("comments");
                windo_post.appendChild(comments);*/
                const reactions = document.createElement("button");
                reactions.setAttribute('class', 'reactions');
                reactions.setAttribute('id', s);
      
                reactions.innerHTML="Like";
                windo_post.appendChild(reactions);
      
                const reactions_box = document.createElement("div");
                reactions_box.setAttribute('id', 'reactions_box');
                reactions.appendChild(reactions_box);
      
                    let img5 = document.createElement('img');
                    img5.src =
                    "textures/like.png";
                    img5.setAttribute('id', f);
                    img5.setAttribute('class', "img_like");
      
                    reactions_box.appendChild(img5);
                    const btn_like = document.getElementById(f).getElementsByClassName("img_like")[0];
                    const kiddo = document.getElementById(f).children;
                    
      console.log(kiddo);
      const fourth = kiddo.item(3);
      fourth.style.color="rgb(51, 51, 51)";
                    btn_like.addEventListener('click', function(event) {
      
                        //var liker =data[0].username;
                        var   likes_area= document.getElementById(event.target.id).getElementsByClassName("little_like")[0];
      
                      if(fourth.style.color==="rgb(51, 51, 51)"){
                      if(!likes_area){
        const like_Area=document.createElement("div");
        like_Area.setAttribute('id', 'like_Area');
        document.getElementById(event.target.id).appendChild(like_Area);
      
        let img_like1 = document.createElement('img');
        img_like1.src =
        "textures/like.png";
        img_like1.setAttribute('id', q);
        img_like1.setAttribute('class', "little_like");
      
        like_Area.appendChild(img_like1);
      
        var likez1=document.createElement("div");
        likez1.setAttribute('id', t);
        likez1.setAttribute('class',"likez");
     
        likez1.innerHTML=1;
        like_Area.appendChild(likez1);
           
        fourth.style.color="green";
      
                      }else{
                        const counter_likes=document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML;
                      const curlike=Number(counter_likes)+1;
                      document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML=curlike;
        fourth.style.color="green";
      check=false;
      }
      if(!check){
        var dat1;
        {fetch('/get_files_grid_fs_of_all_users_for_the_home_page', {method: 'GET'})
        .then(function(response) {
           if(response.ok) return response.json();
           throw new Error('Request failed.');
         })
           .then(function(data){
         //var liker =data[0].username;
         dat1=data[event.target.id-projects_small]._id;
        fetch('/save_likes_big_data_files', {method: 'POST',body: JSON.stringify({dat1}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'}})
          })}
      
          var liketosendviasocket={
            id:event.target.id,
        };
        
        socket.emit('start_like',liketosendviasocket, (err) => {
            if (err) {
              alert(err);
            }
          });
        }else{
            check=false;
          }
      }else{
        const counter_likes=document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML;
                      const curlike=Number(counter_likes)-1;
          if(curlike===0){
          
            var rmv=document.getElementById(event.target.id);
        rmv.removeChild(rmv.lastElementChild);
            fourth.style.color="rgb(51, 51, 51)";
                 check=false;
      
          }else{
            const counter_likes=document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML;
            const curlike=Number(counter_likes)-1;
            document.getElementById(event.target.id).getElementsByClassName("likez")[0].innerHTML=curlike;     
            fourth.style.color="rgb(51, 51, 51)";
             check=false;
          }
      
          if(!check){
            var dat1;
            {fetch('/get_files_grid_fs_of_all_users_for_the_home_page', {method: 'GET'})
            .then(function(response) {
               if(response.ok) return response.json();
               throw new Error('Request failed.');
             })
               .then(function(data){
             //var liker =data[0].username;
             dat1=data[event.target.id-projects_small]._id;
            fetch('/save_likes_decrease_big_data_files', {method: 'POST',body: JSON.stringify({dat1}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'}})
              })
            }
              if(!check){
      
                var liketosendviasocket={
                  id:event.target.id,
              };
              
              socket.emit('start_like_dec',liketosendviasocket, (err) => {
                  if (err) {
                    alert(err);
                  }
                });
              }  
                else{
                  check=false;
                }
            }
           
        }     
    })

    let img6 = document.createElement('img');
    img6.src =
    "textures/heart.png";
    img6.setAttribute('id', 'img_heart');
  
    reactions_box.appendChild(img6);
  
  let img7 = document.createElement('img');
  img7.src =
  "textures/wow.png";
  img7.setAttribute('id', 'img_wow');
  
  reactions_box.appendChild(img7);
  
  const reactions2 = document.createElement("button");
            reactions2.setAttribute('id', 'reactions2');
            reactions2.innerHTML="Dislike";
            windo_post.appendChild(reactions2);
  
            const reactions_box2 = document.createElement("div");
            reactions_box2.setAttribute('id', 'reactions_box2');
            reactions2.appendChild(reactions_box2);
  
                let img8 = document.createElement('img');
                img8.src =
                "textures/dislike.png";
                img8.setAttribute('id', 'img_dislike');
  
                reactions_box2.appendChild(img8);
            
  
            const line= document.createElement("div");
  
            line.setAttribute('class', "line");
            windo_post.appendChild(line);
            const comment= document.createElement("div");
  
            comment.setAttribute('class', "comment_area");
  
            comment.setAttribute('id', l);
  
  
            windo_post.appendChild(comment);
  
            const line2= document.createElement("div");
  
            line2.setAttribute('class', "line2");
            windo_post.appendChild(line2);
  
  
            const input = document.createElement("input");
            comment.appendChild(input);
            input.setAttribute('type', "text");
            input.setAttribute('class', "form-control");
            input.setAttribute('placeholder', "Write your Comment");
            input.setAttribute('name', "comment");
            input.setAttribute('id', k);
            input.setAttribute('aria-describedby', "basic-addon1");
  
  
            const submit= document.createElement("button");
            submit.setAttribute('type', "submit");
            submit.setAttribute('class', "btn btn-default navbar-btn");
            submit.setAttribute('name', 'Submit');
            submit.setAttribute('id', n);
  
            //submit.setAttribute('value', "Submit");
            submit.innerHTML='&#11166';	
  
            comment.appendChild(submit);
  var array1=[];
  
  for(var u=0;u<jsonFiles.length;u++){
    array1.push(document.getElementsByClassName('form-control')[u]);
  }
   // array1.push(document.getElementsByClassName('form-control')[m]);
  


  submit.addEventListener('click', function(e) {
    array1
  var dat;
  const id=e.target.id;
  
  
    var comment_for_post = array1[id-projects_small];
  
   console.log('button was clicked');
  
   {fetch('/get_files_grid_fs_to_assign_comments_likes_likers_etc', {method: 'GET'})
   .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
      .then(function(data){
          // for(
         dat=data[id-projects_small]._id;           ///////gia poio post milaw?
       // var data_post_admin=data[id].admin_id; ////poios exei kanei to post?
        fetch('/save_comments_big_data_files', {method: 'POST',body: JSON.stringify({dat,comments:comment_for_post.value}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'}})
  
      .then(function(response) {
        if(response.ok) {
          console.log('saved');        
          
          var comments_r_t=document.getElementById(id);
  
          {fetch('/posts_admin', {method: 'GET'})
          .then(function(response) {
             if(response.ok) return response.json();
             throw new Error('Request failed.');
           })
             .then(function(data){
           var commentor =data[0].username;
                   const commentor_area=document.createElement("div");
          commentor_area.setAttribute('class', 'commentor_area');
          commentor_area.innerHTML=commentor;
          comments_r_t.insertBefore(commentor_area, comments_r_t.children[8]);

         // comments_r_t.appendChild(commentor_area);
          const windo_com = document.createElement("div");
          windo_com.setAttribute('class', 'windo_com');
  
          comments_r_t.insertBefore(windo_com, comments_r_t.children[8]);

          //comments_r_t.appendChild(windo_com);
       
          windo_com.innerHTML=comment_for_post.value; 
          var datatosendviasocket={
            id:id,
            commentor:commentor,
            comment_post:comment_for_post.value
        };
        
        socket.emit('start',datatosendviasocket, (err) => {
            if (err) {
              alert(err);
            }
          }); 
            });
          }
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });
      });
   }
  });





  var emoji_btn1= document.createElement("button");
  emoji_btn1.setAttribute('id', "emoji");
   emoji_btn1.innerHTML= "&#128512";
   comment.appendChild(emoji_btn1);

   emoji_btn1.addEventListener('click', function handleClick(event) {

     if(document.getElementsByClassName("emoji_btn_home").length>0){
       const allChildElementsOfParentWithId = document.querySelectorAll('#emoji');
       allChildElementsOfParentWithId.forEach((element) => {
         element.classList.remove('emoji_btn_home');
       });
       const allChildElementsOfParentWithId_form = document.querySelectorAll(j);
       allChildElementsOfParentWithId_form.forEach((element) => {
         element.classList.remove('form_control');
       });
     }
     console.log('user clicked: ', event.target);
   
     event.target.classList.add('emoji_btn_home');
     input.classList.add("form_control")
   });
  
   const  scene_post = new THREE.Scene();

   scene_post.background = new THREE.Color('#f1f1f1');
   //scene_post.add(new THREE.GridHelper(100,50));

   const fov = 45;
   const aspect = 2;  // the canvas default
   const near = 1;
   const far = 30000000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);         
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas: mycanvas });

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
      const canvasRect = mycanvas.getBoundingClientRect();
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
         const aspect = setScissorForElement(mycanvas);
   
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
const sun = new THREE.Vector3();
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
var spotLight1;

function lights (){     const intensity =4;
const light=new THREE.DirectionalLight(0xffa95c,1);
  spotLight1= new THREE.SpotLight(0xffa95c,intensity);
    const color = 0xFFFFFF;
    const hemilight = new THREE.HemisphereLight(0xffeeb1,0x000000, intensity);
    //light.position.set(0, 10, 10);
    //light.target.position.set(-5, 0, 0);
    scene_post.add(hemilight);
      spotLight1.castShadow = true;
      spotLight1.shadow.bias = -0.0001;
      spotLight1.shadow.mapSize.width=1024*4;
      spotLight1.shadow.mapSize.height=1024*4;

      scene_post.add(spotLight1);
      scene_post.add(light);
    //scene.add(light.target);
    //light.castShadow=true;
  }lights ();
   function anime(){
       // render from the 2nd camera
       window.requestAnimationFrame(render);
     }
     
   let start1;
   start1=performance.now();

   function render() {
    fix();
       
   anime();
   spotLight1.position.set(

    camera.position.x +10,
    camera.position.y +10,
    camera.position.z +10,

  ) 
    }
   anime();
    const timelaplse=performance.now()-start1;
   console.log(timelaplse);




   // const serializedDescription=  data[b].post_name;
   // const serializedusersName=data[b].user;
   // header.innerHTML=serializedDescription;
  //  users_name.innerHTML=serializedusersName;
const serializedScene = JSON.stringify( jsonFiles[m].data);
const scene_home = new THREE.ObjectLoader().parse( JSON.parse( serializedScene ) );
scene_post.add(scene_home);
for(var w=scene_home.children.length-1;w>=0;w--)
if( scene_home.children[w].type ==='Object3D' ||  scene_home.children[w].type==='DirectionalLight'||  scene_home.children[w].type==='SpotLight' ||  scene_home.children[w].type==='HemisphereLight'||  scene_home.children[w].type==='CameraHelper'||  scene_home.children[w].userData.name==='Sky' ){
scene_home.remove( scene_home.children[w]);
}

const controls = new THREE.OrbitControls(camera, mycanvas);
controls.target.set(0, 5, 0);controls.panSpeed = 1.0;

controls.update();
if(m===jsonFiles.length-1){
  const voidd=document.createElement("div");
  voidd.setAttribute('class', 'void');
  document.getElementById(m+projects_small).appendChild(voidd);
}
}
     {fetch('/get_files_grid_fs_to_assign_comments_likes_likers_etc', {method: 'GET'})
  .then(function(response) {
     if(response.ok) return response.json();
     throw new Error('Request failed.');
   })
     .then(function(data){
        for(var o=0;o<data.length;o++){      
   if(data[o].likes>0){

    const like_Area=document.createElement("div");
    like_Area.setAttribute('id', 'like_Area');
    document.getElementById(o+projects_small).appendChild(like_Area);
  
    let img_like = document.createElement('img');
    img_like.src =
    "textures/like.png";
    img_like.setAttribute('id', o+projects_small);
    img_like.setAttribute('class', "little_like");
  
    like_Area.appendChild(img_like);
  
    var likez=document.createElement("div");
    likez.setAttribute('id', o+projects_small);
    likez.setAttribute('class',"likez");
  
    likez.innerHTML=data[o].likes;
    like_Area.appendChild(likez);
  likers_array=data[o].likers;
          for(var g=0;g<likers_array.length;g++){
            if(likers_array[g]===user_username){
                // has_liked=true;
                document.getElementById(o+projects_small).getElementsByClassName("reactions")[0].style.color="green";
            }
          }
      //    var   like_area= document.getElementById("like_Area");
}
        }
      for(var z=0;z<data.length;z++){   
        if(data[z].comments.length>0){      

          for(var k=0;k<data[z].names.length;k++){

          const commentor_area=document.createElement("div");
          commentor_area.setAttribute('class', 'commentor_area');
          commentor_area.innerHTML=data[z].names[k];
       var   el1=document.getElementById(z+projects_small);
          el1.insertBefore(commentor_area, el1.children[8]);//.appendChild(commentor_area); 
  var comments= document.createElement("h12");
              comments.innerHTML=data[z].comments[k];
              var el = document.getElementById(z+projects_small);
  
              el.insertBefore(comments, el.children[8]);//.appendChild(comments);
          }
             
        
          }  
        }
      });
     }
     {fetch('/get_files_grid_fs_of_all_users_for_the_home_page', {method: 'GET'})
     .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
        .then(function(data){
         for(var c=0;c<data.length;c++){
            const serializedDescription=  data[c].post_name;
  const serializedusersName=data[c].metadata.owner;
  document.getElementById(c+projects_small).getElementsByClassName("h10")[0].innerHTML=serializedDescription;
  document.getElementById(c+projects_small).getElementsByClassName("h9")[0].innerHTML=serializedusersName;
      }  
     })
       }
    })
    .catch(function(error) {
      console.error('Fetch or ZIP handling error:', error);
    });
    
    
    
    new EmojiPicker({
            trigger:[{
              insertInto:['.form_control'],
              selector:['.emoji_btn_home']
            }],
            closeButton:true
          })

          socket.on('start', (arg) => {

            const commentor_area=document.createElement("div");
            commentor_area.setAttribute('class', 'commentor_area');
            commentor_area.innerHTML=arg.commentor;
            const comments_r_t=document.getElementById(arg.id);
            comments_r_t.appendChild(commentor_area);
            const windo_com = document.createElement("div");
            windo_com.setAttribute('class', 'windo_com');
    
    
            comments_r_t.appendChild(windo_com);
         
            windo_com.innerHTML=arg.comment_post; 
            
                });
                socket.on('start_like', (arg) => {check=true;
                  var   like_area= document.getElementById(arg.id).getElementsByClassName("little_like")[0];

                if(like_area){
                  const counter_likes=document.getElementById(arg.id).getElementsByClassName("likez")[0].innerHTML;
                  const curlike=Number(counter_likes)+1;
                  document.getElementById(arg.id).getElementsByClassName("likez")[0].innerHTML=curlike;                
                }else{
                  const like_Area=document.createElement("div");
            like_Area.setAttribute('id', 'like_Area');
            document.getElementById(arg.id).appendChild(like_Area);
          
            let img_like = document.createElement('img');
            img_like.src =
            "textures/like.png";
            img_like.setAttribute('id', arg.id);
            img_like.setAttribute('class', "little_like");
          
            like_Area.appendChild(img_like);
          
            var likez=document.createElement("div");
            likez.setAttribute('id', arg.id);
            likez.setAttribute('class',"likez");
          
            likez.innerHTML=1;
            like_Area.appendChild(likez);
          //likers_array=data[arg.id].likers;
                }
}); 
socket.on('start_like_dec', (arg) => {check=true;
  const counter_likes=document.getElementById(arg.id).getElementsByClassName("likez")[0].innerHTML;
  const curlike=Number(counter_likes)-1;

if(curlike===0){
    
  var rmv=document.getElementById(arg.id);
rmv.removeChild(rmv.lastElementChild);

}else{
    document.getElementById(arg.id).getElementsByClassName("likez")[0].innerHTML=curlike;                
}
}); 
}
var likes=0;
