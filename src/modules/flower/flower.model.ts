import { Schema, model } from 'mongoose';
import { TFlower } from './flower.interface';

export const FlowerSchema = new Schema<TFlower>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    bloomDate: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['roses', 'lilies', 'sunflowers'],
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    fragrance: {
      type: String,
      enum: ['sunflower', 'tulip', 'poppy', 'lotus', 'rose'],
      required: true,
    },
    season: {
      type: String,
      enum: ['spring', 'summer', 'autumn', 'winter'],
      required: true,
    },
    popularity: {
      type: String,
      enum: ['low', 'medium', 'high', 'very-high'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Flower = model<TFlower>('Flowers', FlowerSchema);
