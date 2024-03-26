let alert = document.querySelector('.alert');
setTimeout(() => {
  alert.style.transform = `translate(500px)`;
  alert.style.transition = "ease all 0.5s";
  alert.style.position = "fixed";
}, 5000);

let loading = document.querySelector('.loadingStart');
setTimeout(() => {
  loading.style.display = "none";
}, 250);



function toggleSidebar(btn) {
  // Toggle the 'active' class on the sidebar
  document.getElementById("sidebar").classList.toggle('active');

  // Toggle the icon class between fa-circle-left and fa-circle-right
  var icon = btn.querySelector('.fa-solid');
  if (icon.classList.contains('fa-caret-left')) {
    icon.classList.remove('fa-caret-left');
    icon.classList.add('fa-caret-right');
  } else {
    icon.classList.remove('fa-caret-right');
    icon.classList.add('fa-caret-left');
  }
}


