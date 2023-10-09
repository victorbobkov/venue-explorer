import { API_BASE_URL } from '../constants/constants.js';

const createInvoice = async (invoiceData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/createInvoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData)
    });

    if (!response.ok) {
      console.error("Error: ", response.status, await response.text());
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching the payment URL:", error);
    throw error;
  }
}

export { createInvoice };
