function splitArrayBySize<T>(array: T[], size: number): T[][] {
  if (!array?.length) return [];
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size),
  );
}

export default splitArrayBySize;
