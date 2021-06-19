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
  //const m_Chair = new THREE.MeshPhongMaterial({ color: 0x505050 });
  //const m_dLeg = new THREE.MeshStandardMaterial({ color: 0x505050 });
  //const m_dBoard = new THREE.MeshPhongMaterial({ color: 0xdeb887 });
  //const m_mo = new THREE.MeshPhongMaterial({ color: 0x757575 });//winの画面でも貼り付けるか
  const m_bFlame = new THREE.MeshPhongMaterial({ color: 0xdeb887 });
  const m_bMat = new THREE.MeshPhongMaterial({ color: 0xfffafa });
  const m_bCloth = new THREE.MeshPhongMaterial({ color: 0xf0f8ff });

  //テクスチャ
  const textureLoader = new THREE.TextureLoader();
  const texture_chair = textureLoader.load("img/chair/chair.jpg");
  const m_Chair = new THREE.MeshPhongMaterial();
  m_Chair.map = texture_chair;

  const texture_cLeg = textureLoader.load("img/chair/chairLeg.jpg");
  const m_cLeg = new THREE.MeshPhongMaterial();
  m_cLeg.map = texture_cLeg;

  //const texture_dLeg = textureLoader.load("img/desk/deskLeg.jpg");
  const m_dLeg = new THREE.MeshPhongMaterial({ color: 0x252525, metal:true });
  //m_dLeg.map = texture_dLeg;

  const texture_dBoard = textureLoader.load("img/wood.jpg");
  const m_dBoard = new THREE.MeshPhongMaterial();
  m_dBoard.map = texture_dBoard;

  const m_mo = [
       ,///new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("img/monitor/black.jpg")}),
       ,//new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("img/monitor/black.jpg")}),
       ,//new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("img/monitor/black.jpg")}),
       ,//new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("img/monitor/black.jpg")}),
       new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("img/monitor/desktop.jpg")}),
       //new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("img/monitor/black.jpg")}),
    ];

  // バンプマップ読み込み
  var bump_Chair = textureLoader.load("img/chair/chair-bump.jpg");
  m_Chair.bumpMap = bump_Chair;
  m_Chair.bumpscale = 0.2;

  var bump_cLeg = textureLoader.load("img/chair/chairLeg-bump.jpg");
  m_cLeg.bumpMap = bump_cLeg;
  m_cLeg.bumpscale = 0.2;

  //var bump_dLeg = textureLoader.load("img/desk/deskLeg-bump.jpg");m_dLeg.bumpMap = bump_dLeg;m_dLeg.bumpscale = 0.2;

  //var bump_dBoard = textureLoader.load("img/wood-bump.jpg");m_dBoard.bumpMap = bump_dBoard;m_dBoard.bumpscale = 0.2;


  //椅子
  const chair = new THREE.Group();

  const g_cLeg1 = new THREE.BoxGeometry(3, 1, 3);
  const cLeg1 = new THREE.Mesh(g_cLeg1, m_cLeg);
  cLeg1.position.set(6.5, 0.5, -2.5);

  const g_cLeg2 = new THREE.BoxGeometry(1, 3, 1);
  const cLeg2 = new THREE.Mesh(g_cLeg2, m_cLeg);
  cLeg2.position.set(6.5, 2.5, -2.5);

  const g_cBoard = new THREE.BoxGeometry(5, 1, 5);
  const cBoard = new THREE.Mesh(g_cBoard, m_Chair);
  cBoard.position.set(6.5, 4.5, -2.5);

  const g_cBack = new THREE.BoxGeometry(5, 7, 1);
  const cBack = new THREE.Mesh(g_cBack, m_Chair);
  cBack.position.set(6.5, 8.5, -0.5);

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
  const g_mo3 = new THREE.BoxGeometry(3, 1, 3);

  const mo1 = new THREE.Mesh(g_mo1, m_mo);
  mo1.position.set(6.5, 12.5, -11.5);

  const mo2 = new THREE.Mesh(g_mo2, m_dLeg);
  mo2.position.set(6.5, 9.5, -11.5);

  const mo3 = new THREE.Mesh(g_mo3, m_dLeg);
  mo3.position.set(6.5, 8.5, -11.5);

  monitor.add(mo1);
  monitor.add(mo2);
  monitor.add(mo3);
  scene.add(monitor);//scene set

  //ベッド
  const bed = new THREE.Group();

  const g_bFlame1 = new THREE.BoxGeometry(10, 2, 22);
  const g_bFlame2 = new THREE.BoxGeometry(10, 4, 2);
  const g_bFlame3 = new THREE.BoxGeometry(10, 2, 1);
  const g_bMat = new THREE.BoxGeometry(10, 2, 20);
  const g_bPillow = new THREE.BoxGeometry(6, 1, 3);
  const g_bCloth = new THREE.BoxGeometry(8, 1, 14);

  const bFlame1 = new THREE.Mesh(g_bFlame1, m_bFlame);
  bFlame1.position.set(-12, 1, 1);

  const bFlame2 = new THREE.Mesh(g_bFlame2, m_bFlame);
  bFlame2.position.set(-12, 4, -9);

  const bFlame3 = new THREE.Mesh(g_bFlame3, m_bFlame);
  bFlame3.position.set(-12, 7, -9.5);

  const bMat = new THREE.Mesh(g_bMat, m_bMat);
  bMat.position.set(-12, 3, 2);

  const bPillow = new THREE.Mesh(g_bPillow, m_bCloth);
  bPillow.position.set(-12, 4.5, -5.5);

  const bCloth = new THREE.Mesh(g_bCloth, m_bCloth);
  bCloth.position.set(-12, 4.5, 4);

  bed.add(bFlame1);
  bed.add(bFlame2);
  bed.add(bFlame3);
  bed.add(bMat);
  bed.add(bPillow);
  bed.add(bCloth);
  scene.add(bed);

  //PC
  const g_pc = new THREE.BoxGeometry(2, 4, 5);
  const pc = new THREE.Mesh(g_pc, m_mo);
  pc.position.set(16, 2, -9.5);
  scene.add(pc);

















  // 平行光源1
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(5, 10, 5);
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
