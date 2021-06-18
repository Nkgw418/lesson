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
  var grid = new THREE.GridHelper(50,50);

  const helper = new THREE.Group();
  helper.add(axis);
  helper.add(grid);
  scene.add(helper);

  // テクスチャー読み込み
  var tl_man = new THREE.TextureLoader();
  var texture_man = tl_man.load("img/human.png");
  const mat_man = new THREE.SpriteMaterial({ map: texture_man});

  const sp_man = new THREE.Sprite(mat_man);
  sp_man.scale.set(1,10,1);
  sp_man.position.set(0,5,0);
  scene.add(sp_man);

  //椅子
  var g_cLeg1 = new THREE.BoxGeometry(3, 1, 3);
  var g_Chair = new THREE.MeshPhongMaterial({ color: 0x505050 });
  var cLeg1 = new THREE.Mesh(g_cLeg1, g_Chair);
  cLeg1.position.set(6.5,0.5,-2.5);

  var g_cLeg2 = new THREE.BoxGeometry(1, 2, 1);
  var cLeg2 = new THREE.Mesh(g_cLeg2, g_Chair);
  cLeg2.position.set(6.5,2,-2.5);

  var g_cBoard = new THREE.BoxGeometry(5, 1, 5);
  var cBoard = new THREE.Mesh(g_cBoard, g_Chair);
  cBoard.position.set(6.5,3.5,-2.5);

  var g_cBack = new THREE.BoxGeometry(5, 7, 1);
  var cBack = new THREE.Mesh(g_cBack, g_Chair);
  cBack.position.set(6.5,7.5,-0.5);






  const chair = new THREE.Group();
  chair.add(cLeg1);
  chair.add(cLeg2);
  chair.add(cBoard);
  chair.add(cBack);
  scene.add(chair);

  // 平行光源1
  var directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
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
