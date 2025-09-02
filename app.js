// ----- Topic data -----
const TOPICS = [
  { title: "Healthcare Access and Affordability", icon: "fa-solid fa-stethoscope", desc: "Lower costs and broader coverage" },
  { title: "Climate Change and Environmental Protection", icon: "fa-solid fa-leaf", desc: "Cut emissions and protect habitats" },
  { title: "Economic Inequality and Job Security", icon: "fa-solid fa-briefcase", desc: "Stability and fair opportunity" },
  { title: "Education Quality and Funding", icon: "fa-solid fa-school", desc: "Better schools and resources" },
  { title: "Gun Laws and Public Safety", icon: "fa-solid fa-shield-halved", desc: "Safety measures and rights" },
  { title: "Reproductive Rights and Abortion Access", icon: "fa-solid fa-heart-pulse", desc: "Access and privacy in care" },
  { title: "Policing and Criminal Justice Reform", icon: "fa-solid fa-scale-balanced", desc: "Fairness and accountability" },
  { title: "Immigration Policy", icon: "fa-solid fa-passport", desc: "Border, visas, and paths" },
  { title: "Civil Rights and Social Justice", icon: "fa-solid fa-hands-bound", desc: "Equal protection under law" },
  { title: "Taxation and Government Spending", icon: "fa-solid fa-coins", desc: "Priorities and tradeoffs" },
  { title: "Affordable Housing and Homelessness", icon: "fa-solid fa-house", desc: "Supply, zoning, and services" },
  { title: "Voting Rights and Electoral Integrity", icon: "fa-solid fa-square-check", desc: "Ballot access and trust" },
  { title: "Foreign Policy and National Security", icon: "fa-solid fa-globe", desc: "Alliances and defense" },
  { title: "Infrastructure and Transportation", icon: "fa-solid fa-road", desc: "Build and maintain systems" },
  { title: "Technology and Data Privacy", icon: "fa-solid fa-user-shield", desc: "Rights in a digital world" },
  { title: "Corporate Regulation and Consumer Protection", icon: "fa-solid fa-scale-unbalanced", desc: "Rules for fair markets" },
  { title: "Wages and Labor Rights", icon: "fa-solid fa-people-carry-box", desc: "Pay, benefits, and safety" },
  { title: "Support for Small Businesses and Entrepreneurship", icon: "fa-solid fa-shop", desc: "Capital and less red tape" },
  { title: "Mental Health and Addiction Services", icon: "fa-solid fa-brain", desc: "Care access and stigma" },
  { title: "Campaign Finance Reform", icon: "fa-solid fa-landmark", desc: "Money in politics rules" }
];

// ----- State -----
const state = {
  topics: [...TOPICS],
  index: 0,
  kept: [],
  maxSpokes: 8,
  radar: null,
  finalRadar: null
};

// ----- Elements -----
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

// ----- Init -----
function init() {
  shuffle(state.topics);
  updateProgress();
  renderCurrentCard();
  initRadar();
  bindControls();
}
document.addEventListener('DOMContentLoaded', init);

// ----- Helpers -----
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function updateProgress() {
  const total = state.topics.length;
  const current = Math.min(state.index, total);
  els.progressText.textContent = `${current} of ${total}`;
  const pct = total ? (current / total) * 100 : 0;
  els.barInner.style.width = `${pct}%`;
}

function renderCurrentCard() {
  // All done or summary triggered
  if (state.index >= state.topics.length || state.kept.length >= state.maxSpokes) {
    showSummary();
    return;
  }

  const t = state.topics[state.index];
  els.cardArea.innerHTML = `
    <article class="card" id="topicCard" tabindex="0" aria-live="polite">
      <div class="title">
        <i class="${t.icon}" aria-hidden="true"></i>
        <span>${t.title}</span>
      </div>
      <div class="subtitle">${t.desc}</div>
    </article>
  `;

  // Add simple swipe for mouse and touch
  attachSwipe(document.getElementById('topicCard'));
}

function attachSwipe(card) {
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  const threshold = 80;

  const onDown = e => {
    dragging = true;
    startX = getX(e);
    currentX = startX;
    card.style.transition = 'none';
  };
  const onMove = e => {
    if (!dragging) return;
    currentX = getX(e);
    const delta = currentX - startX;
    card.style.transform = `translateX(${delta}px) rotate(${delta * 0.05}deg)`;
    card.style.opacity = `${Math.max(0.4, 1 - Math.abs(delta) / 400)}`;
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    const delta = currentX - startX;
    card.style.transition = 'transform 160ms ease, opacity 160ms ease';

    if (delta > threshold) {
      // keep
      card.style.transform = 'translateX(480px) rotate(12deg)';
      card.style.opacity = '0';
      setTimeout(handleKeep, 150);
    } else if (delta < -threshold) {
      // skip
      card.style.transform = 'translateX(-480px) rotate(-12deg)';
      card.style.opacity = '0';
      setTimeout(handleSkip, 150);
    } else {
      // reset
      card.style.transform = 'translateX(0px) rotate(0deg)';
      card.style.opacity = '1';
    }
  };

  card.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);

  card.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onUp);

  function getX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }
}

function bindControls() {
  els.skipBtn.addEventListener('click', () => animateAnd(handleSkip, -1));
  els.keepBtn.addEventListener('click', () => animateAnd(handleKeep, 1));

  window.addEventListener('keydown', e => {
    // Ignore if summary is open
    if (!els.summary.classList.contains('hidden')) return;
    if (e.key === 'ArrowLeft') animateAnd(handleSkip, -1);
    if (e.key === 'ArrowRight') animateAnd(handleKeep, 1);
  });

  els.restartBtn.addEventListener('click', restart);
}

function animateAnd(cb, dir = 1) {
  const card = document.getElementById('topicCard');
  if (!card) return cb();
  card.style.transition = 'transform 160ms ease, opacity 160ms ease';
  card.style.transform = `translateX(${dir * 480}px) rotate(${dir * 12}deg)`;
  card.style.opacity = '0';
  setTimeout(cb, 150);
}

function handleSkip() {
  state.index++;
  updateProgress();
  renderCurrentCard();
}

function handleKeep() {
  const t = state.topics[state.index];
  state.kept.push(t);
  updateRadarWithTopic(t, state.kept.length - 1);
  state.index++;
  updateProgress();
  renderCurrentCard();
}

function initRadar() {
  const ctx = els.radarCanvas.getContext('2d');
  const labels = Array(state.maxSpokes).fill('Spoke');

  state.radar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Selected Topics',
        data: Array(state.maxSpokes).fill(0),
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 1,
          ticks: { display: false },
          grid: { circular: true },
          angleLines: { color: 'rgba(255,255,255,0.12)' },
          pointLabels: { color: '#9ca3af', font: { size: 11 } }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function updateRadarWithTopic(topic, spokeIndex) {
  const chart = state.radar;
  if (!chart) return;
  const i = Math.min(spokeIndex, state.maxSpokes - 1);
  chart.data.labels[i] = shortLabel(topic.title);
  chart.data.datasets[0].data[i] = 1; // mark as selected
  chart.update();
}

function shortLabel(title) {
  // Keep labels compact
  return title.length > 22 ? title.slice(0, 20) + "…" : title;
}

function showSummary() {
  // Build final radar data from kept topics
  const labels = Array(state.maxSpokes).fill('Spoke');
  const values = Array(state.maxSpokes).fill(0);

  state.kept.slice(0, state.maxSpokes).forEach((t, i) => {
    labels[i] = shortLabel(t.title);
    values[i] = 1;
  });

  // List
  els.summaryList.innerHTML = state.kept
    .slice(0, state.maxSpokes)
    .map(t => `<li><i class="${t.icon}" aria-hidden="true"></i> ${t.title}</li>`)
    .join('');

  // Final radar
  const ctx = els.finalRadar.getContext('2d');
  if (state.finalRadar) state.finalRadar.destroy();
  state.finalRadar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Your 8 Topics',
        data: values,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 1,
          ticks: { display: false },
          grid: { circular: true },
          angleLines: { color: 'rgba(255,255,255,0.12)' },
          pointLabels: { color: '#9ca3af', font: { size: 11 } }
        }
      },
      plugins: { legend: { display: false } }
    }
  });

  els.summary.classList.remove('hidden');
}

function restart() {
  // Reset state
  state.index = 0;
  state.kept = [];
  state.topics = [...TOPICS];
  shuffle(state.topics);
  // Reset live radar
  if (state.radar) {
    state.radar.data.labels = Array(state.maxSpokes).fill('Spoke');
    state.radar.data.datasets[0].data = Array(state.maxSpokes).fill(0);
    state.radar.update();
  }
  els.summary.classList.add('hidden');
  updateProgress();
  renderCurrentCard();
}
