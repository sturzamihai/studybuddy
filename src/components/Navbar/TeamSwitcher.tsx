"use client";
"use client";

import type { Team } from "@/database/schema/user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import twx from "@/utils/twx";
import { useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandEmpty,
} from "../ui/Command";
import { usePathname } from "next/navigation";

export default function TeamSwitcher({ teams }: { teams: Team[] }) {
  const pathname = usePathname();
  const isTeamPath = pathname.startsWith("/team");
  const teamId = isTeamPath ? pathname.split("/")[2] : "personal";

  const [selectedTeam, setSelectedTeam] = useState<Team>(
    teams.find((team) => team.id === teamId) || teams[0]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-label="Select a team"
          className={twx("w-[200px] justify-between")}
        >
          {selectedTeam.name}
          <ChevronDown className="ml-auto w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput
              placeholder="Search team..."
              className="h-10 border-0 focus:ring-0"
            ></CommandInput>
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup>
              {teams.map((team) => (
                <CommandItem
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                >
                  {team.name}
                  <Check
                    className={twx(
                      "ml-auto w-4 h-4",
                      selectedTeam.id === team.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem>
                <Plus className="w-4 h-4 mr-2" />
                Create team
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
