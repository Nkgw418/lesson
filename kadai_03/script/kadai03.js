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
  camera.position.set(5,10,5);
  //camera.lookAt(0,50,0);

  //軸
  var axis = new THREE.AxisHelper(125);
  axis.castShadow = true;

  //グリッド
  var grid = new THREE.GridHelper(100,10);

  const helper = new THREE.Group();
  helper.add(axis);
  helper.add(grid);
  scene.add(helper);

  // テクスチャー読み込み
  var tl_man = new THREE.TextureLoader();
  var texture_man = tl_man.load("img/human.png");
  const mat_man = new THREE.SpriteMaterial({ map: texture_man});

  const sp_man = new THREE.Sprite(mat_man);
  //sprite.scale.set(25,25,525);
  scene.add(sp_man);

  // 平行光源1
  var directionalLight1 = new THREE.DirectionalLight(0xffffff, 50);
  directionalLight1.position.set(0, 0, 10);
  // シーンに追加
  scene.add(directionalLight1);

  // コントローラーを作成
  const controls_c = new THREE.OrbitControls(camera,document.body);
  const controls_l = new THREE.OrbitControls(directionalLight1,document.body);

  // 初回実行
  var update = function() {
    requestAnimationFrame(update);

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
