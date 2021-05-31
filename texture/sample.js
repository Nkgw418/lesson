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
  camera.position.set(5,5,5);
  camera.lookAt(scene.position);

  // テクスチャー読み込み
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load("kumorigarasu.jpg");
  var mat = new THREE.MeshPhongMaterial();
  var mat2 = new THREE.MeshPhongMaterial();
  mat.map = texture;
  mat2.map = texture;

  // バンプマップ読み込み
  var bump = textureLoader.load("kumorigarasu-bump.jpg");
  mat.bumpMap = bump;
  mat.bumpscale = 0.2;

  // 箱を作成
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  //var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  //var box = new THREE.Mesh(geometry, material);
  var box = new THREE.Mesh(geometry, mat);
  box.position.set(3,2,1);
  scene.add(box);
  var box2 = new THREE.Mesh(geometry, mat2);
  box2.position.set(1,2,3);
  scene.add(box2);

  // 平行光源1
  var directionalLight1 = new THREE.DirectionalLight(0xffffff);
  directionalLight1.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight1);
  // 平行光源2
  var directionalLight2 = new THREE.DirectionalLight(0xffffff);
  directionalLight2.position.set(-1, 1, 1);
  // シーンに追加
  scene.add(directionalLight2);

  // 初回実行
  var update = function() {
    requestAnimationFrame(update);

    // 箱を回転させる
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    box2.rotation.x += 0.01;
    box2.rotation.y += 0.01;
    camera.lookAt(new THREE.Vector3(0,0,0));//原点を見る
    renderer.render(scene, camera);
  };
  update();
}
  window.addEventListener('DOMContentLoaded', init);
