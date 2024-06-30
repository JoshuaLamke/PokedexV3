import startCase from "lodash/startCase";
import { PokemonInfo } from "../types";

interface Props {
  data: PokemonInfo;
}

const SpritesSection = ({ data }: Props) => {
  const backSprites = Object.keys(data.sprites).filter(
    (k) => k.includes("back") && data.sprites[k as keyof typeof data.sprites]
  );
  const frontSprites = Object.keys(data.sprites).filter(
    (k) => k.includes("front") && data.sprites[k as keyof typeof data.sprites]
  );
  const dreamWorldSprites = Object.keys(data.sprites.other.dream_world).filter(
    (k) =>
      data.sprites.other.dream_world[
        k as keyof typeof data.sprites.other.dream_world
      ]
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      <h3 className="text-3xl sm:text-4xl md:text:5xl col-span-full">
        Sprites
      </h3>
      {frontSprites.map((k) => (
        <div key={k} className="flex flex-col items-center">
          <div className="w-auto h-60 overflow- flex items-center justify-center">
            <img
              className="w-64 h-64 object-cover object-center"
              src={
                data.sprites[k as keyof typeof data.sprites] as
                  | string
                  | undefined
              }
              alt={k}
            />
          </div>
          <p>{startCase(k)}</p>
        </div>
      ))}
      {backSprites.map((k) => (
        <div key={k} className="flex flex-col items-center relative">
          <div className="w-auto h-60 overflow- flex items-center justify-center">
            <img
              className="w-64 h-64 object-cover object-center"
              src={
                data.sprites[k as keyof typeof data.sprites] as
                  | string
                  | undefined
              }
              alt={k}
            />
          </div>
          <p>{startCase(k)}</p>
        </div>
      ))}
      {dreamWorldSprites.map((k) => (
        <div key={k} className="flex flex-col items-center ">
          <img
            className="w-auto h-60"
            src={
              data.sprites.other.dream_world[
                k as keyof typeof data.sprites.other.dream_world
              ] as string | undefined
            }
            alt={startCase(k)}
          />
          <p>Dreamworld ({startCase(k)})</p>
        </div>
      ))}
      <div className="flex flex-col items-center">
        <img
          className="w-auto h-60"
          src={data.sprites.other["official-artwork"].front_default!}
          alt={data.name}
        />
        <p>Official Artwork</p>
      </div>
    </div>
  );
};

export default SpritesSection;
