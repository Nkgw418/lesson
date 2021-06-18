var init = function() {

  var width = 800,
      height = 600;

  // レンダラーを作成
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0xe0ffff);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000);
  camera.position.set(5,10,5);
  //camera.lookAt(0,50,0);

  //軸
  const axis = new THREE.AxisHelper(125);
  axis.castShadow = true;

  //グリッド
  const grid = new THREE.GridHelper(50,50);

  const helper = new THREE.Group();
  helper.add(axis);
  helper.add(grid);
  scene.add(helper);

  // テクスチャー読み込み
  const tl_man = new THREE.TextureLoader();
  const texture_man = tl_man.load("img/human.png");
  const mat_man = new THREE.SpriteMaterial({ map: texture_man});

  const sp_man = new THREE.Sprite(mat_man);
  sp_man.scale.set(3,10,1);
  sp_man.position.set(0,5,0);
  scene.add(sp_man);

  //仮置きマテリアルs
  const m_Chair = new THREE.MeshPhongMaterial({ color: 0x505050 });
  const m_dLeg = new THREE.MeshPhongMaterial({ color: 0x505050 });
  const m_dBoard = new THREE.MeshPhongMaterial({ color: 0xdeb887 });
  const m_mo = new THREE.MeshPhongMaterial({ color: 0x252525 });//winの画面でも貼り付けるか


  //椅子
  const chair = new THREE.Group();

  const g_cLeg1 = new THREE.BoxGeometry(3, 1, 3);
  const cLeg1 = new THREE.Mesh(g_cLeg1, m_Chair);
  cLeg1.position.set(6.5,0.5,-2.5);

  const g_cLeg2 = new THREE.BoxGeometry(1, 2, 1);
  const cLeg2 = new THREE.Mesh(g_cLeg2, m_Chair);
  cLeg2.position.set(6.5,2,-2.5);

  const g_cBoard = new THREE.BoxGeometry(5, 1, 5);
  const cBoard = new THREE.Mesh(g_cBoard, m_Chair);
  cBoard.position.set(6.5,3.5,-2.5);

  const g_cBack = new THREE.BoxGeometry(5, 7, 1);
  const cBack = new THREE.Mesh(g_cBack, m_Chair);
  cBack.position.set(6.5,7.5,-0.5);

  chair.add(cLeg1);
  chair.add(cLeg2);
  chair.add(cBoard);
  chair.add(cBack);
  scene.add(chair);//scene set

  //机
  const desk = new THREE.Group();

  const g_dLeg = new THREE.BoxGeometry(1, 7, 1);
  const g_dLeg2 = new THREE.BoxGeometry(1, 15, 1);
  const g_dLeg3 = new THREE.BoxGeometry(4, 1, 1);
  const g_dBoard = new THREE.BoxGeometry(12, 1, 6);
  const g_dBoard2 = new THREE.BoxGeometry(4, 1, 4);

  for(let i=0; i<2; i++){//机の脚
    const dLeg1 = new THREE.Mesh(g_dLeg, m_dLeg);
    dLeg1.position.set(-0.5, 3.5, -7.5-(i*5));

    const dLeg2 = new THREE.Mesh(g_dLeg2, m_dLeg);
    dLeg2.position.set(11.5, 7.5, -7.5-(i*5));

    const dLeg3 = new THREE.Mesh(g_dLeg2, m_dLeg);
    dLeg3.position.set(14.5, 7.5, -7.5-(i*5));

    const dLeg4 = new THREE.Mesh(g_dLeg3, m_dLeg);
    dLeg4.position.set(13, 15.5, -7.5-(i*5));

    const dLeg5 = new THREE.Mesh(g_dLeg3, m_dLeg);
    dLeg5.position.set(13, 7.5, -7.5-(i*5));

    desk.add(dLeg1);
    desk.add(dLeg2);
    desk.add(dLeg3);
    desk.add(dLeg4);
    desk.add(dLeg5);
  }

  const dBoard1 = new THREE.Mesh(g_dBoard, m_dBoard);
  dBoard1.position.set(5, 7.5, -10);

  const dBoard2 = new THREE.Mesh(g_dBoard2, m_dBoard);
  dBoard2.position.set(13, 11.5, -10);

  const dBoard3 = new THREE.Mesh(g_dBoard2, m_dBoard);
  dBoard3.position.set(13, 7.5, -10);

  const dBoard4 = new THREE.Mesh(g_dBoard2, m_dBoard);
  dBoard4.position.set(13, 1.5, -10);

  desk.add(dBoard1);
  desk.add(dBoard2);
  desk.add(dBoard3);
  desk.add(dBoard4);
  scene.add(desk);//scene set

  //モニター
  const monitor = new THREE.Group();

  const g_mo1 = new THREE.BoxGeometry(9, 5, 1);
  const g_mo2 = new THREE.BoxGeometry(1, 1, 1);
  const g_mo3 = new THREE.BoxGeometry(3, 1, 1);

  const mo1 = new THREE.Mesh(g_mo1, m_mo);
  mo1.position.set(6.5, 12.5, -11.5);

  const mo2 = new THREE.Mesh(g_mo2, m_mo);
  mo2.position.set(6.5, 9.5, -11.5);

  const mo3 = new THREE.Mesh(g_mo3, m_mo);
  mo3.position.set(6.5, 8.5, -11.5);

  monitor.add(mo1);
  monitor.add(mo2);
  monitor.add(mo3);
  scene.add(monitor);//scene set

  // 平行光源1
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
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
