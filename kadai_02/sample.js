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
  camera.position.set(10, 10, 10);
  camera.lookAt(scene.position);

  //軸
  var axes = new THREE.AxisHelper(25);
  scene.add(axes);

  // 箱を作成 青いやつ
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
  var box = new THREE.Mesh(geometry, material);
  box.position.set(0,0,5);
  scene.add(box);
  //箱2 緑
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  var box2 = new THREE.Mesh(geometry, material);
  box2.position.set(0,2,0);
  scene.add(box2);
  //箱3 赤
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshPhongMaterial({ color: 0xff0000 ,wireframe: true});
  var box3 = new THREE.Mesh(geometry, material);
  box3.position.set(3,0,0);
  scene.add(box3);

  var geometry = new THREE.PlaneGeometry(16,16,16,16);
  var material = new THREE.MeshPhongMaterial({ color: 0x7fffd4 ,wireframe: true});
  var plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  var geometry = new THREE.CylinderGeometry(0.1,0.1,1,32);
  var material = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  var cylinder = new THREE.Mesh(geometry, material);
  scene.add(cylinder);
  cylinder.position.set(-3,0.5,2);

  var geometry = new THREE.ConeGeometry(0.5,1.5,32);
  var material = new THREE.MeshPhongMaterial({ color: 0x008000 });
  var cone = new THREE.Mesh(geometry, material);
  scene.add(cone);
  cone.position.set(-3,1.5,2);

  var geometry = new THREE.SphereGeometry( 0.15, 16, 16 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
  var sphere = new THREE.Mesh( geometry, material );
  scene.add(sphere);

  var geometry = new THREE.BoxGeometry(0.1, 1, 0.1);
  var material = new THREE.MeshPhongMaterial({ color: 0x252525 });
  var pillar1 = new THREE.Mesh(geometry, material);
  pillar1.position.set(2,0.5,-3);

  var pillar2 = new THREE.Mesh(geometry, material);
  pillar2.position.set(2,0.5,-4);

  var pillar3 = new THREE.Mesh(geometry, material);
  pillar3.position.set(4,0.5,-3);

  var pillar4 = new THREE.Mesh(geometry, material);
  pillar4.position.set(4,0.5,-4);

  var geometry = new THREE.BoxGeometry(2.2, 0.1, 1.2);
  var material = new THREE.MeshPhongMaterial({ color: 0xa0522d });
  var board = new THREE.Mesh(geometry, material);
  board.position.set(3,1,-3.5);

  //机のグループ
  const table = new THREE.Group()
  table.add(pillar1);
  table.add(pillar2);
  table.add(pillar3);
  table.add(pillar4);
  table.add(board);
  scene.add(table);

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

    // 箱を回転させる
    //box.rotation.x += 0.1;
    box.rotation.z += 0.07;
    box2.rotation.y -= 0.2;
    box3.rotation.x -= 0.01;
    plane.rotation.set(Math.PI / -2,0,0);
    //table.rotation.x += 1;
    //table.rotation.y += 0.01;
    //table.rotation.z += 0.01;

    renderer.render(scene, camera);
  };
  update();
}
window.addEventListener('DOMContentLoaded', init);
