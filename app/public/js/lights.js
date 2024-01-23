import{scene} from "./scene.js"
export var spotLight;
export function lights (){     const intensity =4;
var light=new THREE.DirectionalLight(0xffa95c,1);
  spotLight= new THREE.SpotLight(0xffa95c,intensity);
    const color = 0xFFFFFF;
    const hemilight = new THREE.HemisphereLight(0xffeeb1,0x000000, intensity);
    //light.position.set(0, 10, 10);
    //light.target.position.set(-5, 0, 0);
    scene.add(hemilight);
      spotLight.castShadow = true;
      spotLight.shadow.bias = -0.0001;
      spotLight.shadow.mapSize.width=1024*4;
      spotLight.shadow.mapSize.height=1024*4;

      scene.add(spotLight);
scene.add(light);
    //scene.add(light.target);
    //light.castShadow=true;
  }
  
