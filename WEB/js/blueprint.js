/**
 * 매직 입체도형 3D 인터랙티브 랩 - DIY 전개도 도안 스튜디오
 * A4 규격 맞춤 인쇄용 SVG 도안 생성기 (자르는 선, 접는 칼선, 타공점 3~4mm, PULL 라벨)
 */

class BlueprintStudio {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  generateBlueprintSVG(shapeId) {
    switch (shapeId) {
      case 'triangular_prism':
        return this.renderTriangularPrismSVG();
      case 'cuboid':
        return this.renderCuboidSVG();
      case 'cube':
        return this.renderCubeSVG();
      case 'cylinder':
        return this.renderCylinderSVG();
      case 'dome':
        return this.renderDomeSVG();
      default:
        return this.renderTriangularPrismSVG();
    }
  }

  renderTriangularPrismSVG() {
    return `
      <svg viewBox="0 0 800 560" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: sans-serif;">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="800" height="560" fill="url(#grid)" />
        
        <text x="40" y="45" font-size="20" font-weight="bold" fill="#0f172a">📐 [DIY 도안] 삼각기둥 매직 전개도 (A4 규격)</text>
        <text x="40" y="70" font-size="12" fill="#64748b">실선: 자르는 선(가위) | 파선: 칼선 누름(접는 선) | 붉은 원: 1공 펀치 타공점 (지름 3~4mm)</text>
        
        <g transform="translate(160, 100)">
          <polygon points="160,140 320,140 240,2" fill="#ecfdf5" stroke="#10b981" stroke-width="2" />
          <line x1="160" y1="140" x2="320" y2="140" stroke="#4f46e5" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="220" y="90" font-size="12" fill="#059669" font-weight="600">위쪽 밑면</text>

          <rect x="0" y="140" width="160" height="240" fill="#f8fafc" stroke="#334155" stroke-width="2.5" />
          <rect x="160" y="140" width="160" height="240" fill="#eff6ff" stroke="#3b82f6" stroke-width="2.5" />
          <rect x="320" y="140" width="160" height="240" fill="#f8fafc" stroke="#334155" stroke-width="2.5" />
          
          <line x1="160" y1="140" x2="160" y2="380" stroke="#4f46e5" stroke-width="2.5" stroke-dasharray="6,4" />
          <line x1="320" y1="140" x2="320" y2="380" stroke="#4f46e5" stroke-width="2.5" stroke-dasharray="6,4" />
          
          <text x="50" y="260" font-size="14" fill="#64748b" font-weight="600">왼쪽 옆면</text>
          <text x="200" y="260" font-size="14" fill="#2563eb" font-weight="bold">기준 바닥면</text>
          <text x="370" y="260" font-size="14" fill="#64748b" font-weight="600">오른쪽 옆면</text>

          <polygon points="160,380 320,380 240,518" fill="#ecfdf5" stroke="#10b981" stroke-width="2" />
          <line x1="160" y1="380" x2="320" y2="380" stroke="#4f46e5" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="220" y="440" font-size="12" fill="#059669" font-weight="600">아래쪽 밑면</text>

          <circle cx="15" cy="155" r="7" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2.5" />
          <circle cx="15" cy="155" r="2" fill="#f43f5e" />
          <text x="28" y="160" font-size="11" fill="#e11d48" font-weight="bold">타공 A</text>
          
          <circle cx="465" cy="155" r="7" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2.5" />
          <circle cx="465" cy="155" r="2" fill="#f43f5e" />
          <text x="410" y="160" font-size="11" fill="#e11d48" font-weight="bold">타공 B</text>

          <g transform="translate(490, 200)">
            <rect width="60" height="30" rx="4" fill="#4f46e5" />
            <text x="12" y="20" font-size="12" font-weight="bold" fill="#ffffff">PULL 🏷️</text>
            <text x="-10" y="45" font-size="10" fill="#64748b">실 매듭 손잡이</text>
          </g>
        </g>
      </svg>
    `;
  }

  renderCuboidSVG() {
    return `
      <svg viewBox="0 0 800 560" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: sans-serif;">
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="800" height="560" fill="url(#grid2)" />
        
        <text x="40" y="45" font-size="20" font-weight="bold" fill="#0f172a">📦 [DIY 도안] 직육면체 매직 전개도 (A4 규격)</text>
        <text x="40" y="70" font-size="12" fill="#64748b">실선: 자르는 선 | 파선: 접는 선(칼선) | 빨간 점: 교차 타공점 (실 통과)</text>
        
        <g transform="translate(180, 80)">
          <rect x="120" y="0" width="180" height="100" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="190" y="55" font-size="13" font-weight="bold" fill="#0369a1">윗면 (4번)</text>
          <line x1="120" y1="100" x2="300" y2="100" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />

          <rect x="120" y="100" width="180" height="90" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
          <text x="190" y="150" font-size="13" font-weight="bold" fill="#b45309">뒷면 (3번)</text>
          <line x1="120" y1="190" x2="300" y2="190" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />

          <rect x="120" y="190" width="180" height="100" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="175" y="245" font-size="13" font-weight="bold" fill="#0369a1">기준 밑면 (1번)</text>
          <line x1="120" y1="290" x2="300" y2="290" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />

          <rect x="120" y="290" width="180" height="90" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
          <text x="190" y="340" font-size="13" font-weight="bold" fill="#b45309">앞면 (2번)</text>

          <rect x="0" y="190" width="120" height="100" fill="#d1fae5" stroke="#059669" stroke-width="2" />
          <line x1="120" y1="190" x2="120" y2="290" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />
          <text x="35" y="245" font-size="13" font-weight="bold" fill="#047857">좌측면 (5번)</text>

          <rect x="300" y="190" width="120" height="100" fill="#d1fae5" stroke="#059669" stroke-width="2" />
          <line x1="300" y1="190" x2="300" y2="290" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />
          <text x="335" y="245" font-size="13" font-weight="bold" fill="#047857">우측면 (6번)</text>

          <circle cx="210" cy="15" r="6" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2.5" />
          <circle cx="210" cy="365" r="6" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2.5" />
          <circle cx="15" cy="240" r="6" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2.5" />
          <circle cx="405" cy="240" r="6" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2.5" />
        </g>
      </svg>
    `;
  }

  renderCubeSVG() {
    const s = 90;
    return `
      <svg viewBox="0 0 800 560" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: sans-serif;">
        <text x="40" y="45" font-size="20" font-weight="bold" fill="#0f172a">🎲 [DIY 도안] 정육면체 계단형 전개도 (A4 규격)</text>
        <text x="40" y="70" font-size="12" fill="#64748b">정사각형 6개로 구성된 11가지 전개도 중 실 당김 효율이 가장 높은 계단형 도안입니다.</text>
        
        <g transform="translate(180, 90)">
          <rect x="${s}" y="0" width="${s}" height="${s}" fill="#f3e8ff" stroke="#9333ea" stroke-width="2" />
          <rect x="0" y="${s}" width="${s}" height="${s}" fill="#ede9fe" stroke="#7c3aed" stroke-width="2" />
          <rect x="${s}" y="${s}" width="${s}" height="${s}" fill="#f3e8ff" stroke="#9333ea" stroke-width="2" />
          <rect x="${s*2}" y="${s}" width="${s}" height="${s}" fill="#ede9fe" stroke="#7c3aed" stroke-width="2" />
          <rect x="${s*3}" y="${s}" width="${s}" height="${s}" fill="#f3e8ff" stroke="#9333ea" stroke-width="2" />
          <rect x="${s*2}" y="${s*2}" width="${s}" height="${s}" fill="#ede9fe" stroke="#7c3aed" stroke-width="2" />
          
          <line x1="${s}" y1="${s}" x2="${s*2}" y2="${s}" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />
          <line x1="${s}" y1="${s}" x2="${s}" y2="${s*2}" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />
          <line x1="${s*2}" y1="${s}" x2="${s*2}" y2="${s*2}" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />
          <line x1="${s*3}" y1="${s}" x2="${s*3}" y2="${s*2}" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />
          <line x1="${s*2}" y1="${s*2}" x2="${s*3}" y2="${s*2}" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,4" />
          
          <circle cx="${s + 15}" cy="15" r="6" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2" />
          <circle cx="${s*3 - 15}" cy="${s*2 + s - 15}" r="6" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2" />
        </g>
      </svg>
    `;
  }

  renderCylinderSVG() {
    return `
      <svg viewBox="0 0 800 560" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: sans-serif;">
        <text x="40" y="45" font-size="20" font-weight="bold" fill="#0f172a">🥫 [DIY 도안] 원기둥 곡면 롤링 전개도 (A4 규격)</text>
        <text x="40" y="70" font-size="12" fill="#64748b">직사각형 가로 길이 = 밑면 원의 둘레 (2πr). 실을 당기면 직사각형이 원을 감싸며 말립니다.</text>
        
        <g transform="translate(100, 110)">
          <circle cx="300" cy="50" r="50" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2" />
          <text x="275" y="55" font-size="12" fill="#e11d48" font-weight="bold">위쪽 밑면</text>

          <rect x="143" y="100" width="314" height="160" fill="#fff1f2" stroke="#e11d48" stroke-width="2.5" />
          <text x="235" y="185" font-size="14" fill="#be123c" font-weight="bold">옆면 (직사각형, 가로 = 2πr)</text>
          
          <circle cx="300" cy="310" r="50" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2" />
          <text x="270" y="315" font-size="12" fill="#e11d48" font-weight="bold">아래쪽 밑면</text>
          
          <circle cx="155" cy="180" r="6" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2.5" />
          <circle cx="445" cy="180" r="6" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2.5" />
        </g>
      </svg>
    `;
  }

  renderDomeSVG() {
    return `
      <svg viewBox="0 0 800 560" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: sans-serif;">
        <text x="40" y="45" font-size="20" font-weight="bold" fill="#0f172a">⭐ [DIY 도안] 별모양 다각뿔 & 돔 전개도 (A4 규격)</text>
        <text x="40" y="70" font-size="12" fill="#64748b">별 모양 각 꼭짓점에 구멍을 뚫고 실을 꿰어 위로 당기면(Drawstring) 돔/뿔이 형성됩니다.</text>
        
        <g transform="translate(400, 290)">
          <polygon points="
            0,-70 60.6,-35 60.6,35 0,70 -60.6,35 -60.6,-35
          " fill="#ecfdf5" stroke="#10b981" stroke-width="2" />
          <text x="-25" y="5" font-size="12" fill="#047857" font-weight="bold">밑면(육각)</text>
          
          <polygon points="0,-70 60.6,-35 30.3,-180" fill="#f0fdf4" stroke="#059669" stroke-width="1.5" />
          <circle cx="30.3" cy="-170" r="5" fill="#f43f5e" />
          
          <polygon points="60.6,-35 60.6,35 170,0" fill="#f0fdf4" stroke="#059669" stroke-width="1.5" />
          <circle cx="160" cy="0" r="5" fill="#f43f5e" />
          
          <polygon points="60.6,35 0,70 120,130" fill="#f0fdf4" stroke="#059669" stroke-width="1.5" />
          <circle cx="112" cy="120" r="5" fill="#f43f5e" />
          
          <polygon points="0,70 -60.6,35 -30.3,180" fill="#f0fdf4" stroke="#059669" stroke-width="1.5" />
          <circle cx="-30.3" cy="170" r="5" fill="#f43f5e" />
          
          <polygon points="-60.6,35 -60.6,-35 -170,0" fill="#f0fdf4" stroke="#059669" stroke-width="1.5" />
          <circle cx="-160" cy="0" r="5" fill="#f43f5e" />
          
          <polygon points="-60.6,-35 0,-70 -120,-130" fill="#f0fdf4" stroke="#059669" stroke-width="1.5" />
          <circle cx="-112" cy="-120" r="5" fill="#f43f5e" />
        </g>
      </svg>
    `;
  }
}

// 전역 등록
window.BlueprintStudio = BlueprintStudio;
