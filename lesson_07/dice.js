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
  camera.position.set(0,5,7);
  //camera.lookAt(scene.position);

  // テクスチャー読み込み
  var materials = [
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/dice-1.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/dice-6.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/dice-2.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/dice-5.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/dice-3.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/dice-4.jpg")}),
  ];
  var materials2 = [
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/1.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/2.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/3.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/4.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/5.jpg")}),
    new THREE.MeshStandardMaterial({map:THREE.ImageUtils.loadTexture("img/6.jpg")}),
  ];

  var material = new THREE.MeshFaceMaterial(materials);
  var material2 = new THREE.MeshFaceMaterial(materials2);

  // 箱を作成
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var box = new THREE.Mesh(geometry, material);
  box.position.set(2,2,0);
  scene.add(box);

  var box2 = new THREE.Mesh(geometry, material2);
  box2.position.set(-2,2,0);
  scene.add(box2);

  // 平行光源1
  var directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(0, 5, 0);
  // シーンに追加
  scene.add(directionalLight1);

  // 平行光源2
  var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(5, 0, 5);
  // シーンに追加
  scene.add(directionalLight2);

  // 平行光源3
  var directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight3.position.set(-5, 0, -5);
  // シーンに追加
  scene.add(directionalLight3);

  //const light = new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0);
  //scene.add(light);

  // 初回実行
  var update = function() {
    requestAnimationFrame(update);

    // 箱を回転させる
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    box2.rotation.x += 0.01;
    box2.rotation.y += 0.01;
    camera.lookAt(new THREE.Vector3(0,2,0));//原点を見る
    renderer.render(scene, camera);
  };
  update();
}
  window.addEventListener('DOMContentLoaded', init);
