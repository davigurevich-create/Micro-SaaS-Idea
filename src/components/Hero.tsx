export function Hero() {
  return (
    <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400 via-rose-500 to-indigo-950">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/patagonia-hero.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-white/80 text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">
          Davi & Nitzi
        </p>
        <h1 className="text-white text-3xl sm:text-5xl font-bold drop-shadow-lg max-w-2xl leading-tight">
          Bem-vindos à sua viagem para a Patagônia
        </h1>
      </div>
    </div>
  );
}
