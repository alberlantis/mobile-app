function splitArrayIntoEqualParts<T>(options: T[], numParts: number): T[][] {
  const n = options.length;
  const baseSize = Math.floor(n / numParts);
  const remainder = n % numParts;

  let start = 0;
  return Array.from({ length: numParts }, (_, i) => {
    const end = start + baseSize + (i < remainder ? 1 : 0);
    const sublist = options.slice(start, end);
    start = end;
    return sublist;
  });
}

export default splitArrayIntoEqualParts;
