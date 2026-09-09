// Dein JavaScript Code kommt hier hin

console.log('Webseite geladen!');

// Menu Toggle Funktionalität
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && mainNav) {
    // Menu öffnen/schließen
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Menu schließen wenn auf einen Link geklickt wird
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Menu schließen wenn außerhalb geklickt wird
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mainNav.contains(event.target);
        const isClickInsideToggle = menuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideToggle && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Hero Image Slider - Automatischer Bildwechsel alle 10 Sekunden
const heroSlider = document.getElementById('heroSlider');
if (heroSlider) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startAutoSlide() {
        sliderInterval = setInterval(nextSlide, 10000); // 10 seconds
    }

    function stopAutoSlide() {
        clearInterval(sliderInterval);
    }

    // Dot click handler
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Pause on hover, resume on mouse leave
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);

    // Start auto-slide
    startAutoSlide();
}

// Gallery Image Slider with Filter
const gallerySlider = document.getElementById('gallerySlider');
if (gallerySlider) {
    const sliderSlides = gallerySlider.querySelectorAll('.slider-slide');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const prevBtn = gallerySlider.querySelector('.prev');
    const nextBtn = gallerySlider.querySelector('.next');
    
    let currentFilter = 'all';
    let currentSlideIndex = 0;
    let visibleSlides = Array.from(sliderSlides);

    function updateSlider() {
        sliderSlides.forEach(slide => slide.classList.remove('active'));
        
        if (currentSlideIndex < visibleSlides.length) {
            visibleSlides[currentSlideIndex].classList.add('active');
        }
    }

    function applyFilter(filter) {
        currentFilter = filter;
        
        // Update filter button states
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });

        // Filter slides
        if (filter === 'all') {
            visibleSlides = Array.from(sliderSlides);
        } else {
            visibleSlides = Array.from(sliderSlides).filter(slide => 
                slide.getAttribute('data-category') === filter
            );
        }

        currentSlideIndex = 0;
        updateSlider();
    }

    // Filter button click handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });

    // Navigation button handlers
    prevBtn.addEventListener('click', function() {
        currentSlideIndex = (currentSlideIndex - 1 + visibleSlides.length) % visibleSlides.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', function() {
        currentSlideIndex = (currentSlideIndex + 1) % visibleSlides.length;
        updateSlider();
    });

    // Initialize
    updateSlider();
}

// Accordion Functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const accordion = this.closest('.accordion');
        const body = accordion.querySelector('.accordion-body');
        const isOpen = body.classList.contains('open');

        // Close all other accordions
        document.querySelectorAll('.accordion-body').forEach(otherBody => {
            otherBody.classList.remove('open');
        });
        document.querySelectorAll('.accordion-header').forEach(otherHeader => {
            otherHeader.classList.remove('active');
        });

        // Toggle current accordion
        if (!isOpen) {
            body.classList.add('open');
            this.classList.add('active');
        }
    });
});