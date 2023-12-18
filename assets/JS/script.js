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
//   script.src = 'assets/JS/oauth-test.js';
script.src = 'assets/JS/oauth-test.js';
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
    // Remove classes from all tabs and tab content
    tabs.removeClass("is-active");
    tabContentBoxes.removeClass("active");
    // Add "is-active" class to the clicked tab
    $(this).addClass("is-active");

    // Show the corresponding tab content based on the data-target attribute
    const target = $(this).data("target");
    $("#" + target).addClass("active");

    const activeGraphId = $(this).data("graph-id");
  
    // Check which tab has the "is-active" class and add the "active" class to the corresponding graph
    if ($(this).hasClass("is-active")) {
      $("#" + activeGraphId).addClass("active");
    }
  });

  


});

const yearEl = document.getElementById('currentYear');
yearEl.innerHTML = "@" + currentYear;
