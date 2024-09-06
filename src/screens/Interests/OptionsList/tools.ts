export function sanitizeOptions(options: string[]) {
  const n = options.length;
  const baseSize = Math.floor(n / 3);
  const remainder = n % 3;

  let start = 0;
  return Array.from({ length: 3 }, (_, i) => {
    const end = start + baseSize + (i < remainder ? 1 : 0);
    const sublist = options.slice(start, end);
    start = end;
    return sublist;
  });
}
