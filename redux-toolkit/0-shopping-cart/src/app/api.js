import { nanoid } from "@reduxjs/toolkit";

export const awesomeApi = {
  fetchItems: async (page) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [
      { id: nanoid(), name: `Apple on ${page}`, price: 1.2 },
      { id: nanoid(), name: `Orange on ${page}`, price: 0.95 },
      { id: nanoid(), name: `Banana on ${page}`, price: 2.2 },
    ];
  },
};
