/**
 * Picverse - Digital Art Community Platform
 * Community Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Forum item hover effect
    const forumItems = document.querySelectorAll('.forum-item');
    
    if (forumItems.length > 0) {
        forumItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--pastel-blue)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'var(--bg-light)';
            });
        });
    }
    
    // User card hover effect
    const userCards = document.querySelectorAll('.user-card');
    
    if (userCards.length > 0) {
        userCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--pastel-purple)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'var(--bg-light)';
            });
        });
    }
    
    // Activity item animation
    const activityItems = document.querySelectorAll('.activity-item');
    
    if (activityItems.length > 0) {
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
            activityItems.forEach(item => {
                if (isInViewport(item) && !item.classList.contains('animated')) {
                    item.classList.add('animated');
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                }
            });
        }
        
        // Add animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .activity-item {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
        
        // Initial check and scroll event listener
        handleScrollAnimation();
        window.addEventListener('scroll', handleScrollAnimation);
    }
    
    // Forum discussion form (placeholder functionality)
    const newDiscussionBtn = document.querySelector('.forum-actions .primary-btn');
    
    if (newDiscussionBtn) {
        newDiscussionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would open a form or redirect to a new discussion page
            alert('This would open a new discussion form in a real application.');
        });
    }
});