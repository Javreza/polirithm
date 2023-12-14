document.addEventListener('DOMContentLoaded', function () {
    // Get the button by its class name
    var modalTriggerButton = document.querySelector('.js-modal-trigger');

    // Add a click event listener to the button
    modalTriggerButton.addEventListener('click', function () {
      console.log('Button clicked!');
      openModal();
    });
  });

  function openModal() {
    var modal = document.getElementById('modal-js-example');
    modal.classList.add('is-active');
  }

  function closeModal() {
    var modal = document.getElementById('modal-js-example');
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