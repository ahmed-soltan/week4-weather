import React, { useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cities } from "./data";

interface SearchCitiesProps {
  selectCity: (city: string) => void;
}

const SearchCities = ({ selectCity }: SearchCitiesProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-gray-100 text-slate-500 border-0 outline-0 shadow-none p-2 px-4
         flex items-center gap-5 text-xs ml-auto relative md:pr-10"
      >
        Search For a City
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="cities">
            {cities?.map((city) => (
              <CommandItem key={city} >
                <h1 className="text-sm font-medium line-clamp-1" onClick={() => selectCity(city)}>{city}</h1>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCities;
