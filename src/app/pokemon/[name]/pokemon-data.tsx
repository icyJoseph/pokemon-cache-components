import { uuidMarker } from "@/utils";
import Image from "next/image";

type Pokemon = {
  name: string;
  sprite: string;
  height: number;
  weight: number;
};

async function fetchPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!res.ok) {
    throw new Error("Pokemon not found");
  }

  const json = await res.json();

  return {
    name: json.name,
    sprite: json.sprites.front_default,
    height: json.height,
    weight: json.weight,
  };
}

export default async function PokemonData({
  params,
}: Omit<PageProps<"/pokemon/[name]">, "searchParams">) {
  "use cache";
  const { name } = await params;
  const [data, uuid] = await Promise.all([fetchPokemon(name), uuidMarker()]);

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold capitalize">{data.name}</h1>
      {data.sprite ? (
        <Image
          src={data.sprite}
          alt={data.name}
          width={96}
          height={96}
          unoptimized
        />
      ) : null}
      <div className="text-sm text-black/70 dark:text-white/70">
        <div>Height: {data.height}</div>
        <div>Weight: {data.weight}</div>
        <div>Rendered in initial HTML via cache component</div>
      </div>

      <pre>Transaction ID: {uuid}</pre>
    </section>
  );
}
