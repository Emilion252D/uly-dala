/* Плитки игры: векторные иконки в едином стиле (viewBox 0 0 64 64).
   n — название, d — короткое пояснение, s — содержимое SVG. */
(() => {
  const N = '#17355e', T = '#1a9aa0', S = '#e3c896', G = '#d9a441', B = '#4a2f1d',
        C = '#fbf3e1', E = '#5d8a4e', R = '#b5432e', W = '#a8672f', V = '#b9c2cb', D = '#8a3b22';
  const st = `stroke="${B}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
  const ln = (c, w = 2) => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
  // мотив «қошқармүйіз» (бараньи рога): занимает x −14…14, y −8…14
  const horn = (x, y, s, c, w = 3) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 14V2M0 2C0-8-14-9-14-1c0 6 8 6 8 1M0 2c0-10 14-11 14-3c0 6-8 6-8 1" ${ln(c, w)}/></g>`;
  const horse = (c, mane) => `<path d="M16 32Q8 34 9 48" ${ln(mane, 3.5)}/><g stroke="${c}" stroke-width="3.6" stroke-linecap="round"><path d="M20 38L17 54M25 40L26 54M37 40L36 54M42 37L46 53"/></g><ellipse cx="30" cy="34" rx="14" ry="8" fill="${c}"/><path d="M38 30L46 16L53 21L44 37Z" fill="${c}"/><path d="M45 15L57 20L56 25L48 24Z" fill="${c}"/><path d="M46 15l1-5 3 5z" fill="${c}"/><path d="M40 27L46 14" ${ln(mane, 3)}/>`;
  const dombra = `<g transform="rotate(38 32 32)"><rect x="30.5" y="7" width="3" height="30" fill="${B}"/><rect x="29" y="3" width="6" height="6" rx="1.5" fill="${B}"/><path d="M27 5h-3M37 7h3" ${ln(G, 2)}/><path d="M32 33C19 33 19 59 32 59C45 59 45 33 32 33Z" fill="${W}" ${st}/><circle cx="32" cy="46" r="2.2" fill="${B}"/><path d="M31 8V54M33 8V54" stroke="${C}" stroke-width=".8"/><rect x="29" y="53" width="6" height="1.6" fill="${B}"/></g>`;
  const yurt = `<path d="M8 36Q14 15 32 13Q50 15 56 36Z" fill="${C}" ${st}/><path d="M20 21L25 36M44 21L39 36" stroke="${W}" stroke-width="1.5"/><rect x="8" y="36" width="48" height="18" fill="${S}" ${st}/><rect x="9" y="37" width="46" height="5" fill="${R}"/><path d="M11 39.5h42" stroke="${C}" stroke-width="1.5" stroke-dasharray="3 3"/><rect x="26" y="41" width="12" height="13" fill="${T}" ${st}/><rect x="27" y="9" width="10" height="5" rx="1.5" fill="${B}"/>`;
  const asyk = `<path d="M20 22C13 22 11 30 17 34C11 40 16 49 24 46C30 51 38 50 42 45C50 47 53 38 47 33C53 28 48 19 40 22C34 16 26 17 20 22Z" fill="${C}" ${st}/><path d="M24 28C28 32 36 32 40 28M24 40C28 37 36 37 40 40" ${ln(S, 2.5)}/><circle cx="32" cy="34" r="2" fill="${R}"/>`;
  const burkit = `<path d="M22 50C14 40 16 24 28 18C36 14 44 20 43 30C42 42 34 50 22 50Z" fill="${B}"/><path d="M26 46C22 38 26 28 36 26" ${ln(W, 2.5)}/><circle cx="36" cy="18" r="8" fill="${W}"/><path d="M42 15L52 19L43 22Z" fill="${G}"/><circle cx="38" cy="16" r="1.5" fill="${B}"/><path d="M24 50v6M30 49v7" ${ln(G, 2.5)}/><path d="M16 56h24" ${ln(B, 3)}/>`;
  const sandyq = `<rect x="10" y="26" width="44" height="24" rx="2" fill="${D}" ${st}/><rect x="8" y="17" width="48" height="10" rx="3" fill="${B}"/><path d="M19 17v33M45 17v33" stroke="${G}" stroke-width="3"/><circle cx="32" cy="29" r="3.5" fill="${G}" ${st}/><path d="M32 36l5 5-5 5-5-5z" fill="${G}"/><path d="M13 50v5M51 50v5" ${ln(B, 3)}/>`;
  const kamcha = `<path d="M33 27Q50 8 53 26Q54 40 43 47" ${ln(W, 3)}/><path d="M13 51L34 26" ${ln(B, 6)}/><path d="M19 44l4 3M27 35l4 3" stroke="${G}" stroke-width="3"/><circle cx="11" cy="54" r="4" ${ln(R, 2.5)}/>`;
  const bilezik = `<ellipse cx="32" cy="34" rx="21" ry="15" ${ln(V, 8)}/><ellipse cx="32" cy="34" rx="21" ry="15" ${ln('#7d8792', 1)} transform="translate(0 0)"/><ellipse cx="32" cy="20" rx="7" ry="5" fill="${R}" stroke="${V}" stroke-width="2.5"/><circle cx="18" cy="23" r="1.6" fill="${T}"/><circle cx="46" cy="23" r="1.6" fill="${T}"/>`;
  const alka = `<path d="M10 10Q32 34 54 10" ${ln(V, 2.5)}/><path d="M20 26H44L32 44Z" fill="${V}" stroke="#7d8792" stroke-width="1.5" stroke-linejoin="round"/><circle cx="32" cy="32" r="4" fill="${R}"/><path d="M24 40v10M32 46v10M40 40v10" ${ln(V, 2)}/><circle cx="24" cy="52" r="2.2" fill="${T}"/><circle cx="32" cy="58" r="2.2" fill="${T}"/><circle cx="40" cy="52" r="2.2" fill="${T}"/>`;
  const shapan = `<path d="M24 9H40L58 26L52 35L44 29L46 57H18L20 29L12 35L6 26Z" fill="${T}" ${st}/><path d="M26 9L32 22L38 9M32 22V57" ${ln(G, 2.5)}/><path d="M19 36H45" stroke="${B}" stroke-width="3.5"/><rect x="29" y="33.5" width="6" height="5" rx="1" fill="${G}"/><path d="M9 28l5 5M55 28l-5 5" stroke="${G}" stroke-width="2"/>`;
  const saukele = `<path d="M20 46Q10 52 13 61M44 46Q54 52 51 61" ${ln(S, 4)}/><path d="M32 6L45 46H19Z" fill="${R}" ${st}/><path d="M26 28h12M22 38h20" stroke="${G}" stroke-width="3"/><circle cx="32" cy="20" r="2.2" fill="${G}"/><path d="M32 6L28 0M32 6L36 0M32 6V-1" ${ln(W, 1.8)} transform="translate(0 2)"/><rect x="17" y="44" width="30" height="6" rx="2" fill="${G}" ${st}/><path d="M22 50v5M32 50v6M42 50v5" ${ln(T, 2)}/>`;
  const kobyz = `<rect x="30.5" y="8" width="3" height="26" fill="${B}"/><path d="M32 4c-5 0-5 7 0 7" ${ln(B, 2.5)}/><path d="M27 12h-3M37 15h3" ${ln(G, 2)}/><path d="M32 28C18 28 17 44 25 49L32 58L39 49C47 44 46 28 32 28Z" fill="${D}" ${st}/><path d="M24 36c3 4 13 4 16 0" ${ln(B, 2)}/><ellipse cx="32" cy="48" rx="5" ry="4" fill="${C}"/><path d="M31 10V50M33 10V50" stroke="${C}" stroke-width=".8"/><path d="M8 42Q32 30 56 40" ${ln(W, 2)}/><path d="M8 42L56 40" stroke="${S}" stroke-width="1.2"/>`;

  window.ICONS = {
    yurt: { n: 'Киіз үй (юрта)', d: 'переносное войлочное жилище кочевников', s: yurt },
    dombra: { n: 'Домбыра (домбра)', d: 'двухструнный щипковый инструмент', s: dombra },
    koshkar: { n: 'Қошқармүйіз', d: 'орнамент «бараньи рога», пожелание достатка',
      s: `<circle cx="32" cy="32" r="25" fill="${N}"/>${horn(32, 31, 1.25, G, 3)}<path d="M32 50l3 3-3 3-3-3z" fill="${T}"/>` },
    kamcha: { n: 'Қамшы (камча)', d: 'плеть всадника, знак мужского достоинства', s: kamcha },
    shanyrak: { n: 'Шаңырақ (шанырак)', d: 'навершие купола юрты, символ семьи',
      s: `<circle cx="32" cy="32" r="22" fill="#bfe3e2"/><g ${ln(B, 2)}><path d="M12 28Q32 22 52 28M12 32H52M12 36Q32 42 52 36M28 12Q22 32 28 52M32 12V52M36 12Q42 32 36 52"/></g><circle cx="32" cy="32" r="22" ${ln(G, 6)}/><circle cx="32" cy="32" r="25" ${ln(B, 1.2)}/>` },
    sandyq: { n: 'Сандық (сундук)', d: 'сундук для одежды и семейных ценностей', s: sandyq },
    asyk: { n: 'Асық (асык)', d: 'косточка для старинной игры на меткость', s: asyk },
    tulpar: { n: 'Тұлпар (тулпар)', d: 'крылатый конь из казахских преданий',
      s: `${horse(N, G)}<path d="M27 31Q20 10 40 5Q35 16 38 29Z" fill="${G}" ${st}/><path d="M30 26Q28 16 35 11" ${ln(C, 1.5)}/>` },
    oyu: { n: 'Ою-өрнек', d: 'геометрический узор для войлока и ткани',
      s: `<rect x="8" y="8" width="48" height="48" rx="6" fill="${R}"/><path d="M32 12L52 32L32 52L12 32Z" fill="${C}"/><path d="M32 20L44 32L32 44L20 32Z" fill="${T}"/><path d="M32 27l5 5-5 5-5-5z" fill="${G}"/><path d="M12 12h7l-7 7zM52 12h-7l7 7zM12 52h7l-7-7zM52 52h-7l7-7z" fill="${G}"/>` },
    torsyk: { n: 'Торсық (торсык)', d: 'кожаный сосуд для кумыса в дороге',
      s: `<path d="M25 15H39V23C53 28 55 51 32 53C9 51 11 28 25 23Z" fill="${W}" ${st}/><rect x="27" y="8" width="10" height="8" rx="2" fill="${B}"/>${horn(32, 36, .6, G, 3.5)}<path d="M25 23H39" ${ln(B, 2)}/>` },

    kobyz: { n: 'Қобыз (кобыз)', d: 'смычковый инструмент со струнами из конского волоса', s: kobyz },
    sybyzgy: { n: 'Сыбызғы', d: 'продольная флейта пастухов',
      s: `<g transform="rotate(-32 32 32)"><rect x="4" y="28" width="56" height="8" rx="4" fill="${S}" ${st}/><rect x="10" y="28" width="4" height="8" fill="${G}"/><rect x="50" y="28" width="4" height="8" fill="${G}"/><g fill="${B}"><circle cx="22" cy="32" r="1.8"/><circle cx="29" cy="32" r="1.8"/><circle cx="36" cy="32" r="1.8"/><circle cx="43" cy="32" r="1.8"/></g></g>` },
    zhetigen: { n: 'Жетіген', d: 'семиструнный инструмент с подставками из асыков',
      s: `<path d="M6 22H58L54 46H10Z" fill="${W}" ${st}/><g stroke="${C}" stroke-width="1">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${7 + i * .5} ${25.5 + i * 2.9}H${57 - i * .5}"/>`).join('')}</g><g fill="${C}" stroke="${B}" stroke-width=".8">${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${17 + i * 5}" cy="${25.5 + i * 2.9}" r="2"/>`).join('')}</g>` },
    asatayak: { n: 'Асатаяқ', d: 'посох с металлическими подвесками',
      s: `<path d="M32 26V58" ${ln(B, 4)}/><path d="M32 5C20 11 20 27 32 31C44 27 44 11 32 5Z" fill="${W}" ${st}/><path d="M32 12v12" ${ln(G, 2)}/><g ${ln(B, 1.2)}><path d="M23 22v8M41 22v8M26 27v9M38 27v9"/></g><g fill="${G}"><circle cx="23" cy="32" r="2.6"/><circle cx="41" cy="32" r="2.6"/><circle cx="26" cy="38" r="2.6"/><circle cx="38" cy="38" r="2.6"/></g>` },
    dangyra: { n: 'Даңғыра', d: 'бубен с подвесками-бубенцами',
      s: `<circle cx="32" cy="32" r="22" fill="${C}" stroke="${W}" stroke-width="6"/><circle cx="32" cy="32" r="25" ${ln(B, 1.2)}/>${horn(32, 31, .75, T, 3.5)}<g fill="${G}" stroke="${B}" stroke-width=".8">${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${(32 + 22 * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(32 + 22 * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="3"/>`).join('')}</g>` },
    dauylpaz: { n: 'Дауылпаз', d: 'литавра: сигнал на охоте и в походе',
      s: `<path d="M12 24H52C52 44 42 55 32 55C22 55 12 44 12 24Z" fill="${D}" ${st}/><path d="M13 30L20 40L27 30L32 40L37 30L44 40L51 30" ${ln(G, 2)}/><ellipse cx="32" cy="24" rx="20" ry="7" fill="${C}" ${st}/><path d="M38 20L56 6" ${ln(B, 3)}/><circle cx="38" cy="20" r="3.5" fill="${W}"/>` },
    shankobyz: { n: 'Шаңқобыз', d: 'варган: язычковый инструмент',
      s: `<path d="M27 54V31C17 27 19 9 32 9C45 9 47 27 37 31V54" ${ln('#6f7f8f', 4.5)}/><path d="M32 12V56L39 59" ${ln(G, 2.5)}/><circle cx="32" cy="12" r="2.5" fill="${G}"/>` },
    sazsyrnay: { n: 'Сазсырнай', d: 'глиняная флейта-окарина',
      s: `<g transform="rotate(-14 32 34)"><ellipse cx="30" cy="35" rx="20" ry="14" fill="#b9693a" ${st}/><path d="M48 30L58 28V36L49 38Z" fill="#b9693a" ${st}/><g fill="${B}"><circle cx="22" cy="31" r="2.2"/><circle cx="31" cy="29" r="2.2"/><circle cx="26" cy="40" r="2.2"/><circle cx="36" cy="38" r="2.2"/></g><path d="M12 36q4 8 12 10" ${ln(C, 1.5)}/></g>` },
    konyrau: { n: 'Қоңырау', d: 'колокольчики для ритма и украшения',
      s: `<path d="M8 14Q32 24 56 14" ${ln(D, 4)}/><g ${ln(B, 1.5)}><path d="M18 18v8M32 20v10M46 18v8"/></g><g fill="${G}" ${st}><path d="M11 40C11 30 25 30 25 40Z"/><path d="M24 46C24 34 40 34 40 46Z"/><path d="M39 40C39 30 53 30 53 40Z"/></g><g fill="${B}"><circle cx="18" cy="42" r="2"/><circle cx="32" cy="48" r="2.2"/><circle cx="46" cy="42" r="2"/></g>` },
    kui: { n: 'Күй (кюй)', d: 'инструментальная пьеса со своей историей',
      s: `<circle cx="32" cy="32" r="25" fill="${T}"/><path d="M27 44V18L44 14V40" ${ln(C, 3.5)}/><ellipse cx="22" cy="45" rx="6" ry="4.5" fill="${C}"/><ellipse cx="39" cy="41" rx="6" ry="4.5" fill="${C}"/>${horn(49, 50, .32, G, 5)}${horn(14, 18, .32, G, 5)}` },

    kamzol: { n: 'Камзол', d: 'приталенная безрукавка, часто из бархата',
      s: `<path d="M20 9H28L32 17L36 9H44L51 22L45 27L47 56H17L19 27L13 22Z" fill="${N}" ${st}/><path d="M28 9L32 17L36 9M32 17V56" ${ln(G, 2.2)}/><path d="M18 51H46" stroke="${G}" stroke-width="2.5"/>${horn(24.5, 37, .32, G, 5)}${horn(39.5, 37, .32, G, 5)}` },
    shapan: { n: 'Шапан', d: 'распашной халат; его дарят уважаемым гостям', s: shapan },
    saukele: { n: 'Сәукеле (саукеле)', d: 'высокий свадебный убор невесты', s: saukele },
    takiya: { n: 'Тақия (тюбетейка)', d: 'лёгкая шапочка; у девушек с перьями филина',
      s: `<path d="M32 22L27 4M32 22L32 2M32 22L37 4" ${ln(S, 3)}/><path d="M12 42C12 16 52 16 52 42Z" fill="${E}" ${st}/>${horn(32, 29, .45, G, 4)}<rect x="10" y="40" width="44" height="10" rx="3" fill="${R}" ${st}/><path d="M14 45h36" stroke="${G}" stroke-width="2" stroke-dasharray="4 3"/>` },
    borik: { n: 'Бөрік (борик)', d: 'шапка с меховой опушкой',
      s: `<path d="M14 40C14 12 50 12 50 40Z" fill="${R}" ${st}/><path d="M32 19V10" ${ln(G, 2.5)}/><circle cx="32" cy="8" r="3" fill="${G}"/><path d="M22 36Q24 22 32 20M42 36Q40 22 32 20" ${ln(G, 1.5)}/><path d="M8 40q3-5 6 0q3-5 6 0q3-5 6 0q3-5 6 0q3-5 6 0q3-5 6 0q3-5 6 0q3-5 6 0V52H8Z" fill="${B}"/><path d="M12 46h3M22 48h3M32 46h3M42 48h3M50 45h3" stroke="${W}" stroke-width="1.5" stroke-linecap="round"/>` },
    kimeshek: { n: 'Кимешек', d: 'головной убор замужней женщины',
      s: `<path d="M32 6C15 6 11 26 12 58H52C53 26 49 6 32 6Z" fill="${C}" ${st}/><ellipse cx="32" cy="27" rx="10" ry="12" fill="#e9c9a0"/><ellipse cx="32" cy="27" rx="10" ry="12" ${ln(R, 2.5)}/><path d="M22 44Q32 52 42 44" ${ln(G, 2)}/><path d="M18 14Q32 4 46 14" ${ln(R, 2.5)}/><path d="M32 46l3 4-3 4-3-4z" fill="${T}"/>` },
    bilezik: { n: 'Білезік (браслет)', d: 'серебряный браслет с камнем', s: bilezik },
    syrga: { n: 'Сырға (серьги)', d: 'серебряные серьги с подвесками',
      s: [18, 46].map(x => `<path d="M${x} 6c-5 0-5 9 0 9" ${ln(V, 2.2)}/><path d="M${x - 9} 20a9 9 0 0 0 18 0z" fill="${V}" stroke="#7d8792" stroke-width="1.5"/><circle cx="${x}" cy="23" r="2.4" fill="${T}"/><path d="M${x - 6} 29v12M${x} 30v18M${x + 6} 29v12" ${ln(V, 1.8)}/><circle cx="${x - 6}" cy="43" r="2.2" fill="${R}"/><circle cx="${x}" cy="50" r="2.2" fill="${R}"/><circle cx="${x + 6}" cy="43" r="2.2" fill="${R}"/>`).join('') },
    alka: { n: 'Алқа', d: 'нагрудное украшение-оберег', s: alka },
    belbeu: { n: 'Белбеу (пояс)', d: 'кожаный пояс с накладками',
      s: `<path d="M4 26Q32 40 60 26V38Q32 52 4 38Z" fill="${B}"/><rect x="24" y="30" width="16" height="16" rx="3" fill="${G}" ${st}/><path d="M32 34l4 4-4 4-4-4z" fill="${R}"/><g fill="${G}"><circle cx="11" cy="34" r="2.6"/><circle cx="18" cy="36.500" r="2.6"/><circle cx="46" cy="36.500" r="2.6"/><circle cx="53" cy="34" r="2.6"/></g>` },
    etik: { n: 'Етік (сапоги)', d: 'кожаные сапоги для верховой езды',
      s: `<path d="M22 6H38V38C46 40 54 42 56 48V54H22Z" fill="${B}" ${st}/><path d="M18 54H58V58H18Z" fill="${W}"/><path d="M22 14H38" stroke="${G}" stroke-width="3"/>${horn(30, 28, .38, G, 4.5)}<path d="M52 46q4-2 6-6" ${ln(B, 2.5)}/>` },

    dastarkhan: { n: 'Дастарқан', d: 'стол-скатерть, место общения и угощения',
      s: `<path d="M16 38V54M48 38V54" ${ln(B, 4)}/><ellipse cx="32" cy="34" rx="26" ry="11" fill="${W}" ${st}/><ellipse cx="32" cy="32" rx="22" ry="8" fill="${C}"/><ellipse cx="32" cy="32" rx="22" ry="8" ${ln(R, 2)} stroke-dasharray="4 3"/><path d="M24 29H40C40 34 36 36 32 36C28 36 24 34 24 29Z" fill="${T}"/><g fill="${G}"><circle cx="16" cy="32" r="2.5"/><circle cx="46" cy="30" r="2.5"/><circle cx="43" cy="35" r="2.5"/><circle cx="20" cy="36" r="2.2"/></g>` },
    besik: { n: 'Бесік (колыбель)', d: 'деревянная колыбель; с ней связан обряд «бесікке салу»',
      s: `<path d="M8 20H56" ${ln(B, 3.5)}/><path d="M12 54V30A9 9 0 0 1 30 30M52 54V30A9 9 0 0 0 34 30" ${ln(W, 3)} transform="translate(0 -6)"/><path d="M12 48C12 28 52 28 52 48Z" fill="${R}" ${st}/><path d="M12 48H52" ${ln(B, 3)}/><path d="M16 42Q32 34 48 42" ${ln(G, 2)}/><path d="M6 50Q12 60 20 54M58 50Q52 60 44 54" ${ln(B, 3.5)}/><path d="M12 20v6M52 20v6" ${ln(B, 3)}/>` },
    horse: { n: 'Жылқы (лошадь)', d: '«конь — крылья джигита»', s: `${horse(W, B)}<path d="M4 56H60" ${ln(E, 2.5)}/>` },
    kumys: { n: 'Қымыз (кумыс)', d: 'напиток из кобыльего молока',
      s: `<path d="M10 26H54C54 44 44 52 32 52C20 52 10 44 10 26Z" fill="${T}" ${st}/><path d="M12 35Q32 43 52 35" ${ln(G, 2)} stroke-dasharray="3 3"/><ellipse cx="32" cy="26" rx="22" ry="7" fill="${C}" ${st}/><ellipse cx="32" cy="26.500" rx="17" ry="4.5" fill="#fff"/><rect x="24" y="52" width="16" height="4" rx="1.5" fill="${B}"/>` },
    ozhau: { n: 'Ожау (ковш)', d: 'резной деревянный ковш для кумыса',
      s: `<path d="M34 34L54 8" ${ln(W, 5)}/><path d="M54 8c4-3 6 2 3 4" ${ln(B, 2.5)}/><path d="M8 34H42C42 48 34 56 25 56C16 56 8 48 8 34Z" fill="${W}" ${st}/><ellipse cx="25" cy="34" rx="17" ry="5" fill="${C}" ${st}/><path d="M13 44q12 6 24 0" ${ln(G, 2)}/>` },
    burkit: { n: 'Бүркіт (беркут)', d: 'ловчая птица; охота с ней — саятшылық', s: burkit },
    er: { n: 'Ер (седло)', d: 'седло с высокой передней лукой',
      s: `<path d="M8 40C12 24 20 30 30 32C40 34 44 16 52 16C56 28 56 40 48 44H14Z" fill="${D}" ${st}/><path d="M14 44H48" ${ln(G, 2.5)}/><circle cx="50" cy="24" r="2.5" fill="${G}"/><path d="M28 44V52" ${ln(B, 2.5)}/><path d="M22 52H34L32 60H24Z" fill="${G}" ${st}/>` },
    kazan: { n: 'Қазан (казан)', d: 'котёл над очагом, центр домашнего хозяйства',
      s: `<path d="M22 60L26 44M42 60L38 44" ${ln(B, 3)}/><path d="M32 60c-5-4-2-8 0-11c2 3 5 7 0 11z" fill="${R}"/><path d="M32 60c-2-2-1-4 0-5c1 1 2 3 0 5z" fill="${G}"/><path d="M10 22H54C54 40 44 48 32 48C20 48 10 40 10 22Z" fill="#2f2a27" ${st}/><rect x="7" y="18" width="50" height="6" rx="3" fill="#4a4440"/><path d="M8 26c-5 0-5 8 2 8M56 26c5 0 5 8-2 8" ${ln('#4a4440', 2.5)}/><path d="M24 12q2-3 0-6M32 13q2-4 0-8M40 12q2-3 0-6" ${ln(S, 1.8)}/>` },
    baursak: { n: 'Бауырсақ', d: 'жареные пышки из теста, угощение к чаю',
      s: `<ellipse cx="32" cy="48" rx="26" ry="8" fill="${T}" ${st}/><g fill="#dc9a3c" ${st}><circle cx="20" cy="40" r="9"/><circle cx="44" cy="40" r="9"/><circle cx="32" cy="42" r="9"/><circle cx="26" cy="27" r="9"/><circle cx="39" cy="28" r="9"/></g><g ${ln('#f4cf8a', 2)}><path d="M21 22q4-3 8 0M35 23q4-3 8 0M27 38q4-3 8 0"/></g>` },
    syrmak: { n: 'Сырмақ', d: 'войлочный ковёр с узором',
      s: `<rect x="6" y="12" width="52" height="40" rx="3" fill="${R}" ${st}/><rect x="11" y="17" width="42" height="30" fill="${C}"/>${horn(22, 30, .55, R, 4)}${horn(42, 30, .55, R, 4)}<path d="M32 24l4 8-4 8-4-8z" fill="${T}"/><path d="M6 52v5M14 52v5M22 52v5M30 52v5M38 52v5M46 52v5M54 52v5" ${ln(G, 1.5)}/>` },

    dala: { n: 'Дала (степь)', d: 'бескрайняя равнина, дом кочевника',
      s: `<clipPath id="ic-dala"><rect x="6" y="8" width="52" height="48" rx="8"/></clipPath><g clip-path="url(#ic-dala)"><rect x="6" y="8" width="52" height="48" fill="#bfe3e2"/><circle cx="44" cy="24" r="8" fill="${G}"/><path d="M6 40Q22 30 38 38T58 34V56H6Z" fill="${E}"/><path d="M6 48Q26 40 58 46V56H6Z" fill="${S}"/><path d="M14 50v-5M17 50v-4M40 52v-5M43 52v-4" ${ln(E, 1.5)}/></g><rect x="6" y="8" width="52" height="48" rx="8" ${ln(B, 2)}/>` },
    tau: { n: 'Тау (горы)', d: 'Алатау и Алтай окаймляют степь',
      s: `<clipPath id="ic-tau"><rect x="6" y="8" width="52" height="48" rx="8"/></clipPath><g clip-path="url(#ic-tau)"><rect x="6" y="8" width="52" height="48" fill="#bfe3e2"/><path d="M0 50L20 22L32 38L42 16L64 50Z" fill="${N}"/><path d="M20 22L14.500 29.700L19 28L22 31L25 28.700Z M42 16L37 24L41 22L44 26L47 23.700Z" fill="${C}"/><path d="M6 46Q32 40 58 48V56H6Z" fill="${E}"/></g><rect x="6" y="8" width="52" height="48" rx="8" ${ln(B, 2)}/>` },
    balbal: { n: 'Балбал', d: 'каменное изваяние тюркской эпохи',
      s: `<path d="M20 56V24C20 6 44 6 44 24V56Z" fill="#b9ab8f" ${st}/><path d="M26 20h4M34 20h4M32 21v6M28 31q4 2 8 0" ${ln(B, 1.8)}/><path d="M22 44Q30 36 34 42M42 38Q38 40 37 44" ${ln(B, 1.8)}/><path d="M31 40H39L38 47H32Z" fill="${S}" ${st}/><path d="M10 56H54" ${ln(E, 3)}/>` },
    petro: { n: 'Петроглиф', d: '«солнцеголовый» рисунок на скалах Тамгалы',
      s: `<path d="M8 16L22 8L48 10L58 24L54 52L30 58L10 48Z" fill="#7a5a40" ${st}/><g ${ln(C, 2.2)}><circle cx="32" cy="22" r="6"/><path d="M32 12v-2M32 34v-2M22 22h-2M44 22h-2M25 15l-1.500-1.500M39 15l1.500-1.500M25 29l-1.500 1.500M39 29l1.500 1.500" transform="translate(0 0)"/><path d="M32 30V44M32 44L26 53M32 44L38 53M24 36H40"/></g><circle cx="32" cy="22" r="1.6" fill="${C}"/>` },
    kunqyran: { n: 'Күн мен қыран', d: 'солнце и степной орёл с флага Казахстана',
      s: `<circle cx="32" cy="32" r="25" fill="${T}"/><g ${ln(G, 2)}>${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, c = Math.cos(a), s2 = Math.sin(a); return `<path d="M${(32 + 11 * c).toFixed(1)} ${(23 + 11 * s2).toFixed(1)}L${(32 + 14 * c).toFixed(1)} ${(23 + 14 * s2).toFixed(1)}"/>`; }).join('')}</g><circle cx="32" cy="23" r="8" fill="${G}"/><path d="M10 40Q20 38 26 44Q30 41 32 46Q34 41 38 44Q44 38 54 40Q46 42 42 50Q36 46 32 52Q28 46 22 50Q18 42 10 40Z" fill="${G}"/>` }
  };
})();
