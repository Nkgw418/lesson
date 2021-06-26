const init = function() {

  const width = 800,
        height = 600;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0xe0ffff);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000);
  camera.position.set(30,0,0);

  //軸
  const axis = new THREE.AxisHelper(125);
  axis.castShadow = true;

  //グリッド
  const grid = new THREE.GridHelper(50,50);

  const helper = new THREE.Group();
  helper.add(axis);
  helper.add(grid);
  scene.add(helper);

  const g_second = new THREE.BoxGeometry(0.1,10,0.1);
  const m_second = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const second = new THREE.Mesh(g_second, m_second);
  second.position.set(0,5,0);
  const pivot_s = new THREE.Object3D();
  pivot_s.add(second);

  const g_minute = new THREE.BoxGeometry(0.5,10,0.5);
  const m_minute = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const minute = new THREE.Mesh(g_minute, m_minute);
  minute.position.set(0,5,0);
  const pivot_m = new THREE.Object3D();
  pivot_m.add(minute);

  const g_hour = new THREE.BoxGeometry(0.5,5,0.5);
  const m_hour = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const hour = new THREE.Mesh(g_hour, m_hour);
  hour.position.set(0,2.5,0);
  const pivot_h = new THREE.Object3D();
  pivot_h.add(hour);

  const g_center = new THREE.CylinderGeometry(0.5,0.5,0.5,32)
  const m_center = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const center = new THREE.Mesh(g_center, m_center);
  center.rotation.z = Math.PI/2;
  scene.add(center);


  // テクスチャー読み込み
  const textureLoader = new THREE.TextureLoader();
  const texture0 = textureLoader.load("img/tokei/zero.png");
  //const mat0 = new THREE.MeshLambertMaterial({transparent: true});
  const mat0 = new THREE.SpriteMaterial({ map: texture0,});
  mat0.map = texture0;
  const texture3 = textureLoader.load("img/tokei/three.png");
  const mat3 = new THREE.MeshLambertMaterial({transparent: true});
  mat3.map = texture3;
  const texture6 = textureLoader.load("img/tokei/six.png");
  const mat6 = new THREE.MeshLambertMaterial({transparent: true});
  mat6.map = texture6;
  const texture9 = textureLoader.load("img/tokei/nine.png");
  const mat9 = new THREE.MeshLambertMaterial({transparent: true});
  mat9.map = texture9;

  // 鳥0を作成(原点に作成)
  const g_moji = new THREE.PlaneGeometry(3, 3);
  //const moji0 = new THREE.Mesh(g_moji, mat0);
  const moji0 = new THREE.Sprite(mat0);
  moji0.position.set(0,11,0);
  //moji0.rotation.y = Math.PI/2;
  const moji3 = new THREE.Mesh(g_moji, mat3);
  moji3.position.set(0,0,-11);
  moji3.rotation.y = Math.PI/2;
  const moji6 = new THREE.Mesh(g_moji, mat6);
  moji6.position.set(0,-11,0);
  moji6.rotation.y = Math.PI/2;
  const moji9 = new THREE.Mesh(g_moji, mat9);
  moji9.position.set(0,0,11);
  moji9.rotation.y = Math.PI/2;

  scene.add(moji0);
  scene.add(moji3);
  scene.add(moji6);
  scene.add(moji9);
  scene.add(pivot_s);
  scene.add(pivot_m);
  scene.add(pivot_h);



  // 平行光源1
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(5, 10, 5);
  // シーンに追加
  scene.add(directionalLight1);
  // 平行光源2
  const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.1);
  directionalLight2.position.set(10,10,0);
  scene.add(directionalLight2);

  // コントローラーを作成
  const controls_c = new THREE.OrbitControls(camera,document.body);
  const controls_l = new THREE.OrbitControls(directionalLight1,document.body);




  // 初回実行
  const update = function() {
    requestAnimationFrame(update);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    //let seconds = date.getSeconds();
    let time = date.getTime();

    //second.rotation.x += 0.01;
    pivot_s.rotation.x = -1*(Math.PI/30)*((time%60000)/1000);
    pivot_m.rotation.x = -1*(Math.PI/30)*minutes;
    pivot_h.rotation.x = -1*(Math.PI/30)*hours;

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
