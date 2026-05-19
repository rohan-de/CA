function showNotification() {
  const notificationbar = document.getElementById('notificationbar');
  notificationbar.classList.add('visible');
}
// Function to hide the notification with animation
function hideNotification() {
  const notificationbar = document.getElementById('notificationbar');
  notificationbar.classList.remove('visible');
}

// Show the notification when the page loads
window.onload = function () {
  setTimeout(showNotification, 200); // Delay the appearance slightly for better effect
};
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const navItems = document.querySelectorAll("li a");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    // Remove 'active' class from all items
    navItems.forEach(nav => nav.classList.remove("active"));

    // Add 'active' class to clicked item
    item.classList.add("active");
  });
});

//articleSection & Imagesection
window.addEventListener('load', () => {
  const textSection = document.querySelector('.articlesection');
  const imageSection = document.querySelector('.Image-section');

  textSection.classList.add('show');

  // Delay image appearance after text
  setTimeout(() => {
    imageSection.classList.add('show');
  }, 400); // 0.6s delay
});

function toggleButtonColor(button) {
  button.classList.toggle('clicked');
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Apply a delay if specified in HTML
            const delay = entry.target.getAttribute('data-delay') || '0s';
            entry.target.style.transitionDelay = delay;
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


(function () {
  const track    = document.getElementById('track');
  const dotsWrap = document.getElementById('dots');
  const progEl   = document.getElementById('prog');
  const viewport = track.parentElement;
  const AUTO_MS  = 4000;
 
  let current  = 0;
  let timer    = null;
  let visCount = 3; // updated on resize
 
  /* Add top padding to viewport so floating images aren't clipped */
  viewport.style.paddingTop = '75px';
  viewport.style.marginTop  = '-75px';
 
  function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 540) return 1;
    if (w <= 860) return 2;
    return 3;
  }
 
  function getStep() {
    const card = track.children[0];
    const gap  = parseFloat(getComputedStyle(track).gap) || 28;
    return card.offsetWidth + gap;
  }
 
  const cards    = Array.from(track.children);
  const total    = cards.length;
 
  function maxIdx() { return Math.max(0, total - visCount); }
 
  function goTo(n) {
    current = Math.max(0, Math.min(n, maxIdx()));
    track.style.transform = `translateX(-${current * getStep()}px)`;
    updateDots();
    restartProgress();
    resetTimer();
  }
 
  /* ── Dots ── */
  function buildDots() {
    dotsWrap.innerHTML = '';
    const pages = maxIdx() + 1;
    for (let i = 0; i < pages; i++) {
      const btn = document.createElement('button');
      btn.className = 'dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }
 
  function updateDots() {
    Array.from(dotsWrap.children).forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }
 
  /* ── Progress ── */
  function restartProgress() {
    progEl.style.animation = 'none';
    void progEl.offsetWidth;
    progEl.style.animation = `prog ${AUTO_MS}ms linear forwards`;
  }
 
  /* ── Autoplay ── */
  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => goTo(current < maxIdx() ? current + 1 : 0), AUTO_MS);
  }
 
  /* ── Touch swipe ── */
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
 
  /* ── Resize ── */
  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      visCount = getVisibleCount();
      buildDots();
      goTo(Math.min(current, maxIdx()));
    }, 120);
  });
 
  /* ── Init ── */
  visCount = getVisibleCount();
  buildDots();
  goTo(0);
})();
 
/* ── Scroll-triggered entry animations ── */
(function () {
  const section = document.querySelector('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('in-view');
        observer.disconnect();
      }
    });
  }, { threshold: 0.15 });
  observer.observe(section);
})();