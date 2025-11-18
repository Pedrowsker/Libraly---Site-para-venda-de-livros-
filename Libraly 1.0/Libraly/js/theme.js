document.addEventListener('DOMContentLoaded', () => {

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const body = document.body;

  const sunIcon = '☀️';
  const moonIcon = '🌙';

  function applyTheme() {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
      body.classList.add('dark-theme');
      if (themeToggleBtn) {
        themeToggleBtn.textContent = sunIcon;
      }
    } else {
      body.classList.remove('dark-theme');
      if (themeToggleBtn) {
        themeToggleBtn.textContent = moonIcon;
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-theme');

      if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = sunIcon;
      } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = moonIcon;
      }
    });
  }

  applyTheme();

});