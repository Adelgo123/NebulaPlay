import GameCard from "./GameCard";

export function RecentlyPlayed() {
  const games = [
    {
      id: 1,
      title: "Silent Hill 4: The Room",
      genre: "Survival Horror",
      age: 17,
      image: "/images/fatal-frame.jpg",
    },
    {
      id: 2,
      title: "Resident Evil 4",
      genre: "Action Horror",
      age: 17,
      image: "/images/re4.jpg",
    },
  ];

  return (
    <section className="section">
      <header className="section-header">
        <h2>Jugados recientemente</h2>
      </header>

      <div className="horizontal-scroll">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </section>
  );
}
