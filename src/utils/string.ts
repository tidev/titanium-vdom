export function camelize(value: string): string {
  return value.replace(/-([a-z])/ig, (match, char) => char.toUpperCase());
}

export function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
