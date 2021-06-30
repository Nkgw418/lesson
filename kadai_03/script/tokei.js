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
  camera.position.set(40,0,0);

  //軸
  const axis = new THREE.AxisHelper(125);
  axis.castShadow = true;

  //グリッド
  const grid = new THREE.GridHelper(50,50);

  const grid2 = new THREE.GridHelper(50,50);
  grid2.rotation.z = Math.PI / 2;

  const helper = new THREE.Group();
  helper.add(axis);
  helper.add(grid);
  helper.add(grid2);

  //秒針
  const g_second = new THREE.BoxGeometry(0.1,10,0.1);
  const m_second = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const second = new THREE.Mesh(g_second, m_second);
  second.position.set(0,5,0);
  const pivot_s = new THREE.Object3D();
  pivot_s.add(second);

  //分針
  const g_minute = new THREE.BoxGeometry(0.5,10,0.5);
  const m_minute = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const minute = new THREE.Mesh(g_minute, m_minute);
  minute.position.set(0,5,0);
  const pivot_m = new THREE.Object3D();
  pivot_m.add(minute);

  //時針
  const g_hour = new THREE.BoxGeometry(0.5,5,0.5);
  const m_hour = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const hour = new THREE.Mesh(g_hour, m_hour);
  hour.position.set(0,2.5,0);
  const pivot_h = new THREE.Object3D();
  pivot_h.add(hour);

  //中心の丸いやつ
  const g_center = new THREE.CylinderGeometry(0.5,0.5,0.5,32)
  const m_center = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const center = new THREE.Mesh(g_center, m_center);
  center.rotation.z = Math.PI/2;
  scene.add(center);

  // テクスチャー読み込み
  const textureLoader = new THREE.TextureLoader();
  const texture0 = textureLoader.load("img/tokei/zero.png");
  const mat0 = new THREE.SpriteMaterial({ map: texture0,});
  mat0.map = texture0;

  const texture1 = textureLoader.load("img/tokei/one.png");
  const mat1 = new THREE.SpriteMaterial({ map: texture1,});
  mat1.map = texture1;

  const texture2 = textureLoader.load("img/tokei/two.png");
  const mat2 = new THREE.SpriteMaterial({ map: texture2,});
  mat2.map = texture2;

  const texture3 = textureLoader.load("img/tokei/three.png");
  const mat3 = new THREE.SpriteMaterial({ map: texture3,});
  mat3.map = texture3;

  const texture4 = textureLoader.load("img/tokei/four.png");
  const mat4 = new THREE.SpriteMaterial({ map: texture4,});
  mat4.map = texture4;

  const texture5 = textureLoader.load("img/tokei/five.png");
  const mat5 = new THREE.SpriteMaterial({ map: texture5,});
  mat5.map = texture5;

  const texture6 = textureLoader.load("img/tokei/six.png");
  const mat6 = new THREE.SpriteMaterial({ map: texture6,});
  mat6.map = texture6;

  const texture7 = textureLoader.load("img/tokei/seven.png");
  const mat7 = new THREE.SpriteMaterial({ map: texture7,});
  mat7.map = texture7;

  const texture8 = textureLoader.load("img/tokei/eight.png");
  const mat8 = new THREE.SpriteMaterial({ map: texture8,});
  mat8.map = texture8;

  const texture9 = textureLoader.load("img/tokei/nine.png");
  const mat9 = new THREE.SpriteMaterial({ map: texture9,});
  mat9.map = texture9;

  const g_moji = new THREE.PlaneGeometry(3, 3);
  const moji0 = new THREE.Sprite(mat0);
  moji0.position.set(0,11,0);
  moji0.scale.set(3,3,1);
  const moji3 = new THREE.Sprite(mat3);
  moji3.position.set(0,0,-11);
  moji3.scale.set(3,3,1);
  const moji6 = new THREE.Sprite(mat6);
  moji6.position.set(0,-11,0);
  moji6.scale.set(3,3,1);
  const moji9 = new THREE.Sprite(mat9);
  moji9.position.set(0,0,11);
  moji9.scale.set(3,3,1);

  //デジタル
  var minute1 = new THREE.Sprite(mat0);
  minute1.position.set(0, -13, -1);
  minute1.scale.set(3,3,1);

  const minute10 = new THREE.Sprite(mat0);
  minute10.position.set(0, -13, 1);
  minute10.scale.set(3,3,1);

  
  




  scene.add(helper);
  scene.add(moji0);
  scene.add(moji3);
  scene.add(moji6);
  scene.add(moji9);
  scene.add(pivot_s);
  scene.add(pivot_m);
  scene.add(pivot_h);
  scene.add(minute1);
  

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
    let seconds = date.getSeconds();
    let time = date.getTime();

    //second.rotation.x += 0.01;
    pivot_s.rotation.x = -1*(Math.PI/30)*((time%60000)/1000);
    pivot_m.rotation.x = -1*(Math.PI/30)*((time%3600000)/60000);
    pivot_h.rotation.x = -1*((Math.PI/6)*hours+(Math.PI/6/60)*((time%3600000)/60000));

    
    clock(minutes%10, minute1);

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

  function clock(jikan, upd){
    scene.remove(upd);
    switch(jikan){
      case 0:
        upd = new THREE.Sprite(mat0);
        break;
      case 1:
        upd = new THREE.Sprite(mat1);
        break;
      case 2:
        upd = new THREE.Sprite(mat2);
        break;
      case 3:
        upd = new THREE.Sprite(mat3);
        break;
      case 4:
        upd = new THREE.Sprite(mat4);
        break;
      case 5:
        upd = new THREE.Sprite(mat5);
        break;
      case 6:
        upd = new THREE.Sprite(mat6);
        break;
      case 7:
        upd = new THREE.Sprite(mat7);
        break;
      case 8:
        upd = new THREE.Sprite(mat8);
        break;
      case 9:
        upd = new THREE.Sprite(mat9);
        break;
    }
    scene.add(upd);
  }
}
  window.addEventListener('DOMContentLoaded', init);
