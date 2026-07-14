import {
  allRulesValid,
  atLeastACapitalizedLetter,
  atLeastALowercaseLetter,
  atLeastANumber,
  atLeastASpecialChar,
  minimalLengthOf,
  nonRepeatedCharacter,
} from './validations';

export const TEST_CASE_SCENARIOS = {
  NUMBER: '1',
  LOWERCASE_LETTER: 'a',
  UPPERCASE_LETTER: 'A',
  SPECIAL_CHARACTER: '@',
  SIZE: '123456789',
  BLANK: ' '.repeat(9),
  EMPTY: '',
  NON_REPEATING: 'abcde12345',
  REPEATING: 'aaaaaaaaaaabbbbbbbbbbbbccccccccccccc122121212@@@@@',
  FULL_VALID: 'abAB12@$!',
};

[
  { password: TEST_CASE_SCENARIOS.NUMBER },
  { password: TEST_CASE_SCENARIOS.LOWERCASE_LETTER },
  { password: TEST_CASE_SCENARIOS.UPPERCASE_LETTER },
  { password: TEST_CASE_SCENARIOS.SPECIAL_CHARACTER },
  { password: TEST_CASE_SCENARIOS.SIZE },
  { password: TEST_CASE_SCENARIOS.BLANK },
  { password: TEST_CASE_SCENARIOS.EMPTY },
  { password: TEST_CASE_SCENARIOS.NON_REPEATING },
  { password: TEST_CASE_SCENARIOS.REPEATING },
  { password: TEST_CASE_SCENARIOS.FULL_VALID },
];

const alphabetLowercase = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const specialCharacters = '!@#$%^&*()-+'.split('');
const alphabetUppercase = alphabetLowercase.map((char) => char.toUpperCase());
const shortLengths = new Array(8)
  .fill('')
  .map((el, index) => 'a'.repeat(index + 1));
const longLengths = new Array(10)
  .fill('')
  .map((el, index) => 'a'.repeat(index + 9));
describe('validations', () => {
  describe('atLeastANumber method', () => {
    test('can validate all character of numbers in a password', () => {
      expect(atLeastANumber('0123456789')).toBeTruthy();
    });
    test.each([
      { password: TEST_CASE_SCENARIOS.NUMBER },
      { password: TEST_CASE_SCENARIOS.SIZE },
      { password: TEST_CASE_SCENARIOS.NON_REPEATING },
      { password: TEST_CASE_SCENARIOS.FULL_VALID },
      { password: TEST_CASE_SCENARIOS.SIZE },
    ])(
      'test $password should be a successfull case',
      ({ password }: { password: string }) => {
        expect(atLeastANumber(password)).toBe(true);
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.LOWERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.UPPERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.SPECIAL_CHARACTER },
      { password: TEST_CASE_SCENARIOS.BLANK },
      { password: TEST_CASE_SCENARIOS.EMPTY },
    ])(
      'test $password should be a failure case',
      ({ password }: { password: string }) => {
        expect(atLeastANumber(password)).toBe(false);
      }
    );
  });
  describe('atLeastACapitalizedLetter method', () => {
    test.each(alphabetUppercase)(
      'The letter %s can be validated as true',
      (letter) => {
        expect(atLeastACapitalizedLetter(letter)).toBeTruthy();
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.UPPERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.FULL_VALID },
    ])(
      'test $password should be a successfull case',
      ({ password }: { password: string }) => {
        expect(atLeastACapitalizedLetter(password)).toBe(true);
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.NUMBER },
      { password: TEST_CASE_SCENARIOS.LOWERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.SPECIAL_CHARACTER },
      { password: TEST_CASE_SCENARIOS.SIZE },
      { password: TEST_CASE_SCENARIOS.BLANK },
      { password: TEST_CASE_SCENARIOS.EMPTY },
      { password: TEST_CASE_SCENARIOS.NON_REPEATING },
    ])(
      'test $password should be a failure case',
      ({ password }: { password: string }) => {
        expect(atLeastACapitalizedLetter(password)).toBe(false);
      }
    );
  });
  describe('atLeastALowercaseLetter method', () => {
    test.each(alphabetLowercase)(
      'The letter %s can be validated as true',
      (letter) => {
        expect(atLeastALowercaseLetter(letter)).toBeTruthy();
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.LOWERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.NON_REPEATING },
      { password: TEST_CASE_SCENARIOS.FULL_VALID },
    ])(
      'test $password should be a successfull case',
      ({ password }: { password: string }) => {
        expect(atLeastALowercaseLetter(password)).toBe(true);
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.NUMBER },
      { password: TEST_CASE_SCENARIOS.UPPERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.SPECIAL_CHARACTER },
      { password: TEST_CASE_SCENARIOS.SIZE },
      { password: TEST_CASE_SCENARIOS.BLANK },
      { password: TEST_CASE_SCENARIOS.EMPTY },
    ])(
      'test $password should be a failure case',
      ({ password }: { password: string }) => {
        expect(atLeastALowercaseLetter(password)).toBe(false);
      }
    );
  });
  describe('atLeastASpecialChar method', () => {
    test.each(specialCharacters)(
      'The special character %s can be validated as true',
      (letter) => {
        expect(atLeastASpecialChar(letter)).toBeTruthy();
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.SPECIAL_CHARACTER },
      { password: TEST_CASE_SCENARIOS.FULL_VALID },
    ])(
      'test $password should be a successfull case',
      ({ password }: { password: string }) => {
        expect(atLeastASpecialChar(password)).toBe(true);
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.NUMBER },
      { password: TEST_CASE_SCENARIOS.LOWERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.UPPERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.SIZE },
      { password: TEST_CASE_SCENARIOS.BLANK },
      { password: TEST_CASE_SCENARIOS.EMPTY },
      { password: TEST_CASE_SCENARIOS.NON_REPEATING },
    ])(
      'test $password should be a failure case',
      ({ password }: { password: string }) => {
        expect(atLeastASpecialChar(password)).toBe(false);
      }
    );
  });
  describe('minimalLengthOf method', () => {
    test.each(shortLengths)(
      'the password %s should be invalid due short length',
      (password) => {
        expect(minimalLengthOf(password)).toBeFalsy();
      }
    );
    test.each(longLengths)(
      'the password %s should be valid due long length',
      (password) => {
        expect(minimalLengthOf(password)).toBeTruthy();
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.SIZE },
      { password: TEST_CASE_SCENARIOS.NON_REPEATING },
      { password: TEST_CASE_SCENARIOS.FULL_VALID },
    ])(
      'test $password should be a successfull case',
      ({ password }: { password: string }) => {
        expect(minimalLengthOf(password)).toBe(true);
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.NUMBER },
      { password: TEST_CASE_SCENARIOS.LOWERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.UPPERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.SPECIAL_CHARACTER },
      { password: TEST_CASE_SCENARIOS.BLANK },
      { password: TEST_CASE_SCENARIOS.EMPTY },
    ])(
      'test $password should be a failure case',
      ({ password }: { password: string }) => {
        expect(minimalLengthOf(password)).toBe(false);
      }
    );
  });
  describe('nonRepeatedCharacter method', () => {
    test.each([
      { password: TEST_CASE_SCENARIOS.NUMBER },
      { password: TEST_CASE_SCENARIOS.LOWERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.UPPERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.SPECIAL_CHARACTER },
      { password: TEST_CASE_SCENARIOS.SIZE },
      { password: TEST_CASE_SCENARIOS.NON_REPEATING },
      { password: TEST_CASE_SCENARIOS.EMPTY },

      { password: TEST_CASE_SCENARIOS.BLANK },
      { password: TEST_CASE_SCENARIOS.FULL_VALID },
    ])(
      'test $password should be a successfull case',
      ({ password }: { password: string }) => {
        expect(nonRepeatedCharacter(password)).toBe(true);
      }
    );
    test.each([{ password: TEST_CASE_SCENARIOS.REPEATING }])(
      'test $password should be a failure case',
      ({ password }: { password: string }) => {
        expect(nonRepeatedCharacter(password)).toBe(false);
      }
    );
  });
  describe('allRulesValid method', () => {
    test.each([{ password: TEST_CASE_SCENARIOS.FULL_VALID }])(
      'test $password should be a successfull case',
      ({ password }: { password: string }) => {
        expect(allRulesValid(password)).toBe(true);
      }
    );
    test.each([
      { password: TEST_CASE_SCENARIOS.NUMBER },
      { password: TEST_CASE_SCENARIOS.LOWERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.UPPERCASE_LETTER },
      { password: TEST_CASE_SCENARIOS.SPECIAL_CHARACTER },
      { password: TEST_CASE_SCENARIOS.SIZE },
      { password: TEST_CASE_SCENARIOS.BLANK },
      { password: TEST_CASE_SCENARIOS.EMPTY },
      { password: TEST_CASE_SCENARIOS.NON_REPEATING },
      { password: TEST_CASE_SCENARIOS.REPEATING },
    ])(
      'test $password should be a failure case',
      ({ password }: { password: string }) => {
        expect(allRulesValid(password)).toBe(false);
      }
    );
  });
});
