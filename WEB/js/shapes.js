/**
 * 매직 입체도형 3D 인터랙티브 랩 - 3D 도형 지오메트리 & 폴딩 엔진
 * Three.js 기반 5대 입체도형 힌지 계층 구조 및 당김줄(Pull String) 물리 시각화
 */

// 도형 데이터 및 메타데이터 정의
const SHAPE_METADATA = {
  triangular_prism: {
    id: 'triangular_prism',
    name: '삼각기둥 (Triangular Prism)',
    category: '각기둥',
    curriculum: '초등 6학년 1학기 [2. 각기둥과 각뿔]',
    faces: 5,
    edges: 9,
    vertices: 6,
    baseShape: '정삼각형 2개',
    sideShape: '직사각형 3개',
    description: '밑면이 합동인 삼각형 2개이고 옆면이 모두 직사각형인 입체도형입니다. 실을 당기면 평면 상태에서 가장 멀리 떨어져 있던 두 점의 거리가 0으로 수렴하면서 입체가 완성됩니다.',
    keyPoints: [
      '밑면 2개는 서로 평행하고 합동입니다.',
      '옆면의 개수는 밑면 다각형의 변의 수(3개)와 같습니다.',
      '실이 통과하는 양 끝 모서리가 당겨지면서 하나의 모서리로 맞물립니다.'
    ],
    formula: '부피 = 밑면 넓이 × 높이 = (√3/4 × a²) × h'
  },
  cuboid: {
    id: 'cuboid',
    name: '직육면체 (Cuboid)',
    category: '각기둥 / 사각기둥',
    curriculum: '초등 5학년 2학기 [5. 직육면체]',
    faces: 6,
    edges: 12,
    vertices: 8,
    baseShape: '합동인 직사각형 3쌍',
    sideShape: '직사각형 6개',
    description: '직사각형 6개로 둘러싸인 입체도형입니다. 마주보는 3쌍의 면이 서로 평행하고 합동입니다. 대각선 교차 타공 실의 장력으로 윗면과 옆면들이 한 번에 동시 기립합니다.',
    keyPoints: [
      '마주보는 면끼리 서로 평행하며 모양과 크기가 같습니다 (합동인 3쌍).',
      '만나는 모서리끼리는 길이가 정확히 일치해야 상자가 닫힙니다.',
      '두 가닥의 실이 교차 타공을 관통하여 장력을 전달합니다.'
    ],
    formula: '겉넓이 = 2(ab + bc + ca), 부피 = 가로 × 세로 × 높이'
  },
  cube: {
    id: 'cube',
    name: '정육면체 (Cube)',
    category: '정다면체',
    curriculum: '초등 5학년 2학기 [5. 직육면체] / 중1 [Ⅵ. 입체도형]',
    faces: 6,
    edges: 12,
    vertices: 8,
    baseShape: '정사각형 6개',
    sideShape: '정사각형 6개',
    description: '모양과 크기가 같은 정사각형 6개로 둘러싸인 정다면체입니다. 전개도 종류가 11가지나 되며, 연속된 변이 많은 전개도일수록 실의 저항이 적어 부드럽게 접힙니다.',
    keyPoints: [
      '11가지의 정육면체 전개도 중 계단형(1-4-1 또는 2-3-1형)이 실 당김 교구로 가장 적합합니다.',
      '마주보는 면끼리는 전개도 상에서 한 칸씩 건너뛰어 배치됩니다.',
      '실을 당기면 90도씩 꺾여 견고한 정육면체 상자가 완성됩니다.'
    ],
    formula: '겉넓이 = 6a², 부피 = a³'
  },
  cylinder: {
    id: 'cylinder',
    name: '원기둥 (Cylinder)',
    category: '회전체 / 곡면',
    curriculum: '초등 6학년 2학기 [6. 원기둥, 원뿔, 구]',
    faces: 3,
    edges: 2,
    vertices: 0,
    baseShape: '합동인 원 2개',
    sideShape: '직사각형 1개 (곡면 롤링)',
    description: '합동이고 평행한 두 원을 밑면으로 하고 옆면이 둥근 곡면인 기둥 모양 입체도형입니다. 직사각형 옆면이 말리면서 밑면 원을 빈틈없이 감싸는 롤링 메커니즘을 체험합니다.',
    keyPoints: [
      '직사각형 옆면의 가로 길이 = 밑면 원의 둘레 (2πr)',
      '직사각형 옆면의 세로 길이 = 원기둥의 높이 (h)',
      '실을 당기면 옆면이 둥글게 감기며 둘레와 가로의 일치성을 직접 확인할 수 있습니다.'
    ],
    formula: '겉넓이 = 2πr² + 2πrh, 부피 = πr²h'
  },
  dome: {
    id: 'dome',
    name: '별모양 다각뿔 & 돔 (Polygonal Pyramid / Dome)',
    category: '각뿔 / 건축 돔',
    curriculum: '초등 6학년 1학기 [각기둥과 각뿔] / STEAM 공학',
    faces: 7,
    edges: 12,
    vertices: 7,
    baseShape: '정육각형 1개',
    sideShape: '이등변삼각형 6개',
    description: '중심 다각형 밑면에서 뻗어나온 삼각형들이 하나의 꼭짓점으로 모이는 뿔/돔 형태입니다. 별 모양 전개도의 꼭짓점들을 감싼 끈을 당기면(폐곡선 루프 메커니즘) 모든 꼭짓점이 한 점으로 모입니다.',
    keyPoints: [
      '각기둥과 달리 밑면이 1개이고 모든 옆면이 하나의 꼭짓점으로 모입니다.',
      '주머니 끈(Drawstring) 원리로 둘레가 줄어들며 돔 형태를 형성합니다.',
      '텐트 폴대 구조, 우산 접힘, 지오데식 돔 건축의 핵심 공학 원리입니다.'
    ],
    formula: '부피 = 1/3 × 밑면 넓이 × 높이'
  }
};

// 재질 생성 헬퍼
function createFaceMaterial(color, opacity = 0.88, transparent = true) {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.35,
    metalness: 0.1,
    side: THREE.DoubleSide,
    transparent: transparent,
    opacity: opacity,
    depthWrite: true
  });
}

function createHoleMesh() {
  const geom = new THREE.RingGeometry(0.04, 0.08, 16);
  const mat = new THREE.MeshBasicMaterial({ color: 0xff3366, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

function createEdgeLines(geometry, color = 0x1e293b) {
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: color, linewidth: 2 }));
  return line;
}

/**
 * 1. 삼각기둥 (Triangular Prism) 빌더
 */
function buildTriangularPrism(options = {}) {
  const group = new THREE.Group();
  group.name = 'triangular_prism';
  
  const w = 2.0;
  const h = 2.8;
  const triH = (Math.sqrt(3) / 2) * w;
  
  const baseColor = 0x38bdf8;
  const sideColor1 = 0x818cf8;
  const sideColor2 = 0xc084fc;
  const capColor = 0x34d399;
  
  const baseGeom = new THREE.PlaneGeometry(w, h);
  const baseMat = createFaceMaterial(baseColor, options.opacity);
  const baseMesh = new THREE.Mesh(baseGeom, baseMat);
  baseMesh.rotation.x = -Math.PI / 2;
  baseMesh.userData = { faceId: 'base_side', name: '가운데 옆면(바닥)', isBase: true };
  baseMesh.add(createEdgeLines(baseGeom));
  group.add(baseMesh);
  
  const leftPivot = new THREE.Group();
  leftPivot.position.set(-w / 2, 0, 0);
  baseMesh.add(leftPivot);
  
  const leftMesh = new THREE.Mesh(baseGeom, createFaceMaterial(sideColor1, options.opacity));
  leftMesh.position.set(-w / 2, 0, 0);
  leftMesh.userData = { faceId: 'left_side', name: '왼쪽 옆면' };
  leftMesh.add(createEdgeLines(baseGeom));
  leftPivot.add(leftMesh);
  
  const rightPivot = new THREE.Group();
  rightPivot.position.set(w / 2, 0, 0);
  baseMesh.add(rightPivot);
  
  const rightMesh = new THREE.Mesh(baseGeom, createFaceMaterial(sideColor2, options.opacity));
  rightMesh.position.set(w / 2, 0, 0);
  rightMesh.userData = { faceId: 'right_side', name: '오른쪽 옆면' };
  rightMesh.add(createEdgeLines(baseGeom));
  rightPivot.add(rightMesh);
  
  const topPivot = new THREE.Group();
  topPivot.position.set(0, h / 2, 0);
  baseMesh.add(topPivot);
  
  const triShape = new THREE.Shape();
  triShape.moveTo(-w / 2, 0);
  triShape.lineTo(w / 2, 0);
  triShape.lineTo(0, triH);
  triShape.closePath();
  const triGeom = new THREE.ShapeGeometry(triShape);
  
  const topMesh = new THREE.Mesh(triGeom, createFaceMaterial(capColor, options.opacity));
  topMesh.userData = { faceId: 'top_cap', name: '위쪽 삼각형 밑면' };
  topMesh.add(createEdgeLines(triGeom));
  topPivot.add(topMesh);
  
  const bottomPivot = new THREE.Group();
  bottomPivot.position.set(0, -h / 2, 0);
  baseMesh.add(bottomPivot);
  
  const bottomShape = new THREE.Shape();
  bottomShape.moveTo(-w / 2, 0);
  bottomShape.lineTo(w / 2, 0);
  bottomShape.lineTo(0, -triH);
  bottomShape.closePath();
  const bottomGeom = new THREE.ShapeGeometry(bottomShape);
  
  const bottomMesh = new THREE.Mesh(bottomGeom, createFaceMaterial(capColor, options.opacity));
  bottomMesh.userData = { faceId: 'bottom_cap', name: '아래쪽 삼각형 밑면' };
  bottomMesh.add(createEdgeLines(bottomGeom));
  bottomPivot.add(bottomMesh);
  
  const holeLeft = createHoleMesh();
  holeLeft.position.set(-w * 0.9, 0, 0.01);
  leftPivot.add(holeLeft);
  
  const holeRight = createHoleMesh();
  holeRight.position.set(w * 0.9, 0, 0.01);
  rightPivot.add(holeRight);
  
  const stringGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-w * 1.4, 0, 0),
    new THREE.Vector3(w * 1.4, 0, 0)
  ]);
  const stringMat = new THREE.LineBasicMaterial({ color: 0xff3366, linewidth: 3 });
  const stringLine = new THREE.Line(stringGeom, stringMat);
  group.add(stringLine);

  group.updateFold = (t) => {
    const foldAngle = (120 * Math.PI / 180) * t;
    const capAngle = (Math.PI / 2) * t;
    
    leftPivot.rotation.y = -foldAngle;
    rightPivot.rotation.y = foldAngle;
    
    topPivot.rotation.x = -capAngle;
    bottomPivot.rotation.x = capAngle;
    
    group.updateMatrixWorld(true);
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    holeLeft.getWorldPosition(p1);
    holeRight.getWorldPosition(p2);
    
    const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    midPoint.y += (1 - t) * 0.5 + 0.3;
    
    stringLine.geometry.setFromPoints([p1, midPoint, p2]);
    stringLine.geometry.attributes.position.needsUpdate = true;
  };
  
  return group;
}

/**
 * 2. 직육면체 (Cuboid) 빌더
 */
function buildCuboid(options = {}) {
  const group = new THREE.Group();
  group.name = 'cuboid';
  
  const a = 2.4;
  const b = 1.8;
  const c = 2.0;
  
  const pairColor1 = 0x38bdf8;
  const pairColor2 = 0xf59e0b;
  const pairColor3 = 0x10b981;
  
  const baseGeom = new THREE.PlaneGeometry(a, b);
  const baseMat = createFaceMaterial(pairColor1, options.opacity);
  const baseMesh = new THREE.Mesh(baseGeom, baseMat);
  baseMesh.rotation.x = -Math.PI / 2;
  baseMesh.userData = { faceId: 'base', name: '밑면 (1번)', pairId: 'pair_1' };
  baseMesh.add(createEdgeLines(baseGeom));
  group.add(baseMesh);
  
  const frontPivot = new THREE.Group();
  frontPivot.position.set(0, -b / 2, 0);
  baseMesh.add(frontPivot);
  
  const frontGeom = new THREE.PlaneGeometry(a, c);
  const frontMesh = new THREE.Mesh(frontGeom, createFaceMaterial(pairColor2, options.opacity));
  frontMesh.position.set(0, -c / 2, 0);
  frontMesh.userData = { faceId: 'front', name: '앞면 (2번)', pairId: 'pair_2' };
  frontMesh.add(createEdgeLines(frontGeom));
  frontPivot.add(frontMesh);
  
  const backPivot = new THREE.Group();
  backPivot.position.set(0, b / 2, 0);
  baseMesh.add(backPivot);
  
  const backMesh = new THREE.Mesh(frontGeom, createFaceMaterial(pairColor2, options.opacity));
  backMesh.position.set(0, c / 2, 0);
  backMesh.userData = { faceId: 'back', name: '뒷면 (3번)', pairId: 'pair_2' };
  backMesh.add(createEdgeLines(frontGeom));
  backPivot.add(backMesh);
  
  const topPivot = new THREE.Group();
  topPivot.position.set(0, c, 0);
  backMesh.add(topPivot);
  
  const topMesh = new THREE.Mesh(baseGeom, createFaceMaterial(pairColor1, options.opacity));
  topMesh.position.set(0, b / 2, 0);
  topMesh.userData = { faceId: 'top', name: '윗면 (4번 - 밑면과 평행)', pairId: 'pair_1' };
  topMesh.add(createEdgeLines(baseGeom));
  topPivot.add(topMesh);
  
  const leftPivot = new THREE.Group();
  leftPivot.position.set(-a / 2, 0, 0);
  baseMesh.add(leftPivot);
  
  const sideGeom = new THREE.PlaneGeometry(c, b);
  const leftMesh = new THREE.Mesh(sideGeom, createFaceMaterial(pairColor3, options.opacity));
  leftMesh.position.set(-c / 2, 0, 0);
  leftMesh.userData = { faceId: 'left', name: '왼쪽 옆면 (5번)', pairId: 'pair_3' };
  leftMesh.add(createEdgeLines(sideGeom));
  leftPivot.add(leftMesh);
  
  const rightPivot = new THREE.Group();
  rightPivot.position.set(a / 2, 0, 0);
  baseMesh.add(rightPivot);
  
  const rightMesh = new THREE.Mesh(sideGeom, createFaceMaterial(pairColor3, options.opacity));
  rightMesh.position.set(c / 2, 0, 0);
  rightMesh.userData = { faceId: 'right', name: '오른쪽 옆면 (6번)', pairId: 'pair_3' };
  rightMesh.add(createEdgeLines(sideGeom));
  rightPivot.add(rightMesh);
  
  const holeTop = createHoleMesh();
  holeTop.position.set(0, b - 0.1, 0.01);
  topMesh.add(holeTop);
  
  const holeFront = createHoleMesh();
  holeFront.position.set(0, -c + 0.1, 0.01);
  frontMesh.add(holeFront);
  
  const stringGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0)
  ]);
  const stringLine = new THREE.Line(stringGeom, new THREE.LineBasicMaterial({ color: 0xf43f5e, linewidth: 3 }));
  group.add(stringLine);
  
  group.updateFold = (t) => {
    const angle90 = (Math.PI / 2) * t;
    
    frontPivot.rotation.x = angle90;
    backPivot.rotation.x = -angle90;
    topPivot.rotation.x = -angle90;
    
    leftPivot.rotation.y = -angle90;
    rightPivot.rotation.y = angle90;
    
    group.updateMatrixWorld(true);
    const pTop = new THREE.Vector3();
    const pFront = new THREE.Vector3();
    holeTop.getWorldPosition(pTop);
    holeFront.getWorldPosition(pFront);
    
    const pPull = new THREE.Vector3().lerpVectors(pTop, pFront, 0.5);
    pPull.y += (1 - t) * 0.8 + 0.2;
    
    stringLine.geometry.setFromPoints([pTop, pPull, pFront]);
    stringLine.geometry.attributes.position.needsUpdate = true;
  };
  
  return group;
}

/**
 * 3. 정육면체 (Cube) 빌더
 */
function buildCube(options = {}) {
  const group = new THREE.Group();
  group.name = 'cube';
  
  const s = 1.8;
  const cubeColor = 0xa855f7;
  
  const geom = new THREE.PlaneGeometry(s, s);
  
  const baseMat = createFaceMaterial(cubeColor, options.opacity);
  const baseMesh = new THREE.Mesh(geom, baseMat);
  baseMesh.rotation.x = -Math.PI / 2;
  baseMesh.userData = { faceId: 'cube_base', name: '정육면체 밑면' };
  baseMesh.add(createEdgeLines(geom));
  group.add(baseMesh);
  
  const frontPivot = new THREE.Group();
  frontPivot.position.set(0, -s / 2, 0);
  baseMesh.add(frontPivot);
  const frontMesh = new THREE.Mesh(geom, createFaceMaterial(0xec4899, options.opacity));
  frontMesh.position.set(0, -s / 2, 0);
  frontMesh.userData = { faceId: 'cube_front', name: '정육면체 앞면' };
  frontMesh.add(createEdgeLines(geom));
  frontPivot.add(frontMesh);
  
  const backPivot = new THREE.Group();
  backPivot.position.set(0, s / 2, 0);
  baseMesh.add(backPivot);
  const backMesh = new THREE.Mesh(geom, createFaceMaterial(0xec4899, options.opacity));
  backMesh.position.set(0, s / 2, 0);
  backMesh.userData = { faceId: 'cube_back', name: '정육면체 뒷면' };
  backMesh.add(createEdgeLines(geom));
  backPivot.add(backMesh);
  
  const topPivot = new THREE.Group();
  topPivot.position.set(0, s, 0);
  backMesh.add(topPivot);
  const topMesh = new THREE.Mesh(geom, createFaceMaterial(cubeColor, options.opacity));
  topMesh.position.set(0, s / 2, 0);
  topMesh.userData = { faceId: 'cube_top', name: '정육면체 윗면 (밑면과 평행)' };
  topMesh.add(createEdgeLines(geom));
  topPivot.add(topMesh);
  
  const leftPivot = new THREE.Group();
  leftPivot.position.set(-s / 2, 0, 0);
  baseMesh.add(leftPivot);
  const leftMesh = new THREE.Mesh(geom, createFaceMaterial(0x6366f1, options.opacity));
  leftMesh.position.set(-s / 2, 0, 0);
  leftMesh.userData = { faceId: 'cube_left', name: '정육면체 왼쪽면' };
  leftMesh.add(createEdgeLines(geom));
  leftPivot.add(leftMesh);
  
  const rightPivot = new THREE.Group();
  rightPivot.position.set(s / 2, 0, 0);
  baseMesh.add(rightPivot);
  const rightMesh = new THREE.Mesh(geom, createFaceMaterial(0x6366f1, options.opacity));
  rightMesh.position.set(s / 2, 0, 0);
  rightMesh.userData = { faceId: 'cube_right', name: '정육면체 오른쪽면' };
  rightMesh.add(createEdgeLines(geom));
  rightPivot.add(rightMesh);
  
  const h1 = createHoleMesh();
  h1.position.set(s * 0.4, s * 0.4, 0.01);
  topMesh.add(h1);
  
  const h2 = createHoleMesh();
  h2.position.set(0, -s * 0.8, 0.01);
  frontMesh.add(h2);
  
  const stringGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  const stringLine = new THREE.Line(stringGeom, new THREE.LineBasicMaterial({ color: 0xff0055, linewidth: 3 }));
  group.add(stringLine);
  
  group.updateFold = (t) => {
    const angle90 = (Math.PI / 2) * t;
    frontPivot.rotation.x = angle90;
    backPivot.rotation.x = -angle90;
    topPivot.rotation.x = -angle90;
    leftPivot.rotation.y = -angle90;
    rightPivot.rotation.y = angle90;
    
    group.updateMatrixWorld(true);
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    h1.getWorldPosition(p1);
    h2.getWorldPosition(p2);
    
    const mid = new THREE.Vector3().lerpVectors(p1, p2, 0.5);
    mid.y += (1 - t) * 0.9 + 0.2;
    stringLine.geometry.setFromPoints([p1, mid, p2]);
    stringLine.geometry.attributes.position.needsUpdate = true;
  };
  
  return group;
}

/**
 * 4. 원기둥 (Cylinder)
 */
function buildCylinder(options = {}) {
  const group = new THREE.Group();
  group.name = 'cylinder';
  
  const r = 1.0;
  const h = 2.6;
  const circumference = 2 * Math.PI * r;
  const segments = 48;
  
  const sideColor = 0xf43f5e;
  const capColor = 0xfb7185;
  
  const sideGeom = new THREE.PlaneGeometry(circumference, h, segments, 1);
  const sideMat = createFaceMaterial(sideColor, options.opacity);
  const sideMesh = new THREE.Mesh(sideGeom, sideMat);
  sideMesh.rotation.x = -Math.PI / 2;
  sideMesh.userData = { faceId: 'cyl_side', name: '원기둥 옆면 (곡면 롤링 직사각형)' };
  group.add(sideMesh);
  
  const circleGeom = new THREE.CircleGeometry(r, 36);
  const capMat = createFaceMaterial(capColor, options.opacity);
  
  const botCapPivot = new THREE.Group();
  botCapPivot.position.set(0, -h / 2, 0);
  sideMesh.add(botCapPivot);
  const botCap = new THREE.Mesh(circleGeom, capMat);
  botCap.position.set(0, -r, 0);
  botCap.userData = { faceId: 'cyl_bottom', name: '아래 밑면 원' };
  botCap.add(createEdgeLines(circleGeom));
  botCapPivot.add(botCap);
  
  const topCapPivot = new THREE.Group();
  topCapPivot.position.set(0, h / 2, 0);
  sideMesh.add(topCapPivot);
  const topCap = new THREE.Mesh(circleGeom, capMat);
  topCap.position.set(0, r, 0);
  topCap.userData = { faceId: 'cyl_top', name: '위 밑면 원' };
  topCap.add(createEdgeLines(circleGeom));
  topCapPivot.add(topCap);
  
  const holeL = createHoleMesh();
  holeL.position.set(-circumference / 2 + 0.1, 0, 0.02);
  sideMesh.add(holeL);
  
  const holeR = createHoleMesh();
  holeR.position.set(circumference / 2 - 0.1, 0, 0.02);
  sideMesh.add(holeR);
  
  const stringGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  const stringLine = new THREE.Line(stringGeom, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 }));
  group.add(stringLine);
  
  const origPositions = sideGeom.attributes.position.clone();
  
  group.updateFold = (t) => {
    const pos = sideGeom.attributes.position;
    const count = pos.count;
    
    if (t < 0.001) {
      for (let i = 0; i < count; i++) {
        pos.setXYZ(i, origPositions.getX(i), origPositions.getY(i), origPositions.getZ(i));
      }
    } else {
      for (let i = 0; i < count; i++) {
        const origX = origPositions.getX(i);
        const y = origPositions.getY(i);
        const fraction = origX / circumference;
        const currentTotalAngle = 2 * Math.PI * t;
        const currentR = circumference / currentTotalAngle;
        
        const angle = fraction * currentTotalAngle;
        const newX = currentR * Math.sin(angle);
        const newZ = currentR * (1 - Math.cos(angle)) * (currentR / r <= 1.2 ? 1 : (r / currentR));
        
        pos.setXYZ(i, newX, y, newZ * t);
      }
    }
    pos.needsUpdate = true;
    sideGeom.computeVertexNormals();
    
    const capAngle = (Math.PI / 2) * t;
    botCapPivot.rotation.x = capAngle;
    topCapPivot.rotation.x = -capAngle;
    
    group.updateMatrixWorld(true);
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    holeL.getWorldPosition(p1);
    holeR.getWorldPosition(p2);
    
    const mid = new THREE.Vector3().lerpVectors(p1, p2, 0.5);
    mid.y += (1 - t) * 0.8 + 0.2;
    stringLine.geometry.setFromPoints([p1, mid, p2]);
    stringLine.geometry.attributes.position.needsUpdate = true;
  };
  
  return group;
}

/**
 * 5. 별모양 다각뿔 & 돔 (Polygonal Pyramid / Star Dome)
 */
function buildPolygonalDome(options = {}) {
  const group = new THREE.Group();
  group.name = 'dome';
  
  const sides = 6;
  const r = 1.6;
  const triHeight = 2.4;
  
  const domeColor = 0x10b981;
  const baseColor = 0x059669;
  
  const hexShape = new THREE.Shape();
  const hexPoints = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    hexPoints.push(new THREE.Vector2(x, y));
    if (i === 0) hexShape.moveTo(x, y);
    else hexShape.lineTo(x, y);
  }
  hexShape.closePath();
  
  const hexGeom = new THREE.ShapeGeometry(hexShape);
  const hexMesh = new THREE.Mesh(hexGeom, createFaceMaterial(baseColor, options.opacity));
  hexMesh.rotation.x = -Math.PI / 2;
  hexMesh.userData = { faceId: 'dome_base', name: '중심 정육각형 밑면' };
  hexMesh.add(createEdgeLines(hexGeom));
  group.add(hexMesh);
  
  const sidePivots = [];
  const holeMeshes = [];
  
  for (let i = 0; i < sides; i++) {
    const pA = hexPoints[i];
    const pB = hexPoints[(i + 1) % sides];
    const edgeMid = new THREE.Vector2().addVectors(pA, pB).multiplyScalar(0.5);
    const edgeLength = pA.distanceTo(pB);
    const edgeAngle = Math.atan2(pB.y - pA.y, pB.x - pA.x);
    
    const pivot = new THREE.Group();
    pivot.position.set(edgeMid.x, edgeMid.y, 0);
    pivot.rotation.z = edgeAngle;
    hexMesh.add(pivot);
    sidePivots.push(pivot);
    
    const triShape = new THREE.Shape();
    triShape.moveTo(-edgeLength / 2, 0);
    triShape.lineTo(edgeLength / 2, 0);
    triShape.lineTo(0, triHeight);
    triShape.closePath();
    const triGeom = new THREE.ShapeGeometry(triShape);
    
    const triMesh = new THREE.Mesh(triGeom, createFaceMaterial(domeColor, options.opacity));
    triMesh.userData = { faceId: `dome_side_${i}`, name: `옆면 삼각형 ${i + 1}번` };
    triMesh.add(createEdgeLines(triGeom));
    pivot.add(triMesh);
    
    const hole = createHoleMesh();
    hole.position.set(0, triHeight - 0.15, 0.02);
    pivot.add(hole);
    holeMeshes.push(hole);
  }
  
  const loopGeom = new THREE.BufferGeometry();
  const loopLine = new THREE.LineLoop(loopGeom, new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 3 }));
  group.add(loopLine);
  
  const pullStringGeom = new THREE.BufferGeometry();
  const pullStringLine = new THREE.Line(pullStringGeom, new THREE.LineBasicMaterial({ color: 0xff3366, linewidth: 3 }));
  group.add(pullStringLine);
  
  const sideEdgeMidDist = hexPoints[0].distanceTo(hexPoints[1]) / (2 * Math.tan(Math.PI / sides));
  const maxAngle = Math.acos(sideEdgeMidDist / triHeight);
  
  group.updateFold = (t) => {
    const angle = (maxAngle * 1.05) * t;
    sidePivots.forEach(pivot => {
      pivot.rotation.x = -angle;
    });
    
    group.updateMatrixWorld(true);
    const holePositions = [];
    const avgApex = new THREE.Vector3();
    
    holeMeshes.forEach(h => {
      const p = new THREE.Vector3();
      h.getWorldPosition(p);
      holePositions.push(p);
      avgApex.add(p);
    });
    
    avgApex.divideScalar(sides);
    
    loopLine.geometry.setFromPoints(holePositions);
    loopLine.geometry.attributes.position.needsUpdate = true;
    
    const pullUpApex = avgApex.clone();
    pullUpApex.y += (1 - t) * 0.5 + 0.8;
    pullStringLine.geometry.setFromPoints([avgApex, pullUpApex]);
    pullStringLine.geometry.attributes.position.needsUpdate = true;
  };
  
  return group;
}

// 전역 등록 (어디서나 실행 가능)
window.SHAPE_METADATA = SHAPE_METADATA;
window.ShapeBuilders = {
  triangular_prism: buildTriangularPrism,
  cuboid: buildCuboid,
  cube: buildCube,
  cylinder: buildCylinder,
  dome: buildPolygonalDome
};
