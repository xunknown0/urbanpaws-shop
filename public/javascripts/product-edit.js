 const productEditForm = document.getElementById('productEditForm');

  productEditForm.addEventListener('submit', function(event) {
    const imageUploads = document.getElementById('imageUpload').files.length; // new uploads
    const existingImgs = document.querySelectorAll('.imageDeleteCheckbox').length; // current images
    const imgDeletions = document.querySelectorAll('.imageDeleteCheckbox:checked').length; // marked for deletion

    // Total images after deletion + new uploads
    const newTotal = existingImgs - imgDeletions + imageUploads;

    if (newTotal > 4) {
      event.preventDefault();
      const removalAmt = newTotal - 4;
      alert(`You need to remove at least ${removalAmt} image${removalAmt === 1 ? '' : 's'} before uploading!`);
    }
  });