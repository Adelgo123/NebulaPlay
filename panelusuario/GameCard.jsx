export default function GameCard({ image, title, genre, age }) {
  return (
    <article className="game-card">
      <div className="game-cover">
        <img src={image} alt={title} />
        {age && <span className="age-badge">{age}+</span>}
      </div>

      <div className="game-info">
        <h3>{title}</h3>
        <p>{genre}</p>
      </div>
    </article>
  );
}
