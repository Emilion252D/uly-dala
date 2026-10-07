/* Ұлы Дала — игровая логика (механика Onet / PaoPao), экраны, звук, прогресс. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const LEVELS = window.LEVELS, ICONS = window.ICONS, SCENES = window.SCENES;
  const HINTS = 3, SHUFFLES = 2, MATCH_PTS = 100, TIME_PER_MATCH = 3;

  /* ---------------- сохранение прогресса ---------------- */
  const KEY = 'uly-dala-v1';
  const save = Object.assign({ done: [false, false, false, false, false], best: [0, 0, 0, 0, 0], sound: true, calm: false, seenHow: false }, readSave());
  function readSave() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) { /* без хранилища прогресс живёт до закрытия страницы */ } }

  const icon = id => `<svg class="ic" viewBox="0 0 64 64" aria-hidden="true">${ICONS[id].s}</svg>`;
  const fmt = s => { s = Math.max(0, Math.round(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  const shuffleArr = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------------- звук (Web Audio, без файлов) ---------------- */
  const Snd = {
    ctx: null, on: save.sound,
    init() {
      if (this.ctx) { if (this.ctx.state === 'suspended' && !document.hidden) this.ctx.resume(); return; }
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try { this.ctx = new AC(); } catch (e) { return; }
      const c = this.ctx;
      this.master = c.createGain(); this.master.gain.value = this.on ? 1 : 0; this.master.connect(c.destination);
      this.sfx = c.createGain(); this.sfx.gain.value = .5; this.sfx.connect(this.master);
      this.mus = c.createGain(); this.mus.gain.value = .13; this.mus.connect(this.master);
      this.startMusic();
    },
    // короткий «щипок»: осциллятор, фильтр и затухающая огибающая
    pluck(f, t, dur, vol, dest, type = 'triangle') {
      const c = this.ctx; if (!c) return;
      const o = c.createOscillator(), g = c.createGain(), lp = c.createBiquadFilter();
      o.type = type; o.frequency.value = f;
      lp.type = 'lowpass'; lp.frequency.setValueAtTime(Math.min(f * 6, 6000), t);
      lp.frequency.exponentialRampToValueAtTime(Math.max(f * 1.5, 200), t + dur);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .008);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(lp); lp.connect(g); g.connect(dest);
      o.start(t); o.stop(t + dur + .05);
    },
    play(name) {
      if (!this.ctx || !this.on) return;
      const t = this.ctx.currentTime, s = this.sfx, p = (f, d, dur, v, ty) => this.pluck(f, t + d, dur, v, s, ty);
      if (name === 'click') p(520, 0, .08, .25, 'sine');
      else if (name === 'select') p(660, 0, .14, .3);
      else if (name === 'match') { p(587, 0, .25, .4); p(880, .09, .4, .4); }
      else if (name === 'error') { p(196, 0, .22, .25, 'sine'); p(175, .09, .26, .2, 'sine'); }
      else if (name === 'hint') { p(988, 0, .3, .25, 'sine'); p(1319, .1, .3, .2, 'sine'); }
      else if (name === 'shuffle') [392, 494, 440, 587].forEach((f, i) => p(f, i * .06, .12, .22));
      else if (name === 'win') [587, 740, 880, 1175, 1480].forEach((f, i) => p(f, i * .13, .7, .38));
    },
    // спокойный фон: тихий бурдон и редкие щипковые фразы в пентатонике
    startMusic() {
      const c = this.ctx;
      [73.42, 110].forEach((f, i) => { const o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.value = i ? .1 : .18; o.connect(g); g.connect(this.mus); o.start(); });
      const sc = [146.83, 174.61, 196, 220, 261.63, 293.66, 349.23, 392];
      const phr = [
        [5, -1, 5, 4, 5, -1, 3, -1, 4, -1, 3, 2, 3, -1, 0, -1],
        [3, -1, 3, 5, 6, -1, 5, -1, 4, -1, 5, 3, 2, -1, 3, -1],
        [0, -1, 2, 3, 5, -1, -1, -1, 7, -1, 6, 5, 3, -1, -1, -1],
        [5, -1, -1, 3, -1, -1, 2, -1, 3, -1, -1, 0, -1, -1, -1, -1]
      ];
      let step = 0, cur = phr[3], next = c.currentTime + .6;
      setInterval(() => {
        if (c.state !== 'running') return;
        if (next < c.currentTime) next = c.currentTime + .05;
        while (next < c.currentTime + .6) {
          const n = cur[step];
          if (n >= 0) { this.pluck(sc[n], next, 1.2, .5, this.mus, 'sawtooth'); if (step % 8 === 0) this.pluck(146.83, next, 1.6, .3, this.mus); }
          if (++step >= 16) { step = 0; cur = phr[Math.floor(Math.random() * phr.length)]; }
          next += .36;
        }
      }, 150);
    },
    toggle() {
      this.on = !this.on; save.sound = this.on; persist(); this.init();
      if (this.ctx) this.master.gain.setTargetAtTime(this.on ? 1 : 0, this.ctx.currentTime, .05);
      renderSound();
    }
  };
  function renderSound() {
    const b = $('#soundBtn');
    b.firstChild.textContent = Snd.on ? '🔊 ' : '🔇 ';
    b.querySelector('span').textContent = Snd.on ? 'Звук включён' : 'Звук выключен';
    b.setAttribute('aria-pressed', Snd.on); b.title = Snd.on ? 'Звук включён' : 'Звук выключен';
  }

  /* ---------------- состояние игры ---------------- */
  const G = { grid: [], cols: 0, rows: 0 };
  const tilesEl = $('#tiles'), linesEl = $('#lines'), boardEl = $('#board');

  // клетка свободна, если она пустая или лежит за краем поля (линия может огибать поле снаружи)
  const empty = (r, c) => r < 0 || c < 0 || r >= G.rows || c >= G.cols || G.grid[r][c] === null;

  // свободны ли все клетки строго между двумя точками на одной прямой
  function clearLine(r1, c1, r2, c2) {
    if (r1 === r2) { for (let c = Math.min(c1, c2) + 1; c < Math.max(c1, c2); c++) if (!empty(r1, c)) return false; return true; }
    if (c1 === c2) { for (let r = Math.min(r1, r2) + 1; r < Math.max(r1, r2); r++) if (!empty(r, c1)) return false; return true; }
    return false;
  }

  // Путь между плитками a и b не более чем с двумя поворотами. Возвращает список точек или null.
  function findPath(a, b) {
    if (a.r === b.r && a.c === b.c) return null;
    if (clearLine(a.r, a.c, b.r, b.c)) return [a, b];                              // без поворотов
    for (const p of [{ r: a.r, c: b.c }, { r: b.r, c: a.c }])                       // один поворот
      if (empty(p.r, p.c) && clearLine(a.r, a.c, p.r, p.c) && clearLine(p.r, p.c, b.r, b.c)) return [a, p, b];
    let best = null, len = Infinity;                                               // два поворота
    for (let c = -1; c <= G.cols; c++) {
      if (!empty(a.r, c) || !empty(b.r, c)) continue;
      if (clearLine(a.r, a.c, a.r, c) && clearLine(a.r, c, b.r, c) && clearLine(b.r, c, b.r, b.c)) {
        const l = Math.abs(c - a.c) + Math.abs(c - b.c);
        if (l < len) { len = l; best = [a, { r: a.r, c }, { r: b.r, c }, b]; }
      }
    }
    for (let r = -1; r <= G.rows; r++) {
      if (!empty(r, a.c) || !empty(r, b.c)) continue;
      if (clearLine(a.r, a.c, r, a.c) && clearLine(r, a.c, r, b.c) && clearLine(r, b.c, b.r, b.c)) {
        const l = Math.abs(r - a.r) + Math.abs(r - b.r);
        if (l < len) { len = l; best = [a, { r, c: a.c }, { r, c: b.c }, b]; }
      }
    }
    return best;
  }

  // первая доступная пара на поле
  function findMove() {
    const by = {};
    for (let r = 0; r < G.rows; r++) for (let c = 0; c < G.cols; c++) { const v = G.grid[r][c]; if (v !== null) (by[v] = by[v] || []).push({ r, c }); }
    for (const k in by) { const a = by[k]; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) { const p = findPath(a[i], a[j]); if (p) return { a: a[i], b: a[j], path: p }; } }
    return null;
  }

  // Проверка проходимости: на копии поля убираем доступные пары, пока поле не опустеет.
  // Если получилось, расклад точно решаем.
  function solvable() {
    const real = G.grid; G.grid = real.map(r => r.slice());
    let ok;
    for (;;) { const m = findMove(); if (!m) { ok = !G.grid.some(r => r.some(v => v !== null)); break; } G.grid[m.a.r][m.a.c] = null; G.grid[m.b.r][m.b.c] = null; }
    G.grid = real; return ok;
  }

  function generate(kinds) {
    const pairs = G.cols * G.rows / 2;
    for (let t = 0; t < 400; t++) {
      const bag = [];
      for (let k = 0; k < pairs; k++) { const id = kinds[k % kinds.length]; bag.push(id, id); }
      shuffleArr(bag);
      G.grid = []; for (let r = 0; r < G.rows; r++) G.grid.push(bag.slice(r * G.cols, (r + 1) * G.cols));
      if (solvable()) return;
    }
  }

  // перемешивает оставшиеся плитки по их же местам; результат всегда имеет ход и остаётся решаемым
  function reshuffle() {
    const pos = [], vals = [];
    for (let r = 0; r < G.rows; r++) for (let c = 0; c < G.cols; c++) if (G.grid[r][c] !== null) { pos.push({ r, c }); vals.push(G.grid[r][c]); }
    const put = () => { shuffleArr(vals); pos.forEach((p, i) => { G.grid[p.r][p.c] = vals[i]; }); };
    let ok = false;
    for (let t = 0; t < 300 && !ok; t++) { put(); ok = !!findMove() && solvable(); }
    for (let t = 0; t < 500 && !ok; t++) { put(); ok = !!findMove(); }
    G.sel = null; clearHint(); renderBoard(true);
  }

  /* ---------------- отрисовка поля ---------------- */
  function renderBoard(pop) {
    let h = '';
    for (let r = 0; r < G.rows; r++) for (let c = 0; c < G.cols; c++) {
      const v = G.grid[r][c]; if (v === null) continue;
      h += `<button type="button" class="tile${pop ? ' pop' : ''}" style="--r:${r};--c:${c}" data-r="${r}" data-c="${c}" aria-label="${ICONS[v].n}"><span class="face">${icon(v)}</span></button>`;
    }
    tilesEl.innerHTML = h;
    linesEl.setAttribute('viewBox', `0 0 ${G.cols + .8} ${G.rows + .8}`);
    linesEl.innerHTML = '';
  }
  const tileEl = p => tilesEl.querySelector(`.tile[data-r="${p.r}"][data-c="${p.c}"]:not(.gone)`);

  function layout() {
    if (!G.cols || !$('#game').classList.contains('active')) return;
    const w = $('#boardWrap');
    const s = Math.max(24, Math.floor(Math.min(w.clientWidth / (G.cols + .8), w.clientHeight / (G.rows + .8), 96)));
    boardEl.style.setProperty('--s', s + 'px');
    boardEl.style.width = s * (G.cols + .8) + 'px';
    boardEl.style.height = s * (G.rows + .8) + 'px';
  }

  function drawLine(path) {
    const x = c => c < 0 ? .2 : c >= G.cols ? G.cols + .6 : c + .9;
    const y = r => r < 0 ? .2 : r >= G.rows ? G.rows + .6 : r + .9;
    const pl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    pl.setAttribute('points', path.map(p => x(p.c) + ',' + y(p.r)).join(' '));
    pl.setAttribute('pathLength', '1');
    linesEl.appendChild(pl);
    setTimeout(() => pl.remove(), 650);
  }

  function renderHud() {
    $('#gScore').textContent = G.score;
    $('#hintN').textContent = G.hints; $('#shufN').textContent = G.shuffles;
    $('#btnHint').disabled = G.hints <= 0; $('#btnShuffle').disabled = G.shuffles <= 0;
  }
  function renderTime() {
    const box = $('#timeBox');
    $('#gTime').textContent = save.calm ? fmt(G.elapsed) : fmt(Math.ceil(G.timeLeft));
    box.classList.toggle('low', !save.calm && G.timeLeft <= 20);
    box.classList.toggle('calm-on', save.calm);
  }
  function caption(kind) {
    const el = $('#caption');
    el.innerHTML = kind ? `<b>${ICONS[kind].n}</b> — ${ICONS[kind].d}` : LEVELS[G.level].theme;
  }

  /* ---------------- ход игры ---------------- */
  function startLevel(i) {
    const L = LEVELS[i];
    clearInterval(G.tick); clearHint();
    const portrait = window.innerWidth < window.innerHeight * .9;
    const big = Math.max(L.cols, L.rows), small = Math.min(L.cols, L.rows);
    Object.assign(G, {
      level: i, cols: portrait ? small : big, rows: portrait ? big : small,
      sel: null, score: 0, errors: 0, hints: HINTS, shuffles: SHUFFLES,
      timeLeft: L.time, elapsed: 0, paused: false, over: false, busy: false,
      combo: 0, lastMatch: 0, left: L.cols * L.rows
    });
    generate(L.kinds);
    $('#gLevel').textContent = `Уровень ${i + 1} / ${LEVELS.length}`;
    $('#gName').textContent = L.title;
    $('#gBar').style.width = (save.done.filter(Boolean).length / LEVELS.length * 100) + '%';
    document.body.classList.remove('paused');
    show('game'); renderBoard(true); layout(); renderHud(); renderTime(); caption(null);
    let last = performance.now();
    G.tick = setInterval(() => {
      const now = performance.now(), d = Math.min(1, (now - last) / 1000); last = now;
      if (G.paused || G.over) return;
      G.elapsed += d;
      if (!save.calm) { G.timeLeft -= d; if (G.timeLeft <= 0) { G.timeLeft = 0; renderTime(); return timeUp(); } }
      renderTime();
    }, 200);
  }

  const locked = () => G.paused || G.over || G.busy;

  function onTile(el) {
    if (locked() || el.classList.contains('gone')) return;
    Snd.init();
    const p = { r: +el.dataset.r, c: +el.dataset.c };
    if (!G.sel) { G.sel = p; el.classList.add('sel'); Snd.play('select'); return; }
    const a = G.sel, first = tileEl(a);
    if (a.r === p.r && a.c === p.c) { G.sel = null; el.classList.remove('sel'); return; }
    if (G.grid[a.r][a.c] === G.grid[p.r][p.c]) {
      const path = findPath(a, p);
      if (path) return match(a, p, path, first, el);
    }
    // неверная пара: мягкое покачивание, очки не снимаются
    G.errors++; G.combo = 0; G.sel = null; Snd.play('error');
    [first, el].forEach(t => { if (!t) return; t.classList.remove('sel'); t.classList.add('wrong'); setTimeout(() => t.classList.remove('wrong'), 400); });
  }

  function match(a, b, path, ea, eb) {
    const kind = G.grid[a.r][a.c];
    G.grid[a.r][a.c] = null; G.grid[b.r][b.c] = null; G.sel = null; G.left -= 2; clearHint();
    [ea, eb].forEach(e => { e.classList.remove('sel'); e.classList.add('gone'); e.disabled = true; setTimeout(() => e.remove(), 540); });
    drawLine(path);
    const now = performance.now();
    G.combo = now - G.lastMatch < 4000 ? Math.min(G.combo + 1, 5) : 0; G.lastMatch = now;
    G.score += MATCH_PTS + G.combo * 20;
    if (!save.calm) G.timeLeft = Math.min(LEVELS[G.level].time, G.timeLeft + TIME_PER_MATCH);
    Snd.play('match'); caption(kind); renderHud(); renderTime();
    if (G.left === 0) { G.over = true; clearInterval(G.tick); setTimeout(win, 750); }
    else if (!findMove()) { G.busy = true; toast('Ходов не осталось. Перемешиваем плитки'); setTimeout(() => { reshuffle(); Snd.play('shuffle'); G.busy = false; }, 900); }
  }

  function clearHint() { clearTimeout(G.hintT); tilesEl.querySelectorAll('.hint').forEach(e => e.classList.remove('hint')); }
  function useHint() {
    if (locked() || G.hints <= 0) return;
    const m = findMove(); if (!m) return;
    G.hints--; clearHint();
    [tileEl(m.a), tileEl(m.b)].forEach(e => e && e.classList.add('hint'));
    G.hintT = setTimeout(clearHint, 2700);
    Snd.play('hint'); renderHud();
  }
  function useShuffle() {
    if (locked() || G.shuffles <= 0) return;
    G.shuffles--; reshuffle(); Snd.play('shuffle'); renderHud();
  }

  function setPaused(v) {
    if (G.over || !$('#game').classList.contains('active')) return;
    G.paused = v; document.body.classList.toggle('paused', v); $('#pause').hidden = !v;
  }
  function timeUp() { G.over = true; clearInterval(G.tick); Snd.play('error'); $('#timeout').hidden = false; }

  function win() {
    const i = G.level;
    const timeBonus = save.calm ? 0 : Math.round(G.timeLeft) * 5;
    const cleanBonus = G.errors === 0 ? 300 : 0;
    const hintBonus = G.hints * 50;
    const total = G.score + timeBonus + cleanBonus + hintBonus;
    save.done[i] = true; save.best[i] = Math.max(save.best[i] || 0, total); persist();
    Snd.play('win');
    showArticle(i, { total, time: G.elapsed, errors: G.errors, timeBonus, cleanBonus, hintBonus });
  }

  /* ---------------- экраны ---------------- */
  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
    document.body.dataset.screen = id;
    ['howto', 'pause', 'timeout'].forEach(m => { $('#' + m).hidden = true; });
    window.scrollTo(0, 0);
    if (id === 'home') renderHome();
    if (id === 'culture') renderCulture();
    if (id !== 'game') { clearInterval(G.tick); document.body.classList.remove('paused'); }
  }

  const nextLevel = () => { const i = save.done.indexOf(false); return i < 0 ? 0 : i; };

  function renderHome() {
    const n = save.done.filter(Boolean).length, nx = save.done.indexOf(false);
    $('#progText').textContent = `Пройдено ${n} из ${LEVELS.length}`;
    $('#progBar').style.width = (n / LEVELS.length * 100) + '%';
    $('#btnStart').textContent = n === 0 ? 'Начать игру' : n === LEVELS.length ? 'Играть снова' : `Продолжить: уровень ${nx + 1}`;
    $('#calm').checked = save.calm;
    $('#levelList').innerHTML = LEVELS.map((L, i) => {
      const done = save.done[i], open = done || i === nx;
      const cls = done ? 'done' : open ? 'next' : 'lock';
      return `<li class="${cls}"><button type="button" data-level="${i}" ${open ? '' : 'disabled'}>
        <span class="mark">${done ? '✓' : open ? i + 1 : '🔒'}</span>
        <span class="nm"><b>Уровень ${i + 1}. ${L.title}</b><small>${done ? 'Пройден' : open ? 'Открыт' : 'Откроется после уровня ' + i} · ${fmt(L.time)}</small></span>
        <span class="pts">${done ? save.best[i] + ' очк.' : ''}</span></button></li>`;
    }).join('');
  }

  function renderCulture() {
    $('#cultureList').innerHTML = LEVELS.map((L, i) => {
      const open = save.done[i], a = L.article, name = a.subtitle || a.title;
      return `<button type="button" data-read="${i}" ${open ? '' : 'disabled'}><span class="th">${open ? icon(L.kinds[i === 0 ? 4 : 0]) : '🔒'}</span>
        <span><b>${open ? name : 'Страница ' + (i + 1)}</b><small>${open ? L.theme : 'Откроется после уровня ' + (i + 1)}</small></span></button>`;
    }).join('');
  }

  // stats передаётся после победы; без него статья открывается для чтения из раздела «О культуре»
  function showArticle(i, stats) {
    const L = LEVELS[i], a = L.article, last = i === LEVELS.length - 1;
    const sum = save.best.reduce((x, y) => x + (y || 0), 0);
    let h = `<p class="eyebrow">${stats ? `Уровень ${i + 1} пройден · ` : ''}${a.kicker}</p><h2>${a.title}</h2>`;
    if (stats) {
      const parts = [];
      if (stats.timeBonus) parts.push(`за время +${stats.timeBonus}`);
      if (stats.cleanBonus) parts.push(`без ошибок +${stats.cleanBonus}`);
      if (stats.hintBonus) parts.push(`за сбережённые подсказки +${stats.hintBonus}`);
      h += `<div class="stats"><div><small>Очки</small><b>${stats.total}</b></div><div><small>Время</small><b>${fmt(stats.time)}</b></div><div><small>Ошибки</small><b>${stats.errors}</b></div></div>`;
      if (parts.length) h += `<p class="bonus">Бонусы: ${parts.join(', ')}.${last ? ` Всего за пять уровней: ${sum} очков.` : ''}</p>`;
      else if (last) h += `<p class="bonus">Всего за пять уровней: ${sum} очков.</p>`;
    }
    h += `<div class="art-img">${SCENES[L.scene]()}</div>`;
    if (a.subtitle) h += `<h3 class="subtitle">${a.subtitle}</h3>`;
    h += `<p class="lead">${a.lead}</p><div class="text">${a.body.map(p => `<p>${p}</p>`).join('')}</div>`;
    h += `<div class="facts"><h3>Интересные факты</h3><ul>${a.facts.map(f => `<li>${f}</li>`).join('')}</ul></div><div class="row">`;
    if (!stats) h += `<button class="btn primary" type="button" data-go="culture">Назад</button>`;
    else if (last) h += `<button class="btn primary" type="button" data-go="home">На главную</button><button class="btn" type="button" data-go="culture">Перечитать статьи</button>`;
    else h += `<button class="btn primary" type="button" data-level="${i + 1}">Продолжить</button>`;
    h += `</div>`;
    if (stats) h += `<div class="burst">${Array.from({ length: last ? 36 : 18 }, () => `<i style="left:${(Math.random() * 100).toFixed(1)}%;animation-delay:${(Math.random() * .9).toFixed(2)}s"></i>`).join('')}</div>`;
    $('#articleBox').innerHTML = h;
    show('article');
    if (stats) setTimeout(() => { const b = $('.burst'); if (b) b.remove(); }, 4000);
  }

  let howThen = null;
  function openHow(then) {
    howThen = then || null;
    $('#howOk').textContent = then ? 'Начать' : 'Понятно';
    $('#howto').hidden = false;
  }
  function play(i) {
    if (!save.seenHow) { save.seenHow = true; persist(); return openHow(() => startLevel(i)); }
    startLevel(i);
  }

  let toastT;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200); }

  /* ---------------- события ---------------- */
  document.addEventListener('click', e => {
    const tile = e.target.closest('#tiles .tile');
    if (tile) return onTile(tile);
    const b = e.target.closest('button'); if (!b) return;
    Snd.init(); if (b.id !== 'soundBtn') Snd.play('click');
    if (b.dataset.level !== undefined) return play(+b.dataset.level);
    if (b.dataset.read !== undefined) return showArticle(+b.dataset.read, null);
    if (b.dataset.go) return show(b.dataset.go);
    switch (b.id) {
      case 'soundBtn': Snd.toggle(); break;
      case 'btnStart': play(nextLevel()); break;
      case 'btnHow': openHow(); break;
      case 'btnCulture': show('culture'); break;
      case 'howOk': { $('#howto').hidden = true; const f = howThen; howThen = null; if (f) f(); break; }
      case 'btnHint': useHint(); break;
      case 'btnShuffle': useShuffle(); break;
      case 'btnPause': setPaused(true); break;
      case 'pResume': setPaused(false); break;
      case 'pRestart': case 'tRetry': startLevel(G.level); break;
      case 'tCalm': save.calm = true; persist(); startLevel(G.level); break;
      case 'pHome': case 'tHome': show('home'); break;
    }
  });
  $('#calm').addEventListener('change', e => { save.calm = e.target.checked; persist(); });
  window.addEventListener('resize', layout);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { setPaused(true); if (Snd.ctx) Snd.ctx.suspend(); }
    else if (Snd.ctx) Snd.ctx.resume();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#game').classList.contains('active')) setPaused(!G.paused); });

  // параллакс на главном экране
  const hero = $('#heroArt'); hero.innerHTML = SCENES.hero();
  const layers = [...hero.querySelectorAll('.plx')];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) window.addEventListener('pointermove', e => {
    if (!$('#home').classList.contains('active')) return;
    const dx = e.clientX / window.innerWidth - .5, dy = e.clientY / window.innerHeight - .5;
    layers.forEach(l => { const d = +l.dataset.d; l.style.transform = `translate(${(-dx * d).toFixed(1)}px, ${(-dy * d * .5).toFixed(1)}px)`; });
  });

  // мини-пример в инструкции
  $('#demoTiles').innerHTML = [['dombra', 0, 0, 'a'], ['yurt', 0, 1, ''], ['asyk', 0, 2, ''], ['dombra', 1, 2, 'b']]
    .map(([k, r, c, cls]) => `<span class="tile ${cls}" style="--r:${r};--c:${c}"><span class="face">${icon(k)}</span></span>`).join('');

  renderSound();
  document.body.dataset.screen = 'home';
  renderHome();
  window.__ulyDala = { G, findMove, findPath, solvable }; // для отладки и автотестов
})();
