// Ensure the modal starts open
var modal = document.getElementById('modal-js-example');
modal.classList.add('is-active');

// Check for the presence of the "verifier" key in local storage
var verifierKey = localStorage.getItem('verifier');
if (verifierKey) {
  // Close the modal if the "verifier" key is present
  closeModal();
  // Load the OAuth script only if the "verifier" key is present
  loadScript();
}

function loadScript() {
  // Load the OAuth script with type="module"
  var script = document.createElement('script');
  script.type = 'module';
  script.src = 'assets/JS/oauth-live.js';
  document.head.appendChild(script);
}

function closeModal() {
  // Close the modal
  modal.classList.remove('is-active');
}



  document.addEventListener('DOMContentLoaded', function () {
    
    // Get all tabs
    var tabs = document.querySelectorAll('.tabs li');

    // Add click event listeners to each tab
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Remove 'is-active' class from all tabs
        tabs.forEach(function (t) {
          t.classList.remove('is-active');
        });

        // Add 'is-active' class to the clicked tab
        tab.classList.add('is-active');

        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(function (content) {
          content.style.display = 'none';
        });

        // Show the corresponding tab content based on the clicked tab
        var targetId = tab.getAttribute('id').replace('tab', 'tab-content');
        document.getElementById(targetId).style.display = 'block';
      });
    });
  });