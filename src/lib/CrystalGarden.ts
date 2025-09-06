export type Crystal = { id: number; seed: number };

let nextId = 0;
let crystals: Crystal[] = [];

export function generateCrystal(seed: number): Crystal {
  const crystal = { id: nextId++, seed };
  crystals.push(crystal);
  return crystal;
}

export function getCrystals(): Crystal[] {
  return [...crystals];
}
