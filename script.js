// Nav scroll behavior + logo swap
const nav = document.getElementById('nav');
const logoImg = document.querySelector('.nav__logo img');
const isInnerPage = document.body.classList.contains('page--inner');

if (!isInnerPage) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    nav.classList.toggle('scrolled', scrolled);
    if (logoImg) {
      logoImg.src = scrolled ? 'assets/logo-wordmark-scroll.png' : 'assets/logo-wordmark.png';
    }
  });
} else {
  // Inner pages always show scrolled nav with dark logo
  if (logoImg) {
    logoImg.src = 'assets/logo-wordmark-scroll.png';
  }
}

// Mobile nav toggle (dropdown)
const toggle = document.getElementById('navToggle');
const sidebar = document.getElementById('navSidebar');
if (toggle && sidebar) {
  function closeNav() {
    sidebar.classList.remove('active');
    toggle.classList.remove('active');
  }
  toggle.addEventListener('click', () => {
    sidebar.classList.contains('active') ? closeNav() : (sidebar.classList.add('active'), toggle.classList.add('active'));
  });
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      closeNav();
    }
  });
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

// Count-up animation (landing page only)
const counters = document.querySelectorAll('[data-target]');
if (counters.length) {
  let counted = false;
  function animateCounters() {
    if (counted) return;
    const section = document.querySelector('.trust-bar');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counted = true;
      counters.forEach((counter, index) => {
        const target = parseInt(counter.dataset.target);
        const suffix = counter.dataset.suffix || '';
        const duration = 750 + (index * 750);
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current).toLocaleString() + suffix;
        }, duration / steps);
      });
    }
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters();
}

// Services swoosh + card slide-from-left animation
const servicesSection = document.querySelector('.services');
const servicesGrid = document.querySelector('.services__grid');
const servicesSwoosh = document.querySelector('.services__swoosh');
if (servicesGrid) {
  const cards = Array.from(servicesGrid.querySelectorAll('.service-card'));
  const isMobile = window.matchMedia('(max-width: 900px)').matches;

  // Position swoosh vertically centered on the grid
  if (servicesSwoosh) {
    function positionSwoosh() {
      var gridCenter = servicesGrid.offsetTop + servicesGrid.offsetHeight / 2;
      var swooshHeight = servicesSwoosh.offsetHeight;
      servicesSwoosh.style.top = (gridCenter - swooshHeight / 2) + 'px';
    }
    positionSwoosh();
    window.addEventListener('resize', positionSwoosh);
  }

  function revealCards() {
    if (isMobile) {
      // Stagger cards one at a time, 250ms apart
      cards.forEach(function(card, i) {
        setTimeout(function() { card.classList.add('visible'); }, i * 250);
      });
    } else {
      cards[0].classList.add('visible');
      cards[1].classList.add('visible');
      setTimeout(function() {
        cards[2].classList.add('visible');
        cards[3].classList.add('visible');
      }, 600);
    }
  }

  var sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Swoosh fades in first, cards follow after
        if (servicesSwoosh) {
          servicesSwoosh.classList.add('visible');
          setTimeout(revealCards, 500);
        } else {
          revealCards();
        }
        sectionObserver.unobserve(servicesSection);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -15% 0px' });
  sectionObserver.observe(servicesSection);
}

// Team bio modal (about page)
const bioData = {
  'duke-hale': {
    name: 'Duke Hale',
    title: 'Founder & President',
    license: 'CA LIC #0G98787',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/01/Hale-Photos-1.jpg',
    email: 'duke@haleandassociates.net',
    phone: '317.677.7178',
    bio: [
      'Duke is a native Hoosier who grew up in Indianapolis, IN where he attended high school. Duke graduated from Ball State University in Muncie, Indiana in 1972 with a Bachelor of Science degree. He also completed post graduate work at Butler University and received an E.P.B.A. from Columbia University in 1994.',
      'Prior to starting his own business, Duke Hale was C.O.O. of $4 billion American Isuzu, C.E.O. of Lotus Holdings, Inc. and was President of NASDAQ traded Starcraft Automotive. His public company experience has been very helpful with senior clients on financial issues and risk protection.',
      'Duke Hale has trained numerous professionals in the areas of public speaking, business management, customer satisfaction, and other areas.'
    ]
  },
  'wayne-miller': {
    name: 'Wayne Miller',
    title: 'Executive Vice President',
    license: 'CA LIC #0G30788',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/01/wayne-miller-2_orig.jpg',
    email: 'wayne@haleandassociates.net',
    phone: '949.943.5266',
    bio: [
      'Wayne Miller comes to Hale & Associates, Inc. from an extensive financial background. As a double major in both Finance and Economics, Wayne Miller attended the University of Massachusetts at Amherst.',
      'When Wayne was 20 years old he started his financial career at MBNA America Bank, N.A., which is now Bank of America. At 23 years old, he assisted managing a division of over 400 employees in Aliso Viejo, CA. Wayne continued his career on the retail side of the industry at CitiGroup, as a branch account manager.',
      'Wayne has been with Hale & Associates since 2009. With over 22 years of experience in finance, Wayne brings a lot to the table.'
    ]
  },
  'darren-grunberg': {
    name: 'Darren Grunberg',
    title: 'Vice President / Managing Director',
    license: '',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/01/darren-grunberg_orig.jpg',
    email: '',
    phone: '317.614.7508',
    bio: [
      'Darren Grunberg is a finance expert with 33 years of experience in trading and strategy. A New York native, he earned his accounting degree from the University of Buffalo in 1992 and is a CPA. He has worked at Fuji Capital Markets, the Royal Bank of Canada, and T3 Trading, LLC, specializing in financial markets, retirement planning, and benefits.'
    ]
  },
  'barry-mccurry': {
    name: 'Barry McCurry',
    title: 'Director of Sales',
    license: '',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/01/Hale-FINAL-BARRY.jpg',
    email: '',
    phone: '317.677.7178',
    bio: [
      'Barry McCurry, Director of Sales at Hale & Associates since 2010, has driven growth by strengthening client relationships and building a top-performing team. With 15+ years in financial services, he prioritizes trust, transparency, and tailored solutions.'
    ]
  },
  'sean-hall': {
    name: 'Sean Hall',
    title: 'Business Development Manager',
    license: '',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/02/Sean-Hall-NEW.jpg',
    email: '',
    phone: '317.677.7178',
    bio: [
      'Sean Hall brings a strong background in sales and customer service. A graduate of Azusa Pacific University, he values integrity, trust, and service. Guided by his faith, Sean focuses on understanding client needs and providing tailored financial solutions, making him a trusted partner in their financial journey.'
    ]
  },
  'shannon-scheall': {
    name: 'Shannon Scheall',
    title: 'Client Services Manager',
    license: '',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/08/UPdated-Shannon-Scheall.jpg',
    email: '',
    phone: '317.677.7178',
    bio: [
      'Shannon Scheall, Client Services Manager, brings extensive experience in customer service and finance. With a background in mortgage processing, she excels at detail-oriented, client-focused support. Dedicated to trust and exceptional service, Shannon ensures clients feel informed, valued, and well-supported.'
    ]
  },
  'kevin-garcia': {
    name: 'Kevin Garcia',
    title: 'Regional Sales Manager',
    license: '',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/01/Garcia-Photo.jpg',
    email: '',
    phone: '317.677.7178',
    bio: [
      'Kevin Garcia, Regional Sales Manager at Hale & Associates since 2018, drives success in the Southeastern Region. Specializing in the federal employee market, he builds relationships, listens to client needs, and delivers tailored financial solutions, reinforcing the firm\'s excellence and integrity.'
    ]
  },
  'vikki-cao': {
    name: 'Vikki Cao',
    title: 'Regional Sales Manager',
    license: '',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/01/vikki-cao-2024.jpg',
    email: '',
    phone: '317.677.7178',
    bio: [
      'With 13+ years in finance, Vikki Cao helps individuals and businesses achieve long-term security. As a brokerage founder, she specialized in commercial and personal insurance. Now at Hale & Associates, she provides strategic financial solutions with a client-focused, integrity-driven approach.'
    ]
  },
  'andrew-bohn': {
    name: 'Andrew Bohn',
    title: 'Inside Sales Associate',
    license: '',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/01/andrew-bohn-2024_orig.jpg',
    email: 'andrew.bohn@haleandassociates.net',
    phone: '317.677.7178',
    bio: [
      'Andrew, a sales professional with 20+ years of experience, specializes in life and health insurance. Before joining us, he excelled at Opolis, helping clients secure their financial futures. A San Diego State graduate in Business Management, he is known for his strategic approach and strong client relationships. A devoted husband and father of three, he is driven by faith and a passion for serving others.'
    ]
  },
  'melissa-vigrass': {
    name: 'Melissa Vigrass',
    title: 'New Business Manager',
    license: '',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/06/Meliss-Vigrass-Final.png',
    email: 'melissa@haleandassociates.net',
    phone: '317.677.7178',
    bio: [
      'Melissa Vigrass brings over 20 years of experience as a military spouse, with a strong background in organization, adaptability, and service. Known for her clear communication and attention to detail, she helps ensure a smooth, supportive experience for clients with care and professionalism.'
    ]
  },
  'andrew-watkins': {
    name: 'Andrew Watkins',
    title: 'Business Development Manager',
    license: '',
    photo: 'https://haleandassociates.net/wp-content/uploads/2025/08/Andrew-Wat-1.jpg',
    email: 'andrew.watkins@haleandassociates.net',
    phone: '317.677.7178',
    bio: []
  }
};

const bioModal = document.getElementById('bioModal');
if (bioModal) {
  const backdrop = bioModal.querySelector('.bio-modal__backdrop');
  const closeBtn = bioModal.querySelector('.bio-modal__close');

  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
      const member = card.dataset.member;
      const data = bioData[member];
      if (!data) return;

      document.getElementById('bioPhoto').src = data.photo;
      document.getElementById('bioPhoto').alt = data.name;
      document.getElementById('bioName').textContent = data.name;
      document.getElementById('bioTitle').textContent = data.title;

      const licenseEl = document.getElementById('bioLicense');
      licenseEl.textContent = data.license;
      licenseEl.style.display = data.license ? 'block' : 'none';

      const bioEl = document.getElementById('bioBio');
      bioEl.innerHTML = data.bio.map(p => '<p>' + p + '</p>').join('');

      const phoneEl = document.getElementById('bioPhone');
      phoneEl.style.display = 'none';

      const emailEl = document.getElementById('bioEmail');
      if (data.email) {
        emailEl.innerHTML = '<span class="bio-modal__label">E:</span> <a href="mailto:' + data.email + '">' + data.email + '</a>';
        emailEl.style.display = 'block';
      } else {
        emailEl.style.display = 'none';
      }

      bioModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.getElementById('nav').style.display = 'none';
    });
  });

  function closeModal() {
    bioModal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('nav').style.display = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && bioModal.classList.contains('active')) closeModal();
  });
}

// Fade-in section headings on scroll
document.querySelectorAll('section h2').forEach(function(h2) {
  h2.classList.add('fade-in');
});
const fadeObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.fade-in').forEach(function(el) {
  fadeObserver.observe(el);
});

// Accordion (services page)
document.querySelectorAll('.accordion__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    const panel = trigger.nextElementSibling;
    document.querySelectorAll('.accordion__trigger').forEach(other => {
      if (other !== trigger) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      }
    });
    trigger.setAttribute('aria-expanded', !expanded);
    panel.style.maxHeight = !expanded ? panel.scrollHeight + 'px' : null;
  });
});
