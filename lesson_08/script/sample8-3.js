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
  camera.position.set(0,50,250);
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
  var textureLoader = new THREE.TextureLoader();
  var texture0 = textureLoader.load("img/bluebird_freeze.png");
  const material = new THREE.SpriteMaterial({ map: texture0,});

  // 鳥0を作成(原点に作成)
  //const sprite = new THREE.Sprite(material);
  //sprite.position.x = 0;
  //sprite.position.y = 50;
  //sprite.position.z = 0;
  //sprite.scale.set(100,100,100);
  //scene.add(sprite);
  for(let i = -50;i < 50; i++){
    const sprite = new THREE.Sprite(material);
    const a = Math.abs(i);
    sprite.position.x = i * 100;
    sprite.position.y = 50;
    sprite.position.z = 0;
    sprite.scale.set(i*50,i*50,i*50);
    scene.add(sprite);
  }
  for(let i = -50;i < 50; i++){
    const sprite = new THREE.Sprite(material);
    const a = Math.abs(i);
    sprite.position.x = 0;
    sprite.position.y = 50;
    sprite.position.z = i * 100;
    sprite.scale.set(i*50,i*50,i*50);
    scene.add(sprite);
  }
  for(let i = -50;i < 50; i++){
    const sprite = new THREE.Sprite(material);
    const a = Math.abs(i);
    sprite.position.x = 0;
    sprite.position.y = 50 + i * 100;
    sprite.position.z = 0;
    sprite.scale.set(i*50,i*50,i*50);
    scene.add(sprite);
  }
  const sprite = new THREE.Sprite(material);
  sprite.position.x = 0;
  sprite.position.y = 50;
  sprite.position.z = 0;
  sprite.scale.set(25,25,525);
  scene.add(sprite);
  //const boxes = new THREE.Group();
  //boxes.add(box);
  //boxes.add(box2);
  //boxes.add(box3);
  //scene.add(boxes);

  // 平行光源1
  var directionalLight1 = new THREE.DirectionalLight(0xffffff, 50);
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
    camera.lookAt(new THREE.Vector3(0, 50, 0));
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
