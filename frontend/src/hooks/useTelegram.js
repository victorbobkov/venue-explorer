const tg = window.Telegram.WebApp;

const useTelegram = () => {
  const onClose = () => {
    tg.close();
  }

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }

  const onToggleBackButton = () => {
    if (tg.BackButton.isVisible) {
      tg.BackButton.hide();
    } else {
      tg.MainButton.show();
    }
  }

  return {
    tg,
    user: tg.initDataUnsafe?.user,
    onClose,
    onToggleButton,
    onToggleBackButton,
  }
};

export default useTelegram;
