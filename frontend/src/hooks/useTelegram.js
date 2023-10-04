const WebApp = window.Telegram.WebApp;

const useTelegram = () => {
  const onClose = () => {
    WebApp.close();
  };

  const onToggleMainButton = () => {
    if (WebApp.MainButton.isVisible) {
      WebApp.MainButton.hide();
    } else {
      WebApp.MainButton.show();
    }
  };

  const onToggleBackButton = () => {
    if (WebApp.BackButton.isVisible) {
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
    }
  };

  return {
    WebApp,
    user: WebApp.initDataUnsafe?.user,
    onClose,
    onToggleMainButton,
    onToggleBackButton,
  }
};

export default useTelegram;
