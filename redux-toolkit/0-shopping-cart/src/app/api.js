import { nanoid } from "@reduxjs/toolkit";

export const awesomeAPI = {
  fetchItems: async (page) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      { id: nanoid(), name: `New Item 1 (${page})`, price: 100 },
      { id: nanoid(), name: `New Item 2 (${page})`, price: 200 },
      { id: nanoid(), name: `New Item 3 (${page})`, price: 300 },
    ];
  },
};
