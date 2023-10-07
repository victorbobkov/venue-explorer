import { useMutation } from '@tanstack/react-query';

export const useInvoiceActions = (createInvoice, WebApp) => {
  return useMutation(createInvoice, {
    onSuccess: (data) => {
      if (data && data.result) {
        WebApp.openInvoice(data.result);
      } else {
        console.error("Failed to retrieve payment link", data);
      }
    },
    onError: (error) => {
      console.error("Error fetching the payment URL:", error);
    }
  });
};
