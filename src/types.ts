import { z } from 'zod';

export const ISOCurrencyCodeSchema = z.enum([
  'USD', // US Dollar
  'EUR', // Euro
  'JPY', // Japanese Yen
  'GBP', // British Pound
  'AUD', // Australian Dollar
  'CAD', // Canadian Dollar
  'CHF', // Swiss Franc
  'CNY', // Chinese Yuan
  'SEK', // Swedish Krona
  'NZD', // New Zealand Dollar
]);

export type ISOCurrencyCodeType = z.infer<typeof ISOCurrencyCodeSchema>;

export const IntervalSchema = z.object({
  intervalStart: z.string().datetime(),
  intervalEnd: z.string().datetime(),
});

export type IntervalType = z.infer<typeof IntervalSchema>;

export const BalanceStatementParamsSchema = z.object({
  currency: ISOCurrencyCodeSchema,
  intervalStart: IntervalSchema.shape.intervalStart,
  intervalEnd: IntervalSchema.shape.intervalEnd,
  type: z.enum(['COMPACT']),
});

export type BalanceStatementParamsType = z.infer<
  typeof BalanceStatementParamsSchema
>;
