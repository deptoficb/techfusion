// Global variables
let countdownInterval;
let currentTeamSize = 1;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initializeCountdown();
    initializeNavigation();
    initializeMobileMenu(); // <-- Only call this once!
    initializeAccordions();
    initializeFAQ();
    initializeRegistrationForm();
    initializeScrollSpy();
    handleSlideInOnScroll();
});

// Countdown Timer
const eventDate = new Date("2025-10-13T09:00:00").getTime();

    const timer = setInterval(function() {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        document.querySelector(".countdown h1").innerText = "The Event Has Started!";
        document.querySelector(".time").style.display = "none";
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
      }
    }, 1000);

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Register buttons
    const registerButtons = document.querySelectorAll('[href="#registration"]');
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const registrationSection = document.getElementById('registration');
            if (registrationSection) {
                registrationSection.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // View domains button
    const viewDomainsButton = document.querySelector('[href="#domains"]');
    if (viewDomainsButton) {
        viewDomainsButton.addEventListener('click', function(e) {
            e.preventDefault();
            const domainsSection = document.getElementById('domains');
            if (domainsSection) {
                domainsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
      initializeAccordions();
    });
    document.addEventListener('DOMContentLoaded', function () {
  // Initialize Lucide icons
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

  // Mobile menu logic
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
    });
  });
});
// Scroll Spy for Navigation
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Accordions (Problems Section)
function initializeAccordions() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const item = trigger.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const icon = trigger.querySelector('.accordion-icon');

      // Close all others
      document.querySelectorAll('.accordion-content').forEach(c => {
        if (c !== content) c.classList.remove('open');
      });
      document.querySelectorAll('.accordion-icon').forEach(i => {
        if (i !== icon) i.classList.remove('rotate-180');
      });

      // Toggle this one
      content.classList.toggle('open');
      if (icon) icon.classList.toggle('rotate-180');
    });
  });
}

// Toast Notifications
function showToast(type, message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 5000);
    
    // Click to dismiss
    toast.addEventListener('click', () => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle page visibility changes (pause countdown when tab is not visible)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    } else {
        initializeCountdown();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
});


document.querySelectorAll(".domain-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    console.log("working on card " + index);
  });
});

function handleSlideInOnScroll() {
  const slideSections = document.querySelectorAll('.slide-in-left, .slide-in-right');
  slideSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleSlideInOnScroll);
window.addEventListener('resize', handleSlideInOnScroll);
document.addEventListener('DOMContentLoaded', handleSlideInOnScroll);


window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600); // fade out duration
    }, 2000); // 30 seconds
  }
});

function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !mobileMenu) {
    console.log('Menu button or menu not found');
    return;
  }

  mobileMenuBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Hide navbar while preloader is visible
  const preloader = document.getElementById('preloader');
  const navbar = document.getElementById('navbar');
  if (preloader && navbar) {
    navbar.style.display = 'none';
    setTimeout(() => {
      preloader.style.display = 'none';
      navbar.style.display = '';
    }, 2500);
  }

  // --- LUCIDE ICON SCATTER ---
  const lucideIcons = [
    "sparkles", "rocket", "star", "zap", "flame", "heart", "moon", "sun", "cloud", "feather",
    "leaf", "bolt", "bug", "coffee", "code", "cpu", "database", "eye", "globe", "lock",
    "music", "pen-tool", "shield", "terminal", "user", "wifi", "battery", "bell", "book", "camera",
    "chat", "clock", "compass", "gift", "map", "paperclip", "phone", "printer", "scissors",
    "tag", "thumbs-up", "tool", "trash", "umbrella", "video", "wind",
    "anchor", "aperture", "archive", "at-sign", "award", "bar-chart", "battery-charging", "bell-off",
    "bluetooth", "book-open", "briefcase", "calendar", "camera-off", "cast", "check-circle", "chevron-down",
    "chevron-left", "chevron-right", "chevron-up", "circle", "clipboard", "clock-1", "cloud-drizzle",

  ];
  const stickerColors = [
    "#a78bfa", "#d4ff00", "#38bdf8", "#f59e42", "#ff5e5e", "#ff6bcb", "#a3e635", "#fde047",
    "#f472b6", "#4ade80", "#fbbf24", "#f87171", "#a16207", "#818cf8", "#0ea5e9"
  ];

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function rectsOverlap(r1, r2) {
    return !(r2.left > r1.right ||
             r2.right < r1.left ||
             r2.top > r1.bottom ||
             r2.bottom < r1.top);
  }

  function scatterStickers() {
    // Remove old stickers if any
    document.querySelectorAll('.preloader-sticker').forEach(e => e.remove());
    const preloaderRect = preloader.getBoundingClientRect();
    const textElem = document.getElementById('preloader-text');
    const textRect = textElem.getBoundingClientRect();

    // Calculate text bounding box relative to preloader
    const textBox = {
      left: textRect.left - preloaderRect.left,
      top: textRect.top - preloaderRect.top,
      right: textRect.right - preloaderRect.left,
      bottom: textRect.bottom - preloaderRect.top
    };

    const width = preloaderRect.width;
    const height = preloaderRect.height;

    const placedStickers = [];

    let placed = 0, tries = 0;
    while (placed < 50 && tries < 600) {
      const icon = lucideIcons[placed % lucideIcons.length];
      const color = stickerColors[Math.floor(Math.random() * stickerColors.length)];
      const size = randomBetween(32, 56); // px

      const top = randomBetween(0, height - size);
      const left = randomBetween(0, width - size);

      // Sticker bounding box
      const stickerBox = {
        left: left,
        top: top,
        right: left + size,
        bottom: top + size
      };

      // If overlaps text, skip
      if (rectsOverlap(stickerBox, textBox)) {
        tries++;
        continue;
      }

      // If overlaps any previous sticker, skip
      let overlap = false;
      for (const prev of placedStickers) {
        if (rectsOverlap(stickerBox, prev)) {
          overlap = true;
          break;
        }
      }
      if (overlap) {
        tries++;
        continue;
      }

      // Place sticker
      const el = document.createElement('i');
      el.setAttribute('data-lucide', icon);
      el.className = 'preloader-sticker';
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
      el.style.color = color;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.animationDuration = `${randomBetween(1, 1.7)}s`;
      preloader.appendChild(el);

      placedStickers.push(stickerBox);
      placed++;
      tries++;
    }

    // Render Lucide icons
    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  scatterStickers();
  window.addEventListener('resize', scatterStickers);
});





