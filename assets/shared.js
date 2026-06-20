// -------------------------------------------------------
// 1. Particle Network Canvas
// -------------------------------------------------------
(function() {
    const canvas = document.getElementById('particles-canvas');
    const ctx    = canvas.getContext('2d');
    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

    let W, H, particles = [];
    const N = 55;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * W;
            this.y  = Math.random() * H;
            this.r  = Math.random() * 1.8 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.alpha = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            const col = isDark()
                ? `rgba(79,142,247,${this.alpha * 0.6})`
                : `rgba(37,99,235,${this.alpha * 0.25})`;
            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < N; i++) particles.push(new Particle());

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.sqrt(dx*dx + dy*dy);
                if (d < 110) {
                    const a = isDark()
                        ? 0.08 * (1 - d / 110)
                        : 0.04 * (1 - d / 110);
                    ctx.strokeStyle = isDark()
                        ? `rgba(79,142,247,${a})`
                        : `rgba(37,99,235,${a})`;
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }
    animate();
})();

// -------------------------------------------------------
// 2. Scroll Reveal (IntersectionObserver)
// -------------------------------------------------------
(function() {
    const revealEls = document.querySelectorAll('.reveal');
    const observer  = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
})();

// -------------------------------------------------------
// 3. Theme Toggle
// -------------------------------------------------------
(function() {
    const btn  = document.getElementById('theme-toggle');
    const icon = btn.querySelector('i');
    const html = document.documentElement;

    const saved = localStorage.getItem('theme');
    // Default is dark (set in HTML attr), apply saved if different
    if (saved === 'light') {
        html.setAttribute('data-theme', 'light');
        icon.className = 'fa-solid fa-moon';
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'fa-solid fa-sun';
    }

    btn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        if (current === 'dark') {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.className = 'fa-solid fa-moon';
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.className = 'fa-solid fa-sun';
        }
    });
})();

// -------------------------------------------------------
// 4. Mobile Menu Toggle
// -------------------------------------------------------
(function() {
    const toggle = document.getElementById('menu-toggle');
    const links  = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
        const i = toggle.querySelector('i');
        i.className = links.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('active');
            toggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
})();
