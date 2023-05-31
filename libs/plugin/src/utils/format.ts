export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function fromKebabCaseToPascalCase(word: string) {
  return word
    .split('-')
    .map((word) => capitalize(word))
    .join('');
}

export function fromKebabCaseToCamelCase(word: string) {
  return word
    .split('-')
    .map((word, index) => (index === 0 ? word : capitalize(word)))
    .join('');
}
