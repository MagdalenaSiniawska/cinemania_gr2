/ ==================== Navigation Highlighting ====================
const navLinks = document.querySelectorAll('.nav_link');
const mobNavLinks = document.querySelectorAll('.mobile-nav-list .nav_link');
const currentUrl = window.location.href;

navLinks.forEach(link => {
  if (link.href === currentUrl) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

mobNavLinks.forEach(link => {
  if (link.href === currentUrl) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ==================== Mobile Menu Toggle ====================
const menuButton = document.getElementById('menu');
const modal = document.getElementById('modal');
const backdrop = document.getElementById('backdrop');

menuButton.addEventListener('click', function () {
  modal.classList.add('open');
  backdrop.style.display = 'block';
});

backdrop.addEventListener('click', function (event) {
  if (event.target === backdrop) {
    modal.classList.remove('open');
    backdrop.style.display = 'none';
  }
});

document.addEventListener('click', function (event) {
  if (!modal.contains(event.target) && event.target !== menuButton) {
    modal.classList.remove('open');
    backdrop.style.display = 'none';
  }
});

// ==================== Theme Toggle ====================
const body = document.querySelector('body');
const toggle = document.querySelector('.toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  enableLightTheme();
} else {
  enableDarkTheme();
}

toggle.addEventListener('click', () => {
  if (body.classList.contains('white')) {
    enableDarkTheme();
    localStorage.setItem('theme', 'dark');
  } else {
    enableLightTheme();
    localStorage.setItem('theme', 'light');
  }
});

function enableLightTheme() {
  body.classList.add('white');
  toggle.classList.add('active');
}

function enableDarkTheme() {
  body.classList.remove('white');
  toggle.classList.remove('active');
}

// ==================== Team Modal ====================
const teamLink = document.querySelector('.footer__link');
const teamBackdrop = document.querySelector('.team__backdrop');
const teamCloseBtn = document.querySelector('.team__modal-close-btn');

if (teamLink && teamBackdrop && teamCloseBtn) {
  function onLinkClick(event) {
    event.preventDefault();
    teamBackdrop.classList.remove('is-hidden');
    document.body.classList.add('modal-open');
    addAllEventListeners();
  }

  function onEscClick(event) {
    if (event.code === 'Escape') {
      closeTeamModal();
    }
  }

  function onBackdropClick(event) {
    if (!event.target.closest('.team__wrapper')) {
      closeTeamModal();
    }
  }

  function onCloseBtnClick(event) {
    event.preventDefault();
    closeTeamModal();
  }

  function addAllEventListeners() {
    document.addEventListener('keydown', onEscClick);
    teamBackdrop.addEventListener('click', onBackdropClick);
    teamClose