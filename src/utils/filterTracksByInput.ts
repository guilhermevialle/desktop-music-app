export default function filterTracksByInput(target: string, value: string): number[] {
  target = target.toLowerCase().slice(0, -4);
  value = value.toLowerCase();

  const indexes: number[] = [];
  const word: string[] = [];

  for (let i = 0; i < target.length; i++) {
    if (value.includes(target[i])) {
      indexes.push(i);
      word.push(target[i]);
    }
  }

  if (indexes.length > 0 && word.join('').includes(value)) {
    return indexes;
  }
  return [];
}