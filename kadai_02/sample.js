var init = function() {

  var width = 800,
  height = 600;

  // レンダラーを作成
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // シーンを作成
  var scene = new THREE.Scene();

  // カメラを作成
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(5, 10, 5);
  camera.lookAt(scene.position);

  //軸
  var axes = new THREE.AxisHelper(25);
  scene.add(axes);

  // 箱を作成
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
  var box = new THREE.Mesh(geometry, material);
  box.position.z = 5;
  scene.add(box);
  //箱2
  var geometry2 = new THREE.BoxGeometry(1, 1, 1);
  var material2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  var box2 = new THREE.Mesh(geometry2, material2);
  box2.position.x = 0;
  box2.position.y = 2;
  box2.position.z = 0;
  scene.add(box2);

  var geometry3 = new THREE.BoxGeometry(1, 1, 1);
  var material3 = new THREE.MeshPhongMaterial({ color: 0xff0000 ,wireframe: true});
  var box3 = new THREE.Mesh(geometry3, material3);
  box3.position.x = 3;
  box3.position.y = 0;
  box3.position.z = 0;
  scene.add(box3);

  // 平行光源
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);
  // 平行光源2
  var directionalLight2 = new THREE.DirectionalLight(0xffffff);
  directionalLight2.position.set(-1, 1, 1);
  // シーンに追加
  scene.add(directionalLight2);

  // 初回実行
  var update = function() {
    requestAnimationFrame(update);

    // 箱を回転させる
    //box.rotation.x += 0.1;
    box.rotation.z += 256;
    box2.rotation.y -= 0.2;
    box3.rotation.x -= 0.01;

    renderer.render(scene, camera);
  };
  update();
}
window.addEventListener('DOMContentLoaded', init);
