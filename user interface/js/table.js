// Wishlist functionality
const wishlistBtn = document.getElementById('wishlistBtn');
let isWishlisted = false;

wishlistBtn.addEventListener('click', () => {
    isWishlisted = !isWishlisted;
    
    if (isWishlisted) {
        wishlistBtn.classList.add('active');
        wishlistBtn.querySelector('i').classList.remove('far');
        wishlistBtn.querySelector('i').classList.add('fas');
        
        Swal.fire({
            icon: 'success',
            title: 'Added to Wishlist!',
            text: 'This item has been added to your Saved.',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-end'
        });
    } else {
        wishlistBtn.classList.remove('active');
        wishlistBtn.querySelector('i').classList.remove('fas');
        wishlistBtn.querySelector('i').classList.add('far');
        
        Swal.fire({
            icon: 'info',
            title: 'Removed from Wishlist',
            text: 'This item has been removed from your Saved.',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-end'
        });
    }
});

// Book Now functionality
const bookNowBtn = document.getElementById('bookNowBtn');

bookNowBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Book This Item?',
        text: 'Would you like to proceed with booking this table?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, book it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Booking Confirmed!',
                html: `
                    <p>Your booking has been confirmed.</p>
                    <p><strong>Seller Contact:</strong> 17229645</p>
                    <p>The seller will contact you shortly.</p>
                `,
                confirmButtonColor: '#4caf50',
                confirmButtonText: 'OK'
            });
        }
    });
});

// Seller Profile Modal functionality
const sellerModal = document.getElementById('sellerModal');
const sellerDetailsBtn = document.getElementById('sellerDetailsBtn');
const sellerInfo = document.getElementById('sellerInfo');
const closeModal = document.getElementById('closeModal');

// Open modal on "Seller details" button click
sellerDetailsBtn.addEventListener('click', () => {
    sellerModal.classList.add('active');
});

// Open modal on seller info click
sellerInfo.addEventListener('click', () => {
    sellerModal.classList.add('active');
});

// Close modal on close button click
closeModal.addEventListener('click', () => {
    sellerModal.classList.remove('active');
});

// Close modal when clicking outside
sellerModal.addEventListener('click', (e) => {
    if (e.target === sellerModal) {
        sellerModal.classList.remove('active');
    }
});

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sellerModal.classList.contains('active')) {
        sellerModal.classList.remove('active');
    }
});