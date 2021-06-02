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
  camera.position.set(0,5,10);
  //camera.lookAt(scene.position);

  // テクスチャー読み込み
  var textureLoader = new THREE.TextureLoader();
  //var texture = textureLoader.load("kumorigarasu.jpg");
  var texture2 = textureLoader.load("wood.jpg");
  var mat = new THREE.MeshPhongMaterial();
  var mat2 = new THREE.MeshStandardMaterial();
  var mat3 = new THREE.MeshToonMaterial();
  mat.map = texture2;
  mat2.map = texture2;
  mat3.map = texture2;

  // バンプマップ読み込み
  //var bump = textureLoader.load("kumorigarasu-bump.jpg");
  //var bump2 = textureLoader.load("kumorigarasu-bump-b.jpg");//radius6000,samples16
  var bump3 = textureLoader.load("wood-bump.jpg");
  mat.bumpMap = bump3;
  mat.bumpscale = 0.2;
  mat2.bumpMap = bump3;
  mat2.bumpscale = 0.2;
  mat3.bumpMap = bump3;
  mat3.bumpscale = 0.2;

  // 箱を作成
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshPhongMaterial({ color: 0x252525 });
  var material2 = new THREE.MeshStandardMaterial({ color: 0x252525 });
  var material3 = new THREE.MeshToonMaterial({ color: 0x252525 });
  var box = new THREE.Mesh(geometry, mat);
  box.position.set(0,2,0);

  var box2 = new THREE.Mesh(geometry, mat2);
  box2.position.set(3,2,0);

  var box3 = new THREE.Mesh(geometry, mat3);
  box3.position.set(-3,2,0);

  const boxes = new THREE.Group();
  boxes.add(box);
  boxes.add(box2);
  boxes.add(box3);
  scene.add(boxes);

  // 平行光源1
  var directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(2, 2, 2);
  // シーンに追加
  scene.add(directionalLight1);
  // 平行光源2
  var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(-2, 2, 2);
  // シーンに追加
  scene.add(directionalLight2);
  // 平行光源3
  var directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight3.position.set(0, -2, 2);
  // シーンに追加
  scene.add(directionalLight2);

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
    box3.rotation.x += 0.01;
    box3.rotation.y += 0.01;
    camera.lookAt(new THREE.Vector3(0,2,0));//原点を見る
    renderer.render(scene, camera);
  };
  update();
}
  window.addEventListener('DOMContentLoaded', init);
