/**
 * FURGAL AI - Interactive Frontend Controller
 * Complete interactive logic for gate loading, account modal, navigation, 
 * copy functions, form mailer, and neon visual animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Prevent page scroll during gate overlay
  document.body.style.overflow = 'hidden';

  initLoadingGate();
  initNavbar();
  initAccountDropdown();
  initAuthModal();
  initContactForm();
  initDownloadButtons();
  initCopyBankButton();
  initFeaturesHover();
  initVideoPlayback();
  initMobileMenu();
});

/* ==========================================================================
   1. LOADING GATE LOGIC (nham_mat -> mo_mat -> Click to Enter)
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
    { threshold: 25, text: 'Synchronizing neural models...' },
    { threshold: 60, text: 'Calibrating multi-modal vision...' },
    { threshold: 85, text: 'Connecting high-speed inference...' },
    { threshold: 100, text: 'Furgal AI is ready! Click to enter.' }
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
      }, 300);
    }
  }, 100);

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

    // Play all visible feature videos
    document.querySelectorAll('.zigzag-media-wrapper video').forEach(v => {
      v.play().catch(() => {});
    });

    showToast('✨ Welcome to Furgal AI! Explore the future of neural intelligence.');
  };

  gateOverlay.addEventListener('click', enterSite);
}

/* ==========================================================================
   2. NAVBAR & SMOOTH SCROLL
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
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
        const navHeight = navbar ? navbar.offsetHeight : 80;
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
   3. ACCOUNT DROPDOWN WITH ROTATING ARROW
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
   4. AUTH MODAL (Sign In & Sign Up)
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
    // Close dropdown
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

  // Handle Form Submissions (UI Preview Mode)
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
   5. CONTACT US FORM
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

    // Format mailto link to robincleverlearn@gmail.com
    const subject = encodeURIComponent(`Furgal Inquiry from ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `Sender: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Furgal AI Contact Form`
    );
    const mailtoUrl = `mailto:robincleverlearn@gmail.com?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoUrl;

    showToast('✉️ Message prepared for robincleverlearn@gmail.com! Opening your mail client...');
    form.reset();
  });
}

/* ==========================================================================
   6. DOWNLOAD BUTTONS
   ========================================================================== */
function initDownloadButtons() {
  const downloadBtns = document.querySelectorAll('.btn-download-action');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('📥 Downloading Furgal test file... (d:/WebsiteDemo/TunaWebsite/downloads/)');
    });
  });
}

/* ==========================================================================
   7. COPY BANK ACCOUNT BUTTON
   ========================================================================== */
function initCopyBankButton() {
  const copyBtn = document.getElementById('copy-bank-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const accNum = '0973669611';
    navigator.clipboard.writeText(accNum).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.style.background = '#0284C7';
      copyBtn.style.color = '#FFFFFF';
      showToast('✅ Bank Account number (0973669611) copied to clipboard!');

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
        copyBtn.style.color = '';
      }, 2500);
    }).catch(() => {
      showToast('⚠️ Could not copy automatically. Number: 0973669611');
    });
  });
}

/* ==========================================================================
   8. GEMINI RAINBOW BORDER EFFECT & FEATURE HOVER
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
   9. VIDEO PLAYBACK CONTROL
   ========================================================================== */
function initVideoPlayback() {
  const videos = document.querySelectorAll('video');
  videos.forEach(v => {
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
  });

  // Intersection observer to auto-play when visible
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });

    videos.forEach(v => observer.observe(v));
  }
}

/* ==========================================================================
   10. MOBILE MENU TOGGLE
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
   11. TOAST NOTIFICATION UTILITY
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
