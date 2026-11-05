// ============================================================
// Квинтовый круг — script.js (сегментная версия, десктоп)
// Изменения против прошлой версии:
//   • тональности рисуются СЕКТОРАМИ (дольками), а не кружками
//   • внутри каждого сектора — название + ступень относительно выбранной тоники
//   • полярный hit-тест
//   • удалена гармоническая доминанта (вернём позже, вместе с «призрачной нотой»)
//   • сохранена дуговая геометрия getRadii() — задел под доп. данные
// ============================================================

const circleData = {
  keys: [
    { major: 'C', minor: 'Am', sharps: 0, flats: 0, angle: -Math.PI / 2, color: '#00dbde' },
    {
      major: 'G',
      minor: 'Em',
      sharps: 1,
      flats: 0,
      angle: -Math.PI / 2 + Math.PI / 6,
      color: '#00c4ff',
    },
    {
      major: 'D',
      minor: 'Bm',
      sharps: 2,
      flats: 0,
      angle: -Math.PI / 2 + (2 * Math.PI) / 6,
      color: '#009dff',
    },
    {
      major: 'A',
      minor: 'F#m',
      sharps: 3,
      flats: 0,
      angle: -Math.PI / 2 + (3 * Math.PI) / 6,
      color: '#0077ff',
    },
    {
      major: 'E',
      minor: 'C#m',
      sharps: 4,
      flats: 0,
      angle: -Math.PI / 2 + (4 * Math.PI) / 6,
      color: '#0051ff',
    },
    {
      major: 'B',
      minor: 'G#m',
      sharps: 5,
      flats: 0,
      angle: -Math.PI / 2 + (5 * Math.PI) / 6,
      color: '#002bff',
    },
    {
      major: 'F#',
      minor: 'D#m',
      sharps: 6,
      flats: 0,
      angle: -Math.PI / 2 + (6 * Math.PI) / 6,
      color: '#5500ff',
    },
    {
      major: 'F',
      minor: 'Dm',
      sharps: 0,
      flats: 1,
      angle: -Math.PI / 2 - Math.PI / 6,
      color: '#ffcc00',
    },
    {
      major: 'Bb',
      minor: 'Gm',
      sharps: 0,
      flats: 2,
      angle: -Math.PI / 2 - (2 * Math.PI) / 6,
      color: '#ff9900',
    },
    {
      major: 'Eb',
      minor: 'Cm',
      sharps: 0,
      flats: 3,
      angle: -Math.PI / 2 - (3 * Math.PI) / 6,
      color: '#ff6600',
    },
    {
      major: 'Ab',
      minor: 'Fm',
      sharps: 0,
      flats: 4,
      angle: -Math.PI / 2 - (4 * Math.PI) / 6,
      color: '#ff3300',
    },
    {
      major: 'Db',
      minor: 'Bbm',
      sharps: 0,
      flats: 5,
      angle: -Math.PI / 2 - (5 * Math.PI) / 6,
      color: '#ff0066',
    },
    {
      major: 'Gb',
      minor: 'Ebm',
      sharps: 0,
      flats: 6,
      angle: -Math.PI / 2 - (6 * Math.PI) / 6,
      color: '#ff00aa',
    },
  ],
}

function findKeyByName(keyName) {
  for (const key of circleData.keys) {
    if (key.major === keyName) return { ...key, type: 'major' }
    if (key.minor === keyName) return { ...key, type: 'minor' }
  }
  return null
}

const chords = {
  C: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B°'],
  G: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#°'],
  D: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#°'],
  A: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#°'],
  E: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#°'],
  B: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#°'],
  'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#°'],
  F: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'E°'],
  Bb: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'A°'],
  Eb: ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'D°'],
  Ab: ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'G°'],
  Db: ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'C°'],
  Gb: ['Gb', 'Abm', 'Bbm', 'Cb', 'Db', 'Ebm', 'F°'],
  Am: ['Am', 'B°', 'C', 'Dm', 'Em', 'F', 'G'],
  Em: ['Em', 'F#°', 'G', 'Am', 'Bm', 'C', 'D'],
  Bm: ['Bm', 'C#°', 'D', 'Em', 'F#m', 'G', 'A'],
  'F#m': ['F#m', 'G#°', 'A', 'Bm', 'C#m', 'D', 'E'],
  'C#m': ['C#m', 'D#°', 'E', 'F#m', 'G#m', 'A', 'B'],
  'G#m': ['G#m', 'A#°', 'B', 'C#m', 'D#m', 'E', 'F#'],
  'D#m': ['D#m', 'E#°', 'F#', 'G#m', 'A#m', 'B', 'C#'],
  'A#m': ['A#m', 'B#°', 'C#', 'D#m', 'E#m', 'F#', 'G#'],
  Dm: ['Dm', 'E°', 'F', 'Gm', 'Am', 'Bb', 'C'],
  Gm: ['Gm', 'A°', 'Bb', 'Cm', 'Dm', 'Eb', 'F'],
  Cm: ['Cm', 'D°', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb'],
  Fm: ['Fm', 'G°', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'],
  Bbm: ['Bbm', 'C°', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab'],
  Ebm: ['Ebm', 'F°', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db'],
}

const chordProgressions = {
  '2-5-1': { name: 'II-V-I', majorSteps: [2, 5, 1], minorSteps: [2, 5, 1], color: '#333333' },
  '1-4-5': { name: 'I-IV-V', majorSteps: [1, 4, 5], minorSteps: [1, 4, 5], color: '#333333' },
  '1-6-4-5': {
    name: 'I-vi-IV-V',
    majorSteps: [1, 6, 4, 5],
    minorSteps: [1, 6, 4, 5],
    color: '#333333',
  },
  '1-5-6-4': {
    name: 'I-V-vi-IV',
    majorSteps: [1, 5, 6, 4],
    minorSteps: [1, 5, 6, 4],
    color: '#333333',
  },
  '1-4-2-5': {
    name: 'I-IV-ii-V',
    majorSteps: [1, 4, 2, 5],
    minorSteps: [1, 4, 2, 5],
    color: '#333333',
  },
  '6-2-5-1': {
    name: 'vi-ii-V-I',
    majorSteps: [6, 2, 5, 1],
    minorSteps: [6, 2, 5, 1],
    color: '#333333',
  },
  '1-3-6-2-5-1': {
    name: 'I-iii-vi-ii-V-I',
    majorSteps: [1, 3, 6, 2, 5, 1],
    minorSteps: [1, 3, 6, 2, 5, 1],
    color: '#333333',
  },
  '4-5-3-6': {
    name: 'IV-V-iii-vi',
    majorSteps: [4, 5, 3, 6],
    minorSteps: [4, 5, 3, 6],
    color: '#333333',
  },
  '1-6-2-5': {
    name: 'I-vi-ii-V',
    majorSteps: [1, 6, 2, 5],
    minorSteps: [1, 6, 2, 5],
    color: '#333333',
  },
  '6-4-1-5': {
    name: 'vi-IV-I-V',
    majorSteps: [6, 4, 1, 5],
    minorSteps: [6, 4, 1, 5],
    color: '#333333',
  },
  '1-4-6-5': {
    name: 'I-IV-vi-V',
    majorSteps: [1, 4, 6, 5],
    minorSteps: [1, 4, 6, 5],
    color: '#333333',
  },
  '2-6-4-5': {
    name: 'ii-vi-IV-V',
    majorSteps: [2, 6, 4, 5],
    minorSteps: [2, 6, 4, 5],
    color: '#333333',
  },
  '4-1-5-6': {
    name: 'IV-I-V-vi',
    majorSteps: [4, 1, 5, 6],
    minorSteps: [4, 1, 5, 6],
    color: '#333333',
  },
  '1-5-4-5': {
    name: 'I-V-IV-V',
    majorSteps: [1, 5, 4, 5],
    minorSteps: [1, 5, 4, 5],
    color: '#333333',
  },
  '6-1-5-4': {
    name: 'vi-I-V-IV',
    majorSteps: [6, 1, 5, 4],
    minorSteps: [6, 1, 5, 4],
    color: '#333333',
  },
  '1-3-4-5': {
    name: 'I-iii-IV-V',
    majorSteps: [1, 3, 4, 5],
    minorSteps: [1, 3, 4, 5],
    color: '#333333',
  },
  '6-5-4-5': {
    name: 'vi-V-IV-V',
    majorSteps: [6, 5, 4, 5],
    minorSteps: [6, 5, 4, 5],
    color: '#333333',
  },
}

const chordDegrees = {
  C: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  G: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  D: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  A: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  E: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  B: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  'F#': ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  F: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  Bb: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  Eb: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  Ab: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  Db: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  Gb: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  Am: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  Em: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  Bm: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  'F#m': ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  'C#m': ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  'G#m': ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  'D#m': ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  'A#m': ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  Dm: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  Gm: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  Cm: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  Fm: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  Bbm: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  Ebm: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
}

const keySignatures = {
  C: { sharps: [], flats: [] },
  G: { sharps: ['F#'], flats: [] },
  D: { sharps: ['F#', 'C#'], flats: [] },
  A: { sharps: ['F#', 'C#', 'G#'], flats: [] },
  E: { sharps: ['F#', 'C#', 'G#', 'D#'], flats: [] },
  B: { sharps: ['F#', 'C#', 'G#', 'D#', 'A#'], flats: [] },
  'F#': { sharps: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'], flats: [] },
  F: { sharps: [], flats: ['Bb'] },
  Bb: { sharps: [], flats: ['Bb', 'Eb'] },
  Eb: { sharps: [], flats: ['Bb', 'Eb', 'Ab'] },
  Ab: { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db'] },
  Db: { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'] },
  Gb: { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'] },
}

const state = {
  selectedKey: 'C',
  selectedIsMinor: false,
  rotation: 0,
  isDragging: false,
  lastX: 0,
  isAnimating: false,
  animationId: null,
  hoveredKey: null,
  rotationVelocity: 0,
  wheelTimeout: null,
  activeProgression: null,
  showDegree1: false,
  showDegree2: false,
  showPentatonic: false,
  showTritone: false,
  showTritoneSub: false,
}

// ---------- Константы геометрии ----------

const SNAP_ANGLE = Math.PI / 6
const ANIMATION_DAMPING = 0.9
const DRAG_SENSITIVITY = 0.008
const SEGMENT_HALF = Math.PI / 12 // половина сектора (15°)

// ---------- DOM ----------

const canvas = document.getElementById('circleCanvas')
const ctx = canvas.getContext('2d')
const selectedKeyEl = document.getElementById('selectedKey')
const keyDescriptionEl = document.getElementById('keyDescription')
const chordGridEl = document.getElementById('chordGrid')

// ---------- Размеры ----------

let DPR = window.devicePixelRatio || 1

function canvasSize() {
  return { w: canvas.width / DPR, h: canvas.height / DPR }
}

function getRadii() {
  const { w, h } = canvasSize()
  const R = Math.min(w, h) / 2
  return {
    outerMajor: R * 0.92,
    innerMajor: R * 0.63, // увеличен зазор
    outerMinor: R * 0.55, // увеличен зазор
    innerMinor: R * 0.26,
    center: R * 0.18,
    majorText: R * 0.055, // базовый размер шрифта названия мажора
    minorText: R * 0.042, // минорного
    degreeText: R * 0.032, // ступеней

    // ⚙️ Кольцо пентатоники — над внешним мажорным кольцом
    pentatonicInner: R * 0.945,
    pentatonicOuter: R * 0.975,
  }
}

function resizeCanvas() {
  const container = canvas.parentElement
  const rect = container.getBoundingClientRect()
  const padding = 24
  const size = Math.max(240, Math.min(rect.width, rect.height) - padding)
  DPR = window.devicePixelRatio || 1

  canvas.width = Math.round(size * DPR)
  canvas.height = Math.round(size * DPR)
  canvas.style.width = size + 'px'
  canvas.style.height = size + 'px'

  ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
  drawCircle()
  updateTopKeyInfo()
}

// ---------- Углы ----------

function normalizeAngle(angle) {
  let n = angle % (Math.PI * 2)
  if (n > Math.PI) n -= Math.PI * 2
  if (n < -Math.PI) n += Math.PI * 2
  return n
}

function getSegmentAngles(key, rotation = state.rotation) {
  const center = key.angle + rotation
  return { a0: center - SEGMENT_HALF, a1: center + SEGMENT_HALF, center }
}

// ---------- Ступень относительно выбранной тоники ----------

const MAJOR_BY_NORM = ['I', 'V', 'II', 'vi', 'iii', 'vii°', 'IV']
const MINOR_BY_NORM = ['i', 'v', 'ii°', 'VI', 'III', 'VII', 'iv']
// для «перекрёстных» таблиц (тоника мажор, а аккорд минорный — и наоборот)
// параллельный аккорд в той же точке круга имеет ступень со сдвигом на 3
const MAJOR_AS_MINOR = ['vi', 'iii', 'vii°', 'IV', 'I', 'V', 'II']
const MINOR_AS_MAJOR = ['III', 'VII', 'iv', 'i', 'v', 'ii°', 'VI']

function getDegreeFromSelected(targetKeyData, isMinorTarget) {
  const tonic = circleData.keys.find(k =>
    state.selectedIsMinor ? k.minor === state.selectedKey : k.major === state.selectedKey,
  )
  if (!tonic) return ''

  const STEP = Math.PI / 6
  let diff = targetKeyData.angle - tonic.angle
  while (diff > Math.PI) diff -= 2 * Math.PI
  while (diff < -Math.PI) diff += 2 * Math.PI
  const steps = Math.round(diff / STEP)
  const norm = ((steps % 7) + 7) % 7

  let table
  if (!state.selectedIsMinor && !isMinorTarget) table = MAJOR_BY_NORM
  else if (!state.selectedIsMinor && isMinorTarget) table = MAJOR_AS_MINOR
  else if (state.selectedIsMinor && isMinorTarget) table = MINOR_BY_NORM
  else table = MINOR_AS_MAJOR

  return table[norm]
}

// ---------- Родственные тональности (1-я и 2-я степень) ----------

function getActiveRelatedKeys(currentKey, isCurrentMinor) {
  const cur = circleData.keys.find(k =>
    isCurrentMinor ? k.minor === currentKey : k.major === currentKey,
  )
  if (!cur) {
    return { degree1: new Set(), degree2: new Set() }
  }

  const STEP = Math.PI / 6
  const degree1 = new Set()
  const degree2 = new Set()

  for (const k of circleData.keys) {
    let diff = k.angle - cur.angle
    while (diff > Math.PI) diff -= 2 * Math.PI
    while (diff < -Math.PI) diff += 2 * Math.PI
    const distance = Math.abs(Math.round(diff / STEP))

    if (distance === 0) {
      // Параллель текущей → 1-я степень
      degree1.add(isCurrentMinor ? k.major : k.minor)
    } else if (distance === 1) {
      // ±30° → 1-я степень (мажор и минор)
      degree1.add(k.major)
      degree1.add(k.minor)
    } else if (distance === 2) {
      // ±60° → 2-я степень (мажор и минор)
      degree2.add(k.major)
      degree2.add(k.minor)
    }
    // distance >= 3 — не подсвечиваем
  }

  return {
    degree1: state.showDegree1 ? degree1 : new Set(),
    degree2: state.showDegree2 ? degree2 : new Set(),
  }
}

// ---------- CSS-цвета тональностей ----------

function getMajorColorCSS(majorName) {
  const key = majorName.replace('#', 'sharp').toLowerCase()
  return (
    getComputedStyle(document.documentElement).getPropertyValue(`--key-${key}`).trim() || '#7cb8bb'
  )
}

function getMinorColorCSS() {
  return (
    getComputedStyle(document.documentElement).getPropertyValue('--key-minor').trim() || '#f0dfaf'
  )
}

// ---------- Позиция центра сектора (для стрелок прогрессий) ----------

function getKeyPosition(key, isMinor = false) {
  const { w, h } = canvasSize()
  const cx = w / 2,
    cy = h / 2
  const r = getRadii()
  const midR = isMinor ? (r.outerMinor + r.innerMinor) / 2 : (r.outerMajor + r.innerMajor) / 2
  const angle = key.angle + state.rotation
  return { x: cx + Math.cos(angle) * midR, y: cy + Math.sin(angle) * midR, angle, midR }
}

// ---------- Анимация к верхней позиции ----------

function animateToKeySmart(targetKeyName) {
  const keyData = findKeyByName(targetKeyName)
  if (!keyData) return
  if (state.animationId) cancelAnimationFrame(state.animationId)
  state.isAnimating = true

  const targetAngle = -Math.PI / 2
  const currentAngle = normalizeAngle(keyData.angle + state.rotation)
  let angleDiff = targetAngle - currentAngle
  if (angleDiff > Math.PI) angleDiff -= Math.PI * 2
  if (angleDiff < -Math.PI) angleDiff += Math.PI * 2

  const targetRotation = state.rotation + angleDiff
  const duration = 800
  const startTime = Date.now()
  const startRotation = state.rotation

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    state.rotation = startRotation + angleDiff * eased

    drawCircle()
    updateTopKeyInfo()

    if (progress < 1) {
      state.animationId = requestAnimationFrame(animate)
    } else {
      state.rotation = targetRotation
      state.selectedKey = targetKeyName
      state.selectedIsMinor = targetKeyName.endsWith('m')
      state.isAnimating = false
      state.animationId = null
      drawCircle()
      updateTopKeyInfo()
    }
  }
  state.animationId = requestAnimationFrame(animate)
}

// ---------- Инфо о тональности (панель) ----------

function updateTopKeyInfo() {
  const topKey = findClosestKeyToTop()
  if (!topKey) return

  const isMajor = !state.selectedIsMinor
  const currentKey = isMajor ? topKey.major : topKey.minor
  state.selectedKey = currentKey

  if (isMajor) {
    selectedKeyEl.textContent = `${currentKey}-dur`
    updateChordGrid(chords[currentKey] || [], chordDegrees[currentKey] || [], true)
  } else {
    selectedKeyEl.textContent = `${currentKey}-moll`
    updateChordGrid(chords[currentKey] || [], chordDegrees[currentKey] || chordDegrees['Am'], false)
  }
  updateKeySignatures(keySignatures[topKey.major] || { sharps: [], flats: [] })
  updatePentatonicPanel()
}

function updateKeySignatures(signs) {
  keyDescriptionEl.innerHTML = ''
  const container = document.createElement('div')
  container.className = 'key-signatures'

  if (signs.sharps.length) {
    signs.sharps.forEach(note => {
      const el = document.createElement('div')
      el.className = 'sign-item'
      el.innerHTML = `<span class="sign-icon sharp-icon">♯</span><span class="note-name">${note}</span>`
      container.appendChild(el)
    })
  } else if (signs.flats.length) {
    signs.flats.forEach(note => {
      const el = document.createElement('div')
      el.className = 'sign-item'
      el.innerHTML = `<span class="sign-icon flat-icon">♭</span><span class="note-name">${note}</span>`
      container.appendChild(el)
    })
  } else {
    const el = document.createElement('div')
    el.className = 'no-signs'
    el.textContent = 'Нет знаков альтерации'
    container.appendChild(el)
  }
  keyDescriptionEl.appendChild(container)
}

function updateChordGrid(chordList, degreeList = [], isMajor = true) {
  chordGridEl.innerHTML = ''
  const sectionTitle = document.querySelector('.chords-section h3')
  sectionTitle.textContent = isMajor ? 'Диатонические аккорды' : 'Аккорды (минор)'

  chordList.forEach((chord, index) => {
    const button = document.createElement('button')
    button.className = 'chord-btn'
    button.title = isMajor ? getMajorChordFunction(index) : getMinorChordFunction(index)
    if (degreeList[index]) {
      button.innerHTML = `
        <div class="chord-degree">${degreeList[index]}</div>
        <div class="chord-name">${chord}</div>`
    } else {
      button.textContent = chord
    }
    chordGridEl.appendChild(button)
  })
}

function getMajorChordFunction(i) {
  return (
    [
      'I - Тоника',
      'ii - Супертоника',
      'iii - Медианта',
      'IV - Субдоминанта',
      'V - Доминанта',
      'vi - Параллельный минор',
      'vii° - Вводный',
    ][i] || ''
  )
}
function getMinorChordFunction(i) {
  return (
    [
      'i - Тоника минора',
      'ii° - Супертоника',
      'III - Относительный мажор',
      'iv - Субдоминанта',
      'v - Доминанта',
      'VI - Субмедианта',
      'VII - Субтоника',
    ][i] || ''
  )
}

// ---------- Ближайшая к верху ----------

function findClosestKeyToTop() {
  let closestKey = null
  let smallest = Infinity
  const target = -Math.PI / 2

  circleData.keys.forEach(key => {
    const current = (key.angle + state.rotation) % (Math.PI * 2)
    let n = current
    if (n > Math.PI) n -= Math.PI * 2
    if (n < -Math.PI) n += Math.PI * 2
    let diff = Math.abs(n - target)
    diff = Math.min(diff, Math.PI * 2 - diff)
    if (diff < smallest) {
      smallest = diff
      closestKey = key
    }
  })
  return closestKey
}

function calculateSnapRotation() {
  const closestKey = findClosestKeyToTop()
  if (!closestKey) return state.rotation
  const current = normalizeAngle(closestKey.angle + state.rotation)
  const target = -Math.PI / 2
  let diff = target - current
  if (diff > Math.PI) diff -= Math.PI * 2
  if (diff < -Math.PI) diff += Math.PI * 2
  return state.rotation + diff
}

function snapToTarget() {
  state.rotation = calculateSnapRotation()
  const top = findClosestKeyToTop()
  if (top) state.selectedKey = state.selectedIsMinor ? top.minor : top.major
  drawCircle()
  updateTopKeyInfo()
}

function updateRotation(deltaX) {
  const d = deltaX * DRAG_SENSITIVITY
  state.rotation += d
  state.rotationVelocity = d * 2
}

function animateWithInertia() {
  state.isAnimating = true
  const animate = () => {
    state.rotation += state.rotationVelocity
    state.rotationVelocity *= ANIMATION_DAMPING
    drawCircle()
    if (Math.abs(state.rotationVelocity) < 0.01) {
      state.isAnimating = false
      snapToTarget()
      return
    }
    state.animationId = requestAnimationFrame(animate)
  }
  state.animationId = requestAnimationFrame(animate)
}

const PENTATONIC_INDEXES_MAJOR = [0, 1, 2, 4, 5]
const PENTATONIC_INDEXES_MINOR = [0, 2, 3, 4, 6]
const PENTATONIC_LABELS_MAJOR = ['1', '2', '3', '5', '6']
const PENTATONIC_LABELS_MINOR = ['1', '♭3', '4', '5', '♭7']

function updatePentatonicPanel() {
  const container = document.getElementById('pentatonicNotes')
  if (!container) return

  const isMajor = !state.selectedIsMinor
  const keyName = state.selectedKey
  const keyChords = chords[keyName] || []
  if (keyChords.length < 7) {
    container.innerHTML = ''
    return
  }

  const indexes = isMajor ? PENTATONIC_INDEXES_MAJOR : PENTATONIC_INDEXES_MINOR
  const labels = isMajor ? PENTATONIC_LABELS_MAJOR : PENTATONIC_LABELS_MINOR

  container.innerHTML = indexes
    .map((idx, i) => {
      const chordName = keyChords[idx]
      const noteName = chordName.replace(/[m°]/g, '').trim()
      return `
      <div class="pentatonic-note">
        <div class="pentatonic-degree">${labels[i]}</div>
        <div class="pentatonic-name">${noteName}</div>
      </div>
    `
    })
    .join('')
}

// ---------- Полярный hit-тест ----------

function getKeyAtPosition(x, y) {
  const { w, h } = canvasSize()
  const cx = w / 2,
    cy = h / 2
  const r = getRadii()

  const dx = x - cx
  const dy = y - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const clickAngle = Math.atan2(dy, dx)

  let isMinor
  if (dist >= r.innerMajor && dist <= r.outerMajor) {
    isMinor = false
  } else if (dist >= r.innerMinor && dist <= r.outerMinor) {
    isMinor = true
  } else {
    return null
  }

  const localAngle = normalizeAngle(clickAngle - state.rotation)
  for (const key of circleData.keys) {
    const delta = normalizeAngle(localAngle - key.angle)
    if (Math.abs(delta) <= SEGMENT_HALF) {
      return isMinor
        ? { key: key.minor, type: 'minor', data: key }
        : { key: key.major, type: 'major', data: key }
    }
  }
  return null
}

// -------- Тритон -----------

function drawTritone(cx, cy) {
  if (!state.showTritone) return

  const r = getRadii()

  // Найти тонику (сектор, на котором сейчас выбранная тональность)
  const tonic = circleData.keys.find(k =>
    state.selectedIsMinor ? k.minor === state.selectedKey : k.major === state.selectedKey,
  )
  if (!tonic) return

  // Тритон — ровно напротив (180°)
  const tritoneAngle = tonic.angle + Math.PI + state.rotation

  // Подсветить в ОБОИХ кольцах (тритон от ноты не зависит от лада)
  const HALF = SEGMENT_HALF - 0.03

  const drawTritoneSector = (rIn, rOut) => {
    ctx.beginPath()
    ctx.arc(cx, cy, rOut, tritoneAngle - HALF, tritoneAngle + HALF)
    ctx.arc(cx, cy, rIn, tritoneAngle + HALF, tritoneAngle - HALF, true)
    ctx.closePath()
    ctx.fillStyle = 'rgba(124, 184, 187, 0.28)'
    ctx.fill()
    ctx.strokeStyle = '#7cb8bb'
    ctx.lineWidth = 2
    ctx.setLineDash([3, 3])
    ctx.stroke()
    ctx.setLineDash([])
  }

  drawTritoneSector(r.innerMajor, r.outerMajor)

  // Подпись «TT» внутри мажорного тритона
  const midR = (r.innerMajor + r.outerMajor) / 2
  const lx = cx + Math.cos(tritoneAngle) * midR
  const ly = cy + Math.sin(tritoneAngle) * midR
  ctx.fillStyle = '#7cb8bb'
  ctx.font = 'bold 12px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
}

// --------- TT-sub ----------

function drawTritoneSub(cx, cy) {
  if (!state.showTritoneSub) return

  const r = getRadii()
  const isMinor = state.selectedIsMinor

  // Углы: V и ♭II7 в мажорном кольце
  const vAngle = isMinor
    ? -Math.PI / 2 + (4 * Math.PI) / 6 // 4ч
    : -Math.PI / 2 + Math.PI / 6 // 1ч
  const subVAngle = isMinor
    ? -Math.PI / 2 + (10 * Math.PI) / 6 // 10ч
    : -Math.PI / 2 + (7 * Math.PI) / 6 // 7ч

  const HALF = SEGMENT_HALF - 0.03
  const rIn = r.innerMajor
  const rOut = r.outerMajor

  // Цвет — фиолетово-розовый, чтобы отличать от других зон
  const COLOR = '#ffffff'
  const FILL = 'rgba(192, 96, 192, 0.28)'

  // Рисуем сектор
  const drawSector = angle => {
    ctx.beginPath()
    ctx.arc(cx, cy, rOut, angle - HALF, angle + HALF)
    ctx.arc(cx, cy, rIn, angle + HALF, angle - HALF, true)
    ctx.closePath()
    ctx.fillStyle = FILL
    ctx.fill()
    ctx.strokeStyle = COLOR
    ctx.lineWidth = 2.5
    ctx.stroke()
  }

  drawSector(vAngle)
  drawSector(subVAngle)

  // Линия между центрами секторов через центр круга
  const midR = (rIn + rOut) / 2
  const x1 = cx + Math.cos(vAngle) * midR
  const y1 = cy + Math.sin(vAngle) * midR
  const x2 = cx + Math.cos(subVAngle) * midR
  const y2 = cy + Math.sin(subVAngle) * midR

  ctx.strokeStyle = COLOR
  ctx.lineWidth = 2
  ctx.setLineDash([6, 4])
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.setLineDash([])

  // Подписи
  const drawLabel = (angle, text) => {
    // Размещаем в центре сектора, но сдвигаем к внешнему краю
    const labelR = midR + (rOut - rIn) * 0.28
    const lx = cx + Math.cos(angle) * labelR
    const ly = cy + Math.sin(angle) * labelR
    ctx.fillStyle = COLOR
    ctx.font = 'bold 11px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, lx, ly)
  }

  drawLabel(vAngle, 'V7')
  drawLabel(subVAngle, '♭II7')
}

// ---------- Рисование ----------

function drawWedge(
  cx,
  cy,
  rIn,
  rOut,
  aCenter,
  halfWidth,
  { fill, stroke, lineWidth = 3, dash = null },
) {
  const a0 = aCenter - halfWidth
  const a1 = aCenter + halfWidth
  ctx.beginPath()
  ctx.arc(cx, cy, rOut, a0, a1)
  ctx.arc(cx, cy, rIn, a1, a0, true)
  ctx.closePath()
  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = lineWidth
    if (dash) ctx.setLineDash(dash)
    ctx.stroke()
    ctx.setLineDash([])
  }
}

function drawRelationWedges(cx, cy) {
  const r = getRadii()
  const tonicAngle = -Math.PI / 2
  const HALF_1ST = Math.PI / 4 // 45° — 3 сектора (11ч, 12ч, 1ч)
  const HALF_2ND = Math.PI / 12 // 15° — 1 сектор (10ч или 2ч)
  const OFFSET_2ND = Math.PI / 3 // 60° — центр на 10ч / 2ч

  // ═══ 1-я степень: 3 сектора по центру тоники ═══
  if (state.showDegree1) {
    drawWedge(cx, cy, r.innerMajor, r.outerMajor, tonicAngle, HALF_1ST, {
      fill: 'rgba(255, 217, 94, 0.30)',
      stroke: '#ffd95e',
      lineWidth: 3,
    })
    drawWedge(cx, cy, r.innerMinor, r.outerMinor, tonicAngle, HALF_1ST, {
      fill: 'rgba(255, 217, 94, 0.30)',
      stroke: '#ffd95e',
      lineWidth: 3,
    })
  }

  // ═══ 2-я степень: по 1 сектору слева и справа ═══
  if (state.showDegree2) {
    ;[-OFFSET_2ND, OFFSET_2ND].forEach(offset => {
      const center = tonicAngle + offset
      drawWedge(cx, cy, r.innerMajor, r.outerMajor, center, HALF_2ND, {
        fill: 'rgba(94, 200, 255, 0.22)',
        stroke: '#5ec8ff',
        lineWidth: 4,
        dash: [8, 5],
      })
      drawWedge(cx, cy, r.innerMinor, r.outerMinor, center, HALF_2ND, {
        fill: 'rgba(94, 200, 255, 0.22)',
        stroke: '#5ec8ff',
        lineWidth: 4,
        dash: [8, 5],
      })
    })
  }
}

function drawPhantomNotes(cx, cy) {
  if (!state.showDegree2) return
  const r = getRadii()

  // Тоника на 12ч (после snap) — призрачная нота всегда на фиксированном угле
  const a = state.selectedIsMinor
    ? -Math.PI / 2 + (4 * Math.PI) / 6 // минор → 04:00 в мажорном кольце
    : -Math.PI / 2 - (4 * Math.PI) / 6 // мажор → 08:00 в минорном кольце

  // Кольцо: для мажора — минорное, для минора — мажорное
  const rIn = state.selectedIsMinor ? r.innerMajor : r.innerMinor
  const rOut = state.selectedIsMinor ? r.outerMajor : r.outerMinor

  const HALF = SEGMENT_HALF - 0.03 // чуть уже сектора

  // 1. Полупрозрачная заливка
  ctx.beginPath()
  ctx.arc(cx, cy, rOut, a - HALF, a + HALF)
  ctx.arc(cx, cy, rIn, a + HALF, a - HALF, true)
  ctx.closePath()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)'
  ctx.fill()

  // 2. Пунктирная фиолетовая обводка
  ctx.strokeStyle = '#c8a0ff'
  ctx.lineWidth = 4
  ctx.setLineDash([8, 5])
  ctx.stroke()
  ctx.setLineDash([])

  // 3. Значок: 'iv' для мажора, 'V' для минора
  const label = state.selectedIsMinor ? 'V' : 'iv'
  const midR = (rIn + rOut) / 2
  const labelR = midR + (rOut - rIn) * 0.35
  const lx = cx + Math.cos(a) * labelR
  const ly = cy + Math.sin(a) * labelR
  ctx.fillStyle = '#c8a0ff'
  ctx.font = 'bold 12px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, lx, ly)
}

function drawCircle() {
  const { w, h } = canvasSize()
  ctx.clearRect(0, 0, w, h)
  drawBackgroundCircles(w / 2, h / 2)
  drawSegments(w / 2, h / 2)
  drawPhantomNotes(w / 2, h / 2)
  drawPentatonicStripes(w / 2, h / 2)
  drawTritone(w / 2, h / 2)
  drawTritoneSub(w / 2, h / 2) // ⚙️
  drawRelationWedges(w / 2, h / 2)
  drawProgressionArrows()
}

function drawBackgroundCircles(cx, cy) {
  const r = getRadii()

  // заливка «подложки» внешнего кольца
  ctx.beginPath()
  ctx.arc(cx, cy, r.outerMajor, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
  ctx.fill()

  // границы колец
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(cx, cy, r.outerMajor, 0, Math.PI * 2)
  ctx.stroke()

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(cx, cy, r.innerMajor, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx, cy, r.outerMinor, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx, cy, r.innerMinor, 0, Math.PI * 2)
  ctx.stroke()
}

function drawSegment({
  cx,
  cy,
  rIn,
  rOut,
  a0,
  a1,
  fill,
  alpha,
  stroke,
  lineWidth = 1,
  outline, // ⚙️ { color, width, dash } — обводка степени родства
  name,
  degree,
  nameColor = '#000',
  degreeColor = 'rgba(0,0,0,0.65)',
  nameFontSize,
  degreeFontSize,
}) {
  ctx.beginPath()
  ctx.arc(cx, cy, rOut, a0, a1)
  ctx.arc(cx, cy, rIn, a1, a0, true)
  ctx.closePath()

  ctx.fillStyle = fill + alpha
  ctx.fill()

  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = lineWidth
    ctx.stroke()
  }

  // ⚙️ Обводка степени родства — рисуем ПОСЛЕ заливки,
  // отступая чуть внутрь, чтобы не перекрывать границу сектора
  if (outline) {
    ctx.save()
    const inset = 3
    ctx.beginPath()
    ctx.arc(cx, cy, rOut - inset, a0, a1)
    ctx.arc(cx, cy, rIn + inset, a1, a0, true)
    ctx.closePath()
    ctx.strokeStyle = outline.color
    ctx.lineWidth = outline.width || 2.5
    if (outline.dash) ctx.setLineDash(outline.dash)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.restore()
  }

  // позиция текста — центр сектора
  const midAngle = (a0 + a1) / 2
  const midR = (rIn + rOut) / 2
  const tx = cx + Math.cos(midAngle) * midR
  const ty = cy + Math.sin(midAngle) * midR

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillStyle = nameColor
  ctx.font = `bold ${nameFontSize}px Arial`
  ctx.fillText(name, tx, ty - degreeFontSize * 0.55)

  if (degree) {
    ctx.fillStyle = degreeColor
    ctx.font = `600 ${degreeFontSize}px Arial`
    ctx.fillText(degree, tx, ty + nameFontSize * 0.55)
  }
}

function drawSegments(cx, cy) {
  const r = getRadii()
  const topKey = findClosestKeyToTop()

  // в drawSegments, перед циклом:
  const currentKeyData = circleData.keys.find(k =>
    state.selectedIsMinor ? k.minor === state.selectedKey : k.major === state.selectedKey,
  )
  const tonicAngle = currentKeyData ? currentKeyData.angle + state.rotation : -Math.PI / 2 // fallback

  // ⚙️ Степени родства относительно текущей выбранной тональности
  const currentKey = state.selectedIsMinor
    ? topKey
      ? topKey.minor
      : state.selectedKey
    : topKey
      ? topKey.major
      : state.selectedKey
  const activeRelated = getActiveRelatedKeys(currentKey, state.selectedIsMinor)

  circleData.keys.forEach(key => {
    const { a0, a1 } = getSegmentAngles(key)

    // ----- МАЖОР -----
    const majSelected = state.selectedKey === key.major && !state.selectedIsMinor
    const majHovered = state.hoveredKey === key.major
    const majIsTop = topKey === key
    const majColor = getMajorColorCSS(key.major)
    const majDegree = getDegreeFromSelected(key, false)

    // ⚙️ Обводка родства для мажора
    let majOutline = null
    if (!majSelected) {
      if (activeRelated.degree1.has(key.major)) {
        majOutline = { color: '#f0dfaf', width: 3 }
      } else if (activeRelated.degree2.has(key.major)) {
        majOutline = { color: '#94bff3', width: 2, dash: [6, 4] }
      }
    }

    drawSegment({
      cx,
      cy,
      rIn: r.innerMajor,
      rOut: r.outerMajor,
      a0,
      a1,
      fill: majColor,
      alpha: 'FF',
      stroke: 'rgba(0,0,0,0.25)', // всегда тонкая тёмная
      lineWidth: 1,
      outline: majOutline,
      name: key.major,
      degree: majDegree,
      nameColor: '#0a0a0a',
      degreeColor: 'rgba(0,0,0,0.65)',
      nameFontSize: r.majorText,
      degreeFontSize: r.degreeText,
    })

    // ----- МИНОР -----
    const minSelected = state.selectedKey === key.minor && state.selectedIsMinor
    const minHovered = state.hoveredKey === key.minor
    const minColor = getMinorColorCSS()
    const minDegree = getDegreeFromSelected(key, true)

    // ⚙️ Обводка родства для минора
    let minOutline = null
    if (!minSelected) {
      if (activeRelated.degree1.has(key.minor)) {
        minOutline = { color: '#f0dfaf', width: 3 }
      } else if (activeRelated.degree2.has(key.minor)) {
        minOutline = { color: '#94bff3', width: 2, dash: [6, 4] }
      }
    }

    drawSegment({
      cx,
      cy,
      rIn: r.innerMinor,
      rOut: r.outerMinor,
      a0,
      a1,
      fill: minColor,
      alpha: 'FF',
      stroke: 'rgba(0,0,0,0.2)',
      lineWidth: 1,
      outline: minOutline,
      name: key.minor,
      degree: minDegree,
      nameColor: '#1a1a1a',
      degreeColor: 'rgba(0,0,0,0.6)',
      nameFontSize: r.minorText,
      degreeFontSize: r.degreeText * 0.85,
    })
  })

  // разделительные лучи
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'
  ctx.lineWidth = 1
  circleData.keys.forEach(key => {
    const a = key.angle + state.rotation + SEGMENT_HALF
    const outerX = cx + Math.cos(a) * r.outerMajor
    const outerY = cy + Math.sin(a) * r.outerMajor
    const innerX = cx + Math.cos(a) * r.innerMinor
    const innerY = cy + Math.sin(a) * r.innerMinor
    ctx.beginPath()
    ctx.moveTo(innerX, innerY)
    ctx.lineTo(outerX, outerY)
    ctx.stroke()
  })
}

function drawPentatonicStripes(cx, cy) {
  if (!state.showPentatonic) return
  const r = getRadii()

  // Дуга от 12 до 16 часов — фиксированная, не зависит от вращения.
  // 12ч = -π/2, 16ч = -π/2 + 4·(π/6) = -π/2 + 2π/3
  const a0 = -Math.PI / 2
  const a1 = -Math.PI / 2 + (4 * Math.PI) / 6 // 4 сектора по 30°

  ctx.beginPath()
  ctx.arc(cx, cy, r.pentatonicOuter, a0, a1)
  ctx.arc(cx, cy, r.pentatonicInner, a1, a0, true)
  ctx.closePath()
  ctx.fillStyle = '#e05050'
  ctx.fill()
}

// ---------- Стрелки прогрессий ----------

function drawProgressionArrows() {
  if (!state.activeProgression) return
  const progression = chordProgressions[state.activeProgression]
  if (!progression) return
  const topKey = findClosestKeyToTop()
  if (!topKey) return

  const isMajor = !state.selectedIsMinor
  const keyName = isMajor ? topKey.major : topKey.minor
  const keyChords = chords[keyName] || []
  if (!keyChords.length) return

  const steps = isMajor ? progression.majorSteps : progression.minorSteps
  const positions = []

  steps.forEach(step => {
    const idx = step - 1
    if (idx < 0 || idx >= keyChords.length) return
    const chordName = keyChords[idx]

    for (const keyData of circleData.keys) {
      if (keyData.major === chordName) {
        const p = getKeyPosition(keyData, false)
        positions.push({ x: p.x, y: p.y, chord: chordName })
        return
      }
      if (keyData.minor === chordName) {
        const p = getKeyPosition(keyData, true)
        positions.push({ x: p.x, y: p.y, chord: chordName })
        return
      }
    }
    const base = chordName.replace(/[m°]/g, '').charAt(0)
    for (const keyData of circleData.keys) {
      if (keyData.major.startsWith(base)) {
        const p = getKeyPosition(keyData, chordName.includes('m'))
        positions.push({ x: p.x, y: p.y, chord: chordName })
        return
      }
    }
  })

  if (positions.length < 2) return

  ctx.strokeStyle = progression.color || '#00ffcc'
  ctx.lineWidth = 2.5
  ctx.fillStyle = progression.color || '#00ffcc'
  ctx.lineCap = 'round'

  for (let i = 0; i < positions.length - 1; i++) {
    const from = positions[i]
    const to = positions[i + 1]
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()

    const angle = Math.atan2(to.y - from.y, to.x - from.x)
    const headLength = 12
    ctx.save()
    ctx.translate(to.x, to.y)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(-headLength, headLength / 3)
    ctx.moveTo(0, 0)
    ctx.lineTo(-headLength, -headLength / 3)
    ctx.stroke()
    ctx.restore()
  }
}

// ---------- Панель прогрессий ----------

function initProgressionsPanel() {
  document.querySelectorAll('.progression-btn').forEach(btn => {
    btn.replaceWith(btn.cloneNode(true))
  })

  const btns = document.querySelectorAll('.progression-btn')
  btns.forEach(btn => {
    const key = btn.getAttribute('data-progression')
    btn.addEventListener('click', function (e) {
      e.stopPropagation()
      btns.forEach(b => b.classList.remove('active'))
      if (state.activeProgression === key) {
        state.activeProgression = null
      } else {
        state.activeProgression = key
        this.classList.add('active')
      }
      drawCircle()
    })
  })
}

// ---------- События ----------

function setupEventListeners() {
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const info = getKeyAtPosition(x, y)
    if (info) {
      if (state.animationId) {
        cancelAnimationFrame(state.animationId)
        state.isAnimating = false
      }
      state.selectedKey = info.key
      state.selectedIsMinor = info.type === 'minor'
      animateToKeySmart(info.key)
    }
  })

  canvas.addEventListener('mousemove', e => {
    if (state.isDragging) {
      const deltaX = e.clientX - state.lastX
      state.lastX = e.clientX
      updateRotation(deltaX)
      drawCircle()
      updateTopKeyInfo()
      return
    }

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const info = getKeyAtPosition(x, y)

    if (info) {
      if (state.hoveredKey !== info.key) {
        state.hoveredKey = info.key
        canvas.style.cursor = 'pointer'
      }
    } else if (state.hoveredKey !== null) {
      state.hoveredKey = null
      canvas.style.cursor = 'grab'
    }
    drawCircle()
  })

  canvas.addEventListener('mouseleave', () => {
    state.hoveredKey = null
    canvas.style.cursor = 'grab'
    drawCircle()
  })

  canvas.addEventListener('mousedown', e => {
    if (state.isAnimating) {
      cancelAnimationFrame(state.animationId)
      state.isAnimating = false
      state.rotationVelocity = 0
    }
    state.isDragging = true
    state.lastX = e.clientX
    state.rotationVelocity = 0
    canvas.style.cursor = 'grabbing'
    canvas.classList.add('dragging')
  })

  document.addEventListener('mouseup', () => {
    if (!state.isDragging) return
    state.isDragging = false
    canvas.classList.remove('dragging')
    if (Math.abs(state.rotationVelocity) > 0.02) {
      animateWithInertia()
    } else {
      snapToTarget()
    }
    canvas.style.cursor = state.hoveredKey ? 'pointer' : 'grab'
  })

  canvas.addEventListener(
    'wheel',
    e => {
      e.preventDefault()
      if (state.isAnimating) {
        cancelAnimationFrame(state.animationId)
        state.isAnimating = false
      }
      state.rotation += e.deltaY * 0.002
      state.rotationVelocity = e.deltaY * 0.004
      drawCircle()
      updateTopKeyInfo()
      clearTimeout(state.wheelTimeout)
      state.wheelTimeout = setTimeout(() => snapToTarget(), 300)
    },
    { passive: false },
  )

  document.querySelectorAll('.relation-legend .legend-item').forEach(item => {
    const kind = item.dataset.degree

    item.addEventListener('click', () => {
      if (kind === '1') {
        state.showDegree1 = !state.showDegree1
        item.classList.toggle('disabled', !state.showDegree1)
      } else if (kind === '2') {
        state.showDegree2 = !state.showDegree2
        item.classList.toggle('disabled', !state.showDegree2)
      } else if (kind === 'pentatonic') {
        state.showPentatonic = !state.showPentatonic
        item.classList.toggle('disabled', !state.showPentatonic)
      } else if (kind === 'tritone') {
        state.showTritone = !state.showTritone
        item.classList.toggle('disabled', !state.showTritone)
      } else if (kind === 'tritoneSub') {
        state.showTritoneSub = !state.showTritoneSub
        item.classList.toggle('disabled', !state.showTritoneSub)
      }
      drawCircle()
    })

    // начальное состояние
    if (kind === '1' && !state.showDegree1) item.classList.add('disabled')
    if (kind === '2' && !state.showDegree2) item.classList.add('disabled')
    if (kind === 'pentatonic' && !state.showPentatonic) item.classList.add('disabled')
    if (kind === 'tritone' && !state.showTritone) item.classList.add('disabled')
    if (kind === 'tritoneSub' && !state.showTritoneSub) item.classList.add('disabled')
  })

  window.addEventListener('resize', resizeCanvas)
}

// ---------- Инициализация ----------

function init() {
  resizeCanvas()
  setupEventListeners()
  initProgressionsPanel()
}

window.addEventListener('load', init)