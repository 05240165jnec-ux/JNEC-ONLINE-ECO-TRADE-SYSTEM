document.addEventListener('DOMContentLoaded', () => {
    console.log('Post Item Script Running: SweetAlert2 and Single Image Mode');

    const postItemForm = document.getElementById('postItemForm');
    const imageUploadInput = document.getElementById('imageUpload');
    const selectImagesBtn = document.getElementById('selectImagesBtn');
    const imagePreview = document.getElementById('imagePreview');
    const photoCountSpan = document.getElementById('photoCount');
    const imageError = document.getElementById('imageError'); // Added for image error message

    // Form Inputs (Added category, condition, and location for better preview)
    const itemNameInput = document.getElementById('itemName');
    const priceInput = document.getElementById('price');
    const descriptionInput = document.getElementById('description');
    const categoryInput = document.getElementById('category');
    const conditionInput = document.getElementById('condition');
    const locationInput = document.getElementById('location');
    const contactPreferencesSelect = document.getElementById('contactPreferences');
    
    // Conditional Contact Fields
    const contactNumberField = document.getElementById('contactNumberField');
    const contactNumberInput = document.getElementById('contactNumber');
    const appMessageField = document.getElementById('appMessageField');
    const appUsernameInput = document.getElementById('appUsername');

    // Preview Elements
    const previewPrice = document.getElementById('previewPrice');
    const previewTitle = document.getElementById('previewTitle');
    const previewDescription = document.getElementById('previewDescription');
    const previewCategory = document.getElementById('previewCategory');
    const previewCondition = document.getElementById('previewCondition');
    const previewLocation = document.getElementById('previewLocation');
    const previewImageArea = document.getElementById('previewImageArea');
    
    let uploadedFile = null; // Store a single file object
    const MAX_FILES = 1; // CRITICAL: Set max file limit to 1

    // --- Utility Functions ---

    // Function to update the contact field visibility
    const updateConditionalContactFields = (selectedPreference) => {
        contactNumberField.classList.add('d-none');
        appMessageField.classList.add('d-none');
        
        // Reset required state 
        contactNumberInput.removeAttribute('required');
        appUsernameInput.removeAttribute('required');

        if (selectedPreference === 'Contact') {
            contactNumberField.classList.remove('d-none');
            contactNumberInput.setAttribute('required', 'required');
        } else if (selectedPreference === 'App Message') {
            appMessageField.classList.remove('d-none');
            appUsernameInput.setAttribute('required', 'required');
        }
    };

    // Function to update the live preview panel
    const updatePreview = () => {
        // Update Title
        previewTitle.textContent = itemNameInput.value || 'Item Title will appear here';
        
        // Update Price (Format with 'Nu')
        const price = priceInput.value ? `Nu ${parseFloat(priceInput.value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : 'Nu 0';
        previewPrice.textContent = price;

        // Update Description
        previewDescription.textContent = descriptionInput.value || 'Description will appear here.';
        
        // Update Category/Condition/Location (Added for better preview)
        previewCategory.textContent = categoryInput.value || 'Not set';
        previewCondition.textContent = conditionInput.value || 'Not set';
        const locationText = locationInput.value || 'JNEC';
        previewLocation.textContent = `Listed just now in ${locationText}`;
    };

    // --- Event Listeners: Form Inputs for Live Preview ---

    // Listen to changes on all relevant form fields
    const formInputs = [itemNameInput, priceInput, descriptionInput, categoryInput, conditionInput, locationInput];
    formInputs.forEach(input => input.addEventListener('input', updatePreview));

    // --- Event Listener: Contact Preferences ---

    contactPreferencesSelect.addEventListener('change', () => {
        updateConditionalContactFields(contactPreferencesSelect.value);
    });
    
    // --- Event Listeners: Image Upload (Max 1 File) ---
    
    selectImagesBtn.addEventListener('click', () => {
        // Since we only allow one file, we don't need to check length here, just open file selector
        imageUploadInput.click();
    });

    imageUploadInput.addEventListener('change', (event) => {
        const files = event.target.files;
        
        if (files.length > 0) {
            // CRITICAL: Only take the first file
            uploadedFile = files[0];
            renderImages();
            imageError.style.display = 'none';
        } else {
            uploadedFile = null;
            renderImages();
        }
        
        // Clear the file input to allow re-uploading the same file
        imageUploadInput.value = '';
    });
    
    const renderImages = () => {
        imagePreview.innerHTML = '';
        
        // Default content for the preview image area
        const defaultPreviewContent = `
            <div class="text-center p-5">
                <h5 class="text-muted mb-2">Your listing preview</h5>
                <small class="text-muted">As you create your listing, you can preview how it will appear to others on Marketplace.</small>
            </div>
        `;
        previewImageArea.innerHTML = defaultPreviewContent;

        // CRITICAL: Update photo count for max 1
        photoCountSpan.textContent = uploadedFile ? 1 : 0;

        if (!uploadedFile) {
            return;
        }

        const file = uploadedFile;
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;

            // 1. Render thumbnail in the Form
            const container = document.createElement('div');
            container.classList.add('uploaded-image-container');
            
            const img = document.createElement('img');
            img.src = imageUrl;
            
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-image-btn');
            removeBtn.innerHTML = '&times;';
            // Use a function that removes the single file
            removeBtn.addEventListener('click', removeImage); 
            
            container.appendChild(img);
            container.appendChild(removeBtn);
            imagePreview.appendChild(container);
            
            // 2. Render image in the Preview Area
            previewImageArea.innerHTML = `<img src="${imageUrl}" alt="Preview Image">`;
        };
        reader.readAsDataURL(file);
    };
    
    const removeImage = () => {
        uploadedFile = null;
        renderImages();
    };


    // --- Form Submission Logic ---
    postItemForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // **Custom validation for image (must be 1)**
        if (!uploadedFile) {
            imageError.style.display = 'block';
            postItemForm.classList.add('was-validated'); // Trigger Bootstrap validation styles
            return;
        }
        imageError.style.display = 'none';

        // Check form validity before proceeding to SweetAlert2
        if (!postItemForm.checkValidity()) {
             postItemForm.classList.add('was-validated');
             return;
        }

        // If form is valid:
        
        // Collect data (for console log demonstration)
        const data = {
            title: itemNameInput.value,
            price: priceInput.value,
            description: descriptionInput.value,
            category: categoryInput.value,
            condition: conditionInput.value,
            location: locationInput.value,
            contact: contactPreferencesSelect.value === 'Contact' ? contactNumberInput.value : appUsernameInput.value,
            imageFileName: uploadedFile.name 
        };
        
        console.log('--- Item Data Submitted ---', data);

        // **CRITICAL: Show SweetAlert2 success message**
        await Swal.fire({
            icon: 'success',
            title: 'Posted Successfully! 🎉',
            text: 'Your item has been posted successfully!',
            confirmButtonText: 'View Listing',
            customClass: {
                // You can add custom classes if you want to style the Swal popup further
            }
        });
        
        // --- Reset Form After Submission ---
        postItemForm.reset();
        postItemForm.classList.remove('was-validated');
        uploadedFile = null;
        renderImages();
        updatePreview();
        updateConditionalContactFields('');
    });
    
    // Initialize the preview and contact fields on load
    updatePreview();
    updateConditionalContactFields('');
});