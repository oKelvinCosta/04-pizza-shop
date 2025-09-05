import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  getManagedRestaurant,
  type GetManagedRestaurantResponse,
} from "@/api/GetManagedRestaurant";
import { updateProfile } from "@/api/UpdateProfile";
import { queryClient } from "@/lib/ReactQuery";

import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { testMode } from "@/lib/utils-test";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export default function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ["managed-restaurant"],
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });
  //   user values because stay monitoring, defaultValues not

  // using Optimistic Update (set the value before the mutation/backend)
  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    // Update another mutation from other component by the KEY
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);
    if (cached && name !== null && description !== null)
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name,
          description,
        },
      );

    // Return before update
    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    // update the info of restaurant when save the popup
    onMutate({ name, description }) {
      if (name !== null && description !== null) {
        const { cached } = updateManagedRestaurantCache({ name, description });
        return { previousProfile: cached };
      }
    },
    onError(_, __, context) {
      // all things I return from onMutate is show in the variable context

      // If is error it'll return to the old data
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile);
      }
    },
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });
      toast.success("Perfil atualizado com sucesso.");
    } catch {
      toast.error("Erro ao atualizar perfil.");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        {testMode("Use nome: Rocket Pizza")}
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid items-center gap-4 py-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              {...register("name")}
            />
          </div>
          <div className="grid items-center gap-4 py-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
