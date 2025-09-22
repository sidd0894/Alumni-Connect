// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    let isOpen = false;

    mobileMenuBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        
        if (isOpen) {
            // Open menu
            mobileMenu.classList.remove('max-h-0', 'opacity-0', 'pt-0', 'pointer-events-none');
            mobileMenu.classList.add('max-h-[1000px]', 'opacity-100', 'pt-4');
            navbar.classList.remove('rounded-full');
            navbar.classList.add('rounded-xl');
            
            // Change icon to X
            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
            mobileMenuBtn.setAttribute('aria-label', 'Close Menu');
        } else {
            // Close menu
            mobileMenu.classList.remove('max-h-[1000px]', 'opacity-100', 'pt-4');
            mobileMenu.classList.add('max-h-0', 'opacity-0', 'pt-0', 'pointer-events-none');
            
            // Change back to hamburger after animation
            setTimeout(() => {
                navbar.classList.remove('rounded-xl');
                navbar.classList.add('rounded-full');
            }, 300);
            
            // Change icon back to hamburger
            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
            mobileMenuBtn.setAttribute('aria-label', 'Open Menu');
        }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isOpen) {
                mobileMenuBtn.click();
            }
        });
    });

});
