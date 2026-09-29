(function () {
  if (window.__oakHistoryBackBound__) {
    return;
  }

  window.__oakHistoryBackBound__ = true;

  function goToPreviousPage(event) {
    if (event) {
      event.preventDefault();
    }

    if (window.history.length > 1 || document.referrer) {
      window.history.back();
      return;
    }

    window.location.href = 'home.html';
  }

  document.addEventListener('click', function (event) {
    const target = event.target.closest('.back-btn, .back-link');

    if (!target || target.dataset.historyBack === 'false') {
      return;
    }

    goToPreviousPage(event);
  });
})();
