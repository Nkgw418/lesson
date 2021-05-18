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

  // 箱を作成
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
  var box = new THREE.Mesh(geometry, material);
  box.position.z = -5;
  scene.add(box);
  //箱2
  var geometry2 = new THREE.BoxGeometry(0, 0, 0);
  var material2 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
  var box2 = new THREE.Mesh(geometry2, material2);
  box.position.z = -5;
  scene.add(box2);

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
    box.rotation.y += 0.1;

    renderer.render(scene, camera);
  };
  update();
}
window.addEventListener('DOMContentLoaded', init);
