import { ChevronsUpDown, Plus } from "lucide-react"
import { router } from "@inertiajs/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Link, usePage } from "@inertiajs/react";
import { PageProps, Team } from "@/types";
import { useToast } from "@/hooks/use-toast";


export function TeamSwitcher() {

  const { toast } = useToast();

  const { currentTeam, teams } = usePage<PageProps>().props.auth;

  const switchTeam = (team: Team) => {
    router.post(route('teams.switch', team.id), {}, {
      onSuccess: () => {
        toast({
          title: "Team Switched",
          description: "Your team has been switched to " + team.name
        })
      }
    })
  }


  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className=" min-w-56 ">
          {currentTeam !== null ? currentTeam.name : "No team"}
          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Teams
        </DropdownMenuLabel>
        {teams.length > 0 && teams.map((team, index) => (
          <DropdownMenuItem
            key={team.name}
            onSelect={() => switchTeam(team)}
          >

            {team.name}

            {team.id === currentTeam?.id &&  <DropdownMenuShortcut>
              Current
            </DropdownMenuShortcut>}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2" asChild>
          <Link href={route('teams.create')}>
            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus className="size-4" />
            </div>
            <div className="font-medium text-muted-foreground">Add team</div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
