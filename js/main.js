document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initFilters();
  initForm();
  initScrollEffects();
});

function initNavigation() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', function() {
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });
}

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modelCards = document.querySelectorAll('.model-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      filterBtns.forEach(function(b) {
        b.classList.remove('active');
      });
      this.classList.add('active');

      modelCards.forEach(function(card) {
        const type = card.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          card.style.display = 'block';
          setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function() {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function initForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      setTimeout(function() {
        submitBtn.textContent = '¡Mensaje enviado!';
        submitBtn.classList.add('btn-accent');
        submitBtn.classList.remove('btn-primary');

        setTimeout(function() {
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.classList.remove('btn-accent');
          submitBtn.classList.add('btn-primary');
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
}

function initScrollEffects() {
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.value-card, .model-card, .contact-card');
    elements.forEach(function(el) {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      if (isVisible) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  document.querySelectorAll('.value-card, .model-card, .contact-card').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
}

const modelData = {
  lorem: {
    title: 'Modelo Lorem',
    type: 'Departamento | 65m²',
    size: '65',
    rooms: '2',
    baths: '1',
    parking: '1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Perfecto para parejas jóvenes o personas solas que buscan un espacio moderno y funcional.',
    image: 'Imagenes/Decoracion piloto.jpeg'
  },
  ipsum: {
    title: 'Modelo Ipsum',
    type: 'Departamento | 85m²',
    size: '85',
    rooms: '3',
    baths: '2',
    parking: '1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ideal para familias pequeñas que necesitan espacio y comodidad.',
    image: 'Imagenes/Decoracion piloto.jpeg'
  },
  dolor: {
    title: 'Modelo Dolor',
    type: 'Departamento | 100m²',
    size: '100',
    rooms: '3',
    baths: '2',
    parking: '2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amplio departamento con terminaciones de alto estándar.',
    image: 'Imagenes/Decoracion piloto.jpeg'
  },
  sit: {
    title: 'Modelo Sit',
    type: 'Casa | 120m²',
    size: '120',
    rooms: '3+1',
    baths: '3',
    parking: '2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Casa independiente con jardín privado, perfecta para familias.',
    image: 'Planos/Saboya.jpeg'
  },
  amet: {
    title: 'Modelo Amet',
    type: 'Casa | 140m²',
    size: '140',
    rooms: '4+1',
    baths: '3',
    parking: '2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nuestra casa más grande, con espacio para oficina en casa y sauna.',
    image: 'Planos/Saboya.jpeg'
  }
};

function openModelModal(modelId) {
  const modal = document.getElementById('modelModal');
  const data = modelData[modelId];

  if (data && modal) {
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalType').textContent = data.type;
    document.getElementById('modalSize').textContent = data.size;
    document.getElementById('modalRooms').textContent = data.rooms;
    document.getElementById('modalBaths').textContent = data.baths;
    document.getElementById('modalParking').textContent = data.parking;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalMainImage').src = data.image;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModelModal() {
  const modal = document.getElementById('modelModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function changeModalImage(thumb) {
  const mainImage = document.getElementById('modalMainImage');
  const thumbs = document.querySelectorAll('.modal-gallery-thumbs img');

  thumbs.forEach(function(t) {
    t.classList.remove('active');
  });
  thumb.classList.add('active');

  mainImage.src = thumb.src;
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModelModal();
  }
});

document.querySelectorAll('.model-card').forEach(function(card) {
  card.addEventListener('click', function(e) {
    if (!e.target.closest('.btn')) {
      const modelId = this.getAttribute('data-model');
      openModelModal(modelId);
    }
  });
});