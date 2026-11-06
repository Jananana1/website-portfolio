/* ---------- theme toggle ---------- */
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    function syncLabel(){
      document.getElementById('profileImg').src = root.getAttribute('data-theme') === 'dark' ? 'profile2.png' : 'profile.jpg';
      themeLabel.textContent = root.getAttribute('data-theme') === 'dark' ? 'Dark mode' : 'Light mode';
    }
    const saved = localStorage.getItem('theme');
    if(saved){ root.setAttribute('data-theme', saved); }
    syncLabel();
    toggle.addEventListener('click', (e) => { const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  if(!document.startViewTransition){ root.setAttribute('data-theme', next); localStorage.setItem('theme', next); 
  syncLabel(); return; } const x = e.clientX, y = e.clientY; const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)); 
  const transition = document.startViewTransition(() => { root.setAttribute('data-theme', next); localStorage.setItem('theme', next); syncLabel(); }); 
  transition.ready.then(() => { document.documentElement.animate( { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] }, { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' } ); }); }); 

    /* ---------- data ---------- */
    const projects = [
            {
        tag: 'Team project',
        title: 'SalinKamay',
        sub: 'Web application',
        desc: 'An AI-powered web application that helps users translate and learn Filipino Sign Language (FSL) through interactive learning modules and sign recognition.',
        url: 'https://github.com/AngeloA00/SalinKamay-Final',
        action: 'Open with GitHub'
      },
      {
        tag: 'Team project',
        title: 'SP SafeRoute',
        sub: 'Community safety PWA · San Pablo City',
        desc: 'A progressive web app built for community safety, featuring real-time push alerts and a dual service-worker architecture, deployed on AWS EC2 with JWT-secured access.',
        url: 'https://github.com/Jananana1/SPSafeRoute_new',
        action: 'Open with GitHub'
      },
      {
        tag: 'Team project',
        title: 'Academic Predictor',
        sub: 'Machine learning · PHP basics',
        desc: 'A PHP-based tool that applies basic machine learning concepts to predict academic performance from student data.',
        url: 'https://github.com/Jananana1/academicpredictor',
        action: 'Open with GitHub'
      },
      {
        tag: '1st year project',
        title: 'Inventory System',
        sub: 'Desktop app · Java',
        desc: 'A Java-based inventory management system built to track stock, records, and transactions — an early project from first year.',
        url: 'https://github.com/Jananana1/InventorySystem-usingJava',
        action: 'Open with GitHub'
      }
    ];

    const certs = [
       {
    tag: 'TESDA',
    title: 'National Certificate II — Computer Systems Servicing',
    sub: 'Issued by TESDA',
    desc: '',
    url: 'SANTOS-NC2.jpg',
    action: 'View certificate',
    noVerify: true
  },
      {
        tag: 'Certiport · a Pearson VUE business',
        title: 'IT Specialist — Cloud Computing',
        sub: 'Issued by Certiport',
        desc: 'Validates knowledge of cloud solution concepts, considerations across cloud deployments, and the practical application of cloud technologies.',
        url: 'https://www.credly.com/badges/5b399fbd-bd90-44ec-8acf-6e53bf4b7b92',
        action: 'Follow the link'
      },
      {
        tag: 'Cisco',
        title: 'Python Essentials 1',
        sub: 'Issued by Cisco · OpenEDG Python Institute',
        desc: 'Covers core Python programming concepts, syntax, and semantics, along with practical coding tasks using the Python Standard Library.',
        url: 'https://www.credly.com/badges/ec62c373-6f70-4452-be7a-86ef78036884',
        action: 'Follow the link'
      },
      {
        tag: 'IBM SkillsBuild',
        title: 'Web Development Fundamentals',
        sub: 'Issued by IBM SkillsBuild',
        desc: 'Demonstrates conceptual understanding of building, deploying, and testing interactive websites using HTML, CSS, and JavaScript.',
        url: 'https://www.credly.com/badges/12f07f27-060b-4ff2-aba8-11141ba33e1d',
        action: 'Follow the link'
      },
      {
        tag: 'IBM SkillsBuild',
        title: 'Cybersecurity Fundamentals',
        sub: 'Issued by IBM SkillsBuild',
        desc: 'Covers foundational cybersecurity concepts, common attack types, social engineering, and organizational security strategies.',
        url: 'https://www.credly.com/badges/9b5df5b2-7625-4330-91e8-0d3c652cb8ec',
        action: 'Follow the link'
      },
      {
        tag: 'Cisco',
        title: 'Network Addressing & Basic Troubleshooting',
        sub: 'Issued by Cisco',
        desc: 'Covers physical, data link, and network layer fundamentals, IPv6 addressing, and hands-on troubleshooting using Cisco Packet Tracer.',
        url: 'https://www.credly.com/badges/c48f1ac7-a5e9-4550-a935-06d6a3edfdfd',
        action: 'Follow the link'
      }
    ];

    function renderGrid(gridId, items, showVerify){
      const grid = document.getElementById(gridId);
      grid.innerHTML = items.map((item, i) => `
        <button class="flip-card" onclick="openModal('${gridId}', ${i})">
          <div class="tag">${item.tag}</div>
          <h3>${item.title}</h3>
          <div class="sub mono">${item.sub}</div>
          ${showVerify ? '<div class="verify-tag mono">&lt;verify&gt;</div>' : ''}
        </button>
      `).join('');
    }
    renderGrid('projectGrid', projects, false);
    renderGrid('certGrid', certs, true);

    /* ---------- modal ---------- */
    const overlay = document.getElementById('modalOverlay');
    function openModal(gridId, i){
      const item = gridId === 'certGrid' ? certs[i] : projects[i];
      document.getElementById('modalTag').textContent = item.tag;
      document.getElementById('modalTitle').textContent = item.title;
      document.getElementById('modalSub').textContent = item.sub;
      document.getElementById('modalDesc').textContent = item.desc;
      document.getElementById('modalVerifyTag').style.display = gridId === 'certGrid' ? 'inline-block' : 'none';
      const action = document.getElementById('modalAction');
      action.href = item.url;
      action.textContent = item.action + ' ↗';
      overlay.classList.add('open');
    }
    document.getElementById('modalClose').addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => { if(e.target === overlay) overlay.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') overlay.classList.remove('open'); });

    /* ---------- active nav highlight ---------- */
    const navLinks = document.querySelectorAll('.side-nav a');
    const targets = ['about','projects','certifications'].map(id => document.getElementById(id));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          navLinks.forEach(a => a.classList.remove('active'));
          const match = document.querySelector('.side-nav a[href="#' + entry.target.id + '"]');
          if(match) match.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    targets.forEach(t => t && io.observe(t));

