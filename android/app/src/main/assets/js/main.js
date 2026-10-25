/**
 * PetCare Landing Page Interactive Logic & Smart Redirects
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmartLinks();
  initPricingToggle();
  initFaqAccordion();
  initModals();
  initContactForm();
  initPartnerForm();
  initMobileMenu();
  initInteractiveMockup();
  initLanguageToggle();
  initScrollEffects();
});

// Store URLs (configured for app store releases)
const STORE_LINKS = {
  ios: 'https://apps.apple.com/app/petcare-app/id1680000000',
  android: 'https://play.google.com/store/apps/details?id=com.petcare.app',
  web: '#download'
};

/**
 * Detect Device and handle Smart Link routing
 */
function getDeviceType() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    return 'ios';
  }
  if (/android/i.test(ua)) {
    return 'android';
  }
  return 'desktop';
}

function initSmartLinks() {
  const device = getDeviceType();
  const urlParams = new URLSearchParams(window.location.search);
  const autoRedirect = urlParams.get('auto') === '1' || urlParams.get('redirect') === '1';

  // Update device badge in QR modal
  const devBadge = document.getElementById('detected-device-text');
  if (devBadge) {
    if (device === 'ios') {
      devBadge.textContent = 'تم اكتشاف جهازك: Apple iOS (iPhone/iPad)';
    } else if (device === 'android') {
      devBadge.textContent = 'تم اكتشاف جهازك: Android (جوجل بلاي)';
    } else {
      devBadge.textContent = 'جهاز كمبيوتر مكتبي (امسح الرمز بالجوال للتحميل السريع)';
    }
  }

  // If user arrived from social media smart link with ?auto=1
  if (autoRedirect) {
    if (device === 'ios') {
      window.location.href = STORE_LINKS.ios;
      return;
    } else if (device === 'android') {
      window.location.href = STORE_LINKS.android;
      return;
    }
  }

  // Handle all smart download buttons
  const smartBtns = document.querySelectorAll('.js-smart-download');
  smartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (device === 'ios') {
        window.open(STORE_LINKS.ios, '_blank');
      } else if (device === 'android') {
        window.open(STORE_LINKS.android, '_blank');
      } else {
        openModal('qr-modal');
      }
    });
  });
}

/**
 * Wellness Pricing Switch (Monthly vs Yearly)
 */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelYearly = document.getElementById('label-yearly');

  const singlePrice = document.getElementById('price-single');
  const singlePeriod = document.getElementById('period-single');
  const familyPrice = document.getElementById('price-family');
  const familyPeriod = document.getElementById('period-family');

  if (!toggle) return;

  let isYearly = false;

  const updatePrices = () => {
    if (isYearly) {
      toggle.classList.add('yearly-active');
      labelYearly.classList.add('active');
      labelMonthly.classList.remove('active');

      if (singlePrice) singlePrice.textContent = '790';
      if (singlePeriod) singlePeriod.textContent = '/ سنوياً (شهران مجاناً)';
      if (familyPrice) familyPrice.textContent = '1,490';
      if (familyPeriod) familyPeriod.textContent = '/ سنوياً (شهران مجاناً)';
    } else {
      toggle.classList.remove('yearly-active');
      labelMonthly.classList.add('active');
      labelYearly.classList.remove('active');

      if (singlePrice) singlePrice.textContent = '79';
      if (singlePeriod) singlePeriod.textContent = '/ شهرياً';
      if (familyPrice) familyPrice.textContent = '149';
      if (familyPeriod) familyPeriod.textContent = '/ شهرياً';
    }
  };

  toggle.addEventListener('click', () => {
    isYearly = !isYearly;
    updatePrices();
  });

  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => {
      isYearly = false;
      updatePrices();
    });
  }

  if (labelYearly) {
    labelYearly.addEventListener('click', () => {
      isYearly = true;
      updatePrices();
    });
  }
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherBody = other.querySelector('.faq-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 30 + 'px';
      }
    });
  });

  // Open first by default
  if (faqItems[0]) {
    faqItems[0].classList.add('active');
    const firstBody = faqItems[0].querySelector('.faq-body');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 30 + 'px';
  }
}

/**
 * Modals Management
 */
function initModals() {
  // Modal openers
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });

  // Modal closers
  document.querySelectorAll('.btn-modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        closeAllModals();
      }
    });
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

/**
 * Contact & Support Form Handling
 */
function initContactForm() {
  const form = document.getElementById('contact-support-form');
  const feedback = document.getElementById('contact-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'جاري الإرسال...';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'إرسال الرسالة';
      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = '✅ تم استلام رسالتك بنجاح! رقم تذكرتك: #PC-' + Math.floor(100000 + Math.random() * 900000) + ' وسيقوم فريق الدعم بالتواصل معك خلال ساعتين.';
      }
      form.reset();
    }, 900);
  });
}

/**
 * Partner Clinic Form Handling
 */
function initPartnerForm() {
  const form = document.getElementById('partner-join-form');
  const feedback = document.getElementById('partner-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'جاري تسجيل الطلب...';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'إرسال طلب الانضمام';
      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = '🎉 شكراً لاهتمامكم بالانضمام لشبكة PetCare! سيتواصل معكم مدير شراكات العيادات لاعتماد المركز وبدء استقبال الحجوزات.';
      }
      form.reset();
    }, 900);
  });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isShowing = navLinks.style.display === 'flex';
    if (isShowing) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '82px';
      navLinks.style.right = '0';
      navLinks.style.left = '0';
      navLinks.style.background = 'white';
      navLinks.style.flexDirection = 'column';
      navLinks.style.padding = '24px';
      navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      navLinks.style.borderBottom = '1px solid var(--border-light)';
    }
  });

  // Close menu when clicking link
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
      }
    });
  });
}

/**
 * Interactive Mobile Mockup inside Hero
 */
function initInteractiveMockup() {
  const serviceButtons = document.querySelectorAll('.mock-service-btn');
  const petName = document.querySelector('.mock-pet-info h4');
  const statusBadge = document.querySelector('.mock-pet-status');

  const alerts = [
    { title: 'العيادات البيطرية', msg: 'تم حجز موعد كشف دوري عند د. سارة 🩺' },
    { title: 'العناية Grooming', msg: 'تم طلب باقة الحلاقة والاستحمام المنزلي 🛁' },
    { title: 'متجر الأليف', msg: 'أضيف طعام صحي ومكافآت إلى السلة 🦴' },
    { title: 'باقة الرعاية', msg: 'أنت مشترك في باقة العائلة - وفرت 450 ر.س ✨' }
  ];

  serviceButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (statusBadge && alerts[idx]) {
        statusBadge.textContent = alerts[idx].msg;
        statusBadge.style.backgroundColor = '#ffffff';
        statusBadge.style.color = '#03a691';
        setTimeout(() => {
          statusBadge.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
          statusBadge.style.color = '#ffffff';
        }, 3000);
      }
    });
  });
}

/**
 * Language Switcher (Arabic <-> English)
 */
function initLanguageToggle() {
  const langBtn = document.getElementById('btn-lang-toggle');
  if (!langBtn) return;

  let currentLang = 'ar';

  langBtn.addEventListener('click', () => {
    if (currentLang === 'ar') {
      currentLang = 'en';
      document.body.classList.add('ltr');
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      langBtn.innerHTML = '<span class="lang-icon">🇸🇦</span> <span class="lang-text">العربية</span>';
      applyEnglishTranslations();
    } else {
      currentLang = 'ar';
      document.body.classList.remove('ltr');
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      langBtn.innerHTML = '<span class="lang-icon">🌐</span> <span class="lang-text">English</span>';
      applyArabicTranslations();
    }
  });
}

function applyEnglishTranslations() {
  document.querySelectorAll('[data-en]').forEach(el => {
    if (!el.dataset.ar) {
      el.dataset.ar = el.innerHTML;
    }
    el.innerHTML = el.dataset.en;
  });
}

function applyArabicTranslations() {
  document.querySelectorAll('[data-ar]').forEach(el => {
    el.innerHTML = el.dataset.ar;
  });
}

/**
 * Header Scroll Shadow Effect
 */
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}
