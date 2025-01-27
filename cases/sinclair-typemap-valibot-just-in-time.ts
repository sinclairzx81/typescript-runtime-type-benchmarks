import { object, number, string, boolean, strictObject } from 'valibot';
import { createCase } from '../benchmarks';
import { Compile } from '@sinclair/typemap';

const LooseSchema = Compile(
  object({
    number: number(),
    negNumber: number(),
    maxNumber: number(),
    string: string(),
    longString: string(),
    boolean: boolean(),
    deeplyNested: object({
      foo: string(),
      num: number(),
      bool: boolean(),
    }),
  }),
);

const StrictSchema = Compile(
  strictObject({
    number: number(),
    negNumber: number(),
    maxNumber: number(),
    string: string(),
    longString: string(),
    boolean: boolean(),
    deeplyNested: strictObject({
      foo: string(),
      num: number(),
      bool: boolean(),
    }),
  }),
);

createCase('@sinclair/typemap-valibot-(just-in-time)', 'assertLoose', () => {
  return data => {
    if (!LooseSchema.Check(data)) {
      throw new Error('validation failure');
    }
    return true;
  };
});

createCase('@sinclair/typemap-valibot-(just-in-time)', 'assertStrict', () => {
  return data => {
    if (!StrictSchema.Check(data)) {
      throw new Error('validation failure');
    }
    return true;
  };
});
