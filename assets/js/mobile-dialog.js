document.addEventListener('DOMContentLoaded', function() {
    const mobileDialog = document.querySelector('.mobile-dialog');
    const closeButton = document.querySelector('.mobile-dialog-close');
    
    // Check if user has already dismissed the dialog
    const hasDismissedDialog = localStorage.getItem('mobileDialogDismissed');
    
    // Show dialog only on mobile devices and if not previously dismissed
    if (window.innerWidth <= 768 && !hasDismissedDialog) {
        mobileDialog.style.display = 'flex';
    }
    
    // Handle close button click
    closeButton.addEventListener('click', function() {
        mobileDialog.style.display = 'none';
        // Set flag in localStorage to remember user's choice
        localStorage.setItem('mobileDialogDismissed', 'true');
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileDialog.style.display = 'none';
        } else if (!hasDismissedDialog) {
            mobileDialog.style.display = 'flex';
        }
    });
}); 