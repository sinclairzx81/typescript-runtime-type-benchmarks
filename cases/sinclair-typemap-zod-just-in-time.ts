import { Compile } from '@sinclair/typemap';
import { createCase } from '../benchmarks';
import * as z from 'zod';

const LooseSchema = Compile(z.object({
  number: z.number(),
  negNumber: z.number(),
  maxNumber: z.number(),
  string: z.string(),
  longString: z.string(),
  boolean: z.boolean(),
  deeplyNested: z.object({
    foo: z.string(),
    num: z.number(),
    bool: z.boolean(),
  }),
}));

const StrictSchema = Compile(z
  .object({
    number: z.number(),
    negNumber: z.number(),
    maxNumber: z.number(),
    string: z.string(),
    longString: z.string(),
    boolean: z.boolean(),
    deeplyNested: z
      .object({
        foo: z.string(),
        num: z.number(),
        bool: z.boolean(),
      })
      .strict(),
  })
  .strict());

createCase('@sinclair/typemap-zod-(just-in-time)', 'assertLoose', () => {
  return data => {
    if (!LooseSchema.Check(data)) {
      throw new Error('validation failure');
    }
    return true;
  };
});

createCase('@sinclair/typemap-zod-(just-in-time)', 'assertStrict', () => {
  return data => {
    if (!StrictSchema.Check(data)) {
      throw new Error('validation failure');
    }
    return true;
  };
});
