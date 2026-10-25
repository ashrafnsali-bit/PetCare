/* ===================================================================
   PETCARE ANDROID APP - MAIN INTERACTIVE LOGIC
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Setup notification bell
  const btnNotifications = document.getElementById('btn-notifications');
  if (btnNotifications) {
    btnNotifications.addEventListener('click', () => {
      alert('🔔 إشعارات PetCare:\n1. تذكير: موعد تطعيم السعار السنوي لـ روكي بعد 3 أيام.\n2. خصم 20% على منتجات المتجر لمشتركي باقات Wellness!');
    });
  }

  // Setup user avatar click
  const avatarBtn = document.getElementById('user-avatar-btn');
  if (avatarBtn) {
    avatarBtn.addEventListener('click', () => {
      switchTab('profile');
    });
  }
});

// Switch Tab
function switchTab(tabName) {
  // Hide all tab views
  const views = document.querySelectorAll('.tab-content-view');
  views.forEach(v => v.classList.remove('active-view'));

  // Remove active from all nav items
  const navItems = document.querySelectorAll('.nav-tab-item');
  navItems.forEach(n => n.classList.remove('active'));

  // Show selected view
  const targetView = document.getElementById('view-' + tabName);
  const targetNav = document.getElementById('tab-btn-' + tabName);

  if (targetView) {
    targetView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (targetNav) {
    targetNav.classList.add('active');
  }
}

// Toggle Wellness Plan (Single vs Multi)
function showPlan(type) {
  const btnSingle = document.getElementById('btn-plan-single');
  const btnMulti = document.getElementById('btn-plan-multi');
  const boxSingle = document.getElementById('box-plan-single');
  const boxMulti = document.getElementById('box-plan-multi');

  if (type === 'single') {
    btnSingle.classList.add('active');
    btnMulti.classList.remove('active');
    boxSingle.style.display = 'block';
    boxMulti.style.display = 'none';
  } else {
    btnMulti.classList.add('active');
    btnSingle.classList.remove('active');
    boxMulti.style.display = 'block';
    boxSingle.style.display = 'none';
  }
}

// Scroll to Wellness section
function scrollToWellness() {
  switchTab('home');
  const wellnessSec = document.getElementById('section-wellness-preview');
  if (wellnessSec) {
    wellnessSec.scrollIntoView({ behavior: 'smooth' });
  }
}

// Open Subscription Modal
function openSubscriptionModal(type = 'single') {
  const modal = document.getElementById('modal-subscription');
  const title = document.getElementById('modal-sub-title');
  if (title) {
    if (type === 'multi') {
      title.innerText = 'باقة العائلات (Multi-Pet) - 149 ر.س / شهرياً';
    } else {
      title.innerText = 'باقة الأفراد (Single-Pet) - 89 ر.س / شهرياً';
    }
  }
  if (modal) modal.classList.add('open');
}

// Open Clinic Modal
function openClinicModal() {
  const modal = document.getElementById('modal-clinic');
  if (modal) modal.classList.add('open');
}

// Open Grooming Modal
function openGroomingModal() {
  alert('✂️ خدمات Grooming المتنقلة:\nيمكنك طلب صالون العناية والنظافة المتنقل ليصل عند باب منزلك مع كامل أدوات التعقيم وحلاقة متخصصة لروكي.');
}

// Open Community Modal
function openCommunityModal() {
  alert('🤝 مجتمع PetCare:\n- منصة تبني الحيوانات الأليفة الرسمية\n- شبكة البحث عن الأليف المفقود مع تنبيهات للأعضاء في نفس الحي\n- استشارات ونصائح بين المربين');
}

// Open Appointment Details
function openAppointmentDetails() {
  alert('📅 تفاصيل الموعد:\nالعيادة: عيادة النخبة البيطرية\nالتاريخ: 28 أكتوبر 2026 • 05:30 مساءً\nالخدمة: كشف دوري شامل + تطعيم السداسي السنوي\nالطبيب: د. فهد الشمري\nالحالة: مؤكد ومجدول ✓');
}

// Close All Modals
function closeAllModals(e) {
  if (e && e.target !== e.currentTarget) return;
  const modals = document.querySelectorAll('.mobile-modal-overlay');
  modals.forEach(m => m.classList.remove('open'));
}

// Confirm Subscription
function confirmSubscription() {
  alert('🎉 تهانينا يا سلمان!\nتم تفعيل اشتراكك في باقة الرعاية الصحية بنجاح.\nتم حفظ ملف روكي وتطبيق خصم 15% على مشترياتك القادمة!');
  closeAllModals();
}

// Book Clinic
function bookClinic(name) {
  alert(`✅ تم تأكيد طلب الحجز لدى ${name} بنجاح!\nسيتواصل معك المركز لتأكيد الساعة المناسبة.`);
  closeAllModals();
}
