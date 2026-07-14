export function atLeastANumber(password: string): boolean {
  return /[0-9]/.test(password.trim());
}
export function atLeastACapitalizedLetter(password: string): boolean {
  return /[A-Z]/.test(password.trim());
}
export function atLeastALowercaseLetter(password: string): boolean {
  return /[a-z]/.test(password.trim());
}

export function atLeastASpecialChar(password: string): boolean {
  return /[!@#$%^&*()\-+]/.test(password.trim());
}

const MIN_LENGTH_PASSWORD = 9;
export function minimalLengthOf(password: string): boolean {
  return password.trim().length >= MIN_LENGTH_PASSWORD;
}

export function nonRepeatedCharacter(password: string): boolean {
  const setOfPassword = new Set(password.trim().split(''));

  return setOfPassword.size === password.trim().length; //If there is a repeated character, the set will have lower size than the password
}

export function allRulesValid(password: string): boolean {
  const trimmedPassword = password.trim();

  const processedRules = [
    atLeastANumber,
    atLeastACapitalizedLetter,
    atLeastALowercaseLetter,
    atLeastASpecialChar,
    minimalLengthOf,
    nonRepeatedCharacter,
  ].map((callback) => callback(trimmedPassword));
  return processedRules.every((output) => output === true);
}
