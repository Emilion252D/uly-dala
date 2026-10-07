/* Большие иллюстрации: собираются из общих элементов (небо, горы, холмы, юрта, конь, люди).
   Все сцены в координатах 800×450. */
(() => {
  const N = '#17355e', T = '#1a9aa0', S = '#e3c896', G = '#d9a441', B = '#4a2f1d',
        C = '#fbf3e1', E = '#5d8a4e', R = '#b5432e', W = '#a8672f', SK = '#e8c39e';

  const wrap = (inner, hero) => `<svg class="scene" viewBox="0 0 800 450" preserveAspectRatio="${hero ? 'xMidYMax slice' : 'xMidYMid meet'}" role="img">${inner}</svg>`;
  const sky = (id, stops) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient></defs><rect x="-40" y="-40" width="880" height="530" fill="url(#${id})"/>`;
  const sun = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r * 2.6}" fill="${c}" opacity=".14"/><circle cx="${x}" cy="${y}" r="${r * 1.7}" fill="${c}" opacity=".22"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
  const mts = (y, fill, snow, k = 1) => {
    const pk = [[-40, 20], [60, 60], [120, 20], [200, 110], [270, 40], [340, 90], [430, 30], [520, 120], [600, 50], [680, 95], [760, 35], [840, 70]];
    let s = `<path d="M${pk.map(([x, h]) => `${x} ${y - h * k}`).join('L')}V490H-40Z" fill="${fill}"/>`;
    if (snow) for (const i of [3, 5, 7, 9]) {
      const px = pk[i][0], py = y - pk[i][1] * k, d = 17 * k;
      s += `<path d="M${px - d} ${py + d * 1.1}L${px} ${py}L${px + d} ${py + d}L${px + d * .4} ${py + d * .7}L${px} ${py + d * 1.2}L${px - d * .4} ${py + d * .7}Z" fill="${snow}"/>`;
    }
    return s;
  };
  const hill = (y, a, fill, ph = 0) => `<path d="M-40 ${y}Q${180 + ph} ${y - a} ${400 + ph} ${y}T840 ${y}V490H-40Z" fill="${fill}"/>`;
  const horn = (x, y, s, c, w = 3) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 14V2M0 2C0-8-14-9-14-1c0 6 8 6 8 1M0 2c0-10 14-11 14-3c0 6-8 6-8 1" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/></g>`;
  const border = (y, c) => { let s = ''; for (let x = 20; x < 800; x += 40) s += horn(x, y, .7, c, 3); return s; };

  // юрта: точка (x, y) — середина основания
  const yurt = (x, y, s, o = {}) => {
    const wall = o.wall || '#efe0bf', dome = o.dome || C, band = o.band || R, door = o.door || T, line = o.line || B;
    return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="66" ry="7" fill="#000" opacity=".16"/>
      <path d="M-56 -38Q-42 -80 0 -86Q42 -80 56 -38Z" fill="${dome}" stroke="${line}" stroke-width="1.5"/>
      <path d="M-30 -70L-18 -38M30 -70L18 -38M-46 -52H46" stroke="${W}" stroke-width="1.6" fill="none"/>
      <rect x="-56" y="-38" width="112" height="38" fill="${wall}" stroke="${line}" stroke-width="1.5"/>
      <rect x="-55" y="-37" width="110" height="9" fill="${band}"/><path d="M-52 -32.500H52" stroke="${dome}" stroke-width="2" stroke-dasharray="5 5"/>
      <rect x="-13" y="-34" width="26" height="34" fill="${door}" stroke="${o.frame || G}" stroke-width="2.5"/>
      <rect x="-10" y="-93" width="20" height="8" rx="2" fill="${line}"/></g>`;
  };
  const horse = (x, y, s, c, mane, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s}) translate(-32 -55)"><path d="M16 32Q8 34 9 48" fill="none" stroke="${mane}" stroke-width="3.5" stroke-linecap="round"/><g stroke="${c}" stroke-width="3.6" stroke-linecap="round"><path d="M20 38L17 54M25 40L26 54M37 40L36 54M42 37L46 53"/></g><ellipse cx="30" cy="34" rx="14" ry="8" fill="${c}"/><path d="M38 30L46 16L53 21L44 37Z" fill="${c}"/><path d="M45 15L57 20L56 25L48 24Z" fill="${c}"/><path d="M46 15l1-5 3 5z" fill="${c}"/><path d="M40 27L46 14" fill="none" stroke="${mane}" stroke-width="3" stroke-linecap="round"/></g>`;
  const smoke = (x, y, c = '#fff') => `<path d="M${x} ${y}q-10 -18 2 -32t-4 -34" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity=".45"/>`;
  const grass = (pts, c) => `<g stroke="${c}" stroke-width="2" stroke-linecap="round" fill="none">${pts.map(([x, y]) => `<path d="M${x} ${y}l-3 -9M${x + 3} ${y}l0 -11M${x + 6} ${y}l3 -8"/>`).join('')}</g>`;
  const birds = (pts, c) => `<g stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round">${pts.map(([x, y]) => `<path d="M${x - 8} ${y}q4 -5 8 0q4 -5 8 0"/>`).join('')}</g>`;

  // сидящий музыкант с домброй; точка (x, y) — земля под ним
  const player = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-36 0Q-32 -19 -8 -21H14Q36 -17 38 0Z" fill="${c.legs}"/>
    <path d="M-17 -20Q-21 -53 -5 -63H9Q21 -51 19 -20Z" fill="${c.robe}"/>
    <path d="M2 -62V-21" stroke="${c.trim}" stroke-width="2.5"/>
    <circle cx="2" cy="-73" r="9.5" fill="${c.skin}"/>
    <path d="M-9 -77Q2 -99 13 -77Z" fill="${c.hat}"/><rect x="-11" y="-80" width="26" height="5.500" rx="2.500" fill="${c.fur}"/>
    <path d="M-12 -31L44 -68" stroke="${c.wood2}" stroke-width="3.200" stroke-linecap="round"/>
    <ellipse cx="-15" cy="-29" rx="12" ry="8.500" transform="rotate(-33 -15 -29)" fill="${c.wood}"/>
    <path d="M12 -53Q22 -50 25 -56" fill="none" stroke="${c.robe}" stroke-width="7" stroke-linecap="round"/>
    <path d="M-10 -50Q-16 -40 -11 -32" fill="none" stroke="${c.robe}" stroke-width="7" stroke-linecap="round"/></g>`;

  // женщина в саукеле и камзоле
  const woman = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-11 -131Q-36 -100 -31 -28H-22Q-25 -96 -7 -124ZM11 -131Q36 -100 31 -28H22Q25 -96 7 -124Z" fill="#fff" opacity=".8"/>
    <path d="M-40 0Q-31 -70 -14 -111H14Q31 -70 40 0Z" fill="${R}"/>
    <path d="M-38 -9Q0 -2 38 -9" fill="none" stroke="${G}" stroke-width="4"/><path d="M-36 -18Q0 -11 36 -18" fill="none" stroke="${C}" stroke-width="1.500" stroke-dasharray="4 4"/>
    <path d="M-14 -108Q-31 -90 -25 -62M14 -108Q31 -90 25 -62" fill="none" stroke="${R}" stroke-width="10" stroke-linecap="round"/>
    <circle cx="-25" cy="-58" r="4.500" fill="${SK}"/><circle cx="25" cy="-58" r="4.500" fill="${SK}"/>
    <path d="M-16 -111L-21 -58L-4 -54L0 -98L4 -54L21 -58L16 -111Z" fill="${N}" stroke="${G}" stroke-width="1.800" stroke-linejoin="round"/>
    <path d="M-8 -117L-14 -68M8 -117L14 -68" stroke="#2b1a10" stroke-width="3.500" stroke-linecap="round"/>
    <rect x="-4" y="-116" width="8" height="8" fill="${SK}"/><circle cx="0" cy="-124" r="11" fill="${SK}"/>
    <path d="M-8 -108Q0 -98 8 -108" fill="none" stroke="${G}" stroke-width="2"/><circle cx="0" cy="-102" r="3" fill="${T}"/>
    <path d="M-12 -129L0 -178L12 -129Z" fill="${R}" stroke="${G}" stroke-width="1.800" stroke-linejoin="round"/>
    <path d="M-6 -152H6M-9 -140H9" stroke="${G}" stroke-width="2.500"/><rect x="-13" y="-133" width="26" height="5" rx="2" fill="${G}"/>
    <path d="M0 -178l-4 -9M0 -178v-11M0 -178l4 -9" stroke="${C}" stroke-width="1.800" stroke-linecap="round"/></g>`;
  // мужчина в шапане и борике
  const man = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-19" y="-10" width="15" height="12" rx="3" fill="${B}"/><rect x="4" y="-10" width="15" height="12" rx="3" fill="${B}"/>
    <path d="M-28 -6L-23 -72Q-23 -108 -10 -112H10Q23 -108 23 -72L28 -6Z" fill="${T}"/>
    <path d="M-8 -112L0 -92L8 -112M0 -92V-6" fill="none" stroke="${G}" stroke-width="2.500"/><path d="M-27 -12H27" stroke="${G}" stroke-width="3"/>
    <rect x="-24" y="-70" width="48" height="7" fill="${B}"/><rect x="-5" y="-72" width="10" height="11" rx="2" fill="${G}"/>
    <path d="M-20 -106Q-36 -86 -31 -58M20 -106Q36 -86 31 -58" fill="none" stroke="${T}" stroke-width="11" stroke-linecap="round"/>
    <circle cx="-31" cy="-53" r="4.500" fill="${SK}"/><circle cx="31" cy="-53" r="4.500" fill="${SK}"/>
    <rect x="-4" y="-118" width="8" height="8" fill="${SK}"/><circle cx="0" cy="-126" r="11" fill="${SK}"/>
    <path d="M-12 -132Q0 -156 12 -132Z" fill="${R}"/><rect x="-14" y="-136" width="28" height="8" rx="4" fill="${B}"/></g>`;

  const hero = () => wrap(
    `<g class="plx" data-d="3">${sky('g-hero', [[0, '#12305a'], [.45, '#2c7890'], [.72, '#f0c987'], [1, '#f8e3b6']])}${sun(560, 250, 34, '#fbe6a8')}</g>` +
    `<g class="plx" data-d="8">${mts(318, '#3d6d92', '#e8f1f2', .95)}</g>` +
    `<g class="plx" data-d="14">${hill(330, 34, '#6f9a66', -40)}${hill(366, 26, '#5d8a4e', 120)}</g>` +
    `<g class="plx" data-d="24">${hill(404, 22, '#c9b071', 30)}${yurt(255, 396, 1.15)}${yurt(410, 372, .6)}${horse(560, 402, 1.1, W, B)}${horse(640, 392, .8, B, '#2b1a10', true)}${smoke(256, 286)}${grass([[90, 430], [470, 425], [700, 432]], '#5d8a4e')}</g>`, true);

  const l1 = () => wrap(
    sky('g-l1', [[0, '#7cc6cf'], [.7, '#d9eedd'], [1, C]]) + sun(640, 96, 30, '#f6d98a') + birds([[180, 90], [230, 70], [470, 110]], N) +
    mts(300, '#5f86a8', '#f4f8f8') + hill(322, 30, '#86aa66', -60) + hill(360, 24, E, 100) + hill(400, 20, '#cdb577', 0) +
    yurt(400, 396, 1.75) + yurt(660, 352, .55) + horse(170, 404, 1.2, W, B) + smoke(400, 228) +
    grass([[60, 430], [270, 432], [560, 428], [730, 436]], E));

  const l2 = () => wrap(
    sky('g-l2', [[0, '#16305a'], [.5, '#8f5a78'], [.8, '#e39a62'], [1, '#f4cc84']]) + sun(250, 286, 40, '#fbd98a') +
    mts(318, '#3a3f6b', null, .8) + hill(338, 26, '#3f5a4a', -30) + hill(384, 20, '#31483c', 90) +
    yurt(150, 392, 1.35, { wall: '#d9c39a', dome: '#efe0bf' }) +
    `<path d="M330 430L380 398H640L690 430Z" fill="${R}"/><path d="M352 424L390 404H630L668 424Z" fill="none" stroke="${G}" stroke-width="3" stroke-dasharray="10 6"/>` +
    player(505, 412, 2.25, { legs: N, robe: T, trim: G, skin: SK, hat: R, fur: B, wood: W, wood2: B }) +
    `<g transform="translate(700 400)"><path d="M-14 0L14 0" stroke="${B}" stroke-width="5" stroke-linecap="round"/><path d="M0 0c-16 -14 -6 -26 0 -38c6 12 16 24 0 38z" fill="${R}"/><path d="M0 0c-7 -7 -3 -13 0 -19c3 6 7 12 0 19z" fill="#fbd98a"/></g>` +
    `<g fill="#fff" opacity=".8"><circle cx="80" cy="50" r="1.500"/><circle cx="420" cy="36" r="1.500"/><circle cx="610" cy="70" r="1.800"/><circle cx="730" cy="34" r="1.300"/><circle cx="300" cy="80" r="1.200"/></g>`);

  const l3 = () => wrap(
    sky('g-l3', [[0, '#86cdd3'], [.75, '#e6f1dc'], [1, C]]) + sun(130, 100, 28, '#f6d98a') +
    mts(292, '#6a8fae', '#f4f8f8', .85) + hill(318, 28, '#8fb06c', 60) + hill(360, 22, E, -80) + hill(404, 18, '#cdb577', 40) +
    yurt(660, 362, .8) + horse(110, 372, .75, B, '#2b1a10') +
    woman(340, 428, 1.45) + man(480, 428, 1.5) + grass([[60, 436], [600, 434], [740, 438]], E));

  const l4 = () => wrap(
    sky('g-l4', [[0, '#5fb3c4'], [.6, '#cfe8d8'], [1, '#f6ecd0']]) + sun(690, 110, 30, '#f8dc92') + birds([[120, 80], [160, 100]], N) +
    mts(286, '#6388a8', '#f4f8f8', .8) + hill(312, 26, '#8fb06c', -20) + hill(352, 22, E, 110) + hill(398, 18, '#cdb577', -30) +
    yurt(120, 344, .62) + smoke(120, 286) + yurt(300, 362, .85) + yurt(520, 392, 1.3) + smoke(520, 270) + yurt(710, 350, .6) +
    horse(390, 412, 1, W, B) + horse(250, 420, .85, B, '#2b1a10', true) + horse(690, 418, 1.05, '#6b4a2e', '#2b1a10', true) +
    `<g transform="translate(160 420)"><path d="M-16 -4L-8 -40M16 -4L8 -40" stroke="${B}" stroke-width="3"/><path d="M-20 -40H20C20 -22 10 -14 0 -14C-10 -14 -20 -22 -20 -40Z" fill="#2f2a27"/><path d="M0 -2c-6 -5 -2 -9 0 -13c2 4 6 8 0 13z" fill="${R}"/></g>` +
    woman(86, 430, .42) + man(620, 428, .44) + grass([[440, 438], [760, 436], [30, 440]], E));

  const fin = () => wrap(
    sky('g-fin', [[0, '#14244f'], [.4, '#6b3f73'], [.68, '#e0744e'], [.86, '#f6b765'], [1, '#fbdc93']]) +
    `<g fill="#fff" opacity=".85"><circle cx="70" cy="40" r="1.500"/><circle cx="190" cy="76" r="1.200"/><circle cx="330" cy="30" r="1.600"/><circle cx="640" cy="52" r="1.400"/><circle cx="745" cy="96" r="1.200"/><circle cx="520" cy="24" r="1.200"/></g>` +
    sun(400, 292, 58, '#fde7a4') + mts(322, '#4a3566', '#f0b98f', 1) + hill(336, 28, '#2a2f5a', -50) + hill(372, 24, '#1d2648', 130) +
    yurt(190, 378, 1.1, { wall: '#141c38', dome: '#1a2344', band: '#2a3566', door: '#f6b765', line: '#0e1530', frame: '#f6b765' }) +
    horse(660, 376, 1.1, '#141c38', '#0e1530', true) +
    `<path d="M-40 404Q400 372 840 404V490H-40Z" fill="#101833"/>` +
    player(420, 388, 1.9, { legs: '#0c1228', robe: '#0c1228', trim: '#0c1228', skin: '#0c1228', hat: '#0c1228', fur: '#0c1228', wood: '#0c1228', wood2: '#0c1228' }) +
    border(424, G));

  window.SCENES = { hero, l1, l2, l3, l4, fin };
})();
