const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL?.trim();

async function requestSheets(params) {
  if (!SCRIPT_URL || SCRIPT_URL.includes("your_google_script")) {
    throw new Error("Google Script URL is missing in your .env file.");
  }

  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${SCRIPT_URL}?${query}`);

  if (!response.ok) {
    throw new Error("Network response from Google Sheets failed.");
  }

  return response.json();
}

export async function checkCustomerId(customerName, customerId) {
  return requestSheets({
    action: "check",
    customerName: customerName.trim(),
    customerId: customerId.trim().toUpperCase(),
  });
}

export async function submitWinner(customerName, customerId, prizeName) {
  return requestSheets({
    action: "submit",
    customerName: customerName.trim(),
    customerId: customerId.trim().toUpperCase(),
    prize: prizeName,
  });
}