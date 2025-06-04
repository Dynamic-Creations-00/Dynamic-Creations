// Particles.js Configuration
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 80, // Increased from default
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffd700" // Using our primary gold color
    },
    "opacity": {
      "value": 0.8, // Increased opacity
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.5,
        "sync": false
      }
    },
    "size": {
      "value": 3, // Slightly larger particles
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffd700", // Gold colored lines
      "opacity": 0.6, // More visible lines
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2, // Slightly faster movement
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});

// Logo Animation
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    logo.style.transform = 'scale(2)';
    logo.style.opacity = '0';
    
    setTimeout(() => {
        logo.style.transition = 'all 1.5s ease-in-out';
        logo.style.transform = 'scale(1)';
        logo.style.opacity = '1';
    }, 100);
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Custom Cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Reveal on Scroll Animation
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Video and Audio Play/Pause Controls
const audio = document.getElementById('background-audio');
const audioBtn = document.getElementById('audioPlayPause');
const mediaLogo = document.getElementById('mediaLogo');

function updateMediaLogo() {
    if (!audio.paused) {
        mediaLogo.classList.add('golden-shine');
    } else {
        mediaLogo.classList.remove('golden-shine');
    }
}

audioBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audioBtn.textContent = 'Pause Music';
    } else {
        audio.pause();
        audioBtn.textContent = 'Play Music';
    }
    updateMediaLogo();
});

// Initialize media logo state on page load
document.addEventListener('DOMContentLoaded', () => {
    updateMediaLogo();
});

// Portfolio Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Scroll to Top
const scrollBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update Google Sheet Form Handler with new URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbxPrCZewgWWpmJ-eiIGR5jxULAl3q0V2IPh8oy2z8kwqQocND-kbK7c8-kUfCpLkeVa1g/exec';
const form = document.forms['contactform'];

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading message
    const formMessage = document.getElementById('form-message');
    formMessage.style.display = 'block';
    formMessage.textContent = 'Sending message...';
    formMessage.className = 'status-message';
    
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', // Add this line
            body: new FormData(form)
        });
        
        // Since mode is no-cors, we won't get response details
        // but if we reach here, request was sent
        formMessage.textContent = 'Message sent successfully!';
        formMessage.className = 'status-message success';
        form.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        console.error('Error!', error.message);
        formMessage.textContent = 'Error sending message. Please try again.';
        formMessage.className = 'status-message error';
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-times');
    }
});

// Performance Optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images and videos
    const lazyMedia = document.querySelectorAll('[data-src], video[data-src]');
    
    const lazyLoadMedia = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const media = entry.target;
                    media.src = media.dataset.src;
                    media.removeAttribute('data-src');
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    lazyMedia.forEach(lazyLoadMedia);

    // Optimize scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                reveal();
            }, 20);
        }
    }, { passive: true });
});

// Touch Device Support
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Handle QR code display on mobile
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const qrCode = link.querySelector('.qr-code');
            if (qrCode) {
                e.preventDefault();
                document.querySelectorAll('.qr-code.active').forEach(code => {
                    code.classList.remove('active');
                });
                qrCode.classList.add('active');
            }
        });
    });

    // Close QR code on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.social-link')) {
            document.querySelectorAll('.qr-code.active').forEach(code => {
                code.classList.remove('active');
            });
        }
    });
}

// Smooth Scroll with fallback
const smoothScroll = (target) => {
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            behavior: 'smooth',
            top: target
        });
    } else {
        window.scrollTo(0, target);
    }
};

// Add error handling for media elements
document.addEventListener('DOMContentLoaded', () => {
    // Handle video errors
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('error', function() {
            this.style.display = 'none';
            console.log('Video failed to load:', this.src);
        });
    });

    // Handle audio errors
    const audio = document.getElementById('background-audio');
    audio.addEventListener('error', () => {
        const audioBtn = document.getElementById('audioPlayPause');
        audioBtn.style.display = 'none';
        console.log('Audio failed to load');
    });
});

// Optimize scroll performance
let scrollTimeout;
function optimizedScroll() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            reveal();
        }, 20);
    }
}
window.addEventListener('scroll', optimizedScroll, { passive: true });
