import { z } from 'zod';

export const userValidation = z.object({
  body: z.object({
    name: z.string(),
    password: z.string(),
    email: z.string(),
    gender: z.enum(['male', 'female', 'others']),
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});
export const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});
