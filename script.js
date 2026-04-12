/* ═══════════════════════════════════════════
   E-SHODHPATRA — script.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. HAMBURGER MENU TOGGLE ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── 2. FILTER CHIPS (single-select toggle) ── */
  document.querySelectorAll('.filter-chips').forEach(group => {
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
        chip.classList.add('on');
      });
    });
  });

  /* ── 3. HERO SEARCH BUTTON ── */
  const searchGo    = document.querySelector('.search-go');
  const searchInput = document.querySelector('.search-input');

  if (searchGo && searchInput) {
    const doSearch = () => {
      const query = searchInput.value.trim();
      if (!query) {
        searchInput.focus();
        searchInput.style.boxShadow = '0 0 0 2px var(--saffron)';
        setTimeout(() => { searchInput.style.boxShadow = ''; }, 1200);
        return;
      }
      alert('Searching for: "' + query + '"');
    };

    searchGo.addEventListener('click', doSearch);
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  }

  /* ── 4. TABLE SEARCH FILTER (works on both mobile cards & desktop rows) ── */
  const tblInput = document.querySelector('.tbl-search input');

  if (tblInput) {
    tblInput.addEventListener('input', () => {
      const q = tblInput.value.toLowerCase();

      // Mobile cards
      document.querySelectorAll('.mobile-row').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });

      // Desktop rows
      document.querySelectorAll('table.desktop-table tbody tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* ── 5. PAGINATION ── */
  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      if (label === '← Prev' || label === 'Next →') return;
      document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── 6. QUICK TAGS — populate search input ── */
  document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = tag.textContent.trim();
        searchInput.focus();
      }
    });
  });

  /* ── 7. CATEGORY CARDS ── */
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.cat-name').textContent;
      alert('Browsing subject: ' + name);
    });
  });

  /* ── 8. STICKY NAV SHADOW ON SCROLL ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(11,29,58,0.13)'
        : '0 2px 16px rgba(11,29,58,0.07)';
    }, { passive: true });
  }

  /* ── 9. CLOSE MOBILE MENU ON RESIZE TO DESKTOP ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900 && mobileMenu) {
      mobileMenu.classList.remove('open');
      hamburger && hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  }, { passive: true });

});
