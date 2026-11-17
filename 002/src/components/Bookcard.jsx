function BookCard({ titre, auteur, estDisponible, onClickEmprunt }) {
  return (
    <div className="carte">
      <h3>{titre}</h3>
      <p className="auteur">Auteur : {auteur}</p>

      <span
        className={
          estDisponible ? "statut statut-disponible" : "statut statut-emprunte"
        }
      >
        {estDisponible ? "✅ Disponible" : "❌ Emprunté"}
      </span>

      <div>
        <button
          className={estDisponible ? "btn" : "btn btn-rendre"}
          onClick={onClickEmprunt}
        >
          {estDisponible ? "Emprunter" : "Rendre"}
        </button>
      </div>
    </div>
  );
}

export default BookCard;