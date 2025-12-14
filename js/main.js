/**
 * Andrew's Portfolio - Main JavaScript
 * Handles navigation, animations, and interactive features
 */

(function() {
    'use strict';

    // ==========================================
    // Dynamic Copyright Year
    // ==========================================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ==========================================
    // Mobile Navigation Toggle
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // ==========================================
    // Navbar Background on Scroll
    // ==========================================
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial state
    }

    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Intersection Observer for Fade-in Animations
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        // Fallback: just show all elements
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    // ==========================================
    // Image Lightbox
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        // Create lightbox element
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            <img src="" alt="">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        // Open lightbox
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // Lazy Loading Images
    // ==========================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==========================================
    // Active Navigation Link
    // ==========================================
    const setActiveNavLink = () => {
        const currentPath = window.location.pathname;
        const navLinksItems = document.querySelectorAll('.nav-links a');

        navLinksItems.forEach(link => {
            const href = link.getAttribute('href');

            // Remove active class from all
            link.classList.remove('active');

            // Add active class to matching link
            if (currentPath.endsWith(href) ||
                (currentPath.endsWith('/') && href === 'index.html') ||
                (currentPath.includes('/projects/') && href === 'projects.html') ||
                (currentPath.includes('/blog/') && href === 'blog.html')) {
                link.classList.add('active');
            }
        });
    };

    setActiveNavLink();

    // ==========================================
    // Copy Code Blocks (for blog posts)
    // ==========================================
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const pre = block.parentElement;

        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
            background: var(--color-bg-card);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-sm);
            color: var(--color-text-muted);
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;

        pre.style.position = 'relative';
        pre.appendChild(copyBtn);

        // Show button on hover
        pre.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });

        pre.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });

        // Copy functionality
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                copyBtn.textContent = 'Failed';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            }
        });
    });

    // ==========================================
    // View Tabs (for project pages)
    // ==========================================
    const viewTabs = document.querySelectorAll('.view-tab');

    if (viewTabs.length > 0) {
        viewTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active from all tabs
                viewTabs.forEach(t => t.classList.remove('active'));
                // Add active to clicked tab
                tab.classList.add('active');

                // Here you could add logic to switch Altium viewer views
                // For now, this just handles the visual state
                const view = tab.dataset.view;
                console.log('Switched to view:', view);
            });
        });
    }

    // ==========================================
    // Console Easter Egg
    // ==========================================
    console.log('%c=K Hey there!', 'font-size: 24px; font-weight: bold;');
    console.log('%cInterested in how this site was built?', 'font-size: 14px;');
    console.log('%cIt\'s pure HTML, CSS, and JavaScript - no frameworks!', 'font-size: 14px; color: #3b82f6;');
    console.log('%cCheck out the source: https://github.com/yourusername/portfolio', 'font-size: 12px; color: #666;');

})();
