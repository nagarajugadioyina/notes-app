import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch(`${API}/api/notes`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      setNotes(await res.json());
      setError("");
    } catch (e) {
      setError(`Could not reach the backend at ${API}. If it is on a free plan, wait a minute and refresh. (${e.message})`);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addNote(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch(`${API}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text.trim() }),
    });
    setText("");
    load();
  }

  async function removeNote(id) {
    await fetch(`${API}/api/notes/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main className="page">
      <h1>Notes</h1>

      <form onSubmit={addNote} className="row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note"
          aria-label="New note"
        />
        <button type="submit">Add note</button>
      </form>

      {error && <p className="error">{error}</p>}

      {!error && notes.length === 0 && <p className="empty">No notes yet. Add your first one above.</p>}

      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            <span>{n.content}</span>
            <button className="link" onClick={() => removeNote(n.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
