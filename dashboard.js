// Enhanced Dashboard JavaScript with all requested features

document.addEventListener('DOMContentLoaded', function() {
    // RGB Keyboard Header Animation
    const rgbKeyboardText = document.querySelector('.rgb-keyboard-text');
    rgbKeyboardText.setAttribute('data-text', rgbKeyboardText.textContent);
    
    // Add floating animation to header
    const header = document.querySelector('header');
    let floatingAnimation = null;
    
    function startFloatingAnimation() {
        if (floatingAnimation) return;
        
        floatingAnimation = setInterval(() => {
            rgbKeyboardText.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                rgbKeyboardText.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
    }
    
    function stopFloatingAnimation() {
        if (floatingAnimation) {
            clearInterval(floatingAnimation);
            floatingAnimation = null;
        }
    }
    
    // Start animation when header is in view
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startFloatingAnimation();
            } else {
                stopFloatingAnimation();
            }
        });
    });
    
    headerObserver.observe(header);
    
    // Add hover effect to title
    rgbKeyboardText.addEventListener('mouseenter', function() {
        this.style.animationDuration = '1.5s';
        this.style.filter = 'brightness(1.3)';
    });
    
    rgbKeyboardText.addEventListener('mouseleave', function() {
        this.style.animationDuration = '3s';
        this.style.filter = 'brightness(1)';
    });
    
    // Premium Navigation Buttons Hover Effects with Rainbow Animation
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        // Mouse enter effect
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                border-radius: 50%;
                top: ${y - 50}px;
                left: ${x - 50}px;
                transform: scale(0);
                animation: buttonRipple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Click functionality
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.style.transform = 'translateY(-8px) scale(1.05) rotateX(5deg)';
            
            console.log(`Navigating to: ${this.querySelector('.btn-text').textContent}`);
        });
    });
    
    // Donate button functionality with Button Pooping Effect
    const donateBtn = document.querySelector('#donateBtn');

    donateBtn.addEventListener('click', function() {
        // Button pooping animation
        this.classList.add('pooping');
        
        // Create pooper coming from button
        createButtonPooperEffect(this);
        
        // Remove animation class after completion
        setTimeout(() => {
            this.classList.remove('pooping');
        }, 800);
        
        console.log('Donate button pooping!');
    });

    // Button Pooper Effect Function
    function createButtonPooperEffect(button) {
        const pooperContainer = document.getElementById('pooper-container');
        const poopColors = ['#8B4513', '#A0522D', '#CD853F', '#D2691E'];
        
        // Create multiple pooper pieces coming from button
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const pooper = document.createElement('div');
                pooper.className = 'pooper-from-button';
                
                // Random properties
                const color = poopColors[Math.floor(Math.random() * poopColors.length)];
                const size = Math.random() * 15 + 10;
                const animationDuration = Math.random() * 1 + 1;
                
                pooper.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    background: linear-gradient(135deg, ${color}, ${getDarkerColor(color)});
                    animation-duration: ${animationDuration}s;
                    animation-delay: ${Math.random() * 0.2}s;
                `;
                
                // Add to button temporarily for positioning
                button.appendChild(pooper);
                
                // Move to container after a frame
                setTimeout(() => {
                    const rect = pooper.getBoundingClientRect();
                    pooper.style.position = 'fixed';
                    pooper.style.top = rect.top + 'px';
                    pooper.style.left = rect.left + 'px';
                    pooperContainer.appendChild(pooper);
                }, 10);
                
                // Remove pooper after animation
                setTimeout(() => {
                    if (pooper.parentNode) {
                        pooper.remove();
                    }
                }, animationDuration * 1000);
                
            }, i * 100); // Staggered timing
        }
        
        // Add additional floating poopers around button
        createFloatingPoopers(button);
    }

    // Floating poopers around button
    function createFloatingPoopers(button) {
        const pooperContainer = document.getElementById('pooper-container');
        const rect = button.getBoundingClientRect();
        const poopColors = ['#8B4513', '#A0522D', '#CD853F'];
        
        for (let i = 0; i < 8; i++) {
            const pooper = document.createElement('div');
            pooper.className = 'pooper';
            
            const color = poopColors[Math.floor(Math.random() * poopColors.length)];
            const size = Math.random() * 20 + 10;
            const startX = rect.left + rect.width/2;
            const startY = rect.top + rect.height/2;
            const endX = startX + (Math.random() * 200 - 100);
            const endY = startY - (Math.random() * 150 + 50);
            
            pooper.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(135deg, ${color}, ${getDarkerColor(color)});
                position: fixed;
                top: ${startY}px;
                left: ${startX}px;
                animation: floatPoop 2s ease-out forwards;
                transform-origin: center;
            `;
            
            // Custom animation for each pooper
            const floatAnimation = `
                @keyframes floatPoop-${i} {
                    0% {
                        transform: translate(0, 0) rotate(0deg) scale(0);
                        opacity: 0;
                    }
                    20% {
                        transform: translate(${endX - startX}px, ${endY - startY}px) rotate(90deg) scale(1);
                        opacity: 1;
                    }
                    80% {
                        transform: translate(${endX - startX}px, ${endY - startY - 50}px) rotate(180deg) scale(0.8);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translate(${endX - startX}px, ${endY - startY - 100}px) rotate(270deg) scale(0);
                        opacity: 0;
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = floatAnimation;
            document.head.appendChild(style);
            
            pooper.style.animation = `floatPoop-${i} 2s ease-out forwards`;
            pooper.style.animationDelay = (Math.random() * 0.5) + 's';
            
            pooperContainer.appendChild(pooper);
            
            setTimeout(() => {
                pooper.remove();
                style.remove();
            }, 2500);
        }
    }

    // Helper function for darker poop colors
    function getDarkerColor(color) {
        const colors = {
            '#8B4513': '#654321',
            '#A0522D': '#804000',
            '#CD853F': '#A56B2D',
            '#D2691E': '#A05200'
        };
        return colors[color] || '#654321';
    }

    // Add poop explosion animation to CSS
    const poopStyle = document.createElement('style');
    poopStyle.textContent = `
        @keyframes poopExplode {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.7;
            }
            100% {
                transform: scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(poopStyle);
});