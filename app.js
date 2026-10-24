const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const servicesNavItem = document.querySelector('.services-nav-item');
const servicesMenuToggle = document.querySelector('.services-menu-toggle');
const servicesMenu = document.querySelector('#services-menu');
const heroImages = [...document.querySelectorAll('.hero-visual .hero-image')];
const heroDots = [...document.querySelectorAll('.hero-dot')];
const heroContent = document.querySelector('.hero-content');
const heroEyebrow = document.querySelector('.hero-content .eyebrow [data-fr]');
const heroHeading = document.querySelector('.hero-content h1');
const heroLead = document.querySelector('.hero-content .hero-lead');
const heroNote = document.querySelector('.hero-content .hero-note span:last-child');
const heroSlides = [
  {
    eyebrow: ['FOURNISSEUR D’ACCÈS INTERNET · RDC', 'INTERNET SERVICE PROVIDER · DRC'],
    heading: ['Bienvenue chez<br><em>COMFORT TECHNOLOGIES COTEC.</em>', 'Welcome to<br><em>COMFORT TECHNOLOGIES COTEC.</em>'],
    lead: ['Internet haut débit et installations fiables, pensés pour les maisons, commerces et entreprises de Butembo et du Nord-Kivu.', 'High-speed internet and reliable installations for homes, businesses and organizations in Butembo and North Kivu.'],
    note: ['Votre connexion, notre priorité.', 'Your connection is our priority.']
  },
  {
    eyebrow: ['COMFORT TECHNOLOGIES COTEC', 'COMFORT TECHNOLOGIES COTEC'],
    heading: ['Votre partenaire<br><em>en connectivité.</em>', 'Your connectivity<br><em>partner.</em>'],
    lead: ['Au cœur de Butembo, dans le Nord-Kivu, nous rapprochons les personnes et les idées grâce à une technologie accessible et un service de proximité.', 'In the heart of Butembo, North Kivu, we bring people and ideas closer with accessible technology and attentive local support.'],
    note: ['Ensemble, construisons votre connexion.', 'Let’s build your connection together.']
  },
  {
    eyebrow: ['FOURNISSEUR D’ACCÈS INTERNET · RDC', 'INTERNET SERVICE PROVIDER · DRC'],
    heading: ['La RDC mérite<br><em>d’être connectée.</em>', 'The DRC deserves<br><em>to be connected.</em>'],
    lead: ['COMFORT TECHNOLOGIES COTEC vous accompagne avec des solutions Internet fiables, à la maison comme au travail.', 'COMFORT TECHNOLOGIES COTEC brings reliable internet solutions to your home and workplace.'],
    note: ['Le haut débit, plus près de vous.', 'High-speed internet, closer to you.']
  },
  {
    eyebrow: ['INSTALLATION · CONFIGURATION · ASSISTANCE', 'INSTALLATION · SETUP · SUPPORT'],
    heading: ['Le bon signal,<br><em>au bon endroit.</em>', 'The right signal,<br><em>right where you need it.</em>'],
    lead: ['Starlink, LiteBeam, NanoStation ou Cambium : nos techniciens installent des équipements adaptés à votre terrain.', 'Starlink, LiteBeam, NanoStation or Cambium: our technicians install equipment suited to your site.'],
    note: ['Du matériel bien posé. Un réseau bien pensé.', 'Installed with care. Designed to perform.']
  },
  {
    eyebrow: ['CONNECTIVITÉ · RÉSEAUX · ÉNERGIE', 'CONNECTIVITY · NETWORKS · ENERGY'],
    heading: ['L’énergie avance.<br><em>Votre réseau aussi.</em>', 'Powering progress.<br><em>Keeping you connected.</em>'],
    lead: ['Internet, Wi-Fi et solutions solaires : équipez votre maison ou votre entreprise pour aller plus loin.', 'Internet, Wi-Fi and solar solutions: equip your home or business to go further.'],
    note: ['Connectés à votre avenir.', 'Connected to your future.']
  },
  {
    eyebrow: ['COTEC · AU CŒUR DU NORD-KIVU', 'COTEC · AT THE HEART OF NORTH KIVU'],
    heading: ['La connexion qui<br><em>nous rapproche.</em>', 'Connectivity that<br><em>brings us closer.</em>'],
    lead: ['Des solutions Internet et réseau pensées pour les habitants et les entreprises de Butembo.', 'Internet and networking solutions designed for the people and businesses of Butembo.'],
    note: ['Ensemble, restons connectés.', 'Together, let’s stay connected.']
  }
];
let activeHeroSlide = 0;

function renderHeroSlide(index) {
  activeHeroSlide = index;
  const slide = heroSlides[index];
  const languageIndex = document.documentElement.lang === 'en' ? 1 : 0;
  [[heroEyebrow, slide.eyebrow], [heroHeading, slide.heading], [heroLead, slide.lead], [heroNote, slide.note]].forEach(([element, translations]) => {
    element.dataset.fr = translations[0];
    element.dataset.en = translations[1];
    element.innerHTML = translations[languageIndex];
  });
  heroImages.forEach((image, imageIndex) => {
    const isActive = imageIndex === index;
    if (isActive && image.dataset.src) {
      image.src = image.dataset.src;
      delete image.dataset.src;
    }
    image.classList.toggle('is-active', isActive);
  });
  heroContent.classList.toggle('hero-welcome', index === 0);
  heroContent.classList.toggle('hero-brand-only', index === 1);
  heroContent.classList.remove('hero-copy-refresh');
  void heroContent.offsetWidth;
  heroContent.classList.add('hero-copy-refresh');
  heroDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-pressed', String(isActive));
  });
}

heroDots.forEach((dot, index) => dot.addEventListener('click', () => {
  renderHeroSlide(index);
  nextHeroChangeAt = Date.now() + heroSlideDuration;
  startHeroTimer();
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let heroTimer;
const heroSlideDuration = 5500;
let nextHeroChangeAt = 0;
let heroCarouselStarted = false;

function startHeroTimer() {
  window.clearInterval(heroTimer);
  if (!heroCarouselStarted) return;
  const now = Date.now();
  if (now >= nextHeroChangeAt) {
    const elapsedSlides = Math.floor((now - nextHeroChangeAt) / heroSlideDuration) + 1;
    renderHeroSlide((activeHeroSlide + elapsedSlides) % heroSlides.length);
    nextHeroChangeAt += elapsedSlides * heroSlideDuration;
  }
  if (document.hidden) return;
  heroTimer = window.setInterval(() => {
    const currentTime = Date.now();
    if (currentTime < nextHeroChangeAt) return;
    const elapsedSlides = Math.floor((currentTime - nextHeroChangeAt) / heroSlideDuration) + 1;
    renderHeroSlide((activeHeroSlide + elapsedSlides) % heroSlides.length);
    nextHeroChangeAt += elapsedSlides * heroSlideDuration;
  }, 250);
}

document.addEventListener('visibilitychange', startHeroTimer);
reduceMotion.addEventListener?.('change', startHeroTimer);
renderHeroSlide(0);

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
  mainNav.classList.toggle('open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
  });
});

function setServicesMenuOpen(isOpen) {
  servicesMenuToggle.setAttribute('aria-expanded', String(isOpen));
  servicesMenu.hidden = !isOpen;
}

const servicesMenuCanHover = window.matchMedia('(hover: hover) and (pointer: fine)');

servicesNavItem.addEventListener('pointerenter', (event) => {
  if (servicesMenuCanHover.matches && event.pointerType !== 'touch') setServicesMenuOpen(true);
});

servicesNavItem.addEventListener('pointerleave', (event) => {
  if (servicesMenuCanHover.matches && event.pointerType !== 'touch') setServicesMenuOpen(false);
});

servicesMenuToggle.addEventListener('focus', () => setServicesMenuOpen(true));
servicesNavItem.addEventListener('focusout', (event) => {
  if (!servicesNavItem.contains(event.relatedTarget)) setServicesMenuOpen(false);
});

servicesMenuToggle.addEventListener('click', (event) => {
  if (servicesMenuCanHover.matches && event.detail !== 0) return;
  setServicesMenuOpen(servicesMenuToggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.services-nav-item')) setServicesMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setServicesMenuOpen(false);
});

servicesMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    setServicesMenuOpen(false);
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
  });
});

const finderTabs = [...document.querySelectorAll('.finder-tab')];
const finderForm = document.querySelector('#equipment-finder-form');
const finderTypeSelect = finderForm.querySelector('select[name="requestType"]');
const finderTypeLabel = finderForm.querySelector('#finder-type-label');
const finderFeedback = document.querySelector('#finder-form-feedback');
const finderFeedbackText = finderFeedback.querySelector('.finder-form-feedback__text');
const finderFeedbackClose = finderFeedback.querySelector('.finder-form-feedback__close');
let finderFeedbackTimer;
let finderMode = 'installation';

const equipmentOptions = [
  { value: 'conseil', fr: 'Je ne sais pas encore — conseillez-moi', en: 'I’m not sure yet — please advise me' },
  { value: 'Starlink', fr: 'Starlink', en: 'Starlink' },
  { value: 'TP-Link / MikroTik', fr: 'TP-Link / MikroTik', en: 'TP-Link / MikroTik' },
  { value: 'LiteBeam / NanoStation', fr: 'LiteBeam / NanoStation', en: 'LiteBeam / NanoStation' },
  { value: 'Wi-Fi', fr: 'Réseau Wi-Fi', en: 'Wi-Fi network' },
  { value: 'Solaire', fr: 'Équipement solaire', en: 'Solar equipment' },
  { value: 'Autre', fr: 'Autre', en: 'Other' }
];
const subscriptionOptions = [
  { value: 'conseil', fr: 'Je ne sais pas encore — conseillez-moi', en: 'I’m not sure yet — please advise me' },
  { value: 'Starlink personnel', fr: 'Starlink personnel', en: 'Personal Starlink' },
  { value: 'Point à point', fr: 'Point à point', en: 'Point-to-point' }
];

function updateFinderTypeOptions() {
  const language = document.documentElement.lang === 'en' ? 'en' : 'fr';
  const isSubscription = finderMode === 'abonnement';
  const options = isSubscription ? subscriptionOptions : equipmentOptions;
  finderTypeLabel.dataset.fr = isSubscription ? 'Type d’abonnement' : 'Type d’équipement';
  finderTypeLabel.dataset.en = isSubscription ? 'Subscription type' : 'Equipment type';
  finderTypeLabel.textContent = finderTypeLabel.dataset[language];
  finderTypeSelect.replaceChildren();

  options.forEach(({ value, fr, en }) => {
    const option = document.createElement('option');
    option.value = value;
    option.dataset.fr = fr;
    option.dataset.en = en;
    option.textContent = option.dataset[language];
    if (value === 'conseil') option.selected = true;
    finderTypeSelect.append(option);
  });
}

updateFinderTypeOptions();

const preferredDateField = finderForm.querySelector('input[name="date"]');
const today = new Date();
const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
preferredDateField.value = localToday;
preferredDateField.min = localToday;

function clearFinderFeedback() {
  window.clearTimeout(finderFeedbackTimer);
  finderFeedbackText.textContent = '';
  finderFeedback.hidden = true;
}

function showFinderFeedback(message) {
  window.clearTimeout(finderFeedbackTimer);
  finderFeedbackText.textContent = message;
  finderFeedback.hidden = false;
  finderFeedbackTimer = window.setTimeout(clearFinderFeedback, 5000);
}

finderFeedbackClose.addEventListener('click', clearFinderFeedback);
finderForm.addEventListener('change', clearFinderFeedback);

finderTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    finderMode = tab.dataset.mode;
    updateFinderTypeOptions();
    finderTabs.forEach((option) => {
      const isActive = option === tab;
      option.classList.toggle('is-active', isActive);
      option.setAttribute('aria-selected', String(isActive));
    });
  });
});

finderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(finderForm);
  const language = document.documentElement.lang === 'en' ? 'en' : 'fr';
  const areaField = finderForm.querySelector('[name="area"]');
  const dateField = finderForm.querySelector('[name="date"]');
  let invalidField = null;
  let validationMessage = '';

  if (!areaField.value) {
    invalidField = areaField;
    validationMessage = language === 'en'
      ? 'Please choose your town from the list before continuing.'
      : 'Choisissez votre ville dans la liste pour continuer.';
  } else if (!finderTypeSelect.value) {
    invalidField = finderTypeSelect;
    validationMessage = finderMode === 'abonnement'
      ? (language === 'en' ? 'Choose a subscription or select “I’m not sure yet — please advise me”.' : 'Choisissez un abonnement ou « Je ne sais pas encore — conseillez-moi ».')
      : (language === 'en' ? 'Choose an equipment type or select “I’m not sure yet — please advise me”.' : 'Choisissez un équipement ou « Je ne sais pas encore — conseillez-moi ».');
  } else if (!dateField.value || dateField.value < localToday) {
    invalidField = dateField;
    validationMessage = language === 'en'
      ? 'Choose today or a future date to continue.'
      : 'Choisissez la date d’aujourd’hui ou une date future pour continuer.';
  }

  if (invalidField) {
    showFinderFeedback(validationMessage);
    invalidField.focus();
    return;
  }

  clearFinderFeedback();
  const modeLabel = finderTabs.find((tab) => tab.dataset.mode === finderMode).querySelector('span').dataset[language];
  const date = formData.get('date');
  const selectedRequest = finderTypeSelect.value;
  const requestType = selectedRequest === 'conseil'
    ? (language === 'en' ? 'I have not chosen yet; please advise me' : 'Je n’ai pas encore choisi, merci de me conseiller')
    : finderTypeSelect.selectedOptions[0].dataset[language];
  const requestTypeLabel = finderMode === 'abonnement'
    ? (language === 'en' ? 'Subscription' : 'Abonnement')
    : (language === 'en' ? 'Equipment' : 'Équipement');
  const message = language === 'en'
    ? `Hello, I am a visitor from the COMFORT TECHNOLOGIES COTEC website. I would like to request ${modeLabel.toLowerCase()}. Town: ${formData.get('area')}. ${requestTypeLabel}: ${requestType}. Preferred date: ${date}. Please contact me.`
    : `Bonjour, je suis un visiteur du site COMFORT TECHNOLOGIES COTEC. Je souhaite demander une prestation de ${modeLabel.toLowerCase()}. Ville : ${formData.get('area')}. ${requestTypeLabel} : ${requestType}. Date souhaitée : ${date}. Merci de me contacter.`;
  window.open(`https://wa.me/243817483857?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('.lang-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const language = button.dataset.lang;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-fr][data-en]').forEach((element) => {
      const translation = element.dataset[language];
      if (translation !== undefined) element.innerHTML = translation;
    });
    updateFinderTypeOptions();
    document.querySelectorAll('.lang-btn').forEach((option) => {
      const active = option === button;
      option.classList.toggle('active', active);
      option.setAttribute('aria-pressed', String(active));
    });
    renderHeroSlide(activeHeroSlide);
  });
});

const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const appLoader = document.getElementById('app-loader');

if (appLoader) {
  const minLoaderDelay = 2000;
  const maxLoaderDelay = 4000;
  const loaderDelay = Math.floor(Math.random() * (maxLoaderDelay - minLoaderDelay + 1)) + minLoaderDelay;

  let loaderHidden = false;
  const hideLoader = () => {
    if (loaderHidden) return;
    loaderHidden = true;
    appLoader.classList.add('is-leaving');
    window.setTimeout(() => {
      appLoader.remove();
      heroCarouselStarted = true;
      nextHeroChangeAt = Date.now() + heroSlideDuration;
      startHeroTimer();
    }, 700);
  };

  // Hide after the short delay once the page is usable, without waiting for every image/video.
  window.setTimeout(hideLoader, loaderDelay);
  // Safety net: never keep the loader longer than 6 seconds.
  window.setTimeout(hideLoader, 6000);
} else {
  window.addEventListener('load', () => {
    heroCarouselStarted = true;
    nextHeroChangeAt = Date.now() + heroSlideDuration;
    startHeroTimer();
  }, { once: true });
}
