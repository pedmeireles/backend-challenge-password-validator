import {
  isPassword,
  Password,
  passwordZodSchema,
  validatePayload,
} from './payload';
import { TEST_CASE_SCENARIOS } from './validations.spec';

const anInvalidPassword: Password = {
  password: 'invalidPassword',
};
const aValidPassword: Password = {
  password: TEST_CASE_SCENARIOS.FULL_VALID,
};

const anInvalidSchema: any = {
  object: 'Object',
  number: 'Number',
};
const anInvalidSchemaWithValidPassword: any = {
  object: 'Object',
  number: 'Number',
  password: TEST_CASE_SCENARIOS.FULL_VALID,
};
const anInvalidPasswordTypeSchema: any = {
  // make password a number so it fails the zod schema (expects a string)
  password: 12345,
};

describe('payload.ts', () => {
  describe('validatePassword', () => {
    test.each([
      anInvalidSchema,
      anInvalidPasswordTypeSchema,
      anInvalidSchemaWithValidPassword,
    ])('for a invalid schema, it should throw an error', (schema) => {
      expect(() => passwordZodSchema.parse(schema)).toThrow();
    });

    test.each([anInvalidPassword, aValidPassword])(
      'for a valid schema, it should not throw an error',
      (schema) => {
        expect(() => passwordZodSchema.parse(schema)).not.toThrow();
      }
    );
  });
  describe('isPassword', () => {
    test.each([
      anInvalidSchema,
      anInvalidPasswordTypeSchema,
      anInvalidSchemaWithValidPassword,
    ])('for a invalid schema, it should throw an error', (schema) => {
      expect(isPassword(schema)).toBeFalsy();
    });

    test.each([anInvalidPassword, aValidPassword])(
      'for a valid schema, it should not throw an error',
      (schema) => {
        expect(isPassword(schema)).toBeTruthy();
      }
    );
  });
});
