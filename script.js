const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget);

    // Logic for tab content visibility
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active');  
    });
    target.classList.add('active'); 

    // Logic for tab logos and active class
    tabs.forEach(tab => {
      tab.classList.remove('active'); 
      tab.querySelector('.tab-logo').style.display = 'none'; // Hide logos
    });
    tab.classList.add('active'); 
    tab.querySelector('.tab-logo').style.display = 'block'; // Show logo for active
  });
});
