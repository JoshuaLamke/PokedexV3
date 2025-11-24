import { Modal } from "@mui/material";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { Filters } from "../types";
import { POKEMON_TYPES } from "../utils";
import MultiSelect from "./MultiSelect";
import TextInput from "./TextInput";
import startCase from "lodash/startCase";
import { REGION_RANGES } from "../pokemonData/useCards";

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
}

const AdvancedSearch: React.FC<Props> = ({ setFilters, filters }) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleOpen = () => {
    setLocalFilters(filters);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleApply = () => {
    setFilters(localFilters);
    handleClose();
  };

  const handleClear = () => {
    const cleared: Filters = {
      nameQuery: filters.nameQuery,
      idQuery: "",
      regions: [],
      types: [],
    };
    setLocalFilters(cleared);
    setFilters(cleared);
  };

  return (
    <>
      <FaGear
        role="button"
        onClick={handleOpen}
        size={32}
        className="fill-green-700 cursor-pointer"
      />
      <Modal open={open} onClose={handleClose}>
        <div className="h-screen w-screen flex justify-center items-center border-none">
          <div className="bg-gray-100 max-w-screen-sm w-full rounded-lg mx-5 flex flex-col text-gray-700">
            <div className="w-full">
              <div className="mx-5">
                <h1 className="text-2xl my-4">Advanced Search</h1>

                {/* Pokémon Number */}
                <TextInput
                  onChange={(value: string) => {
                    if (value && (Number(value) < 1 || Number(value) > 100000))
                      return;
                    setLocalFilters((prev) => ({ ...prev, idQuery: value }));
                  }}
                  placeholder="Search Pokémon Number..."
                  value={localFilters.idQuery || ""}
                  type="number"
                  label="Pokémon Number"
                />

                {/* Pokémon Regions */}
                <MultiSelect
                  label="Pokémon Regions"
                  onChange={(selectedRegions: string[]) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      regions:
                        selectedRegions as (keyof typeof REGION_RANGES)[],
                    }))
                  }
                  options={Object.keys(REGION_RANGES)}
                  placeholder="Select Pokémon Regions..."
                  values={localFilters.regions || []}
                />

                {/* Pokémon Types */}
                <MultiSelect
                  label="Pokémon Types"
                  onChange={(selectedTypes: string[]) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      types: selectedTypes,
                    }))
                  }
                  options={POKEMON_TYPES.map((t) => startCase(t)).sort()}
                  placeholder="Select Pokémon Types..."
                  values={localFilters.types || []}
                />

                {/* Buttons */}
                <div className="flex flex-row-reverse flex-grow my-2">
                  <button
                    className="px-4 py-2 ml-2 bg-green-700 text-white rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    onClick={handleApply}
                  >
                    Apply
                  </button>
                  <button
                    className="px-4 py-2 ml-2 bg-green-700 text-white rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    onClick={handleClear}
                  >
                    Clear Search
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdvancedSearch;
