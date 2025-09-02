/* Placeholder scaffold. We will add data, swipe logic, and the live radar next. */

const state = {
  topics: [],           // will fill in Step 2
  index: 0,
  kept: [],
  maxSpokes: 8,
  radar: null,
  finalRadar: null
};

const els = {
  progressText: document.getElementById('progressText'),
  barInner: document.getElementById('barInner'),
  cardArea: document.getElementById('cardArea'),
  skipBtn: document.getElementById('skipBtn'),
  keepBtn: document.getElementById('keepBtn'),
  radarCanvas: document.getElementById('radarChart'),
  summary: document.getElementById('summary'),
  finalRadar: document.getElementById('finalRadar'),
  summaryList: document.getElementById('summaryList'),
  restartBtn: document.getElementById('restartBtn')
};

// Basic no-op handlers for now
function init() {
  updateProgress();
  renderEmptyCard();
  initRadar();
  bindControls();
}

function bindControls() {
  els.skipBtn.addEventListener('click', () => {});
  els.keepBtn.addEventListener('click', () => {});

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { /* skip planned */ }
    if (e.key === 'ArrowRight') { /* keep planned */ }
  });
}

function renderEmptyCard() {
  els.cardArea.innerHTML = `<div class="empty">Project scaffold ready</div>`;
}

function updateProgress() {
  const total = state.topics.length;
  const current = Math.min(state.index, total);
  els.progressText.textContent = `${current} of ${total}`;
  const pct = total ? (current / total) * 100 : 0;
  els.barInner.style.width = `${pct}%`;
}

function initRadar() {
  const ctx = els.radarCanvas.getContext('2d');
  state.radar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: Array(8).fill('Spoke'),
      datasets: [{
        label: 'Selected Topics',
        data: Array(8).fill(0),
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 1,
          ticks: { display: false }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

init();
