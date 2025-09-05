import { uuidMarker } from "@/utils";

type Move = { name: string };
type PokemonApiMove = { move: { name: string } };

async function fetchMoves(name: string): Promise<Move[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {});

  if (!res.ok) {
    throw new Error("Moves not found");
  }
  const json = await res.json();
  const moves: Move[] =
    (json.moves as PokemonApiMove[] | undefined)?.map((m) => ({
      name: m.move.name,
    })) ?? [];
  await new Promise((r) => setTimeout(r, 1000));
  return moves.slice(0, 12);
}

export default async function PokemonMoves({
  params,
}: Omit<PageProps<"/pokemon/[name]">, "searchParams">) {
  const { name } = await params;
  const [moves, uuid] = await Promise.all([fetchMoves(name), uuidMarker()]);
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-medium">Moves (streamed)</h2>
      <ul className="list-disc pl-6">
        {moves.map((m) => (
          <li key={m.name} className="capitalize">
            {m.name}
          </li>
        ))}
      </ul>
      <pre>Transaction ID: {uuid}</pre>
    </section>
  );
}
