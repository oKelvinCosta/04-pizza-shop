import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getManagedRestaurant } from "@/api/GetManagedRestaurant";
import { getProfile } from "@/api/GetProfile";
import { signOut } from "@/api/SignOut";

import StoreProfileDialog from "./StoreProfileDialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export default function AccountMenu() {
  const navigate = useNavigate();

  // Rename data to profile
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"], // Identify the query, to optimize the number of requisitions in others components
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryFn: getManagedRestaurant,
      queryKey: ["managed-restaurant"],
      staleTime: Infinity,
    });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", { replace: true }); // Replace is used to avoid the user to go back to the sign-in page using the back button from the browser
    },
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 select-none"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex w-56 flex-col gap-2">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-muted-foreground text-xs">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <Separator />

          <div>
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <Building className="mr-2 h-4 w-4" />
                <span>Perfil da loja</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              asChild
              disabled={isSigningOut}
              className="text-rose-500 dark:text-rose-400"
            >
              <button
                className="w-full cursor-pointer"
                onClick={() => signOutFn()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  );
}
