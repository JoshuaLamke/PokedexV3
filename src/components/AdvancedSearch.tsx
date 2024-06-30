import { Modal } from "@mui/material";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { Filters } from "../types";
import { POKEMON_TYPES, regions } from "../utils";
import MultiSelect from "./MultiSelect";
import TextInput from "./TextInput";
import startCase from "lodash/startCase";

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Omit<Filters, "name">;
}

const AdvancedSearch = ({ setFilters, filters }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <FaGear
        role="button"
        onClick={handleOpen}
        size={32}
        className="fill-green-700"
      />
      <Modal open={open} onClose={handleClose}>
        <div className="h-screen w-screen flex justify-center items-center border-none">
          <div className=" bg-gray-100 max-w-screen-sm w-full rounded-lg mx-4 flex flex-col text-gray-700">
            <div className="w-full">
              <div className="mx-5">
                <h1 className="text-2xl my-4">Advanced Search</h1>
                <TextInput
                  onChange={(value) => {
                    if (
                      value &&
                      (Number(value) < 1 || Number(value) > 100000)
                    ) {
                      return;
                    }
                    setFilters((filters) => ({
                      ...filters,
                      number: value,
                    }));
                  }}
                  placeholder="Search Pokemon Number..."
                  value={filters.number}
                  type="number"
                  label="Pokemon Number"
                />
                <MultiSelect
                  label="Pokemon Regions"
                  onChange={(values) =>
                    setFilters((filters) => ({
                      ...filters,
                      regions: values.join(","),
                    }))
                  }
                  options={Object.keys(regions)}
                  placeholder="Select Pokemon Regions..."
                  values={filters.regions ? filters.regions.split(",") : []}
                />
                <MultiSelect
                  label="Pokemon Types"
                  onChange={(values) =>
                    setFilters((filters) => ({
                      ...filters,
                      types: values.join(","),
                    }))
                  }
                  options={POKEMON_TYPES.map((t) => startCase(t)).sort()}
                  placeholder="Select Pokemon Types..."
                  values={filters.types ? filters.types.split(",") : []}
                />
                <div className="flex flex-row-reverse flex-grow my-2">
                  <button
                    className="px-4 py-2 ml-2 bg-green-700 text-white rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    onClick={() =>
                      setFilters((filters) => ({
                        ...filters,
                        number: "",
                        regions: "",
                        types: "",
                      }))
                    }
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
