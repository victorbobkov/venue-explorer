const tg = window.Telegram.WebApp;
const closeBtn = document.querySelector('.closeBtn');

closeBtn.addEventListener('click', () => {
  tg.close();
});
