const API_URL = import.meta.env.VITE_API_URL || "";

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error("Failed to fetch");
    return response.json();
  },

  async post(endpoint: string, data: unknown) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to post");
    return response.json();
  },
};