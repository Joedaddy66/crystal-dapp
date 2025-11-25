import { useState } from "react";
import { generateCrystal, getCrystals, Crystal } from "./lib/CrystalGarden";

export default function App() {
  const [seed, setSeed] = useState("");
  const [status, setStatus] = useState("");
  const [crystals, setCrystals] = useState<Crystal[]>([]);

  const createCrystal = () => {
    if (!/^\d+$/.test(seed)) {
      setStatus("Enter a valid number.");
      return;
    }

    const newCrystal = generateCrystal(Number(seed));
    setCrystals(getCrystals());
    setStatus(`✨ Crystal #${newCrystal.id} created with seed ${newCrystal.seed}`);
    setSeed("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", background: "#111", color: "#0f0" }}>
      <h1>🌱 Crystal Garden (Local Mode)</h1>

      <input
        type="text"
        placeholder="Enter semiprime seed"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "0.5rem", background: "#222", color: "#0f0" }}
      />
      <button onClick={createCrystal} style={{ padding: "0.5rem" }}>
        🌸 Generate Crystal
      </button>

      <p style={{ marginTop: "1rem" }}>{status}</p>

      <ul>
        {crystals.map((c) => (
          <li key={c.id}>🔮 Crystal #{c.id} — Seed: {c.seed}</li>
        ))}
      </ul>
    </div>
  );
}
