var init = function() {

  var width = 800,
      height = 600;

  // レンダラーを作成
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0xe0ffff);

  // シーンを作成
  var scene = new THREE.Scene();

  // カメラを作成
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000);
  camera.position.set(0,5,10);
  //camera.lookAt(0,50,0);

  //軸
  var axis = new THREE.AxisHelper(15);
  axis.castShadow = true;

  //グリッド
  var grid = new THREE.GridHelper(10,10);

  const helper = new THREE.Group();
  helper.add(axis);
  helper.add(grid);
  scene.add(helper);

  // テクスチャー読み込み
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load("img/wood.jpg");
  var mat = new THREE.MeshPhongMaterial();
  mat.map = texture;

  // バンプマップ読み込み
  var bump = textureLoader.load("img/wood-bump.jpg");
  mat.bumpMap = bump;
  mat.bumpscale = 0.2;

  // 箱を作成
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshStandardMaterial({ color: 0x252525 });
  var box = new THREE.Mesh(geometry, mat);
  box.position.set(0,2,0);
  scene.add(box);

  // 平行光源1
  var directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(0, 0, 10);
  // シーンに追加
  scene.add(directionalLight1);
  // 平行光源2
  //var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  //directionalLight2.position.set(-2, 2, 2);
  // シーンに追加
  //scene.add(directionalLight2);
  // 平行光源3
  //var directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  //directionalLight3.position.set(0, -2, 2);
  // シーンに追加
  //scene.add(directionalLight3);

  //const light = new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0);
  //scene.add(light);

  // コントローラーを作成
  const controls_c = new THREE.OrbitControls(camera,document.body);
  const controls_l = new THREE.OrbitControls(directionalLight1,document.body);

  // 初回実行
  var update = function() {
    requestAnimationFrame(update);

    // 箱を回転させる
    //box.rotation.x += 0.01;
    //box.rotation.y += 0.01;
    //camera.lookAt(new THREE.Vector3(0,2,0));//原点を見る
    renderer.render(scene, camera);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  };
  update();

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}
  window.addEventListener('DOMContentLoaded', init);
