import { useState } from "react";
import { generateCrystal, getCrystals, Crystal } from "./lib/CrystalGarden";
import CrystalVisual from "./components/CrystalVisual";

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {crystals.map((c) => (
          <div key={c.id} style={{ textAlign: 'center' }}>
            <CrystalVisual seed={c.seed} size={200} />
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              🔮 Crystal #{c.id}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
              Seed: {c.seed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
