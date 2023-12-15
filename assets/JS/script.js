
// Ensure the modal starts open
var modal = document.getElementById('modal');
modal.classList.add('is-active');

// Check for the presence of the "verifier" key in local storage
var verifierKey = localStorage.getItem('verifier');
if (verifierKey) {
  // Close the modal if the "verifier" key is present
  closeModal(); 
  loadScript();
}

function loadScript() {
  // Load the OAuth script with type="module"
  var script = document.createElement('script');
  script.type = 'module';
  script.src = 'assets/JS/oauth-test.js';
// script.src = 'assets/JS/oauth-live.js';
  document.head.appendChild(script);
}

function closeModal() {
  // Close the modal
  modal.classList.remove('is-active');
}


$(document).ready(function () {
    const tabs = $(".tabs li");
    const tabContentBoxes = $(".tab-content");

    tabs.click(function (e) {
      e.preventDefault();
      // Remove 'is-active' class from all tabs
      tabs.removeClass("is-active");
      // Add 'is-active' class to the clicked tab
      $(this).addClass("is-active");
      // Hide all tab contents
      tabContentBoxes.removeClass("active");
      // Show the corresponding tab content based on the data-target attribute
      const target = $(this).data("target");
      $("#" + target).addClass("active");
    });
  });



