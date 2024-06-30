import { Card } from "../types";
import capitalize from "lodash/capitalize";
import defaultImage from "../assets/sadPokemon.png";
import { startCase } from "lodash";
import { darkenColor, getImageByType, typeColors } from "../utils";
import useNavigateSmooth from "../hooks/useNavigateSmooth";

interface Props {
  card: Card;
}
const PokemonCard = ({ card }: Props) => {
  const handleNavigate = useNavigateSmooth();
  const colors = [
    typeColors[capitalize(card.types[0])],
    typeColors[capitalize(card.types?.[1])] ??
      darkenColor(typeColors[capitalize(card.types[0])], 30),
  ];
  const background = `linear-gradient(${colors[0]},${colors[1]})`;

  const handleTypeButtonClick = (type: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    handleNavigate(`/types/${type}`, {
      name: startCase(type),
      path: `/types/${type}`,
    })();
  };

  return (
    <div
      key={card.number}
      className="flex flex-col rounded text-white h-full hover:scale-105 hover:animate-wiggle hover:fill-mode-forwards"
      role="button"
      style={{
        background,
      }}
      onClick={handleNavigate(`/pokemon/${card.name}`, {
        name: startCase(card.name),
        path: `/pokemon/${card.name}`,
      })}
    >
      <h3 className="my-2 text-2xl">{card.number}</h3>
      <h5 className="mb-2 mx-2 text-xl">{startCase(card.name)}</h5>
      <img src={card.image ?? defaultImage} alt={`Image of ${card.name}`} />
      <div className="relative flex flex-grow h-16">
        <div className="absolute bottom-[10px] left-0 right-0 flex justify-center">
          {card.types.map((type) => (
            <img
              src={getImageByType(capitalize(type))}
              alt={type}
              height="40px"
              width="40px"
              className="mx-3 my-2 rounded-full shadow-[0_0px_10px_white] hover:scale-105"
              key={type}
              onClick={handleTypeButtonClick(type)}
              role="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
