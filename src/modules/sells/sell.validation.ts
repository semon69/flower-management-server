import { z } from 'zod';

export const sellValidation = z.object({
  body: z.object({
    name: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(1),
    sellDate: z.string()
  }),
});

export const memberValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string()
  }),
});
