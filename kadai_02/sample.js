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

  // 箱を作成 青
  var box_g = new THREE.BoxGeometry(1, 1, 1);
  var material_b1 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
  var box = new THREE.Mesh(box_g, material_b1);
  box.position.set(0,0,5);
  scene.add(box);

  //箱2 緑
  var material_b2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  var box2 = new THREE.Mesh(box_g, material_b2);
  box2.position.set(0,2,0);
  scene.add(box2);

  //箱3 赤
  var material_b3 = new THREE.MeshPhongMaterial({ color: 0xff0000 ,wireframe: true});
  var box3 = new THREE.Mesh(box_g, material_b3);
  box3.position.set(3,0,0);
  scene.add(box3);

  //平面
  var plane_g = new THREE.PlaneGeometry(16,16,16,16);
  var material_pl = new THREE.MeshPhongMaterial({ color: 0x7fffd4 ,wireframe: true});
  var plane = new THREE.Mesh(plane_g, material_pl);
  scene.add(plane);

  var cyl_g = new THREE.CylinderGeometry(0.5,0.5,3,16);
  var material_cy = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  var cylinder = new THREE.Mesh(cyl_g, material_cy);
  cylinder.position.set(-3,1.5,2);

  var cone_g = new THREE.ConeGeometry(2,4,32);
  var material_co = new THREE.MeshPhongMaterial({ color: 0x008000 });
  var cone = new THREE.Mesh(cone_g, material_co);
  cone.position.set(-3,4.5,2);

  //木のグループ
  const tree = new THREE.Group();
  tree.add(cylinder);
  tree.add(cone);
  scene.add(tree);

  var sphere_g = new THREE.SphereGeometry( 0.15, 16, 16 );
  var material_s = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
  var sphere = new THREE.Mesh(sphere_g, material_s );
  scene.add(sphere);

  var pillar_g = new THREE.BoxGeometry(0.1, 1, 0.1);
  var material_pi = new THREE.MeshPhongMaterial({ color: 0x252525 });
  var pillar1 = new THREE.Mesh(pillar_g, material_pi);
  pillar1.position.set(2,0.5,-3);

  var pillar2 = new THREE.Mesh(pillar_g, material_pi);
  pillar2.position.set(2,0.5,-4);

  var pillar3 = new THREE.Mesh(pillar_g, material_pi);
  pillar3.position.set(4,0.5,-3);

  var pillar4 = new THREE.Mesh(pillar_g, material_pi);
  pillar4.position.set(4,0.5,-4);

  var board_g = new THREE.BoxGeometry(2.2, 0.1, 1.2);
  var material_board = new THREE.MeshPhongMaterial({ color: 0xa0522d });
  var board = new THREE.Mesh(board_g, material_board);
  board.position.set(3,1,-3.5);

  //机のグループ
  const table = new THREE.Group();
  table.add(pillar1);
  table.add(pillar2);
  table.add(pillar3);
  table.add(pillar4);
  table.add(board);
  scene.add(table);

  const all = new THREE.Group();
  all.add(box);
  all.add(box2);
  all.add(box3);
  all.add(plane);
  all.add(tree);
  all.add(table);
  all.add(sphere);
  all.add(axes);
  scene.add(all);

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
    tree.rotation.x += 0.01;
    table.rotation.y += 0.01;
    all.rotation.y += 0.005;
    renderer.render(scene, camera);
  };
  update();
}
window.addEventListener('DOMContentLoaded', init);
