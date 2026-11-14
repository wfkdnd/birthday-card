'use strict';

const scene = document.querySelector('#cake-scene');
const wishButton = document.querySelector('#wish');
const wishLabel = document.querySelector('#wish-label');
const instruction = document.querySelector('#instruction');
const tinyNote = document.querySelector('#tiny-note');
const dialog = document.querySelector('#letter-dialog');
const canvas = document.querySelector('#confetti');
const context = canvas.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let wishState = 'ready';
let particles = [];
let animationFrame = null;
let viewportWidth = innerWidth;
let viewportHeight = innerHeight;

function resizeCanvas() {
  viewportWidth = innerWidth;
  viewportHeight = innerHeight;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = viewportWidth * ratio;
  canvas.height = viewportHeight * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function celebrate() {
  if (reducedMotion.matches) return;
  const colors = ['#b64750', '#dfaba3', '#cfad6a', '#80927b', '#efcfa8'];
  particles = Array.from({ length: 145 }, () => ({
    x: viewportWidth / 2, y: viewportHeight * .46,
    vx: (Math.random() - .5) * 17, vy: -Math.random() * 15 - 3,
    size: Math.random() * 6 + 3, angle: Math.random() * Math.PI,
    spin: (Math.random() - .5) * .2, life: 1,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
  if (animationFrame !== null) cancelAnimationFrame(animationFrame);
  let lastTime;
  function draw(time) {
    const step = lastTime === undefined ? 1 : Math.min((time - lastTime) / 16.67, 2);
    lastTime = time;
    context.clearRect(0, 0, viewportWidth, viewportHeight);
    particles.forEach(p => {
      p.x += p.vx * step; p.y += p.vy * step; p.vy += .13 * step;
      p.vx *= Math.pow(.994, step); p.angle += p.spin * step; p.life -= .004 * step;
      context.save(); context.translate(p.x, p.y); context.rotate(p.angle);
      context.globalAlpha = Math.max(0, p.life); context.fillStyle = p.color;
      context.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * .55); context.restore();
    });
    particles = particles.filter(p => p.life > 0 && p.y < viewportHeight + 20);
    if (particles.length) animationFrame = requestAnimationFrame(draw);
    else { context.clearRect(0, 0, viewportWidth, viewportHeight); animationFrame = null; }
  }
  animationFrame = requestAnimationFrame(draw);
}

wishButton.addEventListener('click', () => {
  if (wishState === 'ready') {
    scene.classList.add('is-lit');
    wishState = 'lit';
    wishLabel.textContent = '许好愿了，吹灭蜡烛';
    instruction.textContent = '烛光亮了。闭上眼睛，许一个只属于你的愿望。';
    tinyNote.textContent = '10101 · 许好愿后，点击按钮吹灭蜡烛';
  } else if (wishState === 'lit') {
    scene.classList.remove('is-lit');
    wishState = 'celebrated';
    wishLabel.textContent = '再许一个小小心愿';
    instruction.textContent = '生日快乐！愿你的每一份期待，都慢慢实现。';
    tinyNote.textContent = '有一封写给你的信，就在下面的信封里 ♡';
    celebrate();
  } else {
    wishState = 'ready';
    wishButton.click();
  }
});

document.querySelector('#letter').addEventListener('click', () => dialog.showModal());
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
const birthdayThoughts = [
  '你还没见过的风景里，一定有让你笑起来的那一处。',
  '愿你收藏的「以后想做」，在新的一岁变成「今天做到了」。',
  '愿你始终有重新开始的兴致，也有按自己节奏前进的自在。',
  '愿你偶尔绕的远路，刚好开着你喜欢的花。',
  '如果今天只记住一句话：走到这里的你，值得一块大大的蛋糕。',
  '愿平凡的一天，也会因为你喜欢的小事，变得亮晶晶。',
  '你还没到过的那片海，一定有你喜欢的风。',
  '愿你把「想不明白」交给时间，把「想做的事」交给今天。',
  '愿你有出发的勇气，也有靠岸的安心。'
];
let thoughtIndex = 0;
document.querySelector('#another-thought').addEventListener('click', () => {
  thoughtIndex = (thoughtIndex + 1) % birthdayThoughts.length;
  document.querySelector('#birthday-thought').textContent = birthdayThoughts[thoughtIndex];
  document.querySelector('#thought-status').textContent = birthdayThoughts[thoughtIndex];
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

// A two-line joke from the little production team.
const creatorToggle = document.querySelector('#creator-toggle');
const creatorComment = document.querySelector('#creator-comment');
const creatorLines = ['其实我们才是第一作者', 'AI这么强咋办啊'];
let creatorClickCount = 0;
creatorToggle.addEventListener('click', () => {
  creatorClickCount = (creatorClickCount + 1) % 3;
  const expanded = creatorClickCount !== 0;
  creatorComment.textContent = expanded ? creatorLines[creatorClickCount - 1] : '';
  creatorComment.hidden = !expanded;
  creatorToggle.setAttribute('aria-expanded', String(expanded));
});

// Uppercase ASCII bytes, XOR-encrypted with the hexadecimal key on the page.
const signatureButton = document.querySelector('#secret-signature');
const signaturePuzzle = document.querySelector('#signature-puzzle');
const signatureKey = document.querySelector('#signature-key');
const puzzleResult = document.querySelector('#puzzle-result');
signatureButton.addEventListener('click', () => {
  const expanded = signatureButton.getAttribute('aria-expanded') === 'true';
  signatureButton.setAttribute('aria-expanded', String(!expanded));
  signaturePuzzle.hidden = expanded;
  if (!expanded) signatureKey.focus();
});
document.querySelector('#signature-form').addEventListener('submit', event => {
  event.preventDefault();
  const key = signatureKey.value.trim();
  if (!/^(?:0x)?[0-9a-f]{1,2}$/i.test(key) || parseInt(key, 16) !== 0xBF) {
    puzzleResult.textContent = '这把钥匙好像不合适，再看看网页底部？';
    return;
  }
  const plaintext = [0xE8, 0xF9, 0xF4]
    .map(byte => String.fromCharCode(byte ^ parseInt(key, 16)))
    .join('');
  signatureButton.textContent = plaintext;
  signatureButton.setAttribute('aria-label', '已解开的署名：' + plaintext);
  puzzleResult.textContent = '找到啦。原来这份祝福里，还藏着一个熟悉的名字。';
});

// Music is synthesized locally and starts only after an explicit click.
let audioContext;
let musicTimer;
let musicOn = false;
const soundButton = document.querySelector('#sound');
const melody = [
  [0,.75],[0,.25],[2,1],[0,1],[5,1],[4,2],
  [0,.75],[0,.25],[2,1],[0,1],[7,1],[5,2],
  [0,.75],[0,.25],[12,1],[9,1],[5,1],[4,1],[2,1],
  [10,.75],[10,.25],[9,1],[5,1],[7,1],[5,2.5]
];
function scheduleMelody() {
  let start = audioContext.currentTime + .1;
  for (const [note, beats] of melody) {
    const duration = beats * .4;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 261.63 * Math.pow(2, note / 12);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(.095, start + .012);
    gain.gain.exponentialRampToValueAtTime(.001, start + duration * .92);
    oscillator.connect(gain); gain.connect(audioContext.destination);
    oscillator.start(start); oscillator.stop(start + duration);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    start += duration;
  }
  musicTimer = setTimeout(() => { if (musicOn) scheduleMelody(); }, (start - audioContext.currentTime + 1.5) * 1000);
}
soundButton.addEventListener('click', async () => {
  soundButton.disabled = true;
  try {
    if (!audioContext) {
      const AudioEngine = window.AudioContext || window.webkitAudioContext;
      if (!AudioEngine) throw new Error('Audio is unavailable');
      audioContext = new AudioEngine();
    }
    if (musicOn) {
      clearTimeout(musicTimer);
      await audioContext.close();
      audioContext = null;
      musicOn = false;
    } else {
      await audioContext.resume();
      scheduleMelody();
      musicOn = true;
    }
    soundButton.setAttribute('aria-pressed', String(musicOn));
    document.querySelector('#sound-label').textContent = musicOn ? '音乐开' : '音乐关';
  } catch {
    document.querySelector('#sound-label').textContent = '音乐暂不可用';
  } finally { soundButton.disabled = false; }
});
