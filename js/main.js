const tg = window.Telegram.WebApp;

// Initialize Lottie animations
const initializeLottieAnimations = () => {
  const animations = {
    'apartment-icon': 'images/House.json',
    'resort-icon': 'images/Resort.json',
    'camping-icon': 'images/Camping.json',
    'amusement-icon': 'images/RollerCoaster.json',
  };

  Object.entries(animations).forEach(([id, path]) => {
    const element = document.getElementById(id);
    if (!element) return;

    const animation = lottie.loadAnimation({
      container: element,
      path,
      renderer: 'svg',
      loop: false,
      autoplay: false,
    });

    // Play animation on button click
    const buttonId = id.replace('icon', 'type');
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', () => animation.goToAndPlay(0));
    }
  });
};

// Initialize Lottie animations after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded')
  initializeLottieAnimations();
});
