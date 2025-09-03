// ====== Config ======
const CONFIG = {
  MAX_SPOKES: 8,              // final spokes
  MAX_UNIQUE_TO_SHOW: 50,     // cap on unique topics shown from the pool of 50
  RETESTS_PER_KEEP: 3,        // how many times to re-ask a kept topic
  RETEST_OFFSET_MIN: 5,       // how far later in the queue a retest is inserted
  RETEST_OFFSET_MAX: 10
};

// ====== Topic pool (50) ======
const TOPICS = [
  // Civic & domestic policy
  { title: "Healthcare Access and Affordability", icon: "fa-solid fa-stethoscope", desc: "Lower costs and broader coverage" },
  { title: "Climate Change and Environmental Protection", icon: "fa-solid fa-leaf", desc: "Cut emissions and protect habitats" },
  { title: "Economic Inequality and Job Security", icon: "fa-solid fa-briefcase", desc: "Stability and fair opportunity" },
  { title: "Education Quality and Funding", icon: "fa-solid fa-school", desc: "Better schools and resources" },
  { title: "Gun Laws and Public Safety", icon: "fa-solid fa-shield-halved", desc: "Safety measures and rights" },
  { title: "Reproductive Rights and Abortion Access", icon: "fa-solid fa-heart-pulse", desc: "Access and privacy in care" },
  { title: "Policing and Criminal Justice Reform", icon: "fa-solid fa-scale-balanced", desc: "Fairness and accountability" },
  { title: "Immigration Policy", icon: "fa-solid fa-passport", desc: "Border, visas, and paths" },
  { title: "Civil Rights and Social Justice", icon: "fa-solid fa-handshake", desc: "Equal protection under law" },
  { title: "Taxation and Government Spending", icon: "fa-solid fa-coins", desc: "Priorities and tradeoffs" },
  { title: "Affordable Housing and Homelessness", icon: "fa-solid fa-house", desc: "Supply, zoning, and services" },
  { title: "Voting Rights and Electoral Integrity", icon: "fa-solid fa-square-check", desc: "Ballot access and trust" },
  { title: "Infrastructure and Transportation", icon: "fa-solid fa-road", desc: "Build and maintain systems" },
  { title: "Technology and Data Privacy", icon: "fa-solid fa-user-shield", desc: "Rights in a digital world" },
  { title: "Corporate Regulation and Consumer Protection", icon: "fa-solid fa-scale-unbalanced", desc: "Rules for fair markets" },
  { title: "Wages and Labor Rights", icon: "fa-solid fa-people-carry-box", desc: "Pay, benefits, and safety" },
  { title: "Support for Small Businesses and Entrepreneurship", icon: "fa-solid fa-shop", desc: "Capital and less red tape" },
  { title: "Mental Health and Addiction Services", icon: "fa-solid fa-brain", desc: "Care access and stigma" },
  { title: "Campaign Finance Reform", icon: "fa-solid fa-landmark", desc: "Money in politics rules" },
  { title: "Policing in Schools", icon: "fa-solid fa-graduation-cap", desc: "Safety, discipline, and equity" },
  { title: "Government Role in Childcare and Parental Leave", icon: "fa-solid fa-baby-carriage", desc: "Care access and paid time" },
  { title: "Internet Access and Digital Equity", icon: "fa-solid fa-wifi", desc: "Affordable broadband access" },
  { title: "Book Bans and Curriculum Restrictions in Schools", icon: "fa-solid fa-book", desc: "Content rules and oversight" },
  { title: "Religious Freedom and the Role of Religion in Government", icon: "fa-solid fa-church", desc: "Balance rights and neutrality" },
  { title: "DEI Programs and Workplace Policy", icon: "fa-solid fa-people-group", desc: "Hiring, inclusion, outcomes" },

  // National security & foreign policy
  { title: "Foreign Policy and National Security", icon: "fa-solid fa-globe", desc: "Alliances and defense" },
  { title: "Israel-Palestine Conflict / War in Gaza", icon: "fa-solid fa-dove", desc: "War, civilians, and diplomacy" },
  { title: "U.S. Military Support to Ukraine", icon: "fa-solid fa-helmet-safety", desc: "Aid, weapons, oversight" },
  { title: "U.S.-China Relations and Taiwan", icon: "fa-solid fa-dragon", desc: "Trade, tech, and deterrence" },
  { title: "Defense Treaties and NATO Commitments", icon: "fa-solid fa-shield", desc: "Allied burden sharing" },
  { title: "Foreign Aid and International Development", icon: "fa-solid fa-hand-holding-heart", desc: "Aid goals and accountability" },
  { title: "Global Refugee and Asylum Policies", icon: "fa-solid fa-person-walking-luggage", desc: "Protection and resettlement" },

  // Economy & tech
  { title: "American Tariff Policy", icon: "fa-solid fa-arrow-trend-up", desc: "Tradeoffs for growth and jobs" },
  { title: "Supply Chain Resilience and Domestic Manufacturing", icon: "fa-solid fa-industry", desc: "Reshoring and security" },
  { title: "Universal Basic Income (UBI)", icon: "fa-solid fa-hand-holding-dollar", desc: "Cash floors and work" },
  { title: "Artificial Intelligence and Job Displacement", icon: "fa-solid fa-robot", desc: "Automation and training" },
  { title: "Online Censorship and Platform Accountability", icon: "fa-solid fa-scale-balanced", desc: "Speech rules and harms" },
  { title: "TikTok and Foreign-Owned Social Media Regulation", icon: "fa-brands fa-tiktok", desc: "Data, youth, and security" },
  { title: "Misinformation and Algorithms in Democracy", icon: "fa-solid fa-diagram-project", desc: "Ranking, reach, and trust" },

  // Health, climate, disasters
  { title: "Pandemic Preparedness and Vaccine Mandates", icon: "fa-solid fa-syringe", desc: "Readiness and public health" },
  { title: "Water Access and Drought Management", icon: "fa-solid fa-faucet-drip", desc: "Scarcity and rights" },
  { title: "Food Security and Agricultural Policy", icon: "fa-solid fa-wheat-awn", desc: "Prices, farms, and aid" },
  { title: "Natural Disasters and Climate Resilience Funding", icon: "fa-solid fa-house-flood-water", desc: "Rebuild and insure risk" },

  // Governance & institutions
  { title: "January 6th and the 2020 Election", icon: "fa-solid fa-flag-usa", desc: "Accountability and norms" },
  { title: "Term Limits and Congressional Reform", icon: "fa-solid fa-timeline", desc: "Turnover and rules" },
  { title: "National Debt and Deficit Spending", icon: "fa-solid fa-scale-unbalanced-flip", desc: "Debt paths and priorities" },

  // Housing, vets, space
  { title: "Healthcare for Veterans and Military Support", icon: "fa-solid fa-ribbon", desc: "Care access and benefits" },
  { title: "Space Exploration and Federal Investment", icon: "fa-solid fa-moon", desc: "Science and spinoffs" }
];

// ====== One-word labels ======
const TITLE_TO_ONEWORD = {
  "Healthcare Access and Affordability": "Healthcare",
  "Climate Change and Environmental Protection": "Climate",
  "Economic Inequality and Job Security": "Economy",
  "Education Quality and Funding": "Education",
  "Gun Laws and Public Safety": "Guns",
  "Reproductive Rights and Abortion Access": "Reproductive",
  "Policing and Criminal Justice Reform": "Justice",
  "Immigration Policy": "Immigration",
  "Civil Rights and Social Justice": "Rights",
  "Taxation and Government Spending": "Taxes",
  "Affordable Housing and Homelessness": "Housing",
  "Voting Rights and Electoral Integrity": "Voting",
  "Foreign Policy and National Security": "Security",
  "Infrastructure and Transportation": "Transit",
  "Technology and Data Privacy": "Privacy",
  "Corporate Regulation and Consumer Protection": "Consumers",
  "Wages and Labor Rights": "Labor",
  "Support for Small Businesses and Entrepreneurship": "Business",
  "Mental Health and Addiction Services": "Mental",
  "Campaign Finance Reform": "Campaigns",
  "Policing in Schools": "SchoolPolicing",
  "Government Role in Childcare and Parental Leave": "Childcare",
  "Internet Access and Digital Equity": "Internet",
  "Book Bans and Curriculum Restrictions in Schools": "Curriculum",
  "Religious Freedom and the Role of Religion in Government": "Religion",
  "DEI Programs and Workplace Policy": "DEI",
  "Israel-Palestine Conflict / War in Gaza": "Gaza",
  "U.S. Military Support to Ukraine": "Ukraine",
  "U.S.-China Relations and Taiwan": "China",
  "Defense Treaties and NATO Commitments": "NATO",
  "Foreign Aid and International Development": "Aid",
  "Global Refugee and Asylum Policies": "Refugees",
  "American Tariff Policy": "Tariffs",
  "Supply Chain Resilience and Domestic Manufacturing": "Supply",
  "Universal Basic Income (UBI)": "UBI",
  "Artificial Intelligence and Job Displacement": "AI",
  "Online Censorship and Platform Accountability": "Platforms",
  "TikTok and Foreign-Owned Social Media Regulation": "TikTok",
  "Misinformation and Algorithms in Democracy": "Algorithms",
  "Pandemic Preparedness and Vaccine Mandates": "Pandemic",
  "Water Access and Drought Management": "Water",
  "Food Security and Agricultural Policy": "Food",
  "Natural Disasters and Climate Resilience Funding": "Disasters",
  "January 6th and the 2020 Election": "Jan6",
  "Term Limits and Congressional Reform": "TermLimits",
  "National Debt and Deficit Spending": "Debt",
  "Healthcare for Veterans and Military Support": "Veterans",
  "Space Exploration and Federal Investment": "Space"
};

const oneWordLabel = t => TITLE_TO_ONEWORD[t] || "Topic";

// ====== State ======
const state = {
  pool: [],             // all topics with ids and metrics
  queue: [],            // what we’ll actually show
  index: 0,             // pointer in queue
  radar: null,
  finalRadar: null,
  labelsLive: Array(CONFIG.MAX_SPOKES).fill(""),  // live spokes
  spokeFill: 0                                  // next spoke slot to fill on first-time keeps
};

// ====== DOM ======
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

// ====== Init ======
document.addEventListener('DOMContentLoaded', () => {
  bootstrapPool();
  buildInitialQueue();
  updateProgress();
  renderCurrentCard();
  initRadar();
  bindControls();
});

// ====== Pool & Queue ======
function bootstrapPool() {
  // Clone with ids and metrics
  state.pool = TOPICS.map((t, i) => ({
    ...t,
    id: i,
    shown: 0,
    kept: 0,
    retestsScheduled: 0,
    firstKeptOrder: Infinity
  }));
}

function buildInitialQueue() {
  const shuffled = shuffle([...state.pool]);
  const unique = shuffled.slice(0, CONFIG.MAX_UNIQUE_TO_SHOW);
  state.queue = [...unique];
  state.index = 0;
}

function scheduleRetest(topic) {
  if (topic.retestsScheduled >= CONFIG.RETESTS_PER_KEEP) return;
  const offset = randInt(CONFIG.RETEST_OFFSET_MIN, CONFIG.RETEST_OFFSET_MAX);
  const insertAt = Math.min(state.index + offset, state.queue.length);
  state.queue.splice(insertAt, 0, topic); // reinsert same object reference
  topic.retestsScheduled += 1;
}

// ====== UI helpers ======
function updateProgress() {
  const total = state.queue.length;
  const current = Math.min(state.index, total);
  els.progressText.textContent = `${current} of ${total}`;
  const pct = total ? (current / total) * 100 : 0;
  els.barInner.style.width = `${pct}%`;
}

function renderCurrentCard() {
  // End conditions:
  // 1) We have 8 topics with kept >= 2 (confirmed), or
  // 2) We ran out of queue
  if (confirmedCount() >= CONFIG.MAX_SPOKES || state.index >= state.queue.length) {
    showSummary();
    return;
  }

  const t = state.queue[state.index];
  els.cardArea.innerHTML = `
    <article class="card" id="topicCard" tabindex="0" aria-live="polite">
      <div class="title">
        <i class="${t.icon}" aria-hidden="true"></i>
        <span>${t.title}</span>
      </div>
      <div class="subtitle">${t.desc}</div>
    </article>
  `;
  attachSwipe(document.getElementById('topicCard'));
}

function bindControls() {
  els.skipBtn.addEventListener('click', () => animateAnd(handleSkip, -1));
  els.keepBtn.addEventListener('click', () => animateAnd(handleKeep, 1));

  window.addEventListener('keydown', e => {
    if (!els.summary.classList.contains('hidden')) return;
    if (e.key === 'ArrowLeft') animateAnd(handleSkip, -1);
    if (e.key === 'ArrowRight') animateAnd(handleKeep, 1);
  });

  els.restartBtn.addEventListener('click', restart);
}

function attachSwipe(card) {
  let startX = 0, currentX = 0, dragging = false;
  const threshold = 80;

  const onDown = e => { dragging = true; startX = getX(e); currentX = startX; card.style.transition = 'none'; };
  const onMove = e => {
    if (!dragging) return;
    currentX = getX(e);
    const dx = currentX - startX;
    card.style.transform = `translateX(${dx}px) rotate(${dx * 0.05}deg)`;
    card.style.opacity = `${Math.max(0.4, 1 - Math.abs(dx) / 400)}`;
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    const dx = currentX - startX;
    card.style.transition = 'transform 160ms ease, opacity 160ms ease';
    if (dx > threshold) { card.style.transform = 'translateX(480px) rotate(12deg)'; card.style.opacity = '0'; setTimeout(handleKeep, 150); }
    else if (dx < -threshold) { card.style.transform = 'translateX(-480px) rotate(-12deg)'; card.style.opacity = '0'; setTimeout(handleSkip, 150); }
    else { card.style.transform = 'translateX(0px) rotate(0deg)'; card.style.opacity = '1'; }
  };

  card.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);

  card.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onUp);

  function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
}

function animateAnd(cb, dir = 1) {
  const card = document.getElementById('topicCard');
  if (!card) return cb();
  card.style.transition = 'transform 160ms ease, opacity 160ms ease';
  card.style.transform = `translateX(${dir * 480}px) rotate(${dir * 12}deg)`;
  card.style.opacity = '0';
  setTimeout(cb, 150);
}

// ====== Keep/Skip ======
function handleSkip() {
  const t = state.queue[state.index];
  t.shown += 1;
  state.index += 1;
  updateProgress();
  renderCurrentCard();
}

function handleKeep() {
  const t = state.queue[state.index];

  t.shown += 1;
  t.kept += 1;
  if (t.firstKeptOrder === Infinity) t.firstKeptOrder = performance.now();

  // On first-time keep, fill a live spoke if any left
  if (t.kept === 1 && state.spokeFill < CONFIG.MAX_SPOKES) {
    setLiveSpoke(state.spokeFill, oneWordLabel(t.title));
    state.spokeFill += 1;
  }

  // Schedule one retest a few cards later
  scheduleRetest(t);

  state.index += 1;
  updateProgress();

  // If we already have 8 confirmed keeps, finish
  if (confirmedCount() >= CONFIG.MAX_SPOKES) { showSummary(); return; }

  renderCurrentCard();
}

// ====== Live radar ======
function initRadar() {
  // Fixed canvas size to avoid reflow
  els.radarCanvas.width = 400;
  els.radarCanvas.height = 400;
  els.radarCanvas.style.width = '400px';
  els.radarCanvas.style.height = '400px';

  const ctx = els.radarCanvas.getContext('2d');
  state.radar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [...state.labelsLive],
      datasets: [{
        label: 'Selected Topics',
        data: Array(CONFIG.MAX_SPOKES).fill(0),
        fill: true,
        pointRadius: 0,
        pointHitRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: 'rgba(59, 130, 246, 0.10)',
        borderColor: 'rgba(59, 130, 246, 0.85)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: true,
      animation: { duration: 0 },
      layout: { padding: 42 },
      elements: { point: { radius: 0, hitRadius: 0, hoverRadius: 0 } },
      scales: {
        r: {
          min: 0,
          max: 1,
          ticks: { display: false },
          grid: { circular: true, color: 'rgba(255,255,255,0.10)' },
          angleLines: { color: 'rgba(255,255,255,0.18)' },
          pointLabels: {
            display: true,
            color: '#e5e7eb',
            padding: 12,
            font: { size: 16, weight: '700', family: 'system-ui, -apple-system, Segoe UI, Roboto, Arial' }
          }
        }
      },
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}

function setLiveSpoke(spokeIndex, label) {
  const i = Math.min(spokeIndex, CONFIG.MAX_SPOKES - 1);
  state.labelsLive[i] = label;
  state.radar.data.labels = [...state.labelsLive];
  state.radar.data.datasets[0].data[i] = 1;
  state.radar.update('none');
}

// ====== Summary ======
function confirmedCount() {
  // Topics kept at least twice count as "confirmed"
  return state.pool.filter(t => t.kept >= 2).length;
}

function topEightByScore() {
  // Rank by kept desc, then firstKeptOrder asc, then shown asc
  const ranked = [...state.pool]
    .filter(t => t.kept > 0)
    .sort((a, b) => {
      if (b.kept !== a.kept) return b.kept - a.kept;
      if (a.firstKeptOrder !== b.firstKeptOrder) return a.firstKeptOrder - b.firstKeptOrder;
      return a.shown - b.shown;
    });
  return ranked.slice(0, CONFIG.MAX_SPOKES);
}

function showSummary() {
  const winners = topEightByScore();

  // Fill list
  els.summaryList.innerHTML = winners
    .map(t => `<li><i class="${t.icon}" aria-hidden="true"></i> ${t.title}</li>`)
    .join('');

  // Fixed size to avoid squish
  els.finalRadar.width = 500;
  els.finalRadar.height = 500;
  els.finalRadar.style.width = '500px';
  els.finalRadar.style.height = '500px';

  const labels = winners.map(t => oneWordLabel(t.title));
  const values = winners.map(() => 1);

  const ctx = els.finalRadar.getContext('2d');
  if (state.finalRadar) state.finalRadar.destroy();
  state.finalRadar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Your 8 Topics',
        data: values,
        fill: true,
        pointRadius: 0,
        pointHitRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: 'rgba(59, 130, 246, 0.20)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 3
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: true,
      animation: { duration: 600 },
      layout: { padding: 42 },
      elements: { point: { radius: 0, hitRadius: 0, hoverRadius: 0 } },
      scales: {
        r: {
          min: 0,
          max: 1,
          ticks: { display: false },
          grid: { circular: true, color: 'rgba(255,255,255,0.10)' },
          angleLines: { color: 'rgba(255,255,255,0.18)' },
          pointLabels: {
            display: true,
            color: '#e5e7eb',
            padding: 12,
            font: { size: 16, weight: '700', family: 'system-ui, -apple-system, Segoe UI, Roboto, Arial' }
          }
        }
      },
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });

  els.summary.classList.remove('hidden');
}

function restart() {
  bootstrapPool();
  buildInitialQueue();
  state.labelsLive = Array(CONFIG.MAX_SPOKES).fill("");
  state.spokeFill = 0;

  // Reset live chart
  if (state.radar) {
    state.radar.data.labels = [...state.labelsLive];
    state.radar.data.datasets[0].data = Array(CONFIG.MAX_SPOKES).fill(0);
    state.radar.update('none');
  }

  els.summary.classList.add('hidden');
  updateProgress();
  renderCurrentCard();
}

// ====== Utils ======
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
