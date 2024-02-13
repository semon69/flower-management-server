import { z } from "zod";

export const flowerValidation = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    price: z.number().min(0.01),
    quantity: z.number(),
    bloomDate: z.string(),
    color: z.string(),
    type: z.enum(['roses', 'lilies', 'sunflowers']),
    size: z.number().min(1),
    fragrance: z.enum(['sunflower', 'tulip', 'poppy', 'lotus', 'rose']),
    season: z
      .string()
      .refine((value) =>
        ['spring', 'summer', 'autumn', 'winter'].includes(value),
      ),
    popularity: z
      .string()
      .refine((value) =>
        ['low', 'medium', 'high', 'very-high'].includes(value),
      ),
  }),
});

export const updateFlowerValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    price: z.number().min(0.01).optional(),
    quantity: z.number().min(1).optional(),
    bloomDate: z.string().optional(),
    color: z.string().min(3).max(20).optional(),
    type: z.enum(['roses', 'lilies', 'sunflowers']).optional(),
    size: z.number().min(1).optional(),
    fragrance: z.enum(['sunflower', 'tulip', 'poppy', 'lotus', 'rose']).optional(),
    season: z
      .string()
      .refine((value) =>
        ['spring', 'summer', 'autumn', 'winter'].includes(value),
      ).optional(),
    popularity: z
      .string()
      .refine((value) =>
        ['low', 'medium', 'high', 'very-high'].includes(value),
      ).optional(),
  }),
});
