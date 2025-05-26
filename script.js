document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const customizeForm = document.getElementById('customize-form');
    const previewContent = document.getElementById('preview-content');

    customizeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your order! We will contact you soon.');
    });

    // Live preview updates
    const formInputs = customizeForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    function updatePreview() {
        const names = document.getElementById('names').value || '[Couple Names]';
        const date = document.getElementById('date').value || '[Date]';
        const venue = document.getElementById('venue').value || '[Venue]';
        const message = document.getElementById('message').value || '[Your Message]';

        previewContent.innerHTML = `
            <div class="preview-card">
                <h3>${names}</h3>
                <p>Together with their families</p>
                <p>on</p>
                <p>${date}</p>
                <p>at</p>
                <p>${venue}</p>
                <p class="message">${message}</p>
            </div>
        `;
    }

    // Initial preview
    updatePreview();
});

// Card preview function
function previewCard(theme) {
    const previewContent = document.getElementById('preview-content');
    let themeStyle = '';
    
    switch(theme) {
        case 'classic':
            themeStyle = 'serif';
            break;
        case 'floral':
            themeStyle = 'cursive';
            break;
        case 'modern':
            themeStyle = 'sans-serif';
            break;
    }
    
    previewContent.style.fontFamily = themeStyle;
    document.getElementById('customize').scrollIntoView({ behavior: 'smooth' });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Shopping Cart Functionality
let cart = [];
const cartIcon = document.querySelector('.cart-icon');
const cartPanel = document.querySelector('.cart-panel');
const cartCount = document.querySelector('.cart-count');

cartIcon.addEventListener('click', () => {
    cartPanel.classList.toggle('active');
});

function addToCart(theme) {
    const prices = {
        'classic': 29.99,
        'floral': 34.99,
        'modern': 39.99,
        'vintage': 49.99,
        'rustic': 39.99
    };

    cart.push({
        theme: theme,
        price: prices[theme]
    });
    
    updateCart();
    showNotification('Item added to cart!');
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartCount.textContent = cart.length;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.theme} Theme</span>
            <span>$${item.price}</span>
            <button onclick="removeFromCart(${cart.indexOf(item)})">Remove</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    // Implement checkout logic here
    alert('Thank you for your purchase! We will process your order shortly.');
    cart = [];
    updateCart();
    cartPanel.classList.remove('active');
}

// Enhanced Preview Function
function previewCard(theme) {
    const previewContent = document.getElementById('preview-content');
    previewContent.innerHTML = '';
    
    const previewCard = document.createElement('div');
    previewCard.className = `preview-card ${theme}`;
    
    // Get form values
    const names = document.getElementById('names').value || '[Couple Names]';
    const date = document.getElementById('date').value || '[Date]';
    const venue = document.getElementById('venue').value || '[Venue]';
    const message = document.getElementById('message').value || '[Your Message]';
    
    previewCard.innerHTML = `
        <h3>${names}</h3>
        <p>Request the pleasure of your company</p>
        <p>on</p>
        <p>${date}</p>
        <p>at</p>
        <p>${venue}</p>
        <p class="message">${message}</p>
    `;
    
    previewContent.appendChild(previewCard);
    document.getElementById('customize').scrollIntoView({ behavior: 'smooth' });
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Contact Form Submission
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Here you would typically send this data to a server
    // For now, we'll just show a success message
    alert(`Thank you for your message, ${name}! We will get back to you soon.`);
    
    // Clear the form
    document.getElementById('contact-form').reset();
}

// Smooth scrolling for contact link
document.querySelector('a[href="#contact"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Image Preview Function
function previewImage(event) {
    const file = event.target.files[0];
    const previewContent = document.getElementById('preview-content');
    const imagePreview = document.createElement('div');
    imagePreview.className = 'image-preview';

    if (file) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            alert('Please select an image under 5MB');
            event.target.value = '';
            return;
        }

        // Check if it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            // Create image preview container
            imagePreview.innerHTML = `
                <div class="preview-image-container">
                    <img src="${e.target.result}" alt="Preview Image">
                    <button type="button" class="remove-image" onclick="removePreviewImage()">×</button>
                </div>
            `;
            
            // Add image preview before the form
            const customizeForm = document.getElementById('customize-form');
            const existingPreview = document.querySelector('.image-preview');
            if (existingPreview) {
                existingPreview.remove();
            }
            customizeForm.insertBefore(imagePreview, customizeForm.firstChild);

            // Update the main preview section
            updatePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Remove Preview Image
function removePreviewImage() {
    const imagePreview = document.querySelector('.image-preview');
    if (imagePreview) {
        imagePreview.remove();
    }
    // Clear the file input
    document.getElementById('custom-image').value = '';
    // Update preview without image
    updatePreview();
}

// Update the existing updatePreview function
function updatePreview(imageUrl = null) {
    const names = document.getElementById('names').value || '[Couple Names]';
    const date = document.getElementById('date').value || '[Date]';
    const venue = document.getElementById('venue').value || '[Venue]';
    const message = document.getElementById('message').value || '[Your Message]';

    const previewCard = document.createElement('div');
    previewCard.className = 'preview-card';
    
    // Set the uploaded image as background
    if (imageUrl) {
        previewCard.style.backgroundImage = `url(${imageUrl})`;
    }

    // Add the text content that will appear on top of the image
    previewCard.innerHTML = `
        <h3>${names}</h3>
        <p>Request the pleasure of your company</p>
        <p>on</p>
        <p>${date}</p>
        <p>at</p>
        <p>${venue}</p>
        <p class="message">${message}</p>
    `;

    previewContent.innerHTML = '';
    previewContent.appendChild(previewCard);
}