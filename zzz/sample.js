var init = function() {

  var width = 800,
  height = 600;
  let rot = 0;

  // レンダラーを作成
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  //シャドウを有効
  renderer.shadowMap.enabled = true;

  // シーンを作成
  var scene = new THREE.Scene();

  // カメラを作成
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(15,15,15);
  //camera.lookAt(scene.position);


  //平面
  var plane_g = new THREE.PlaneGeometry(1000,1000);
  var material_pl = new THREE.MeshPhongMaterial({ color: 0x808080 });
  var plane = new THREE.Mesh(plane_g, material_pl);
  plane.position.set(0,-5,0);
  plane.rotation.set(Math.PI / -2,0,0);
  plane.receiveShadow = true;
  scene.add(plane);

  //軸
  var axis = new THREE.AxisHelper(25);
  axis.castShadow = true;

  //グリッド
  var grid = new THREE.GridHelper(16,16);

  const helper = new THREE.Group();
  helper.add(axis);
  helper.add(grid);
  scene.add(helper);


  // 照明を作成
  var light = new THREE.SpotLight(0xFFFFFF, 2, 100, Math.PI / 4, 1);
  light.position.set(0,10,20);
  // ライトに影を有効にする
  light.castShadow = true;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 2048;
  scene.add(light);

  // 平行光源
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);
  // 平行光源2
  var directionalLight2 = new THREE.DirectionalLight(0xffffff);
  directionalLight2.position.set(-1, 1, 1);
  // シーンに追加
  scene.add(directionalLight2);

  // 初回実行
  var update = function() {
    requestAnimationFrame(update);

    rot += 0.1;
    // ラジアンに変換する
    var radian = rot * Math.PI / 180;
    // 角度に応じてカメラの位置を設定
    camera.position.x = 20 * Math.sin(radian);
    camera.position.z = 20 * Math.cos(radian);
    camera.position.y = 5 ;
    camera.lookAt(new THREE.Vector3(0,0,0));//原点を見る
    renderer.render(scene, camera);
  };
  update();
}
window.addEventListener('DOMContentLoaded', init);
