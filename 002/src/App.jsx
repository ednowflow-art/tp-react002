import { useState } from "react";
import BookCard from "./components/BookCard";

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      titre: "Le Petit Prince",
      auteur: "Antoine de Saint-Exupéry",
      estDisponible: true,
    },
    {
      id: 2,
      titre: "Une si longue lettre",
      auteur: "Mariama Bâ",
      estDisponible: false,
    },
    {
      id: 3,
      titre: "L'Aventure ambiguë",
      auteur: "Cheikh Hamidou Kane",
      estDisponible: true,
    },
    {
      id: 4,
      titre: "Le Ventre de l'Atlantique",
      auteur: "Fatou Diome",
      estDisponible: true,
    },
  ]);

  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");

  const nombreDisponibles = books.filter((book) => book.estDisponible).length;

  function onClickEmprunt(bookId) {
    setBooks(
      books.map((book) =>
        book.id === bookId
          ? { ...book, estDisponible: !book.estDisponible }
          : book
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (titre.trim() === "" || auteur.trim() === "") return;

    const nouveauLivre = {
      id: Date.now(),
      titre: titre.trim(),
      auteur: auteur.trim(),
      estDisponible: true,
    };

    setBooks([...books, nouveauLivre]);
    setTitre("");
    setAuteur("");
  }

  return (
    <div className="app">
      <h1 className="titre-principal">
        📚 Catalogue : {nombreDisponibles} livre(s) disponible(s)
      </h1>

      <form className="formulaire" onSubmit={handleSubmit}>
        <h2>Ajouter un livre</h2>

        <input
          className="champ"
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />

        <input
          className="champ"
          type="text"
          placeholder="Auteur"
          value={auteur}
          onChange={(e) => setAuteur(e.target.value)}
        />

        <button className="btn" type="submit">
          Ajouter
        </button>
      </form>

      {books.map((book) => (
        <BookCard
          key={book.id}
          titre={book.titre}
          auteur={book.auteur}
          estDisponible={book.estDisponible}
          onClickEmprunt={() => onClickEmprunt(book.id)}
        />
      ))}
    </div>
  );
}

export default App;