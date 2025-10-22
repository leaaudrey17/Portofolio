/**
 * Picverse - Digital Art Community Platform
 * About Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Enhance the icon
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                    icon.style.transition = 'transform 0.1s ease';
                }
                
                // Change the border color
                this.style.borderColor = 'var(--primary-color)';
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset the icon
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
                
                // Reset the border color
                this.style.borderColor = 'var(--border-color)';
            });
        });
    }
    
    // Scroll animation for about content
    const aboutContent = document.querySelector('.about-content');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutContent && aboutImage) {
        // Function to check if an element is in the viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to handle scroll animation
        function handleScrollAnimation() {
            if (isInViewport(aboutContent) && !aboutContent.classList.contains('animated')) {
                aboutContent.classList.add('animated');
                aboutContent.style.animation = 'fadeInLeft 0.5s ease forwards';
            }
            
            if (isInViewport(aboutImage) && !aboutImage.classList.contains('animated')) {
                aboutImage.classList.add('animated');
                aboutImage.style.animation = 'fadeInRight 0.5s ease forwards';
            }
        }
        
        // Add animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .about-content, .about-image {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
        
        // Initial check and scroll event listener
        handleScrollAnimation();
        window.addEventListener('scroll', handleScrollAnimation);
    }
    
    // Vision & Mission hover effects
    const visionBox = document.querySelector('.vision-box');
    const missionBox = document.querySelector('.mission-box');
    
    if (visionBox && missionBox) {
        visionBox.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        visionBox.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
        
        missionBox.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        missionBox.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    }
});