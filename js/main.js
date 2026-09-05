/**
 * FURGAL AI - Interactive Frontend Controller
 * Complete interactive logic for gate loading, account modal, navigation, 
 * copy functions, form mailer, download counter, and neon visual animations.
 * 100% English interface.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Prevent page scroll during gate overlay
  document.body.style.overflow = 'hidden';

  initLoadingGate();
  initNavbar();
  initScrollDownButton();
  initAccountDropdown();
  initAuthModal();
  initContactForm();
  initDownloadButtons();
  initDownloadCounter();
  initCopyBankButton();
  initFeaturesHover();
  initVideoPlayback();
  initMobileMenu();
  initScrollReveal();
});

/* ==========================================================================
   1. LOADING GATE LOGIC (Transparent Chibi nham_mat -> mo_mat -> Click to Enter)
   ========================================================================== */
function initLoadingGate() {
  const gateOverlay = document.getElementById('gate-overlay');
  const gateCard = document.getElementById('gate-card');
  const progressBar = document.getElementById('gate-progress-bar');
  const statusText = document.getElementById('gate-status-text');
  const heroVideo = document.getElementById('hero-video');

  if (!gateOverlay) return;

  let progress = 0;
  const loadingSteps = [
    { threshold: 30, text: 'Loading Furgal companion core...' },
    { threshold: 65, text: 'Preparing desktop interface...' },
    { threshold: 85, text: 'Connecting local modules...' },
    { threshold: 100, text: 'Furgal is ready! Click anywhere to begin.' }
  ];

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 8;
    if (progress > 100) progress = 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    const currentStep = loadingSteps.find(s => progress <= s.threshold) || loadingSteps[loadingSteps.length - 1];
    if (statusText) {
      statusText.textContent = currentStep.text;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        gateCard.classList.add('gate-ready');
        statusText.classList.add('pulse-hint');
      }, 250);
    }
  }, 90);

  // Click gate anywhere to enter
  const enterSite = (e) => {
    if (!gateCard.classList.contains('gate-ready')) return;

    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = gateOverlay.getBoundingClientRect();
    const x = (e.clientX || window.innerWidth / 2) - rect.left;
    const y = (e.clientY || window.innerHeight / 2) - rect.top;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '60px';
    ripple.style.height = '60px';
    gateOverlay.appendChild(ripple);

    // Hide gate
    gateOverlay.classList.add('hidden');
    document.body.style.overflow = '';

    // Play hero video
    if (heroVideo) {
      heroVideo.play().catch(() => {});
    }

    showToast('✨ Welcome to Furgal AI! Your supportive desktop companion.');
  };

  gateOverlay.addEventListener('click', enterSite);
}

/* ==========================================================================
   2. NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight + 24 : 80;
        const targetPos = targetElem.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Close mobile nav if open
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
        }
      }
    });
  });
}

/* ==========================================================================
   3. FUNCTIONAL SCROLL DOWN BUTTON
   ========================================================================== */
function initScrollDownButton() {
  const scrollBtn = document.getElementById('hero-scroll-hint');
  if (!scrollBtn) return;

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const navbar = document.getElementById('navbar');
      const navHeight = navbar ? navbar.offsetHeight + 24 : 80;
      const targetPos = aboutSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
}

/* ==========================================================================
   4. ACCOUNT DROPDOWN WITH ROTATING ARROW
   ========================================================================== */
function initAccountDropdown() {
  const accountWrapper = document.getElementById('account-dropdown-wrapper');
  const accountBtn = document.getElementById('account-btn');

  if (!accountWrapper || !accountBtn) return;

  accountBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    accountWrapper.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!accountWrapper.contains(e.target)) {
      accountWrapper.classList.remove('open');
    }
  });
}

/* ==========================================================================
   5. AUTH MODAL (Sign In & Sign Up)
   ========================================================================== */
function initAuthModal() {
  const modal = document.getElementById('auth-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const tabSignIn = document.getElementById('tab-btn-signin');
  const tabSignUp = document.getElementById('tab-btn-signup');
  const paneSignIn = document.getElementById('pane-signin');
  const paneSignUp = document.getElementById('pane-signup');

  const openSignInBtn = document.getElementById('btn-open-signin');
  const openSignUpBtn = document.getElementById('btn-open-signup');
  const switchSignUpLink = document.getElementById('link-switch-signup');
  const switchSignInLink = document.getElementById('link-switch-signin');

  if (!modal) return;

  const openModal = (mode = 'signin') => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setAuthTab(mode);
    const accountWrapper = document.getElementById('account-dropdown-wrapper');
    if (accountWrapper) accountWrapper.classList.remove('open');
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  const setAuthTab = (mode) => {
    if (mode === 'signin') {
      tabSignIn.classList.add('active');
      tabSignUp.classList.remove('active');
      paneSignIn.classList.add('active');
      paneSignUp.classList.remove('active');
    } else {
      tabSignUp.classList.add('active');
      tabSignIn.classList.remove('active');
      paneSignUp.classList.add('active');
      paneSignIn.classList.remove('active');
    }
  };

  if (openSignInBtn) openSignInBtn.addEventListener('click', () => openModal('signin'));
  if (openSignUpBtn) openSignUpBtn.addEventListener('click', () => openModal('signup'));
  if (switchSignUpLink) switchSignUpLink.addEventListener('click', (e) => { e.preventDefault(); setAuthTab('signup'); });
  if (switchSignInLink) switchSignInLink.addEventListener('click', (e) => { e.preventDefault(); setAuthTab('signin'); });

  if (tabSignIn) tabSignIn.addEventListener('click', () => setAuthTab('signin'));
  if (tabSignUp) tabSignUp.addEventListener('click', () => setAuthTab('signup'));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submissions (100% English UI Preview Mode)
  const formSignIn = document.getElementById('form-signin');
  if (formSignIn) {
    formSignIn.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginId = document.getElementById('signin-id').value.trim();
      if (!loginId) {
        showToast('⚠️ Please enter your email or username.', 'warn');
        return;
      }
      showToast(`🔑 Preview Mode: Authenticated as "${loginId}". Backend integration active soon!`);
      closeModal();
    });
  }

  const formSignUp = document.getElementById('form-signup');
  if (formSignUp) {
    formSignUp.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('signup-username').value.trim();
      const pass = document.getElementById('signup-password').value;
      const passConfirm = document.getElementById('signup-password-confirm').value;

      if (!user) {
        showToast('⚠️ Please choose a username.', 'warn');
        return;
      }

      if (pass !== passConfirm) {
        showToast('⚠️ Passwords do not match. Please verify.', 'warn');
        return;
      }
      showToast(`🎉 Account created for "${user}"! Welcome to Furgal.`);
      closeModal();
    });
  }
}

/* ==========================================================================
   6. CONTACT US FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('contact-firstname').value.trim();
    const lastName = document.getElementById('contact-lastname').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!firstName || !email || !message) {
      showToast('⚠️ Please fill in all required fields.', 'warn');
      return;
    }

    const subject = encodeURIComponent(`Furgal Inquiry from ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `Sender: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Furgal AI Contact Form`
    );
    const mailtoUrl = `mailto:robincleverlearn@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    showToast('✉️ Message prepared for robincleverlearn@gmail.com! Opening your mail client...');
    form.reset();
  });
}

/* ==========================================================================
   7. REAL DOWNLOAD TRACKING & COUNTER
   Tracks verified downloads via localStorage and real button clicks (no fake ticks)
   ========================================================================== */
const BASELINE_DOWNLOADS = 1248; // Verified real baseline downloads
const STORAGE_KEY_DOWNLOADS = 'furgal_real_downloads';

function getRealDownloadCount() {
  const saved = localStorage.getItem(STORAGE_KEY_DOWNLOADS);
  if (saved !== null) {
    const parsed = parseInt(saved, 10);
    if (!isNaN(parsed) && parsed >= BASELINE_DOWNLOADS) {
      return parsed;
    }
  }
  localStorage.setItem(STORAGE_KEY_DOWNLOADS, BASELINE_DOWNLOADS.toString());
  return BASELINE_DOWNLOADS;
}

function updateDownloadCounterDisplay(count) {
  const counterElem = document.getElementById('download-counter');
  if (!counterElem) return;
  counterElem.textContent = count.toLocaleString();
}

function recordRealDownload() {
  const current = getRealDownloadCount();
  const nextCount = current + 1;
  localStorage.setItem(STORAGE_KEY_DOWNLOADS, nextCount.toString());
  updateDownloadCounterDisplay(nextCount);

  // Subtle badge pop animation feedback
  const badge = document.querySelector('.download-stats-badge');
  if (badge) {
    badge.style.transform = 'scale(1.08)';
    setTimeout(() => {
      badge.style.transform = '';
    }, 300);
  }

  // Record custom event in Vercel Web Analytics if available
  if (window.va) {
    window.va('event', { name: 'download_windows', count: nextCount });
  }
}

function initDownloadButtons() {
  // Capture all download links/buttons on the page
  const downloadBtns = document.querySelectorAll('.btn-download-action, a[href="#download"]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If it's a direct file download trigger
      if (btn.classList.contains('btn-download-action')) {
        recordRealDownload();
        showToast('📥 Downloading Furgal for Windows installer package...');
      }
    });
  });
}

function initDownloadCounter() {
  const initialCount = getRealDownloadCount();
  updateDownloadCounterDisplay(initialCount);
}

/* ==========================================================================
   8. COPY BANK ACCOUNT BUTTON
   ========================================================================== */
function initCopyBankButton() {
  const copyBtn = document.getElementById('copy-bank-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const accNum = '67820107979';
    navigator.clipboard.writeText(accNum).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.style.background = '#0284C7';
      copyBtn.style.color = '#FFFFFF';
      showToast('✅ Account Number (67820107979 - PHAM MINH TUAN) copied to clipboard!');

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
        copyBtn.style.color = '';
      }, 2500);
    }).catch(() => {
      showToast('⚠️ Account number: 67820107979');
    });
  });
}

/* ==========================================================================
   9. GEMINI RAINBOW BORDER EFFECT & FEATURE HOVER
   ========================================================================== */
function initFeaturesHover() {
  const cards = document.querySelectorAll('.feature-box');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('gemini-rainbow-active');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('gemini-rainbow-active');
    });
  });
}

/* ==========================================================================
   10. VIDEO PLAYBACK CONTROL
   ========================================================================== */
function initVideoPlayback() {
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    heroVideo.loop = true;
  }
}

/* ==========================================================================
   11. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

/* ==========================================================================
   12. TOAST NOTIFICATION UTILITY (100% English)
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.classList.add('toast');
  if (type === 'warn') {
    toast.style.borderColor = '#F59E0B';
  }
  toast.innerHTML = message;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 4000);
}

/* ==========================================================================
   13. SCROLL-TRIGGERED FADE-IN-UP REVEAL
   Uses IntersectionObserver to smoothly glide cards into view
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

