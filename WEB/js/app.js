/**
 * 매직 입체도형 3D 인터랙티브 랩 - 메인 애플리케이션 진입점 (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 전역 또는 모듈 스코프에서 데이터 가져오기
  const SHAPE_METADATA = window.SHAPE_METADATA;
  const ShapeBuilders = window.ShapeBuilders;
  const QuizManager = window.QuizManager;
  const BlueprintStudio = window.BlueprintStudio;

  // 1. 상태 관리
  const state = {
    currentShapeId: 'triangular_prism',
    currentFold: 0, // 0 (평면) ~ 1 (완성)
    isPlaying: false,
    playSpeed: 1,
    isXRay: false,
    isWireframe: false,
    activeTab: 'info', // 'info', 'inquiry', 'blueprint'
    quizManager: new QuizManager(),
    blueprintStudio: new BlueprintStudio('blueprint-container')
  };

  // 2. DOM 요소 참조
  const canvasContainer = document.getElementById('canvas-container');
  const pullSlider = document.getElementById('pull-slider');
  const pullValueLabel = document.getElementById('pull-value-label');
  const statusBadge = document.getElementById('status-badge');
  const btnPlay = document.getElementById('btn-play');
  const btnPullTag = document.getElementById('btn-pull-tag');
  const btnResetCamera = document.getElementById('btn-reset-camera');
  const btnToggleXray = document.getElementById('btn-toggle-xray');
  const btnToggleWire = document.getElementById('btn-toggle-wire');
  
  // 탭 관련
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const shapeNavButtons = document.querySelectorAll('.shape-nav-btn');

  // 모달 관련
  const btnOpenManual = document.getElementById('btn-open-manual');
  const manualModal = document.getElementById('manual-modal');
  const btnCloseManual = document.getElementById('btn-close-manual');

  // 3. Three.js 씬(Scene) 및 렌더러 초기화
  let scene, camera, renderer, controls;
  let currentShapeGroup = null;
  let raycaster, mouse;

  function initThree() {
    scene = new THREE.Scene();
    scene.background = null; // CSS 배경 그라데이션 투과

    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4, 5, 6);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    canvasContainer.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // 바닥 밑으로 약간만 회전 허용
    controls.minDistance = 2;
    controls.maxDistance = 20;

    // 조명 세팅
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 0.4);
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    // 바닥 그리드 가이드
    const gridHelper = new THREE.GridHelper(10, 20, 0x334155, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // 인터랙션용 레이캐스터
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer.domElement.addEventListener('pointerdown', onCanvasClick);
    window.addEventListener('resize', onWindowResize);

    // 첫 도형 로드
    loadShape(state.currentShapeId);

    // 렌더링 루프
    animate();
  }

  // 4. 도형 로드 및 변경
  function loadShape(shapeId) {
    if (currentShapeGroup) {
      scene.remove(currentShapeGroup);
      // 메모리 정리
      currentShapeGroup.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
      });
    }

    state.currentShapeId = shapeId;
    state.quizManager.setShape(shapeId);

    const builder = ShapeBuilders[shapeId];
    if (builder) {
      currentShapeGroup = builder({
        opacity: state.isXRay ? 0.45 : 0.88,
        wireframe: state.isWireframe
      });
      scene.add(currentShapeGroup);
      
      // 현재 슬라이더 값 적용
      currentShapeGroup.updateFold(state.currentFold);
    }

    updateInspectorUI();
    updateInquiryUI();
    updateBlueprintUI();
    updateNavButtonsUI();
  }

  // 5. 폴딩 진행률 갱신 ($t \in [0, 1]$)
  function setFold(value) {
    state.currentFold = Math.max(0, Math.min(1, value));
    pullSlider.value = Math.round(state.currentFold * 100);
    pullValueLabel.textContent = `${Math.round(state.currentFold * 100)}%`;

    if (currentShapeGroup && currentShapeGroup.updateFold) {
      currentShapeGroup.updateFold(state.currentFold);
    }

    // 상태 뱃지 업데이트
    if (state.currentFold <= 0.02) {
      statusBadge.textContent = '2D 평면 전개도 (타공 배치)';
      statusBadge.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30';
    } else if (state.currentFold >= 0.98) {
      statusBadge.textContent = '3D 입체도형 완성!';
      statusBadge.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
    } else {
      statusBadge.textContent = '실 당김 (장력 전달 중...)';
      statusBadge.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse';
    }
  }

  // 6. 애니메이션 렌더링 루프
  let playDirection = 1;
  function animate() {
    requestAnimationFrame(animate);

    if (state.isPlaying) {
      let nextFold = state.currentFold + (0.008 * state.playSpeed * playDirection);
      if (nextFold >= 1) {
        nextFold = 1;
        playDirection = -1; // 반대로 펼침
      } else if (nextFold <= 0) {
        nextFold = 0;
        playDirection = 1; // 다시 당김
      }
      setFold(nextFold);
    }

    controls.update();
    renderer.render(scene, camera);
  }

  // 7. 레이캐스팅 (면 클릭 인터랙션)
  function onCanvasClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    if (!currentShapeGroup) return;

    const intersects = raycaster.intersectObjects(currentShapeGroup.children, true);
    for (let hit of intersects) {
      if (hit.object.userData && hit.object.userData.name) {
        showFaceTooltip(hit.object.userData);
        break;
      }
    }
  }

  function showFaceTooltip(userData) {
    const tooltip = document.getElementById('canvas-tooltip');
    if (!tooltip) return;
    tooltip.innerHTML = `
      <div class="font-bold text-indigo-300">${userData.name}</div>
      <div class="text-xs text-slate-300">${userData.pairId ? `대응면 그룹: ${userData.pairId}` : '구성 면'}</div>
    `;
    tooltip.classList.remove('opacity-0');
    setTimeout(() => {
      tooltip.classList.add('opacity-0');
    }, 2500);
  }

  // 8. 윈도우 리사이즈
  function onWindowResize() {
    if (!canvasContainer || !renderer || !camera) return;
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // 9. UI 이벤트 바인딩
  // 슬라이더 조작
  pullSlider.addEventListener('input', (e) => {
    state.isPlaying = false;
    updatePlayButton();
    setFold(parseFloat(e.target.value) / 100);
  });

  // PULL 태그 길게 누르기(당기기) 인터랙션
  let pullInterval = null;
  function startPulling() {
    state.isPlaying = false;
    updatePlayButton();
    if (pullInterval) clearInterval(pullInterval);
    pullInterval = setInterval(() => {
      if (state.currentFold < 1) {
        setFold(state.currentFold + 0.03);
      } else {
        clearInterval(pullInterval);
      }
    }, 30);
  }
  function stopPulling() {
    if (pullInterval) clearInterval(pullInterval);
  }
  btnPullTag.addEventListener('pointerdown', startPulling);
  window.addEventListener('pointerup', stopPulling);

  // 재생/정지
  function updatePlayButton() {
    if (state.isPlaying) {
      btnPlay.innerHTML = `<i data-lucide="pause" class="w-5 h-5"></i><span>일시정지</span>`;
      btnPlay.classList.add('bg-amber-600', 'hover:bg-amber-500');
      btnPlay.classList.remove('bg-indigo-600', 'hover:bg-indigo-500');
    } else {
      btnPlay.innerHTML = `<i data-lucide="play" class="w-5 h-5"></i><span>자동 변환</span>`;
      btnPlay.classList.remove('bg-amber-600', 'hover:bg-amber-500');
      btnPlay.classList.add('bg-indigo-600', 'hover:bg-indigo-500');
    }
    lucide.createIcons();
  }

  btnPlay.addEventListener('click', () => {
    state.isPlaying = !state.isPlaying;
    updatePlayButton();
  });

  // 속도 조절
  const speedButtons = document.querySelectorAll('.speed-btn');
  speedButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      speedButtons.forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
      btn.classList.add('bg-indigo-600', 'text-white');
      state.playSpeed = parseFloat(btn.dataset.speed);
    });
  });

  // 카메라 리셋
  btnResetCamera.addEventListener('click', () => {
    controls.reset();
    camera.position.set(4, 5, 6);
  });

  // 투명도(X-Ray) 토글
  btnToggleXray.addEventListener('click', () => {
    state.isXRay = !state.isXRay;
    btnToggleXray.classList.toggle('text-indigo-400', state.isXRay);
    loadShape(state.currentShapeId);
  });

  // 와이어프레임 토글
  btnToggleWire.addEventListener('click', () => {
    state.isWireframe = !state.isWireframe;
    btnToggleWire.classList.toggle('text-indigo-400', state.isWireframe);
    loadShape(state.currentShapeId);
  });

  // 도형 네비게이션 버튼
  shapeNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const shapeId = btn.dataset.shape;
      setFold(0); // 새 도형은 펼친 상태에서 시작
      loadShape(shapeId);
    });
  });

  function updateNavButtonsUI() {
    shapeNavButtons.forEach(btn => {
      const isActive = btn.dataset.shape === state.currentShapeId;
      btn.classList.toggle('bg-indigo-600', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('bg-slate-800', !isActive);
      btn.classList.toggle('text-slate-300', !isActive);
    });
  }

  // 탭 전환
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      state.activeTab = tabId;
      tabButtons.forEach(b => {
        const active = b.dataset.tab === tabId;
        b.classList.toggle('border-indigo-500', active);
        b.classList.toggle('text-indigo-400', active);
        b.classList.toggle('border-transparent', !active);
        b.classList.toggle('text-slate-400', !active);
      });
      tabPanels.forEach(panel => {
        panel.classList.toggle('hidden', panel.id !== `tab-${tabId}`);
      });
    });
  });

  // 모달 제어
  btnOpenManual.addEventListener('click', () => {
    manualModal.classList.remove('hidden');
  });
  btnCloseManual.addEventListener('click', () => {
    manualModal.classList.add('hidden');
  });
  manualModal.addEventListener('click', (e) => {
    if (e.target === manualModal) manualModal.classList.add('hidden');
  });

  // 10. 인스펙터 UI 업데이트
  function updateInspectorUI() {
    const meta = SHAPE_METADATA[state.currentShapeId];
    if (!meta) return;

    document.getElementById('meta-title').textContent = meta.name;
    document.getElementById('meta-curriculum').textContent = meta.curriculum;
    document.getElementById('meta-faces').textContent = meta.faces;
    document.getElementById('meta-edges').textContent = meta.edges;
    document.getElementById('meta-vertices').textContent = meta.vertices;
    document.getElementById('meta-base-shape').textContent = meta.baseShape;
    document.getElementById('meta-side-shape').textContent = meta.sideShape;
    document.getElementById('meta-description').textContent = meta.description;
    document.getElementById('meta-formula').textContent = meta.formula;

    const listContainer = document.getElementById('meta-key-points');
    listContainer.innerHTML = meta.keyPoints.map(p => `
      <li class="flex items-start gap-2 text-xs text-slate-300">
        <span class="text-indigo-400 mt-0.5">•</span>
        <span>${p}</span>
      </li>
    `).join('');
  }

  // 11. 탐구 및 퀴즈 UI 업데이트
  function updateInquiryUI() {
    const qManager = state.quizManager;
    const stages = ['before', 'while', 'after'];
    
    stages.forEach(stage => {
      const data = qManager.getInquiryData(stage);
      const stageCard = document.getElementById(`inquiry-${stage}`);
      if (stageCard && data) {
        stageCard.querySelector('.inquiry-title').textContent = data.stage;
        stageCard.querySelector('.inquiry-question').textContent = data.question;
        stageCard.querySelector('.inquiry-hint').textContent = `힌트: ${data.hint}`;
        
        const answerElem = stageCard.querySelector('.inquiry-answer');
        answerElem.textContent = data.answerText;
        answerElem.classList.add('hidden');
        
        const btnToggleAns = stageCard.querySelector('.btn-toggle-answer');
        btnToggleAns.onclick = () => {
          answerElem.classList.toggle('hidden');
          btnToggleAns.textContent = answerElem.classList.contains('hidden') ? '정답 & 해설 보기' : '해설 닫기';
        };
      }
    });

    // 객관식 퀴즈 렌더링
    const quizzes = qManager.getQuizzesForShape();
    const quizContainer = document.getElementById('quiz-items-container');
    if (quizzes.length === 0) {
      quizContainer.innerHTML = `<p class="text-xs text-slate-400 py-2">이 도형의 심화 문제가 준비 중입니다.</p>`;
    } else {
      quizContainer.innerHTML = quizzes.map((q, idx) => `
        <div class="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 mb-3">
          <div class="text-xs font-semibold text-indigo-400 mb-1">체크 퀴즈 #${idx + 1}</div>
          <div class="text-sm font-medium text-slate-200 mb-2.5">${q.question}</div>
          <div class="space-y-1.5">
            ${q.options.map((opt, oIdx) => `
              <button class="quiz-option-btn w-full text-left p-2 rounded-lg text-xs bg-slate-900/60 hover:bg-slate-700/60 text-slate-300 transition-colors border border-slate-700/40" 
                      data-quiz-id="${q.id}" data-opt-idx="${oIdx}">
                ${oIdx + 1}. ${opt}
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback hidden mt-2.5 p-2 rounded text-xs bg-slate-900 border"></div>
        </div>
      `).join('');

      // 퀴즈 옵션 클릭 이벤트
      quizContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.onclick = () => {
          const quizId = btn.dataset.quizId;
          const optIdx = parseInt(btn.dataset.optIdx);
          const quiz = quizzes.find(item => item.id === quizId);
          const feedback = btn.parentElement.nextElementSibling;
          
          if (optIdx === quiz.answer) {
            feedback.className = 'quiz-feedback mt-2.5 p-2 rounded text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-500/40';
            feedback.innerHTML = `<strong>정답입니다! 🎉</strong> ${quiz.explanation}`;
          } else {
            feedback.className = 'quiz-feedback mt-2.5 p-2 rounded text-xs bg-rose-950/60 text-rose-300 border border-rose-500/40';
            feedback.innerHTML = `<strong>다시 생각해보세요!</strong> ${quiz.explanation}`;
          }
          feedback.classList.remove('hidden');
        };
      });
    }
  }

  // 12. DIY 도안 스튜디오 UI 업데이트
  function updateBlueprintUI() {
    const svgCode = state.blueprintStudio.generateBlueprintSVG(state.currentShapeId);
    const container = document.getElementById('blueprint-preview');
    if (container) {
      container.innerHTML = svgCode;
    }
    const printSection = document.getElementById('print-section');
    if (printSection) {
      printSection.innerHTML = svgCode;
    }
  }

  // 인쇄 버튼 이벤트
  const btnPrintBlueprint = document.getElementById('btn-print-blueprint');
  if (btnPrintBlueprint) {
    btnPrintBlueprint.addEventListener('click', () => {
      window.print();
    });
  }

  // 초기화 실행
  initThree();
  lucide.createIcons();
});
