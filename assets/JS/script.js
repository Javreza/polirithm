document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeAllModals();
      }
    });
  });


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