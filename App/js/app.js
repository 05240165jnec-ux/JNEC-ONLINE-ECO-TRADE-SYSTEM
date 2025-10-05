

// //for feedback
// console.clear();

// // Check if GSAP is loaded
// if (typeof gsap === 'undefined') {
//     console.error('GSAP library is not loaded. Please include GSAP in your HTML.');
// }

// // selector functions
// const $ = (s, o = document) => o.querySelector(s);
// const $$ = (s, o = document) => o.querySelectorAll(s);

// // store references to all of the elements we'll need
// const inputs = $$('input[type="radio"]');
// const horn1 = $('#horn-1'), horn2 = $('#horn-2'), horn3 = $('#horn-3'), horn4 = $('#horn-4'), horn5 = $('#horn-5');
// const earL = $('#ear-l'), earR = $('#ear-r'), earring = $('#earring');
// const pupil = $('#pupil');
// const eyePaths = $$('.eye-path'), mouthPaths = $$('.mouth-path');
// const chin = $('#chin'), tongue = $('#tongue'), toothTop = $('#tooth-top'), toothBot = $('#tooth-bot');
// const avatar = $('#avatar');

// // path data for shape morphing
// const eye0 = "M175.4,75.3c-12,0-23.4-0.9-33.7-2.5c-4.2,6.4-6.7,14-6.7,22.2c0,12.4,5.7,23.5,14.6,30.9c6.9,5.7,15.8,9.1,25.4,9.1c9.7,0,18.5-3.4,25.4-9.1c8.9-7.3,14.6-18.4,14.6-30.9c0-8.2-2.5-15.8-6.7-22.1C198.3,74.5,187.1,75.3,175.4,75.3z";
// const eye1 = "M213.3,82.3c-9.7,4-23.1,6.5-37.9,6.5s-28.2-2.5-37.9-6.5c-1.3,4-2.1,8.3-2.1,12.8c0,11,4.4,20.9,11.6,28.1c8.2-1.8,18-2.9,28.4-2.9s20.2,1.1,28.4,2.9c7.2-7.2,11.6-17.2,11.6-28.1C215.4,90.6,214.6,86.3,213.3,82.3z";
// const eye2 = "M215.4,95.1c0-7.4-2-14.3-5.5-20.3c-9.3,2.5-21.3,4-34.5,4s-25.1-1.5-34.5-4c-3.5,6-5.5,12.9-5.5,20.3c0,13.1,6.3,24.7,16,32c7.2-1.1,15.4-1.7,24-1.7s16.8,0.6,24,1.7C209.1,119.8,215.4,108.2,215.4,95.1z";
// const eye3 = "M152.9,128.2c6.8-0.9,14.5-1.5,22.5-1.5s15.7,0.5,22.5,1.5c10.6-7.2,17.5-19.3,17.5-33.1c0-12.8-6-24.2-15.4-31.5c-7.4,2-15.7,3.2-24.6,3.2s-17.3-1.2-24.6-3.2c-9.4,7.3-15.4,18.7-15.4,31.5C135.4,108.8,142.3,121,152.9,128.2z";
// const eye4 = "M150.7,128.1c7.3-1.1,15.6-1.7,24.3-1.7s17,0.6,24.3,1.7c10.1-7.5,16.7-19.5,16.7-33c0-13.4-6.4-25.3-16.4-32.8c-6.9-5.2-15.4-8.2-24.6-8.2c-9.5,0-18.2,3.2-25.2,8.6c-9.6,7.5-15.8,19.2-15.8,32.4C134,108.6,140.6,120.6,150.7,128.1z";
// const eye5 = "M219,95.1c0,12-4.7,23-12.4,30.9c-7.9,8.1-19,13.1-31.6,13.1c-12.2,0-23.2-4.9-31.1-12.9c-8-8-12.9-19-12.9-31.1c0-13.7,6.2-25.9,16-34c7.6-6.3,17.4-10,28-10c9.9,0,19.1,3.3,26.4,8.8C212.1,67.9,219,80.7,219,95.1z";
// const mouth0 = "M174.6,178.2h5.1H215c0,0,0.1,0,0.1,0c0,0,0,0-0.1,0h-35.3L174.6,178.2l-4.6,0.1h-35c0,0-0.1,0-0.1,0c0,0,0,0,0.1,0h35H174.6z";
// const mouth1 = "M175,172.6h7c8.9,0,16.2,6.4,17.7,14.9c0.2,1,0.3,2,0.3,3.1c0,0.8-0.5,2-2,2l-16,0h-7h-7l-16,0c-1.4,0-2-1.2-2-2c0-1,0.1-1.9,0.2-2.8c1.4-8.6,8.8-15.1,17.7-15.1H175z";
// const mouth2 = "M175,187c5.5,0,9.7-2.1,13.8-4.1c5.5-2.7,11.3-5.5,17.6-0.4c0.1,0.1,0.3,0.3,0.2,0.4c-0.1,0.1-0.3,0.1-0.4,0c-5.6-5.1-11.7-2.6-17.4,0.2c-4.2,2-7.3,4.1-13.9,4.1c-6.5,0-9-2.1-12.9-4.1c-5.1-2.8-10.6-5.8-18.6-0.6c-0.1,0-0.1,0-0.1,0c0,0,0-0.1,0.1-0.1c7.9-5.4,13.4-2.4,18.8,0.5C165.9,185,169.7,187,175,187z";
// const mouth3 = "M175,179.8c2,0,4-0.1,6-0.2c11-0.9,22-4.1,32.9-9.7c0.1,0,0.2-0.1,0.2,0c0,0.1-0.1,0.2-0.2,0.2c-11.6,6-21.7,9-33,9.7c-2,0.1-4,0.3-6,0.3c-2.3,0-4.6-0.1-6.8-0.3c-10.9-0.8-20.8-3.9-32.1-9.7c-0.1,0-0.1-0.1-0.1-0.1c0,0,0.1,0,0.2,0c10.7,5.5,21.4,8.7,32.1,9.6C170.5,179.7,172.7,179.8,175,179.8z";
// const mouth4 = "M174.8,172.6h10H200l0,4.9c0,1.4-0.2,2.7-0.6,4c-1.8,5.9-7.5,10.1-14.3,10.1h-10.4h-9.9c-6.7,0-12.3-4.2-14.2-9.9c-0.4-1.3-0.7-2.7-0.7-4.2v-4.9h14.3H174.8z";
// const mouth5 = "M175,165.6h4.8l23.3,0c5.6,0,8.9,4.7,8.9,8.9c0,3-0.4,6-1.2,8.7c-3.8,14-16.7,24.3-31.9,24.3H175h-3.9c-15.5,0-28.6-10.7-32.1-25.2c-0.6-2.5-0.9-5.2-0.9-7.9c0-5,4.1-8.9,8.9-8.9l23.9,0H175z";

// // vars
// let curRating = 0;
// let tl;
// let durReduced = 0, durNoPref = .5, dur;
// let eyeTarg, mouthTarg, chinY, pupilS, earS, earY, earRotL, earRotR, earringX, earringY, tongueY, toothTopY, toothBotY;
// const horns = [horn1,horn2,horn3,horn4,horn5];
// let hornsU = [], hornsD = horns;
// let mq;

// // Initialize only if GSAP is available
// if (typeof gsap !== 'undefined') {
//     initializeAvatar();
// } else {
//     console.error('GSAP not available. Avatar animations will not work.');
// }

// function initializeAvatar() {
//     // set up matchMedia instance to detect the reduced motion media query
//     mq = window.matchMedia('(prefers-reduced-motion: reduce)');
//     // safari doesn't support 'matchMedia.addEventListener' so we have to check support for that and add the legacy 'addListener' if not.
//     if(mq.addEventListener) {
//         mq.addEventListener('change', onReduceMotionMQ);
//     } else {
//         mq.addListener(onReduceMotionMQ);
//     }
//     // manually check media query initially
//     onReduceMotionMQ();

//     // activate any gsap plugins
//     if (typeof MorphSVGPlugin !== 'undefined') {
//         gsap.registerPlugin(MorphSVGPlugin);
//     }

//     // set initial visual properties of avatar
//     gsap.set(earL,         {transformOrigin: "40px 40px", rotate: "-15deg", y: 10, scale: .9});
//     gsap.set(earR,         {transformOrigin: "40px 40px", rotate: "15deg", y: 10, scale: .9});
//     gsap.set(earring,         {transformOrigin: "50% 0", x: -12, y: 8});
//     gsap.set(pupil,        {transformOrigin: "50% 50%"});
    
//     // Use morphSVG only if plugin is available
//     if (typeof MorphSVGPlugin !== 'undefined') {
//         gsap.set(eyePaths,         {morphSVG: eye0});
//         gsap.set(mouthPaths,    {morphSVG: mouth0});
//     }
    
//     gsap.set(chin,         {y: 0});
//     gsap.set(horn1,        {transformOrigin: "20px 45px", scale: 0});
//     gsap.set(horn2,        {transformOrigin: "12px 45px", scale: 0});
//     gsap.set(horn3,        {transformOrigin: "32px 38px", scale: 0});
//     gsap.set(horn4,        {transformOrigin: "12px 38px", scale: 0});
//     gsap.set(horn5,        {transformOrigin: "50% 90%", scale: 0});
//     gsap.set(avatar,         {opacity: 1});

//     /* add click handler to inputs */
//     inputs.forEach(function(i) {
//         i.addEventListener("click", onRatingClick);
//     });
// }

// function onRatingClick(e) {
//     if (typeof gsap === 'undefined') return;
    
//     // determine which rating was clicked
//     let num = parseInt(e.target.getAttribute('data-num'));
    
//     // crate new timeline
//     tl = gsap.timeline({paused: true, defaults:{duration: dur, ease: "sine.out"}});
    
//     // determine which horns go up/down
//     hornsU = horns.slice(0,num);
//     if(hornsU.length > curRating) {hornsU = hornsU.slice(curRating);}
//     hornsD = horns.slice(num,curRating);
    
//     // set props based on which rating was clicked on
//     switch (num) {
//         case 0:
//             eyeTarg = eye0;
//             mouthTarg = mouth0;
//             chinY = 0;
//             pupilS = 1;
//             earS = .9; earY = 10; earRotL = "-15deg"; earRotR = "15deg"; earringX = -12; earringY = 8;
//             tongueY = 0; toothTopY = 0; toothBotY = 0;
//             break;
//         case 1:
//             eyeTarg = eye1;
//             mouthTarg = mouth1;
//             chinY = 3;
//             pupilS = .84;
//             earS = 1.1; earY = -4; earRotL = "10deg"; earRotR = "-10deg"; earringX = 0; earringY = 0;
//             tongueY = 2; toothTopY = 5; toothBotY = -17;
//             break;
//         case 2:
//             eyeTarg = eye2;
//             mouthTarg = mouth2;
//             chinY = -2;
//             pupilS = .94;
//             earS = 1.05; earY = -2; earRotL = "5deg"; earRotR = "-5deg"; earringX = -2; earringY = -1;
//             tongueY = 0; toothTopY = 0; toothBotY = 0;
//             break;
//         case 3:
//             eyeTarg = eye3;
//             mouthTarg = mouth3;
//             chinY = -4;
//             pupilS = 1;
//             earS = 1; earY = 0; earRotL = "0deg"; earRotR = "0deg"; earringX = -4; earringY = -2;
//             tongueY = 0; toothTopY = 0; toothBotY = 0;
//             break;
//         case 4:
//             eyeTarg = eye4;
//             mouthTarg = mouth4;
//             chinY = 3;
//             pupilS = 1.1;
//             earS = .95; earY = -3; earRotL = "2deg"; earRotR = "-2deg"; earringX = -2; earringY = -5;
//             tongueY = -4; toothTopY = 6; toothBotY = -16;
//             break;
//         case 5:
//             eyeTarg = eye5;
//             mouthTarg = mouth5;
//             chinY = 14;
//             pupilS = 1.2;
//             earS = .9; earY = -6; earRotL = "4deg"; earRotR = "-4deg"; earringX = 0; earringY = -10;
//             tongueY = 0; toothTopY = 2; toothBotY = -2;
//             break;
//         default:
//             break;
//     }
    
//     // Add morphSVG animations only if plugin is available
//     if (typeof MorphSVGPlugin !== 'undefined') {
//         tl
//             .to(eyePaths,             {morphSVG: eyeTarg}, 0)
//             .to(mouthPaths,         {morphSVG: mouthTarg}, 0);
//     }
    
//     tl
//         .to(chin,             {y: chinY}, 0)
//         .to(pupil,             {scale: pupilS}, 0)
//         .to(earL,             {scale: earS, y: earY, rotate: earRotL}, 0)
//         .to(earR,             {scale: earS, y: earY, rotate: earRotR}, 0)
//         .to(earring,             {x: earringX, y: earringY}, 0)
//         .to(tongue,             {y: tongueY}, 0)
//         .to(toothTop,             {y: toothTopY}, 0)
//         .to(toothBot,             {y: toothBotY}, 0)
//     ;
    
//     if(hornsU.length) {
//         if(dur) {
//             gsap.to(hornsU,     {scale: 1, stagger:{each:.1, ease: "power1.out"}, duration: dur, ease: "back.out"});
//         } else {
//             gsap.set(hornsU,     {scale: 1});
//         }        
//     }
//     if(hornsD.length) {
//         if(dur) {
//             gsap.to(hornsD,    {scale: 0, stagger: {each:-.08, ease: "power2.out"}, duration: dur, ease: "back.in"});
//         } else {
//             gsap.set(hornsD,    {scale: 0});
//         }
//     }
    
//     curRating = num;
    
//     tl.play();
// }

// function onReduceMotionMQ() {
//     // change animation time depending on user preference
//     if(mq.matches) {
//         dur = durReduced;
//     } else {
//         dur = durNoPref;
//     }
// }

// // Fix the rating variable issue
// let rating = 0;

// // Update rating when user selects a star
// inputs.forEach(input => {
//     input.addEventListener('change', function() {
//         rating = this.getAttribute('data-num');
//     });
// });

// // Submit feedback function
// document.getElementById('submit-feedback').addEventListener('click', () => {
//     const comment = document.getElementById('comment').value;
//     alert(`Rating: ${rating}\nComment: ${comment}`);
// });

// // This isfor submit button
// const reviewsList = document.getElementById('reviews-list');
// const reviewForm = document.getElementById('review-form');
// const reviewText = document.getElementById('review-text');
// const reviewRating = document.getElementById('rating');
// const averageRating = document.getElementById('average-rating');
// const averageStars = document.getElementById('average-stars');
// const totalReviews = document.getElementById('total-reviews');
// const ratingBars = document.getElementById('rating-bars');

// let reviews = [
//   {
//     user: "Unknown",
//     date: "2 days ago",
//     rating: 5,
//     text: "Great experience! The seller was very responsive and the item was exactly as described. Highly recommend!",
//     likes: 12,
//     dislikes: 2
//   },
//   {
//     user: "Unknown",
//     date: "1 week ago",
//     rating: 4,
//     text: "Good service overall. The item arrived on time and in good condition. Could have been packaged better.",
//     likes: 8,
//     dislikes: 1
//   }
// ];

// function renderStars(rating) {
//   return "★".repeat(rating) + "☆".repeat(5 - rating);
// }

// function updateRatingDisplay() {
//   const total = reviews.length;
//   const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
//   const avg = (sum / total).toFixed(1);

//   averageRating.textContent = avg;
//   averageStars.textContent = renderStars(Math.round(avg));
//   totalReviews.textContent = total;

//   // Ratings breakdown
//   const counts = [0, 0, 0, 0, 0]; // Index 0 = 1-star
//   reviews.forEach(r => counts[r.rating - 1]++);

//   ratingBars.innerHTML = '';
//   for (let i = 4; i >= 0; i--) {
//     const percent = ((counts[i] / total) * 100).toFixed(0);
//     ratingBars.innerHTML += `
//       <div class="bar-row">
//         <span>${i + 1}</span>
//         <div class="bar" style="width: ${percent}%;"></div>
//         <span>${percent}%</span>
//       </div>
//     `;
//   }
// }

// function renderReviews() {
//   reviewsList.innerHTML = '';
//   reviews.forEach((review, index) => {
//     const reviewEl = document.createElement('div');
//     reviewEl.className = 'review-card';
//     reviewEl.innerHTML = `
//       <div class="avatar">👤</div>
//       <div class="review-content">
//         <div class="meta">
//           <span class="user">${review.user}</span>
//           <span class="date">${review.date}</span>
//         </div>
//         <div class="stars">${renderStars(review.rating)}</div>
//         <p>${review.text}</p>
//         <div class="actions">
//           <span class="like-btn" onclick="likeReview(${index})">👍 ${review.likes}</span>
//           <span class="dislike-btn" onclick="dislikeReview(${index})">👎 ${review.dislikes}</span>
//         </div>
//       </div>
//     `;
//     reviewsList.appendChild(reviewEl);
//   });
// }

// function likeReview(index) {
//   reviews[index].likes++;
//   renderReviews();
// }

// function dislikeReview(index) {
//   reviews[index].dislikes++;
//   renderReviews();
// }

// reviewForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const rating = parseInt(reviewRating.value);
//   const text = reviewText.value.trim();

//   if (!text) return;

//   const newReview = {
//     user: "Unknown",
//     date: "just now",
//     rating,
//     text,
//     likes: 0,
//     dislikes: 0
//   };

//   reviews.unshift(newReview);
//   reviewText.value = '';
//   reviewRating.value = '4';

//   renderReviews();
//   updateRatingDisplay();
// });

// // Initial rendering
// renderReviews();
// updateRatingDisplay();





// for switch_account
document.addEventListener('DOMContentLoaded', function() {
    // Back button functionality
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to go back?')) {
            // In a real app, this would navigate to the previous page
            alert('Navigating back to the previous screen...');
            // window.history.back(); // Uncomment for actual back navigation
        }
    });
    
    // Account selection functionality
    const accountItems = document.querySelectorAll('.account-item');
    accountItems.forEach(item => {
        // Click on account item to switch
        item.addEventListener('click', function(e) {
            // Don't trigger if remove button was clicked
            if (e.target.closest('.remove-btn')) return;
            
            // Update active state
            document.querySelector('.account-item.active').classList.remove('active');
            document.querySelector('.account-item.active .sign-in-btn').textContent = 'Switch';
            
            this.classList.add('active');
            this.querySelector('.sign-in-btn').textContent = 'Signed In';
            
            // Update status text
            const allStatuses = document.querySelectorAll('.account-status');
            allStatuses.forEach(status => {
                if (status.textContent === 'Currently signed in') {
                    status.textContent = 'Signed in on this device';
                }
            });
            
            this.querySelector('.account-status').textContent = 'Currently signed in';
            
            // Show success message with animation
            const accountName = this.querySelector('.account-name').textContent;
            showSuccessMessage(`Switched to ${accountName} successfully!`);
        });
    });
    
    // Remove account functionality
    const removeButtons = document.querySelectorAll('.remove-btn');
    const removeAccountModal = new bootstrap.Modal(document.getElementById('removeAccountModal'));
    let accountToRemove = null;
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering account switch
            
            const accountItem = this.closest('.account-item');
            const accountName = accountItem.querySelector('.account-name').textContent;
            accountToRemove = accountItem;
            
            // Check if trying to remove active account
            if (accountItem.classList.contains('active')) {
                showErrorMessage('Cannot remove the currently active account. Please switch to another account first.');
                return;
            }
            
            // Show confirmation modal
            document.getElementById('accountToRemove').textContent = accountName;
            removeAccountModal.show();
        });
    });
    
    // Confirm remove account
    document.getElementById('confirmRemove').addEventListener('click', function() {
        if (accountToRemove) {
            const accountName = accountToRemove.querySelector('.account-name').textContent;
            
            // Add removal animation
            accountToRemove.style.transform = 'translateX(-100%)';
            accountToRemove.style.opacity = '0';
            
            setTimeout(() => {
                accountToRemove.remove();
                removeAccountModal.hide();
                showSuccessMessage(`${accountName} account has been removed.`);
                accountToRemove = null;
                
                // If no accounts left, show message
                if (document.querySelectorAll('.account-item').length === 0) {
                    document.getElementById('accountContent').innerHTML = `
                        <div class="text-center py-5">
                            <i class="fas fa-user-slash fa-3x text-muted mb-3"></i>
                            <h3 class="text-muted">No accounts available</h3>
                            <p class="text-muted">Add an account to get started</p>
                        </div>
                        <div class="add-account" id="addAccount">
                            <div class="add-icon">
                                <i class="fas fa-plus"></i>
                            </div>
                            <div class="add-account-text">Add New Account</div>
                        </div>
                    `;
                    
                    // Re-attach event listener to the new add account button
                    document.getElementById('addAccount').addEventListener('click', addAccountHandler);
                }
            }, 300);
        }
    });
    
    // Add account functionality
    const addAccount = document.getElementById('addAccount');
    let accountCounter = 3; // Starting after the three default accounts
    
    // Add account handler function
    function addAccountHandler() {
        accountCounter++;
        const newAccountName = `User${accountCounter}`;
        const newAccountInitial = newAccountName.charAt(0);
        
        const newAccountItem = document.createElement('div');
        newAccountItem.className = 'account-item';
        newAccountItem.setAttribute('data-account', newAccountName.toLowerCase());
        newAccountItem.innerHTML = `
            <div class="account-avatar">${newAccountInitial}</div>
            <div class="account-info">
                <div class="account-name">${newAccountName}</div>
                <div class="account-status">Available to sign in</div>
            </div>
            <div class="account-actions">
                <button class="sign-in-btn">Switch</button>
                <button class="remove-btn">
                    <i class="fas fa-trash-alt me-1"></i> Remove
                </button>
            </div>
        `;
        
        // Add animation for new account
        newAccountItem.style.opacity = '0';
        newAccountItem.style.transform = 'translateY(20px)';
        
        // Insert before the "Add account" item
        const accountList = document.getElementById('accountList');
        if (accountList) {
            accountList.appendChild(newAccountItem);
        } else {
            // If accountList doesn't exist (because all accounts were removed)
            const addAccountBtn = document.getElementById('addAccount');
            const newAccountList = document.createElement('div');
            newAccountList.className = 'account-list';
            newAccountList.id = 'accountList';
            newAccountList.appendChild(newAccountItem);
            addAccountBtn.parentNode.insertBefore(newAccountList, addAccountBtn);
        }
        
        // Animate in the new account
        setTimeout(() => {
            newAccountItem.style.transition = 'all 0.4s ease';
            newAccountItem.style.opacity = '1';
            newAccountItem.style.transform = 'translateY(0)';
        }, 10);
        
        // Add event listeners to the new account
        newAccountItem.addEventListener('click', function(e) {
            if (e.target.closest('.remove-btn')) return;
            
            document.querySelector('.account-item.active').classList.remove('active');
            document.querySelector('.account-item.active .sign-in-btn').textContent = 'Switch';
            
            this.classList.add('active');
            this.querySelector('.sign-in-btn').textContent = 'Signed In';
            
            // Update status text
            const allStatuses = document.querySelectorAll('.account-status');
            allStatuses.forEach(status => {
                if (status.textContent === 'Currently signed in') {
                    status.textContent = 'Signed in on this device';
                }
            });
            
            this.querySelector('.account-status').textContent = 'Currently signed in';
            
            showSuccessMessage(`Switched to ${newAccountName} successfully!`);
        });
        
        // Add event listener to the remove button
        newAccountItem.querySelector('.remove-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            
            const accountItem = this.closest('.account-item');
            const accountName = accountItem.querySelector('.account-name').textContent;
            accountToRemove = accountItem;
            
            if (accountItem.classList.contains('active')) {
                showErrorMessage('Cannot remove the currently active account. Please switch to another account first.');
                return;
            }
            
            document.getElementById('accountToRemove').textContent = accountName;
            removeAccountModal.show();
        });
        
        showSuccessMessage(`${newAccountName} has been added successfully!`);
    }
    
    addAccount.addEventListener('click', addAccountHandler);
    
    // Notification functions
    function showSuccessMessage(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'alert alert-success alert-dismissible fade show';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            border-radius: 10px;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle me-2"></i> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
    }
    
    function showErrorMessage(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'alert alert-warning alert-dismissible fade show';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            border-radius: 10px;
        `;
        notification.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
    }
});




