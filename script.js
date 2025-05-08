// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavDropdownToggles = document.querySelectorAll('.mobile-nav-dropdown-toggle');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = mobileMenu.classList.contains('open');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
    });
}

mobileNavDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const dropdownContent = toggle.nextElementSibling;
        if (dropdownContent && dropdownContent.classList.contains('mobile-nav-dropdown-content')) {
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = dropdownContent.style.display === 'block';
            toggle.setAttribute('aria-expanded', isExpanded);
        }
    });
});


// Product Modal
const productModal = document.getElementById('product-modal');
const closeModalButton = document.getElementById('close-modal');
const productDisplayCards = document.querySelectorAll('.product-display-card'); // Updated class name

if (productModal && closeModalButton) {
    productDisplayCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on compare button or cart button
            if (!e.target.closest('.compare-input-label') && !e.target.closest('.add-to-cart-button')) {
                productModal.style.display = 'flex'; // Show modal
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    closeModalButton.addEventListener('click', () => {
        productModal.style.display = 'none'; // Hide modal
        document.body.style.overflow = 'auto'; // Restore background scrolling
    });

    // Close modal if clicking outside the modal content
    productModal.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}


// Compare Modal
const compareModal = document.getElementById('compare-modal');
const closeCompareModalButton = document.getElementById('close-compare-modal');
const closeCompareModalButton2 = document.getElementById('close-compare-modal-2'); // Second close button in compare modal
const compareCheckboxes = document.querySelectorAll('.compare-input-checkbox'); // Updated class name

if (compareModal && closeCompareModalButton && closeCompareModalButton2) {
    const openCompareModal = () => {
        compareModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    const closeCompareModal = () => {
        compareModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    compareCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Example logic: Open if at least one is checked.
            // You might want more sophisticated logic to manage selected items.
            if (Array.from(compareCheckboxes).some(cb => cb.checked)) {
                openCompareModal();
            }
            // If you want to close it when all are unchecked, add that logic here.
        });
    });

    closeCompareModalButton.addEventListener('click', closeCompareModal);
    closeCompareModalButton2.addEventListener('click', closeCompareModal);

    // Close modal if clicking outside the modal content
    compareModal.addEventListener('click', (event) => {
        if (event.target === compareModal) {
            closeCompareModal();
        }
    });
}


// Tabs in Product Modal
const modalTabButtons = document.querySelectorAll('.modal-tab-button');
const modalTabContents = document.querySelectorAll('.modal-tab-content');

if (modalTabButtons.length > 0 && modalTabContents.length > 0) {
    modalTabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            modalTabButtons.forEach(btn => btn.classList.remove('active-tab'));
            modalTabContents.forEach(content => content.classList.remove('active-tab-content'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active-tab');
            if (modalTabContents[index]) {
                modalTabContents[index].classList.add('active-tab-content');
            }
        });
    });
}


// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Search Dropdown (Basic interaction)
const searchInput = document.querySelector('.search-input-field'); // Updated class name
const searchDropdown = document.querySelector('.search-results-dropdown'); // Updated class name

if (searchInput && searchDropdown) {
    searchInput.addEventListener('focus', () => {
        searchDropdown.style.display = 'block';
    });

    // To keep the dropdown open while interacting with it,
    // and close it when focus moves elsewhere.
    let isMouseOverDropdown = false;
    searchDropdown.addEventListener('mouseenter', () => {
        isMouseOverDropdown = true;
    });
    searchDropdown.addEventListener('mouseleave', () => {
        isMouseOverDropdown = false;
        // If focus is not on input, and mouse leaves dropdown, then hide
        if (document.activeElement !== searchInput) {
             searchDropdown.style.display = 'none';
        }
    });

    searchInput.addEventListener('blur', () => {
        // Small delay to allow click on dropdown items
        // or to register mouseenter on the dropdown
        setTimeout(() => {
            if (!isMouseOverDropdown) {
                searchDropdown.style.display = 'none';
            }
        }, 200);
    });
}

// Initialize Tailwind (if not automatically done by CDN script)
// This is usually handled by the Tailwind script itself.
// If you have a local Tailwind setup, this would be part of your build process.
// For CDN, ensure tailwind.config is defined before the main Tailwind script if you customize it.
// The original HTML had a tailwind.config script block. This is now implicitly handled by linking style.css for custom components
// and the CDN for utility classes.

// Example of how tailwind config was (it's not directly run in this JS file anymore)
/*
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#007bff',
                accent: '#f1f1f1',
                gradient: {
                    start: '#092AAA',
                    end: '#000000'
                }
            },
            fontFamily: {
                sans: ['Arial', 'sans-serif']
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale': 'scale 0.3s ease-in-out'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                scale: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' }
                }
            }
        }
    }
}
*/