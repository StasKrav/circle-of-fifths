// КОРРЕКТНЫЕ ДАННЫЕ КВИНТОВОГО КРУГА (C вверху!)
const circleData = {
    keys: [
        { major: "C", minor: "Am", sharps: 0, flats: 0, angle: -Math.PI/2, color: "#00dbde" },
        { major: "G", minor: "Em", sharps: 1, flats: 0, angle: -Math.PI/2 + Math.PI/6, color: "#00c4ff" },
        { major: "D", minor: "Bm", sharps: 2, flats: 0, angle: -Math.PI/2 + 2*Math.PI/6, color: "#009dff" },
        { major: "A", minor: "F#m", sharps: 3, flats: 0, angle: -Math.PI/2 + 3*Math.PI/6, color: "#0077ff" },
        { major: "E", minor: "C#m", sharps: 4, flats: 0, angle: -Math.PI/2 + 4*Math.PI/6, color: "#0051ff" },
        { major: "B", minor: "G#m", sharps: 5, flats: 0, angle: -Math.PI/2 + 5*Math.PI/6, color: "#002bff" },
        { major: "F#", minor: "D#m", sharps: 6, flats: 0, angle: -Math.PI/2 + 6*Math.PI/6, color: "#5500ff" },
        // { major: "C#", minor: "A#m", sharps: 7, flats: 0, angle: -Math.PI/2 + 7*Math.PI/6, color: "#7a00ff" },
        { major: "F", minor: "Dm", sharps: 0, flats: 1, angle: -Math.PI/2 - Math.PI/6, color: "#ffcc00" },
        { major: "Bb", minor: "Gm", sharps: 0, flats: 2, angle: -Math.PI/2 - 2*Math.PI/6, color: "#ff9900" },
        { major: "Eb", minor: "Cm", sharps: 0, flats: 3, angle: -Math.PI/2 - 3*Math.PI/6, color: "#ff6600" },
        { major: "Ab", minor: "Fm", sharps: 0, flats: 4, angle: -Math.PI/2 - 4*Math.PI/6, color: "#ff3300" },
        { major: "Db", minor: "Bbm", sharps: 0, flats: 5, angle: -Math.PI/2 - 5*Math.PI/6, color: "#ff0066" },
        { major: "Gb", minor: "Ebm", sharps: 0, flats: 6, angle: -Math.PI/2 - 6*Math.PI/6, color: "#ff00aa" }
    ]
};

function findKeyByName(keyName) {
    // Ищем в мажорных тональностях
    for (const key of circleData.keys) {
        if (key.major === keyName) {
            return { ...key, type: 'major' };
        }
        if (key.minor === keyName) {
            return { ...key, type: 'minor' };
        }
    }
    return null;
}

// Аккорды для каждой тональности
const chords = {
    "C": ["C", "Dm", "Em", "F", "G", "Am", "B°"],
    "G": ["G", "Am", "Bm", "C", "D", "Em", "F#°"],
    "D": ["D", "Em", "F#m", "G", "A", "Bm", "C#°"],
    "A": ["A", "Bm", "C#m", "D", "E", "F#m", "G#°"],
    "E": ["E", "F#m", "G#m", "A", "B", "C#m", "D#°"],
    "B": ["B", "C#m", "D#m", "E", "F#", "G#m", "A#°"],
    "F#": ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#°"],
    // "C#": ["C#", "D#m", "E#m", "F#", "G#", "A#m", "B#°"],
    "F": ["F", "Gm", "Am", "Bb", "C", "Dm", "E°"],
    "Bb": ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "A°"],
    "Eb": ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "D°"],
    "Ab": ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "G°"],
    "Db": ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "C°"],
    "Gb": ["Gb", "Abm", "Bbm", "Cb", "Db", "Ebm", "F°"],
    "Am": ["Am", "B°", "C", "Dm", "Em", "F", "G"],
    "Em": ["Em", "F#°", "G", "Am", "Bm", "C", "D"],
    "Bm": ["Bm", "C#°", "D", "Em", "F#m", "G", "A"],
    "F#m": ["F#m", "G#°", "A", "Bm", "C#m", "D", "E"],
    "C#m": ["C#m", "D#°", "E", "F#m", "G#m", "A", "B"],
    "G#m": ["G#m", "A#°", "B", "C#m", "D#m", "E", "F#"],
    "D#m": ["D#m", "E#°", "F#", "G#m", "A#m", "B", "C#"],
    "A#m": ["A#m", "B#°", "C#", "D#m", "E#m", "F#", "G#"],
    "Dm": ["Dm", "E°", "F", "Gm", "Am", "Bb", "C"],
    "Gm": ["Gm", "A°", "Bb", "Cm", "Dm", "Eb", "F"],
    "Cm": ["Cm", "D°", "Eb", "Fm", "Gm", "Ab", "Bb"],
    "Fm": ["Fm", "G°", "Ab", "Bbm", "Cm", "Db", "Eb"],
    "Bbm": ["Bbm", "C°", "Db", "Ebm", "Fm", "Gb", "Ab"],
    "Ebm": ["Ebm", "F°", "Gb", "Abm", "Bbm", "Cb", "Db"]
};

// Просто объект с прогрессиями (название и шаги)
const chordProgressions = {
    "2-5-1": { 
        name: "II-V-I", 
        majorSteps: [2, 5, 1],
        minorSteps: [2, 5, 1],
        color: "#333333" 
    },
    "1-4-5": { 
        name: "I-IV-V", 
        majorSteps: [1, 4, 5],
        minorSteps: [1, 4, 5],
        color: "#333333" 
    },
    "1-6-4-5": { 
        name: "I-vi-IV-V", 
        majorSteps: [1, 6, 4, 5],
        minorSteps: [1, 6, 4, 5],
        color: "#333333"
    },
    // ДОБАВЬТЕ ЭТИ ПРОГРЕССИИ:
    "1-5-6-4": {
        name: "I-V-vi-IV",
        majorSteps: [1, 5, 6, 4],
        minorSteps: [1, 5, 6, 4],
        color: "#333333"
    },
    "1-4-2-5": {
        name: "I-IV-ii-V",
        majorSteps: [1, 4, 2, 5],
        minorSteps: [1, 4, 2, 5],
        color: "#333333"
    },
    "6-2-5-1": {
        name: "vi-ii-V-I",
        majorSteps: [6, 2, 5, 1],
        minorSteps: [6, 2, 5, 1],
        color: "#333333"
    },
    "1-3-6-2-5-1": {
        name: "I-iii-vi-ii-V-I",
        majorSteps: [1, 3, 6, 2, 5, 1],
        minorSteps: [1, 3, 6, 2, 5, 1],
        color: "#333333"
    },
    
        // ДОПОЛНИТЕЛЬНЫЕ ПРОГРЕССИИ:
        "4-5-3-6": { 
            name: "IV-V-iii-vi", 
            majorSteps: [4, 5, 3, 6],
            minorSteps: [4, 5, 3, 6],
            color: "#333333",
            description: "Каденция с плагальным оборотом"
        },
        "1-6-2-5": { 
            name: "I-vi-ii-V", 
            majorSteps: [1, 6, 2, 5],
            minorSteps: [1, 6, 2, 5],
            color: "#333333",
            description: "Джазовая каденция"
        },
        "6-4-1-5": { 
            name: "vi-IV-I-V", 
            majorSteps: [6, 4, 1, 5],
            minorSteps: [6, 4, 1, 5],
            color: "#333333",
            description: "Поп-рок прогрессия"
        },
        "1-4-6-5": { 
            name: "I-IV-vi-V", 
            majorSteps: [1, 4, 6, 5],
            minorSteps: [1, 4, 6, 5],
            color: "#333333",
            description: "Классическая поп"
        },
        "2-6-4-5": { 
            name: "ii-vi-IV-V", 
            majorSteps: [2, 6, 4, 5],
            minorSteps: [2, 6, 4, 5],
            color: "#333333",
            description: "Современная поп"
        },
        "4-1-5-6": { 
            name: "IV-I-V-vi", 
            majorSteps: [4, 1, 5, 6],
            minorSteps: [4, 1, 5, 6],
            color: "#333333",
            description: "Альтернативный рок"
        },
        "1-5-4-5": { 
            name: "I-V-IV-V", 
            majorSteps: [1, 5, 4, 5],
            minorSteps: [1, 5, 4, 5],
            color: "#333333",
            description: "Классическая рок"
        },
        "6-1-5-4": { 
            name: "vi-I-V-IV", 
            majorSteps: [6, 1, 5, 4],
            minorSteps: [6, 1, 5, 4],
            color: "#333333",
            description: "Эмоциональная поп"
        },
        "1-3-4-5": { 
            name: "I-iii-IV-V", 
            majorSteps: [1, 3, 4, 5],
            minorSteps: [1, 3, 4, 5],
            color: "#333333",
            description: "Светлая прогрессия"
        },
        "6-5-4-5": { 
            name: "vi-V-IV-V", 
            majorSteps: [6, 5, 4, 5],
            minorSteps: [6, 5, 4, 5],
            color: "#333333",
            description: "Нарастающее напряжение"
        },
        "1-4-2-6": { 
            name: "I-IV-ii-vi", 
            majorSteps: [1, 4, 2, 6],
            minorSteps: [1, 4, 2, 6],
            color: "#333333",
            description: "Плавная смена"
        },
        "5-4-1-6": { 
            name: "V-IV-I-vi", 
            majorSteps: [5, 4, 1, 6],
            minorSteps: [5, 4, 1, 6],
            color: "#333333",
            description: "Реверсивная каденция"
        },
        "1-4-5-4": { 
            name: "I-IV-V-IV", 
            majorSteps: [1, 4, 5, 4],
            minorSteps: [1, 4, 5, 4],
            color: "#333333",
            description: "Классический блюз"
        },
        "6-4-5-1": { 
            name: "vi-IV-V-I", 
            majorSteps: [6, 4, 5, 1],
            minorSteps: [6, 4, 5, 1],
            color: "#333333",
            description: "Полная каденция"
        },
        "2-5-1-6": { 
            name: "ii-V-I-vi", 
            majorSteps: [2, 5, 1, 6],
            minorSteps: [2, 5, 1, 6],
            color: "#333333",
            description: "Джазовая с плавным окончанием"
        }
};


const scaleDegrees = {
    "C": ["I - C", "II - Dm", "III - Em", "IV - F", "V - G", "VI - Am", "VII - B°"],
    "G": ["I - G", "II - Am", "III - Bm", "IV - C", "V - D", "VI - Em", "VII - F#°"],
    "D": ["I - D", "II - Em", "III - F#m", "IV - G", "V - A", "VI - Bm", "VII - C#°"],
    "A": ["I - A", "II - Bm", "III - C#m", "IV - D", "V - E", "VI - F#m", "VII - G#°"],
    "E": ["I - E", "II - F#m", "III - G#m", "IV - A", "V - B", "VI - C#m", "VII - D#°"],
    "B": ["I - B", "II - C#m", "III - D#m", "IV - E", "V - F#", "VI - G#m", "VII - A#°"],
    "F#": ["I - F#", "II - G#m", "III - A#m", "IV - B", "V - C#", "VI - D#m", "VII - E#°"],
    "C#": ["I - C#", "II - D#m", "III - E#m", "IV - F#", "V - G#", "VI - A#m", "VII - B#°"],
    "F": ["I - F", "II - Gm", "III - Am", "IV - Bb", "V - C", "VI - Dm", "VII - E°"],
    "Bb": ["I - Bb", "II - Cm", "III - Dm", "IV - Eb", "V - F", "VI - Gm", "VII - A°"],
    "Eb": ["I - Eb", "II - Fm", "III - Gm", "IV - Ab", "V - Bb", "VI - Cm", "VII - D°"],
    "Ab": ["I - Ab", "II - Bbm", "III - Cm", "IV - Db", "V - Eb", "VI - Fm", "VII - G°"],
    "Db": ["I - Db", "II - Ebm", "III - Fm", "IV - Gb", "V - Ab", "VI - Bbm", "VII - C°"],
    "Gb": ["I - Gb", "II - Abm", "III - Bbm", "IV - Cb", "V - Db", "VI - Ebm", "VII - F°"]
};

// Родственные тональности (тональности с наибольшим количеством общих аккордов)
const relatedKeys = {
    "C": ["G", "F", "Am", "Dm", "Em"],
    "G": ["D", "C", "Em", "Am", "Bm"],
    "D": ["A", "G", "Bm", "Em", "F#m"],
    "A": ["E", "D", "F#m", "Bm", "C#m"],
    "E": ["B", "A", "C#m", "F#m", "G#m"],
    "B": ["F#", "E", "G#m", "C#m", "D#m"],
    "F#": ["C#", "B", "D#m", "G#m", "A#m"],
    "C#": ["F#", "B", "A#m", "D#m", "Fm"],
    "F": ["Bb", "C", "Dm", "Gm", "Am"],
    "Bb": ["Eb", "F", "Gm", "Cm", "Dm"],
    "Eb": ["Ab", "Bb", "Cm", "Fm", "Gm"],
    "Ab": ["Db", "Eb", "Fm", "Bbm", "Cm"],
    "Db": ["Gb", "Ab", "Bbm", "Ebm", "Fm"],
    "Gb": ["Cb", "Db", "Ebm", "Abm", "Bbm"]
};

// Данные о ступенях для аккордов
const chordDegrees = {
    "C": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "G": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "D": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "A": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "E": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "B": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "F#": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    // "C#": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "F": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "Bb": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "Eb": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "Ab": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "Db": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "Gb": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],

    // Минорные (натуральный минор)
        "Am": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "Em": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "Bm": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "F#m": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "C#m": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "G#m": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "D#m": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "A#m": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "Dm": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "Gm": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "Cm": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "Fm": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "Bbm": ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        "Ebm": ["i", "ii°", "III", "iv", "v", "VI", "VII"]
};

// Данные о знаках при ключе для каждой тональности
const keySignatures = {
    "C": { sharps: [], flats: [] },
    "G": { sharps: ["F#"], flats: [] },
    "D": { sharps: ["F#", "C#"], flats: [] },
    "A": { sharps: ["F#", "C#", "G#"], flats: [] },
    "E": { sharps: ["F#", "C#", "G#", "D#"], flats: [] },
    "B": { sharps: ["F#", "C#", "G#", "D#", "A#"], flats: [] },
    "F#": { sharps: ["F#", "C#", "G#", "D#", "A#", "E#"], flats: [] },
    // "C#": { sharps: ["F#", "C#", "G#", "D#", "A#", "E#", "B#"], flats: [] },
    
    "F": { sharps: [], flats: ["Bb"] },
    "Bb": { sharps: [], flats: ["Bb", "Eb"] },
    "Eb": { sharps: [], flats: ["Bb", "Eb", "Ab"] },
    "Ab": { sharps: [], flats: ["Bb", "Eb", "Ab", "Db"] },
    "Db": { sharps: [], flats: ["Bb", "Eb", "Ab", "Db", "Gb"] },
    "Gb": { sharps: [], flats: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"] },
    // "Cb": { sharps: [], flats: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb", "Fb"] }
};

// Обновим состояние
const state = {
    selectedKey: "C",
    rotation: 0,
    targetRotation: 0,
    isDragging: false,
    lastX: 0,
    isAnimating: false,
    animationId: null,
    hoveredKey: null,
    rotationVelocity: 0,
    lastTime: 0,
    wheelTimeout: null,
    showScaleDegrees: true, // Новая опция
    highlightedChord: null,
    activeProgression: null,
};


// Константы
const SNAP_ANGLE = Math.PI / 6;
const SNAP_THRESHOLD = Math.PI / 24;
const ANIMATION_SPEED = 0.1;
const ANIMATION_DAMPING = 0.85;
const MIN_VELOCITY = 0.001;
const DRAG_SENSITIVITY = 0.008;

// Элементы DOM
const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');
const selectedKeyEl = document.getElementById('selectedKey');
const keyDescriptionEl = document.getElementById('keyDescription');
const sharpsCountEl = document.getElementById('sharpsCount');
const flatsCountEl = document.getElementById('flatsCount');
const parallelKeyEl = document.getElementById('parallelKey');
const neighborKeysEl = document.getElementById('neighborKeys');
const chordGridEl = document.getElementById('chordGrid');
const relativeKeyEl = document.getElementById('relativeKey');
const scaleDegreesEl = document.createElement('div'); 



// Добавьте эту функцию:
function calculateRotationForTopPosition(key) {
    // Верхняя позиция - угол -π/2 (12 часов)
    const targetAngle = -Math.PI / 2;
    
    // Рассчитываем насколько нужно повернуть, чтобы key оказался сверху
    const rotationNeeded = targetAngle - key.angle;
    
    return rotationNeeded;
}

// Добавьте эту функцию для плавной анимации:
// Более интеллектуальная анимация:
function animateToKeySmart(targetKeyName) {
    const keyData = findKeyByName(targetKeyName);
    if (!keyData) return;
    
    // Останавливаем текущую анимацию
    if (state.animationId) {
        cancelAnimationFrame(state.animationId);
    }
    
    state.isAnimating = true;
    
    // Рассчитываем несколько вариантов вращения (кратчайший путь)
    const targetAngle = -Math.PI / 2; // Верхняя позиция
    const currentAngle = normalizeAngle(keyData.angle + state.rotation);
    
    // Разница углов
    let angleDiff = targetAngle - currentAngle;
    
    // Выбираем кратчайший путь (влево или вправо)
    if (angleDiff > Math.PI) {
        angleDiff -= Math.PI * 2;
    } else if (angleDiff < -Math.PI) {
        angleDiff += Math.PI * 2;
    }
    
    // Целевое вращение
    const targetRotation = state.rotation + angleDiff;
    
    console.log(`Animating ${targetKeyName}: diff=${angleDiff.toFixed(3)}, target=${targetRotation.toFixed(3)}`);
    
    // Настройки анимации
    const animationDuration = 800; // мс
    const startTime = Date.now();
    const startRotation = state.rotation;
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // Плавная easing-функция (easeOutCubic)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        // Интерполируем вращение
        state.rotation = startRotation + angleDiff * easedProgress;
        
        drawCircle();
        updateTopKeyInfo();
        
        if (progress < 1) {
            state.animationId = requestAnimationFrame(animate);
        } else {
            // Завершение
            state.rotation = targetRotation;
            state.selectedKey = targetKeyName;
            state.isAnimating = false;
            state.animationId = null;
            
            // Финальное обновление
            drawCircle();
            updateTopKeyInfo();
            
            // Небольшой "бамп" для визуального удовольствия
            setTimeout(() => {
                state.rotationVelocity = 0.02 * Math.sign(angleDiff);
                animateWithInertia();
            }, 100);
        }
    };
    
    state.animationId = requestAnimationFrame(animate);
}

// Функция для нормализации угла в диапазон [-π, π]
function normalizeAngle(angle) {
    let normalized = angle % (Math.PI * 2);
    if (normalized > Math.PI) normalized -= Math.PI * 2;
    if (normalized < -Math.PI) normalized += Math.PI * 2;
    return normalized;
}

// Обновление информации о тональности
function updateTopKeyInfo() {
    const topKey = findClosestKeyToTop();
    if (!topKey) return;
    
    // Определяем, мажор это или минор
    const isMajor = !state.selectedKey.endsWith('m');
    const currentKey = isMajor ? topKey.major : topKey.minor;
    
    // Отображаем правильно
    if (isMajor) {
        selectedKeyEl.textContent = `${currentKey}-dur`;
        
        // Показываем мажорные аккорды
        const keyChords = chords[currentKey] || [];
        const degrees = chordDegrees[currentKey] || [];
        updateChordGrid(keyChords.slice(0, 7), degrees, isMajor);
    } else {
        selectedKeyEl.textContent = `${currentKey}-moll`;
        
        // Показываем минорные аккорды
        const keyChords = chords[currentKey] || [];
        const degrees = chordDegrees[currentKey] || chordDegrees["Am"]; // fallback
        updateChordGrid(keyChords.slice(0, 7), degrees, isMajor);
    }
    
    // Обновляем знаки альтерации
    const signs = keySignatures[topKey.major] || { sharps: [], flats: [] };
    updateKeySignatures(signs);
}

function updateKeySignatures(signs) {
    const keyDescEl = document.getElementById('keyDescription');
    keyDescEl.innerHTML = '';
    
    const container = document.createElement('div');
    container.className = 'key-signatures';
    
    if (signs.sharps.length > 0) {
        signs.sharps.forEach(note => {
            const signItem = document.createElement('div');
            signItem.className = 'sign-item';
            signItem.innerHTML = `
                <span class="sign-icon sharp-icon">♯</span>
                <span class="note-name">${note}</span>
            `;
            container.appendChild(signItem);
        });
    } else if (signs.flats.length > 0) {
        signs.flats.forEach(note => {
            const signItem = document.createElement('div');
            signItem.className = 'sign-item';
            signItem.innerHTML = `
                <span class="sign-icon flat-icon">♭</span>
                <span class="note-name">${note}</span>
            `;
            container.appendChild(signItem);
        });
    } else {
        const noSigns = document.createElement('div');
        noSigns.className = 'no-signs';
        noSigns.textContent = 'Нет знаков альтерации';
        container.appendChild(noSigns);
    }
    
    keyDescEl.appendChild(container);
}

// Обновление ступеней лада
function updateScaleDegrees(key) {
    const degrees = scaleDegrees[key] || [];
    
    // Создаем элемент если его нет
    if (!document.getElementById('scaleDegrees')) {
        const section = document.createElement('div');
        section.className = 'scale-section';
        section.id = 'scaleDegrees';
        section.innerHTML = `
            <h3>Ступени лада</h3>
            <div class="degree-grid" id="degreeGrid"></div>
        `;
        document.querySelector('.chords-section').parentNode.insertBefore(section, document.querySelector('.chords-section').nextSibling);
    }
    
    const degreeGrid = document.getElementById('degreeGrid');
    degreeGrid.innerHTML = '';
    
    degrees.forEach(degree => {
        const item = document.createElement('div');
        item.className = 'degree-item';
        
        // Разделяем римскую цифру и аккорд
        const parts = degree.split(' - ');
        item.innerHTML = `
            <div class="degree-roman">${parts[0]}</div>
            <div class="degree-chord">${parts[1]}</div>
        `;
        
        // Добавляем подсказку при наведении
        item.title = getDegreeFunction(parts[0]);
        
        degreeGrid.appendChild(item);
    });
}

// Функция для получения описания ступени
function getDegreeFunction(roman) {
    const functions = {
        "I": "Тоника - основа, устойчивость",
        "II": "Супертоника - переходная",
        "III": "Медианта - связующая",
        "IV": "Субдоминанта - напряжение",
        "V": "Доминанта - максимальное напряжение",
        "VI": "Субмедианта - переход к минору",
        "VII": "Вводный тон - напряжение"
    };
    return functions[roman] || "Ступень лада";
}

// Функция для вычисления позиции
// В script.js, замените функцию getKeyPosition:
// ЗАМЕНИТЕ getKeyPosition на эту простую версию:
function getKeyPosition(key, isMinor = false) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    
    // Расстояние от центра
    const distance = isMinor ? radius * 0.7 : radius;
    
    // Угол с учетом вращения
    const angle = key.angle + state.rotation;
    
    // Координаты
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    // Радиусы - увеличиваем для лучшего hover
    const circleRadius = isMinor ? 35 : 40; // Увеличенные значения
    
    return {
        x: x,
        y: y,
        radius: circleRadius,
        angle: angle,
        distance: distance
    };
}

// Функция для нахождения ближайшей тональности к верху
function findClosestKeyToTop() {
    let closestKey = null;
    let smallestAngle = Infinity;
    
    // Верхняя позиция - угол -π/2 (12 часов)
    const targetAngle = -Math.PI / 2;
    
    circleData.keys.forEach(key => {
        // Вычисляем угол тональности с учетом текущего вращения
        const currentAngle = (key.angle + state.rotation) % (Math.PI * 2);
        
        // Нормализуем угол в диапазон [-π, π]
        let normalizedAngle = currentAngle;
        if (normalizedAngle > Math.PI) normalizedAngle -= Math.PI * 2;
        if (normalizedAngle < -Math.PI) normalizedAngle += Math.PI * 2;
        
        // Вычисляем разницу с целевым углом
        let angleDiff = Math.abs(normalizedAngle - targetAngle);
        
        // Учитываем круговую природу углов
        angleDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff);
        
        if (angleDiff < smallestAngle) {
            smallestAngle = angleDiff;
            closestKey = key;
        }
    });
    
    return closestKey;
}

// Функция для вычисления вращения для "прилипания"
function calculateSnapRotation() {
    const closestKey = findClosestKeyToTop();
    if (!closestKey) return state.rotation;
    
    // Находим разницу между текущим углом и целевым
    const currentAngle = normalizeAngle(closestKey.angle + state.rotation);
    const targetAngle = -Math.PI / 2;
    let angleDiff = targetAngle - currentAngle;
    
    // Корректируем для минимального пути
    if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    
    return state.rotation + angleDiff;
}

// Функция для обновления вращения с инерцией
function updateRotation(deltaX) {
    const rotationDelta = deltaX * DRAG_SENSITIVITY;
    state.rotation += rotationDelta;
    state.rotationVelocity = rotationDelta * 2;
}

// Функция для анимации с инерцией
// Вариант 2: Мгновенное прилипание без анимации

function snapToTarget() {
    state.rotation = calculateSnapRotation();
    drawCircle();
    updateTopKeyInfo();
}

// Упрощенная анимация с инерцией
function animateWithInertia() {
    state.isAnimating = true;
    
    const animate = () => {
        // Применяем инерцию
        state.rotation += state.rotationVelocity;
        state.rotationVelocity *= 0.85; // Сильное демпфирование
        
        drawCircle();
        updateTopKeyInfo();
        
        // Если скорость очень мала, завершаем
        if (Math.abs(state.rotationVelocity) < 0.01) {
            state.isAnimating = false;
            snapToTarget(); // Мгновенное прилипание
            return;
        }
        
        state.animationId = requestAnimationFrame(animate);
    };
    
    state.animationId = requestAnimationFrame(animate);
}

// Обработчик отпускания мыши
document.addEventListener('mouseup', () => {
    if (!state.isDragging) return;
    
    state.isDragging = false;
    
    // Если скорость высокая - продолжаем инерцию
    if (Math.abs(state.rotationVelocity) > 0.1) {
        animateWithInertia();
    } else {
        snapToTarget(); // Иначе мгновенное прилипание
    }
    
    canvas.style.cursor = state.hoveredKey ? 'pointer' : 'grab';
});

// Колесо мыши
canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (state.isAnimating) {
        cancelAnimationFrame(state.animationId);
        state.isAnimating = false;
    }
    
    state.rotation += e.deltaY * 0.002;
    state.rotationVelocity = e.deltaY * 0.004;
    
    drawCircle();
    updateTopKeyInfo();
    
    clearTimeout(state.wheelTimeout);
    state.wheelTimeout = setTimeout(snapToTarget, 150);
});

// Улучшенная анимация к целевому вращению
function animateToTarget() {
    if (state.isAnimating) return;
    
    state.isAnimating = true;
    state.targetRotation = calculateSnapRotation();
    
    // Вычисляем начальную скорость для плавного перехода
    const angleDiff = normalizeAngle(state.targetRotation - state.rotation);
    state.rotationVelocity = angleDiff * 0.15;
    
    const animate = (currentTime) => {
        if (!state.lastTime) state.lastTime = currentTime;
        const deltaTime = Math.min((currentTime - state.lastTime) / 1000, 0.033);
        state.lastTime = currentTime;
        
        // Вычисляем разницу с целевым вращением
        let diff = normalizeAngle(state.targetRotation - state.rotation);
        
        // Если мы близко к цели, применяем "прилипание"
        if (Math.abs(diff) < SNAP_THRESHOLD) {
            // Плавное завершение анимации
            state.rotationVelocity += diff * 0.4 * deltaTime * 60;
            state.rotationVelocity *= 0.92;
            state.rotation += state.rotationVelocity;
            
            // Если достаточно близко, завершаем анимацию
            if (Math.abs(diff) < 0.001 && Math.abs(state.rotationVelocity) < MIN_VELOCITY) {
                state.rotation = state.targetRotation;
                state.rotationVelocity = 0;
                state.isAnimating = false;
                state.lastTime = 0;
                drawCircle();
                updateTopKeyInfo();
                return;
            }
        } else {
            // Ускоренное движение к цели
            state.rotationVelocity += diff * 0.6 * deltaTime * 60;
            state.rotationVelocity *= 0.96;
            state.rotation += state.rotationVelocity;
        }
        
        drawCircle();
        updateTopKeyInfo();
        state.animationId = requestAnimationFrame(animate);
    };
    
    state.animationId = requestAnimationFrame(animate);
}

// ПРОСТАЯ и понятная функция:
function getKeyAtPosition(x, y) {
    // Проверяем все тональности
    for (const key of circleData.keys) {
        // 1. Проверяем мажор
        const majorPos = getKeyPosition(key, false);
        const dxMajor = x - majorPos.x;
        const dyMajor = y - majorPos.y;
        const distMajor = Math.sqrt(dxMajor * dxMajor + dyMajor * dyMajor);
        
        // Увеличиваем радиус для hover
        const hoverRadiusMajor = majorPos.radius * 1.5; // +50% для hover
        
        if (distMajor < hoverRadiusMajor) {
            // console.log('Found major:', key.major, 'dist:', distMajor, 'radius:', hoverRadiusMajor);
            return { key: key.major, type: 'major', data: key };
        }
        
        // 2. Проверяем минор
        const minorPos = getKeyPosition(key, true);
        const dxMinor = x - minorPos.x;
        const dyMinor = y - minorPos.y;
        const distMinor = Math.sqrt(dxMinor * dxMinor + dyMinor * dyMinor);
        
        const hoverRadiusMinor = minorPos.radius * 1.5; // +50% для hover
        
        if (distMinor < hoverRadiusMinor) {
            // console.log('Found minor:', key.minor, 'dist:', distMinor, 'radius:', hoverRadiusMinor);
            return { key: key.minor, type: 'minor', data: key };
        }
    }
    
    return null;
}


// Обновление сетки аккордов
function updateChordGrid(chordList, degreeList = [], isMajor = true) {
    chordGridEl.innerHTML = '';
    
    // Заголовок в зависимости от лада
    const sectionTitle = document.querySelector('.chords-section h3');
    sectionTitle.textContent = isMajor ? 'Диатонические аккорды (мажор)' : 'Диатонические аккорды (минор)';
    
    chordList.forEach((chord, index) => {
        const button = document.createElement('button');
        button.className = 'chord-btn';
        
        // Разные подсказки для мажора и минора
        button.title = isMajor ? getMajorChordFunction(index) : getMinorChordFunction(index);
        
        // Показываем ступень и аккорд
        if (degreeList[index]) {
            button.innerHTML = `
                <div class="chord-degree">${degreeList[index]}</div>
                <div class="chord-name">${chord}</div>
            `;
        } else {
            button.textContent = chord;
        }
        
        chordGridEl.appendChild(button);
    });
}

// Функции для подсказок
function getMajorChordFunction(index) {
    const functions = [
        "I - Тоника (устойчивый, основной)",
        "ii - Супертоника (подготовка к доминанте)",
        "iii - Медианта (связующий, мягкий)",
        "IV - Субдоминанта (напряжение, движение)",
        "V - Доминанта (максимальное напряжение, требует разрешения)",
        "vi - Параллельный минор (грустный, меланхоличный)",
        "vii° - Вводный (напряженный, требует разрешения)"
    ];
    return functions[index];
}

function getMinorChordFunction(index) {
    const functions = [
        "i - Тоника минора (основная, грустная)",
        "ii° - Супертоника (напряженная, уменьшенная)",
        "III - Относительный мажор (светлый контраст)",
        "iv - Субдоминанта (углубление минора)",
        "v - Доминанта (в нат. миноре - малая, в гарм. - большая)",
        "VI - Субмедианта (светлый аккорд)",
        "VII - Субтоника (в нат. миноре - мажорная)"
    ];
    return functions[index];
}

// Функция для получения описания функции аккорда
function getChordFunction(index) {
    const functions = [
        "I - Тоника (устойчивый, основной)",
        "ii - Супертоника (подготовка к доминанте)",
        "iii - Медианта (связующий, мягкий)",
        "IV - Субдоминанта (напряжение, движение)",
        "V - Доминанта (максимальное напряжение, требует разрешения)",
        "vi - Субмедианта (параллельный минор, грустный)",
        "vii° - Вводный (напряженный, требует разрешения)"
    ];
    return functions[index] || "Аккорд";
}

// Функция для подсветки аккорда в круге
function highlightChord(chordName) {
    // Ищем аккорд в данных
    const allChords = [];
    circleData.keys.forEach(key => {
        allChords.push({ name: key.major, type: 'major', color: key.color });
        allChords.push({ name: key.minor, type: 'minor', color: '#fc00ff' });
    });
    
    const chord = allChords.find(c => c.name === chordName);
    if (chord) {
        // Временно подсвечиваем этот аккорд в круге
        state.highlightedChord = chordName;
        drawCircle();
        
        // Сбрасываем подсветку через 2 секунды
        setTimeout(() => {
            state.highlightedChord = null;
            drawCircle();
        }, 2000);
    }
}

// Рисование круга
function drawCircle() {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    // Очистка канваса
    ctx.clearRect(0, 0, width, height);

    // Рисование фоновых кругов
    drawBackgroundCircles(centerX, centerY, radius);
    
    // Рисование тональностей
    drawKeyLabels(centerX, centerY, radius);

    drawProgressionArrows();
}

function drawBackgroundCircles(centerX, centerY, radius) {
    // Внешний круг
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Внутренний круг
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawKeyLabels(centerX, centerY, radius) {
    circleData.keys.forEach(key => {
        // Мажорная тональность
        const majorPos = getKeyPosition(key, false);
        const isTopKey = findClosestKeyToTop() === key;
        const isSelected = state.selectedKey === key.major;
        const isHovered = state.hoveredKey === key.major;
        
        drawKeyCircle(
            majorPos.x, 
            majorPos.y, 
            majorPos.radius, 
            key.color, 
            key.major, 
            true, 
            isSelected,
            isHovered,
            isTopKey
        );

        // Минорная тональность
        const minorPos = getKeyPosition(key, true);
        const isMinorSelected = state.selectedKey === key.minor;
        const isMinorHovered = state.hoveredKey === key.minor;
        
        drawKeyCircle(
            minorPos.x, 
            minorPos.y, 
            minorPos.radius, 
            '#fc00ff', 
            key.minor, 
            false,
            isMinorSelected,
            isMinorHovered,
            false
        );

    });
}

// Обновите drawKeyCircle для лучшего визуального отклика:
function drawKeyCircle(x, y, radius, color, text, isMajor, isSelected, isHovered, isTopKey) {
    // 1. Определяем цвет из CSS-переменных
    let computedColor;
    
    if (isMajor) {
        // Для мажорных тональностей
        // Создаем имя CSS-переменной (заменяем диез на sharp, бемоль на flat)
        const keyName = text.replace('#', 'sharp').replace('b', 'flat').toLowerCase();
        const cssVarName = `--key-${keyName}`;
        
        // Получаем значение из CSS
        computedColor = getComputedStyle(document.documentElement)
            .getPropertyValue(cssVarName)
            .trim();
        
        // Если не нашли в CSS, используем старый цвет из данных
        if (!computedColor || computedColor === '') {
            computedColor = color;
        }
    } else {
        // Для минорных тональностей
        computedColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--key-minor')
            .trim() || '#fc00ff'; // fallback
    }
    
    // 2. Увеличиваем радиус при hover
    const displayRadius = isHovered ? radius * 1.1 : radius;
    
    // 3. Внешняя подсветка при hover
    if (isHovered) {
        ctx.beginPath();
        ctx.arc(x, y, displayRadius + 15, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
            x, y, displayRadius,
            x, y, displayRadius + 15
        );
        gradient.addColorStop(0, computedColor + '60'); // 60 = 38% opacity
        gradient.addColorStop(1, computedColor + '00'); // 00 = 0% opacity
        ctx.fillStyle = gradient;
        ctx.fill();
    }
    
    // 4. Особый эффект для тональности наверху
    if (isTopKey && isMajor) {
        ctx.beginPath();
        ctx.arc(x, y, displayRadius + 20, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
            x, y, displayRadius,
            x, y, displayRadius + 20
        );
        gradient.addColorStop(0, computedColor + '60');
        gradient.addColorStop(1, computedColor + '00');
        ctx.fillStyle = gradient;
        ctx.fill();
    }
    
    // 5. Основной круг
    ctx.beginPath();
    ctx.arc(x, y, displayRadius, 0, Math.PI * 2);
    
    // Определяем цвет заливки в зависимости от состояния
    if (isSelected) {
        ctx.fillStyle = computedColor; // Полная насыщенность
    } else if (isHovered) {
        ctx.fillStyle = computedColor + 'FF'; // Полная непрозрачность при hover
    } else if (isTopKey && isMajor) {
        ctx.fillStyle = computedColor + 'FF'; // Полная непрозрачность для верхней
    } else {
        // Для неактивных: мажор ярче минора
        ctx.fillStyle = computedColor + (isMajor ? 'CC' : 'AA');
    }
    
    ctx.fill();
    
    // // 6. Обводка
    // ctx.beginPath();
    // ctx.arc(x, y, displayRadius, 0, Math.PI * 2);
    
    // // Определяем цвет обводки
    // let strokeColor;
    // let lineWidth;
    
    // if (isTopKey && isMajor) {
    //     // Верхняя тональность - яркая обводка
    //     strokeColor = getComputedStyle(document.documentElement)
    //         .getPropertyValue('--accent-primary')
    //         .trim() || '#00ffcc';
    //     lineWidth = 4;
    // // } else if (isSelected) {
    // //     strokeColor = '#ffffff';
    // //     lineWidth = 3;
    // // } else if (isHovered) {
    // //     strokeColor = '#ffff00'; // Желтая обводка при hover
    // //     lineWidth = 3;
    // } else {
    //     strokeColor = 'rgba(255,255,255,0.6)';
    //     lineWidth = 2;
    // }
    
    // ctx.strokeStyle = strokeColor;
    // ctx.lineWidth = lineWidth;
    // ctx.stroke();
    
    // 7. Текст (название тональности)
    // Определяем цвет текста
    let textColor;
    if (isSelected || isHovered || (isTopKey && isMajor)) {
        // Для активных элементов - темный текст для контраста
        textColor = '#000000';
    } else {
        textColor = '#ffffff';
    }
    
    ctx.fillStyle = textColor;
    ctx.font = isMajor ? 'bold 18px Arial' : 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Тень для лучшей читаемости
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Рисуем текст
    ctx.fillText(text, x, y);
    
    // Сбрасываем тень
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // 8. Дополнительный эффект для выбранной тональности
    if (isSelected || (isTopKey && isMajor)) {
        // Внутренняя подсветка
        ctx.beginPath();
        ctx.arc(x, y, displayRadius - 5, 0, Math.PI * 2);
        
        // Создаем градиент для свечения
        const innerGradient = ctx.createRadialGradient(
            x, y, displayRadius - 10,
            x, y, displayRadius
        );
        innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = innerGradient;
        ctx.fill();
        
        // Точечный эффект в центре
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
}


function findChordPosition(chordName, isMajorContext = false) {
    if (!chordName) return null;
    
    // Определяем тип аккорда
    const isMinorChord = chordName.includes('m') || chordName.includes('°');
    const baseName = chordName.replace(/[°m]/g, '').trim();
    
    // Ищем в circleData
    for (const keyData of circleData.keys) {
        // Для мажорных аккордов
        if (keyData.major === baseName && !isMinorChord) {
            return getKeyPosition(keyData, false);
        }
        
        // Для минорных аккордов, которые являются тональностями
        if (keyData.minor === baseName && isMinorChord) {
            return getKeyPosition(keyData, true);
        }
        
        // Для минорных аккордов в мажорной тональности (например, Dm в C)
        if (keyData.major === baseName && isMinorChord) {
            return getKeyPosition(keyData, true);
        }
    }
    
    // Fallback для уменьшенных аккордов
    if (chordName.includes('°')) {
        // Ищем ближайшую мажорную тональность с этой буквой
        for (const keyData of circleData.keys) {
            if (keyData.major.startsWith(baseName.charAt(0))) {
                return getKeyPosition(keyData, true);
            }
        }
    }
    
    return null;
}

// Добавь в самый конец script.js (перед init) эту функцию:
function drawProgressionArrows() {
    if (!state.activeProgression) return;
    
    const progression = chordProgressions[state.activeProgression];
    if (!progression) return;
    
    const topKey = findClosestKeyToTop();
    if (!topKey) return;
    
    const isMajor = !state.selectedKey.endsWith('m');
    const keyName = isMajor ? topKey.major : topKey.minor;
    const keyChords = chords[keyName] || [];
    
    if (keyChords.length === 0) return;
    
    // Выбираем правильные шаги для мажора/минора
    const steps = isMajor ? progression.majorSteps : progression.minorSteps;
    
    // Просто собираем индексы аккордов
    const chordIndices = steps.map(step => step - 1);
    
    // Получаем позиции этих аккордов НАПРЯМУЮ из circleData
    const positions = [];
    
    chordIndices.forEach((chordIndex, i) => {
        if (chordIndex >= 0 && chordIndex < keyChords.length) {
            const chordName = keyChords[chordIndex];
            
            // Ищем ВО ВСЕХ тональностях circleData
            for (const keyData of circleData.keys) {
                // Если аккорд совпадает с мажором этой тональности
                if (keyData.major === chordName) {
                    const pos = getKeyPosition(keyData, false);
                    positions.push({ x: pos.x, y: pos.y, chord: chordName });
                    return;
                }
                // Если аккорд совпадает с минором этой тональности
                if (keyData.minor === chordName) {
                    const pos = getKeyPosition(keyData, true);
                    positions.push({ x: pos.x, y: pos.y, chord: chordName });
                    return;
                }
            }
            
            // Если не нашли точного совпадения, ищем по первой букве
            const baseNote = chordName.replace(/[m°]/g, '').charAt(0);
            for (const keyData of circleData.keys) {
                if (keyData.major.startsWith(baseNote)) {
                    const isMinorChord = chordName.includes('m');
                    const pos = getKeyPosition(keyData, isMinorChord);
                    positions.push({ x: pos.x, y: pos.y, chord: chordName });
                    return;
                }
            }
        }
    });
    
    // Для отладки - посмотрим что нашли
    console.log(`Тональность: ${keyName} (${isMajor ? 'мажор' : 'минор'})`);
    console.log('Найденные позиции:', positions.map(p => p.chord));
    
    // Рисуем стрелки
    if (positions.length > 1) {
        ctx.strokeStyle = progression.color || '#00ffcc';
        ctx.lineWidth = 3;
        ctx.fillStyle = progression.color || '#00ffcc';
        ctx.lineCap = 'round';
        
        for (let i = 0; i < positions.length - 1; i++) {
            const from = positions[i];
            const to = positions[i + 1];
            
            // Линия
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            
            // Стрелка
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const angle = Math.atan2(dy, dx);
            const headLength = 15;
            
            ctx.save();
            ctx.translate(to.x, to.y);
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-headLength, headLength / 3);
            ctx.moveTo(0, 0);
            ctx.lineTo(-headLength, -headLength / 3);
            ctx.stroke();
            
            ctx.restore();
        }
    }
}



// Функция рисования стрелки
function drawArrow(fromX, fromY, toX, toY) {
    const headLength = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.save();
    ctx.translate(toX, toY);
    ctx.rotate(angle);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-headLength, headLength / 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(-headLength, -headLength / 2);
    ctx.stroke();
    
    ctx.restore();
}

// Замените функцию initProgressionsPanel() на эту:
function initProgressionsPanel() {
    console.log("=== Initializing Progressions Panel ===");
    
    // Удаляем старые обработчики (чтобы избежать дублирования)
    document.querySelectorAll('.progression-btn').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Получаем обновленные кнопки
    const progressionBtns = document.querySelectorAll('.progression-btn');
    console.log(`Found ${progressionBtns.length} progression buttons`);
    
    // Добавляем обработчики для каждой кнопки
    progressionBtns.forEach((btn, index) => {
        const progressionKey = btn.getAttribute('data-progression');
        console.log(`Button ${index}: "${progressionKey}"`);
        
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие
            
            console.log(`Clicked: ${progressionKey}`);
            console.log(`Currently active: ${state.activeProgression}`);
            
            // Убираем активность со всех кнопок
            progressionBtns.forEach(b => {
                b.classList.remove('active');
            });
            
            // Если уже активна - выключаем
            if (state.activeProgression === progressionKey) {
                state.activeProgression = null;
                console.log("Deactivated progression");
            } else {
                // Включаем новую
                state.activeProgression = progressionKey;
                this.classList.add('active');
                console.log(`Activated: ${progressionKey}`);
            }
            
            // Перерисовываем круг
            setTimeout(() => {
                drawCircle();
            }, 50);
        });
    });
    

}

function renderProgressions(category) {
    const listContainer = document.getElementById('progressionsList');
    const progressions = chordProgressionsByCategory[category];
    
    listContainer.innerHTML = `
        <div class="progression-group">
            <div class="progression-group-title">
                ${category}
                <span class="progression-count">${Object.keys(progressions).length}</span>
            </div>
            <div class="progressions-grid">
                ${Object.entries(progressions).map(([key, prog]) => `
                    <button class="progression-btn" data-progression="${key}">
                        <span class="progression-name">${prog.name}</span>
                        <span class="progression-desc">${prog.steps.length} шага</span>
                        <span class="progression-color" style="background: ${prog.color}"></span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Добавляем обработчики для новых кнопок
    document.querySelectorAll('.progression-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const progressionKey = this.getAttribute('data-progression');
            
            // Убираем активность со всех кнопок прогрессий
            document.querySelectorAll('.progression-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Если уже активна - выключаем
            if (state.activeProgression === progressionKey) {
                state.activeProgression = null;
                this.classList.remove('active');
            } else {
                // Включаем новую
                state.activeProgression = progressionKey;
                this.classList.add('active');
            }
            
            drawCircle();
        });
    });
}

function filterProgressions(searchTerm) {
    const listContainer = document.getElementById('progressionsList');
    
    if (!searchTerm) {
        // Если поиск пустой, показываем активную категорию
        const activeCategory = document.querySelector('.category-btn.active');
        if (activeCategory) {
            renderProgressions(activeCategory.dataset.category);
        }
        return;
    }
    
    // Ищем во всех прогрессиях
    const filteredGroups = {};
    
    Object.entries(chordProgressionsByCategory).forEach(([category, progressions]) => {
        const filtered = {};
        
        Object.entries(progressions).forEach(([key, prog]) => {
            if (prog.name.toLowerCase().includes(searchTerm) ||
                key.includes(searchTerm) ||
                prog.description?.toLowerCase().includes(searchTerm)) {
                filtered[key] = prog;
            }
        });
        
        if (Object.keys(filtered).length > 0) {
            filteredGroups[category] = filtered;
        }
    });
    
    // Отображаем результаты
    listContainer.innerHTML = Object.entries(filteredGroups).map(([category, progressions]) => `
        <div class="progression-group">
            <div class="progression-group-title">
                ${category}
                <span class="progression-count">${Object.keys(progressions).length}</span>
            </div>
            <div class="progressions-grid">
                ${Object.entries(progressions).map(([key, prog]) => `
                    <button class="progression-btn" data-progression="${key}">
                        <span class="progression-name">${prog.name}</span>
                        <span class="progression-desc">${prog.steps.length} шага</span>
                        <span class="progression-color" style="background: ${prog.color}"></span>
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');
}


// Обработчики событий
function setupEventListeners() {
    // Клик по канвасу
   // ЗАМЕНИТЕ обработчик click на этот:
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const canvasX = (e.clientX - rect.left) * scaleX;
        const canvasY = (e.clientY - rect.top) * scaleY;
        
        const keyInfo = getKeyAtPosition(canvasX, canvasY);
        
        if (keyInfo) {
            // Останавливаем текущую анимацию
            if (state.animationId) {
                cancelAnimationFrame(state.animationId);
                state.isAnimating = false;
            }
            
            // Устанавливаем выбранную тональность
            state.selectedKey = keyInfo.key;
            
            // Анимируем к верхней позиции
            animateToKeySmart(keyInfo.key);
            
            console.log('Clicked on:', keyInfo.key, 'type:', keyInfo.type);
        }
    });
    
    // Hover по канвасу
    canvas.addEventListener('mousemove', (e) => {
        // Получаем правильные координаты относительно canvas
        const rect = canvas.getBoundingClientRect();
        

        
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        // Координаты с учетом масштаба
        const canvasX = (e.clientX - rect.left) * scaleX;
        const canvasY = (e.clientY - rect.top) * scaleY;
        
        const keyInfo = getKeyAtPosition(canvasX, canvasY);
        
        if (keyInfo) {
            if (state.hoveredKey !== keyInfo.key) {
                state.hoveredKey = keyInfo.key;
                canvas.style.cursor = 'pointer';
                // console.log('Hover detected:', keyInfo.key, 'at', canvasX, canvasY);
            }
        } else if (state.hoveredKey !== null) {
            state.hoveredKey = null;
            canvas.style.cursor = state.isDragging ? 'grabbing' : 'grab';
            // console.log('Hover lost');
        }
        
        // Перерисовываем
        drawCircle();
    });
    
    canvas.addEventListener('mouseleave', () => {
        state.hoveredKey = null;
        canvas.style.cursor = 'grab';
        drawCircle();
    });
    
    // Вращение круга с инерцией
    let lastMoveTime = 0;
    
    canvas.addEventListener('mousedown', (e) => {
        if (state.isAnimating) {
            cancelAnimationFrame(state.animationId);
            state.isAnimating = false;
            state.rotationVelocity = 0;
        }
        
        state.isDragging = true;
        state.lastX = e.clientX;
        state.rotationVelocity = 0;
        lastMoveTime = Date.now();
        canvas.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!state.isDragging) return;
        
        const currentTime = Date.now();
        const deltaTime = Math.max(currentTime - lastMoveTime, 1);
        const deltaX = e.clientX - state.lastX;
        
        // Обновляем вращение с учетом времени для плавности
        updateRotation(deltaX);
        state.lastX = e.clientX;
        lastMoveTime = currentTime;
        
        drawCircle();
        updateTopKeyInfo();
    });
    
    document.addEventListener('mouseup', () => {
        if (!state.isDragging) return;
        
        state.isDragging = false;
        
        // Если скорость достаточно высока, продолжаем инерцию
        if (Math.abs(state.rotationVelocity) > 0.02) {
            animateWithInertia();
        } else {
            // Иначе включаем "прилипание"
            animateToTarget();
        }
        
        canvas.style.cursor = state.hoveredKey ? 'pointer' : 'grab';
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyS' || e.code === 'KeyD') {
            state.showScaleDegrees = !state.showScaleDegrees;
            const topKey = findClosestKeyToTop();
            if (topKey) {
                if (state.showScaleDegrees) {
                    updateScaleDegrees(topKey.major);
                    document.getElementById('scaleDegrees').style.display = 'block';
                    document.querySelector('.chords-section').style.display = 'none';
                } else {
                    document.getElementById('scaleDegrees').style.display = 'none';
                    document.querySelector('.chords-section').style.display = 'block';
                }
            }
        }
    });



    
    // Обработка колеса мыши
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (state.isAnimating) {
            cancelAnimationFrame(state.animationId);
            state.isAnimating = false;
        }
        
        // Вращение колесом мыши
        state.rotation += e.deltaY * 0.002;
        state.rotationVelocity = e.deltaY * 0.004;
        
        drawCircle();
        updateTopKeyInfo();
        
        // Автоматическое прилипание после вращения колесом
        clearTimeout(state.wheelTimeout);
        state.wheelTimeout = setTimeout(() => {
            animateToTarget();
        }, 300);
    });
    
    // Обработка касаний для мобильных устройств
    let touchStartX = 0;
    let touchStartRotation = 0;
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        
        if (state.isAnimating) {
            cancelAnimationFrame(state.animationId);
            state.isAnimating = false;
            state.rotationVelocity = 0;
        }
        
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartRotation = state.rotation;
        state.isDragging = true;
        canvas.style.cursor = 'grabbing';
    });
    
    canvas.addEventListener('touchmove', (e) => {
        if (!state.isDragging) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartX;
        state.rotation = touchStartRotation + deltaX * 0.01;
        
        drawCircle();
        updateTopKeyInfo();
    });
    
    canvas.addEventListener('touchend', (e) => {
        if (!state.isDragging) return;
        e.preventDefault();
        
        state.isDragging = false;
        
        // Вычисляем скорость на основе последнего движения
        const lastTouch = e.changedTouches[0];
        const deltaX = lastTouch.clientX - touchStartX;
        state.rotationVelocity = deltaX * 0.002;
        
        // Если скорость достаточно высока, продолжаем инерцию
        if (Math.abs(state.rotationVelocity) > 0.01) {
            animateWithInertia();
        } else {
            // Иначе включаем "прилипание"
            animateToTarget();
        }
        
        canvas.style.cursor = 'grab';
    });
}



// Инициализация
function init() {
    drawCircle();
    updateTopKeyInfo();
    setupEventListeners();
    // themeManager.init();
    initProgressionsPanel();
}

// Запуск при загрузке
window.addEventListener('load', init);
