document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer untuk efek animasi Fade-In saat scroll ke bawah
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(section => {
        observer.observe(section);
    });

    // Gallery Carousel Navigation
    const carousel = document.getElementById('galleryCarousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carousel && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const firstImg = carousel.querySelector('.gallery-img');
            return firstImg ? firstImg.clientWidth + 24 : 300; // 24 = estimasi jarak gap antar gambar
        };

        prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }));

        // Auto-Slide setiap 2 detik
        let autoSlide = setInterval(() => {
            // Jika sudah mencapai gambar paling ujung kanan, kembali ke awal
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        }, 2000);

        // Hentikan auto-slide saat mouse/jari menyentuh galeri agar pengguna bebas melihat gambar
        carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
        carousel.addEventListener('touchstart', () => clearInterval(autoSlide));
    }

    // Feature Carousel Navigation
    const featureCarousel = document.getElementById('featureCarousel');
    const featurePrevBtn = document.querySelector('.feature-prev-btn');
    const featureNextBtn = document.querySelector('.feature-next-btn');

    if (featureCarousel && featurePrevBtn && featureNextBtn) {
        const getFeatureScrollAmount = () => {
            const firstCard = featureCarousel.querySelector('.card');
            // Lebar kartu + jarak (gap)
            return firstCard ? firstCard.clientWidth + 24 : 350;
        };

        featurePrevBtn.addEventListener('click', () => featureCarousel.scrollBy({ left: -getFeatureScrollAmount(), behavior: 'smooth' }));
        featureNextBtn.addEventListener('click', () => featureCarousel.scrollBy({ left: getFeatureScrollAmount(), behavior: 'smooth' }));
    }

    // Ambil semua tombol yang memiliki atribut data-platform
    const downloadButtons = document.querySelectorAll('[data-platform]');

    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            let platform = button.getAttribute('data-platform');
            if (!platform) return;

            // Tambah angka klik ke LocalStorage
            let currentCount = parseInt(localStorage.getItem(`click_${platform}`) || 0);
            currentCount++;
            localStorage.setItem(`click_${platform}`, currentCount);

            console.log(`[Analytics] Download button clicked: ${platform} (${currentCount} kali)`);

            // Contoh implementasi untuk Google Analytics (GA4)
            if (typeof gtag === 'function') {
                gtag('event', 'download_click', {
                    'platform_name': platform
                });
            }
        });
    });
});