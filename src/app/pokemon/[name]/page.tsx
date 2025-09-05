import { Suspense } from "react";
import PokemonData from "./pokemon-data";
import PokemonMoves from "./pokemon-moves";

export default async function PokemonPage({
  params,
}: PageProps<"/pokemon/[name]">) {
  return (
    <div className="p-6 space-y-6">
      <PokemonData params={params} />
      <Suspense fallback={<div className="opacity-70">Loading moves…</div>}>
        {/* Streamed content */}
        <PokemonMoves params={params} />
      </Suspense>
    </div>
  );
}
