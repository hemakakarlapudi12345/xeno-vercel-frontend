// src/api.js
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function fetchCustomers() {
  const response = await fetch(`${API_BASE_URL}/api/customers`);
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  return response.json();
}
