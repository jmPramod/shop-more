let alert = document.querySelector('.alert');
if (alert) {


  setTimeout(() => {
    alert.style.transform = `translate(500px)`;
    alert.style.transition = "ease all 0.5s";
    alert.style.position = "fixed";
  }, 5000);
}





function toggleSidebar(btn) {
  // Toggle the 'active' class on the sidebar
  document.getElementById("sidebar").classList.toggle('active');

  // Toggle the icon class between fa-circle-left and fa-circle-right
  var icon = btn.querySelector('.fa-solid');
  if (icon) {
    if (icon.classList.contains('fa-caret-left')) {
      icon.classList.remove('fa-caret-left');
      icon.classList.add('fa-caret-right');
    } else {
      icon.classList.remove('fa-caret-right');
      icon.classList.add('fa-caret-left');
    }
  }
}


//!Spinner test 1

function previewImage(event) {
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imagePreview = document.getElementById('profileImage');
      imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}
