import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Building, ChevronDown, LogOut } from "lucide-react";

import SignUp from "@/pages/auth/SignUp";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

export default function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 select-none"
        >
          Pizza shop
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex w-56 flex-col gap-2">
        <DropdownMenuLabel className="flex flex-col">
          <span>Kelvin Costa</span>
          <span className="text-muted-foreground text-xs">
            okelvincosta@gmail.com
          </span>
        </DropdownMenuLabel>
        <Separator />
        <div>
          <DropdownMenuItem>
            <Building className="mr-2 h-4 w-4" />
            <span>Perfil da loja</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="text-rose-500 dark:text-rose-400"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
