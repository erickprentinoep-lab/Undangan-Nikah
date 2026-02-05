// DOM Elements
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-btn');
const scIframe = document.getElementById('sc-widget');
const widget = SC.Widget(scIframe);

// Ensure widget is ready before use
let widgetReady = false;
widget.bind(SC.Widget.Events.READY, function () {
    widgetReady = true;
    console.log('SoundCloud widget ready');
});

// Open Invitation Function
openBtn.addEventListener('click', () => {
    const flowerBloom = document.getElementById('flower-bloom');

    // 1. Hide Overlay first
    overlay.classList.add('-translate-y-full');

    setTimeout(() => {
        overlay.style.display = 'none';

        // 2. Show Flower Animation
        flowerBloom.classList.add('active');

        // 3. After flower blooms (2.5s animation), fade it out and show main content
        setTimeout(() => {
            // Fade out flower
            flowerBloom.style.opacity = '0';

            // Show main content
            mainContent.classList.remove('hidden');
            setTimeout(() => {
                mainContent.classList.remove('opacity-0');
                // Remove flower from DOM
                flowerBloom.classList.remove('active');
                flowerBloom.style.opacity = '1'; // Reset for next time
            }, 500);
        }, 2500); // Wait for flower bloom to complete
    }, 800);

    // Play Music via Widget (with fallback)
    setTimeout(() => {
        widget.play();
        widget.setVolume(80); // Set volume to 80%

        // Ensure Loop
        widget.bind(SC.Widget.Events.FINISH, function () {
            widget.seekTo(0);
            widget.play();
        });

        // Error handling
        widget.bind(SC.Widget.Events.ERROR, function () {
            console.warn('SoundCloud playback error - this may be due to browser autoplay restrictions');
        });
    }, 500); // Small delay to ensure widget is ready
});

// Music Toggle Logic Removed

// ========================================
// PENGATURAN TANGGAL & WAKTU PERNIKAHAN
// ========================================
// Format: "Bulan Tanggal, Tahun Jam:Menit:Detik"
// Contoh: "Nov 20, 2026 10:00:00" = 20 November 2026 pukul 10:00 pagi
const weddingDate = new Date("Feb 07, 2026 13:00:00").getTime();
// ========================================

// Countdown Logic
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMinutes = document.getElementById("minutes");
    const elSeconds = document.getElementById("seconds");

    if (elDays) elDays.innerText = days;
    if (elHours) elHours.innerText = hours;
    if (elMinutes) elMinutes.innerText = minutes;
    if (elSeconds) elSeconds.innerText = seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        // Optional: show message when event started
    }
}, 1000);

// Real-time Clock Logic
const clockInterval = setInterval(() => {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Update Clock Elements if they exist
    const elHours = document.getElementById("clock-hours");
    const elMinutes = document.getElementById("clock-minutes");
    const elSeconds = document.getElementById("clock-seconds");

    if (elHours) elHours.innerText = hours;
    if (elMinutes) elMinutes.innerText = minutes;
    if (elSeconds) elSeconds.innerText = seconds;

}, 1000);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Default reveal
            entry.target.classList.add('animate-fadeInUp');

            // Curtain reveal
            if (entry.target.classList.contains('curtain-reveal')) {
                entry.target.classList.add('revealed');
            }

            // 3D Flip in
            const flipItems = entry.target.querySelectorAll('.flip-in');
            flipItems.forEach(item => item.classList.add('flipped'));

            // Cascade items
            const cascadeItems = entry.target.querySelectorAll('.cascade-item');
            cascadeItems.forEach(item => item.classList.add('cascaded'));

            // Envelope open
            const envelope = entry.target.querySelector('.envelope-container');
            if (envelope) {
                envelope.classList.add('opened');
            }

            // Start hearts for couple section
            if (entry.target.id === 'couple') {
                startHearts();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Heart Particle Generation System
function startHearts() {
    const container = document.getElementById('hearts-container');
    if (!container || container.children.length > 0) return;

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.opacity = Math.random();

        container.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 400);
}

// ========================================
// GALLERY LIGHTBOX FUNCTIONALITY
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const galleryItems = document.querySelectorAll('[data-lightbox="gallery"]');
let currentIndex = 0;

// Open lightbox when clicking gallery item
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        currentIndex = index;
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = ''; // Restore scroll
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox(); // Close when clicking backdrop
});

// Navigate to previous image
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
});

// Navigate to next image
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    }
});
