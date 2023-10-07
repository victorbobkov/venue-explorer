// Handler for the event when the invoice UI is closed
// Optionally handle different payment statuses: paid, cancelled, failed, pending
export const handleInvoiceStatus = (WebApp, status) => {
  let popupParams;

  switch (status) {
    case 'paid':
      WebApp.close();
      break;
    case 'cancelled':
      popupParams = {
        title: "Payment Cancelled",
        message: "Your booking is not confirmed.",
        buttons: [{ type: "close" }]
      };
      break;
    case 'failed':
      popupParams = {
        title: "Payment Failed",
        message: "Please try again later.",
        buttons: [{ type: "close" }]
      };
      break;
    case 'pending':
      popupParams = {
        title: "Payment Pending",
        message: "Payment is pending. We will notify you once the payment is confirmed.",
        buttons: [{ type: "close" }]
      };
      break;
    default:
      popupParams = {
        title: "Unexpected Payment Status",
        message: "An unexpected status was returned. Please try again later.",
        buttons: [{ type: "close" }]
      };
      break;
  }

  if (popupParams) {
    WebApp.showPopup(popupParams, (buttonId) => {
      console.log(`Popup closed with buttonId: ${buttonId}`);
    });
  }
};
