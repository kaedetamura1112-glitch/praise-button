const COLORS = ['#F45B69', '#59C3C3', '#4062BB'];

const SHADOWS = [
  'rgba(244, 91, 105, 0.45)',
  'rgba(89, 195, 195, 0.45)',
  'rgba(64, 98, 187, 0.45)',
];

const FONTS = [
  { family: "'Noto Sans JP'", weight: 900 },       // 源ノ角ゴシックJP Heavy
  { family: "'Potta One'", weight: 400 },            // ポッタ       
  { family: "'Kaisei HarunoUmi'", weight: 700 },    // 解星 春の海Bold
  { family: "'Noto Sans JP', sans-serif", weight: 400 }, // Noto Sans JP
];

const PRAISES = [
  'よくできました！',
  'すごい！その調子！',
  'あなたは最高です！',
  '頑張ってる、えらい！',
  '今日もよく頑張った！',
  '素晴らしい！',
  'あなたなら絶対できる！',
  '継続は力なり、すごいよ！',
  '一歩一歩、着実に進んでる！',
  'その努力、必ず実を結ぶ！',
  '今この瞬間も成長してる！',
  '今日のあなた、昨日より強い！',
  '諦めないあなたが最高！',
  '小さな一歩も、立派な前進！',
  '休んでも大丈夫、また始めればいい！',
  '毎日の積み重ねが未来を作る！',
  'やる気がなくても動いた、それだけで偉い！',
  '自分を信じて進もう！',
  'あなたの努力は無駄じゃない！',
  '完璧じゃなくていい、続けることが大事！',
];

const btn = document.getElementById('praise-btn');
const msgEl = document.getElementById('message');

let colorIndex = 0;
let lastPraiseIndex = -1;

// 12文字超えの場合に句読点・助詞の直後で改行する
function insertLineBreak(text) {
  if (text.length <= 12) return text;

  const strongBreaks = ['、', '。', '！', '？'];
  const weakBreaks   = ['て', 'で', 'は', 'が', 'を', 'に', 'も', 'と', 'し'];

  for (let i = 4; i <= Math.min(12, text.length - 2); i++) {
    if (strongBreaks.includes(text[i])) {
      return text.substring(0, i + 1) + '\n' + text.substring(i + 1);
    }
  }
  for (let i = 5; i <= Math.min(12, text.length - 2); i++) {
    if (weakBreaks.includes(text[i])) {
      return text.substring(0, i + 1) + '\n' + text.substring(i + 1);
    }
  }
  return text.substring(0, 12) + '\n' + text.substring(12);
}

function spawnStars(btn, color) {
  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const count = Math.floor(Math.random() * 11) + 10; // 10〜20個

  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.textContent = '★';
    const size = Math.random() * 40 + 30; // 30〜70px（約2.5倍）
    star.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      font-size: ${size}px;
      color: ${color};
      pointer-events: none;
      z-index: 9999;
      user-select: none;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(star);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 200 + 150; // 150〜350px
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const duration = Math.random() * 200 + 800; // 800〜1000ms

    star.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 },
      ],
      { duration, easing: 'ease-out', fill: 'forwards' }
    ).onfinish = () => star.remove();
  }
}

btn.addEventListener('click', () => {
  colorIndex = (colorIndex + 1) % COLORS.length;
  btn.style.backgroundColor = COLORS[colorIndex];
  btn.style.boxShadow = `0 10px 36px ${SHADOWS[colorIndex]}`;
  msgEl.style.color = COLORS[colorIndex];

  spawnStars(btn, COLORS[colorIndex]);

  let idx;
  do { idx = Math.floor(Math.random() * PRAISES.length); }
  while (idx === lastPraiseIndex);
  lastPraiseIndex = idx;

  const font = FONTS[Math.floor(Math.random() * FONTS.length)];
  msgEl.style.fontFamily = font.family;
  msgEl.style.fontWeight = font.weight;

  msgEl.classList.remove('show');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    msgEl.textContent = insertLineBreak(PRAISES[idx]);
    msgEl.classList.add('show');
  }));
});
