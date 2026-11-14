// DeSKAD project page: results data, charts, tables, and interactive viewers.
(function () {
  'use strict';

  // ------------------------------------------------------------------ data
  // Numbers copied from Tables I-III of the paper (success rates in %).
  var TASKS = [
    'click alarmclock', 'dump bin bigbin', 'grab roller', 'handover mic', 'hanging mug',
    'lift pot', 'pick diverse bottles', 'place bread basket', 'place bread skillet',
    'place burger fries', 'place can basket', 'place cans plasticbox', 'place dual shoes',
    'scan object', 'stack bowls two'
  ];

  var PI05 = '&pi;<sub>0.5</sub>';

  var RESULTS = {
    success: {
      groups: [
        { name: 'DeSKAD', columns: ['Ours', 'w/o comm.', 'Centr.', 'w/o partner aff.', 'w/o aff.', 'w/o trace'] },
        { name: 'Baselines', columns: ['LToM', PI05, 'DM0.5'] }
      ],
      rows: [
        [97, 100, 100, 97, 67, 43, 23, 100, 100],
        [100, 97, 93, 93, 90, 87, 13, 97, 97],
        [100, 87, 100, 97, 90, 70, 33, 100, 100],
        [100, 90, 93, 87, 77, 80, 7, 90, 100],
        [47, 40, 37, 33, 30, 13, 3, 43, 63],
        [63, 53, 63, 57, 37, 40, 10, 60, 57],
        [53, 50, 30, 37, 53, 20, 30, 50, 77],
        [83, 73, 70, 67, 23, 20, 0, 90, 97],
        [77, 70, 63, 47, 40, 13, 0, 80, 70],
        [90, 77, 93, 70, 67, 63, 3, 100, 93],
        [73, 77, 63, 57, 37, 10, 27, 70, 87],
        [87, 87, 83, 60, 27, 23, 10, 93, 97],
        [80, 73, 77, 63, 33, 27, 0, 70, 97],
        [43, 40, 53, 30, 37, 7, 0, 70, 80],
        [97, 100, 100, 90, 83, 67, 20, 93, 97]
      ],
      average: [79, 74, 75, 66, 53, 39, 12, 80, 87],
      caption: 'Full-task success on held-out OOD scenes with no fault injected. Shaded cells are the best in each row.'
    },
    fault: {
      groups: [
        { name: 'DeSKAD', columns: ['Ours', 'w/o comm.'] },
        { name: 'Baselines', columns: ['LToM', PI05, 'DM0.5'] }
      ],
      rows: [
        [0, 100, 17, 100, 63],
        [100, 100, 13, 0, 30],
        [77, 80, 0, 10, 20],
        [100, 100, 3, 0, 60],
        [87, 100, 43, 0, 50],
        [83, 63, 13, 0, 0],
        [63, 60, 37, 17, 47],
        [60, 67, 0, 13, 0],
        [83, 80, 13, 0, 50],
        [60, 87, 27, 13, 0],
        [73, 77, 7, 0, 3],
        [17, 90, 27, 50, 0],
        [73, 83, 17, 0, 37],
        [73, 73, 7, 13, 17],
        [13, 63, 37, 50, 70]
      ],
      average: [64, 82, 17, 18, 30],
      caption: 'One agent’s proprioception receives Gaussian noise and its own hand camera is replaced by random pixels. Entries are the intact arm’s own subtask success.'
    },
    delay: {
      groups: [
        { name: 'DeSKAD', columns: ['Ours', 'w/o comm.'] },
        { name: 'Baselines', columns: ['LToM', PI05, 'DM0.5'] }
      ],
      rows: [
        [97, 100, 23, 100, 100],
        [100, 100, 10, 100, 83],
        [97, 83, 17, 73, 83],
        [100, 93, 3, 100, 100],
        [47, 37, 7, 37, 63],
        [70, 37, 7, 3, 83],
        [47, 67, 7, 0, 0],
        [73, 60, 0, 43, 37],
        [63, 53, 0, 63, 23],
        [90, 73, 3, 67, 10],
        [73, 80, 27, 70, 80],
        [77, 80, 7, 20, 0],
        [67, 67, 0, 17, 0],
        [23, 33, 0, 27, 30],
        [100, 100, 27, 93, 97]
      ],
      average: [75, 71, 9, 54, 53],
      caption: 'One arm’s commanded action is held at its current pose for the first 40 environment steps. Entries are full-task success.'
    }
  };

  // Bar charts of the averages. "from" points at the no-fault column used for the drop annotation.
  var CHARTS = {
    success: {
      title: 'Average full-task success (%)',
      groups: [
        { name: null, bars: [['DeSKAD (ours)', 0, true]] },
        { name: 'Ablations', bars: [['w/o comm.', 1], ['Centralized', 2], ['w/o partner aff.', 3], ['w/o affordance', 4], ['w/o trace', 5]] },
        { name: 'Baselines', bars: [['LToM', 6], [PI05, 7], ['DM0.5', 8]] }
      ]
    },
    fault: {
      title: 'Average intact-arm subtask success (%)',
      groups: [
        { name: null, bars: [['DeSKAD (ours)', 0, true], ['w/o comm.', 1]] },
        { name: 'Baselines', bars: [['LToM', 2], [PI05, 3], ['DM0.5', 4]] }
      ]
    },
    delay: {
      title: 'Average full-task success with one arm delayed (%)',
      note: 'Grey numbers: change from the no-fault average.',
      from: [0, 1, 6, 7, 8],
      groups: [
        { name: null, bars: [['DeSKAD (ours)', 0, true], ['w/o comm.', 1]] },
        { name: 'Baselines', bars: [['LToM', 2], [PI05, 3], ['DM0.5', 4]] }
      ]
    }
  };

  var QUAL_BLURBS = {
    1: 'One arm moves the skillet to the center while the other places the bread in it.',
    2: 'Both arms grasp the pot and lift it together.',
    3: 'One arm brings the first bowl to the center, then the other stacks the second bowl on it.',
    4: 'One arm brings the mug to the center, then the other hangs it on the rack.'
  };

  var ROLL_SEEDS = { pick_diverse_bottles: 1502, place_dual_shoes: 67 };
  var ROLL_BLURBS = {
    none: 'No fault injected.',
    noise: 'One arm’s proprioception receives Gaussian noise and its hand camera is replaced by random pixels. The shared top camera and instruction are untouched.',
    delay: 'One arm’s commanded action is held at its current pose for the first 40 environment steps.'
  };

  // --------------------------------------------------------------- helpers
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function stripTags(html) { return html.replace(/<[^>]+>/g, '').replace(/&pi;/g, 'π'); }

  // Segmented control: toggles is-active/aria-pressed and calls back with the clicked button.
  function bindSegmented(group, onSelect) {
    var buttons = $all('button', group);
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        onSelect(btn);
      });
    });
  }

  function selectSegment(group, attr, value) {
    var btn = $('button[' + attr + '="' + value + '"]', group);
    if (btn) btn.click();
  }

  // ---------------------------------------------------------------- charts
  function renderChart(container, key) {
    var spec = CHARTS[key];
    var data = RESULTS[key].average;
    var baseline = RESULTS.success.average;
    container.appendChild(el('p', 'chart-title', spec.title));
    var chart = el('div', 'bar-chart bars-pending');
    chart.setAttribute('role', 'list');

    spec.groups.forEach(function (group) {
      if (group.name) chart.appendChild(el('div', 'bar-group', group.name));
      group.bars.forEach(function (bar) {
        var label = bar[0], idx = bar[1], ours = bar[2];
        var value = data[idx];
        var row = el('div', 'bar-row' + (ours ? ' is-ours' : ''));
        row.setAttribute('role', 'listitem');
        var valueHtml = value + '%';
        var aria = stripTags(label) + ': ' + value + '%';
        if (spec.from) {
          var delta = value - baseline[spec.from[idx]];
          var sign = delta > 0 ? '+' : (delta < 0 ? '−' : '±');
          valueHtml += '<span class="bar-delta">' + sign + Math.abs(delta) + '</span>';
          aria += ', ' + (delta < 0 ? 'down ' : 'up ') + Math.abs(delta) + ' points from no fault';
        }
        row.setAttribute('aria-label', aria);
        row.title = aria;
        row.appendChild(el('span', 'bar-label', label));
        var track = el('span', 'bar-track');
        var fill = el('span', 'bar-fill');
        fill.style.display = 'block';
        fill.style.width = value + '%';
        track.appendChild(fill);
        track.appendChild(el('span', 'bar-axis'));
        row.appendChild(track);
        row.appendChild(el('span', 'bar-value', valueHtml));
        chart.appendChild(row);
      });
    });
    container.appendChild(chart);
    if (spec.note) container.appendChild(el('p', 'chart-note', spec.note));
    return chart;
  }

  // ---------------------------------------------------------------- tables
  function renderTable(details, key) {
    var spec = RESULTS[key];
    var table = el('table', 'results');
    var thead = el('thead');
    var top = el('tr');
    top.appendChild(el('th', '', ''));
    var split = spec.groups[0].columns.length;
    spec.groups.forEach(function (g, gi) {
      var th = el('th', 'group' + (gi > 0 ? ' split' : ''), g.name);
      th.colSpan = g.columns.length;
      top.appendChild(th);
    });
    thead.appendChild(top);
    var head = el('tr');
    head.appendChild(el('th', '', 'Task'));
    var colIndex = 0;
    spec.groups.forEach(function (g) {
      g.columns.forEach(function (c) {
        head.appendChild(el('th', colIndex === split ? 'split' : '', c));
        colIndex++;
      });
    });
    thead.appendChild(head);
    table.appendChild(thead);

    var tbody = el('tbody');
    function addRow(name, values, cls) {
      var tr = el('tr', cls || '');
      tr.appendChild(el('td', '', name));
      var best = Math.max.apply(null, values);
      values.forEach(function (v, i) {
        var classes = [];
        if (v === best) classes.push('best');
        if (i === split) classes.push('split');
        tr.appendChild(el('td', classes.join(' '), String(v)));
      });
      tbody.appendChild(tr);
    }
    spec.rows.forEach(function (values, i) { addRow(TASKS[i], values); });
    addRow('Average', spec.average, 'avg');
    table.appendChild(tbody);

    var caption = el('caption', '', spec.caption);
    table.appendChild(caption);
    var wrap = el('div', 'table-wrap');
    wrap.appendChild(table);
    details.appendChild(wrap);
  }

  // ------------------------------------------------------------ qualitative
  function initQualitative() {
    var tabs = $('#qual-tabs');
    var grid = $('#qual-grid');
    if (!tabs || !grid) return;
    var blurb = $('#qual-blurb');
    var imgs = $all('img[data-panel]', grid);

    function show(row) {
      var taskName = $('button[data-row="' + row + '"]', tabs).textContent.trim();
      imgs.forEach(function (img) {
        var panel = img.getAttribute('data-panel');
        img.src = 'static/images/qualitative/sim_' + row + '_' + panel + '.jpg';
        var cap = img.parentNode.querySelector('figcaption').textContent;
        var group = img.closest('.qual-group').querySelector('h4').textContent;
        img.alt = taskName + ': ' + group.toLowerCase() + ', ' + cap.toLowerCase();
        img.setAttribute('data-caption', taskName + ' — ' + group + ', ' + cap + '.');
      });
      if (blurb) blurb.textContent = QUAL_BLURBS[row] || '';
    }

    bindSegmented(tabs, function (btn) { show(btn.getAttribute('data-row')); });
    show('1');

    // Warm the cache so switching tasks is instant.
    ['2', '3', '4'].forEach(function (row) {
      imgs.forEach(function (img) {
        var pre = new Image();
        pre.src = 'static/images/qualitative/sim_' + row + '_' + img.getAttribute('data-panel') + '.jpg';
      });
    });
  }

  // --------------------------------------------------------------- rollouts
  function initRollouts() {
    var grid = $('#rollout-grid');
    if (!grid) return;
    var taskGroup = $('#roll-task');
    var condGroup = $('#roll-condition');
    var blurb = $('#roll-blurb');
    var state = { task: 'pick_diverse_bottles', condition: 'none' };

    function videoPath(method) {
      var cond = state.condition === 'none' ? '' : '_' + state.condition;
      return 'static/videos/' + state.task + '/' + method + cond + '_seed_' +
        ROLL_SEEDS[state.task] + '_' + state.task + '.mp4';
    }

    function load() {
      $all('figure', grid).forEach(function (fig) {
        var video = $('video', fig);
        var method = fig.getAttribute('data-method');
        video.src = videoPath(method);
        video.setAttribute('aria-label', fig.querySelector('figcaption').textContent + ' rollout');
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      });
      if (blurb) blurb.textContent = ROLL_BLURBS[state.condition];
    }

    bindSegmented(taskGroup, function (btn) { state.task = btn.getAttribute('data-task'); load(); });
    bindSegmented(condGroup, function (btn) { state.condition = btn.getAttribute('data-condition'); load(); });

    var restart = $('#roll-restart');
    if (restart) {
      restart.addEventListener('click', function () {
        $all('video', grid).forEach(function (v) {
          try { v.currentTime = 0; } catch (e) {}
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        });
      });
    }

    // Result cards jump here with their fault condition preselected.
    $all('[data-goto-condition]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectSegment(condGroup, 'data-condition', btn.getAttribute('data-goto-condition'));
        $('#rollouts').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    load();
  }

  // --------------------------------------------------------------- lightbox
  function initLightbox() {
    var box = $('#lightbox');
    if (!box || typeof box.showModal !== 'function') return;
    var img = $('img', box);
    var cap = $('p', box);
    document.addEventListener('click', function (e) {
      var target = e.target.closest ? e.target.closest('img.zoomable') : null;
      if (!target) return;
      img.src = target.currentSrc || target.src;
      img.alt = target.alt;
      cap.textContent = target.getAttribute('data-caption') || target.alt || '';
      box.showModal();
    });
    $('.close', box).addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  }

  // ----------------------------------------------------------------- bibtex
  function initBibtex() {
    var btn = $('#copy-bibtex');
    var code = $('#bibtex-code');
    if (!btn || !code) return;
    btn.addEventListener('click', function () {
      var text = code.textContent;
      var done = function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var range = document.createRange();
        range.selectNodeContents(code);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try { document.execCommand('copy'); done(); } catch (e) {}
        sel.removeAllRanges();
      }
    });
  }

  // ------------------------------------------------------- section rail
  function initSectionRail() {
    var nav = $('#section-progress');
    if (!nav) return;
    var list = $('ul', nav);
    var fill = $('.sp-fill', nav);
    var headings = $all('h2.section-title');
    if (!headings.length) return;

    var entries = headings.map(function (h) {
      var li = el('li');
      var a = el('a', '', '<span class="sp-dot"></span><span class="sp-label">' + h.textContent.trim() + '</span>');
      a.href = '#' + h.id;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + h.id);
      });
      li.appendChild(a);
      list.appendChild(li);
      return { heading: h, link: a };
    });
    nav.hidden = false;

    function update() {
      var marker = window.innerHeight * 0.35;
      var active = 0;
      entries.forEach(function (entry, i) {
        if (entry.heading.getBoundingClientRect().top <= marker) active = i;
      });
      entries.forEach(function (entry, i) { entry.link.classList.toggle('is-active', i === active); });
      fill.style.height = entries.length > 1 ? (active / (entries.length - 1) * 100) + '%' : '0';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ----------------------------------------------------------- reveal/bars
  function initReveal() {
    var targets = $all('.reveal');
    var charts = $all('.bars-pending');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-visible'); });
      charts.forEach(function (c) { c.classList.remove('bars-pending'); });
      return;
    }
    var io = new IntersectionObserver(function (items) {
      items.forEach(function (item) {
        if (!item.isIntersecting) return;
        item.target.classList.add('is-visible');
        $all('.bars-pending', item.target).forEach(function (c) { c.classList.remove('bars-pending'); });
        io.unobserve(item.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  function initMath() {
    if (typeof window.renderMathInElement !== 'function') return;
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }

  // ------------------------------------------------------------------ boot
  function boot() {
    $all('[data-chart]').forEach(function (c) { renderChart(c, c.getAttribute('data-chart')); });
    $all('details[data-table]').forEach(function (d) { renderTable(d, d.getAttribute('data-table')); });
    initQualitative();
    initRollouts();
    initLightbox();
    initBibtex();
    initSectionRail();
    initReveal();
    initMath();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
