import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { signIn } from "@/api/SignIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { env } from "@/env";

import { testMode } from "@/lib/utils-test";

const signInForm = z.object({
  email: z.string().email("E-mail inválido"),
});

type SignInForm = z.infer<typeof signInForm>;

export default function SignIn() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  // React query help us with back end
  // we can use retry to retry a call, if the api is slow

  // All update, delete, create is a mutation
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
    retry: 2,
  });

  async function delay() {
    await new Promise((resolve) => setTimeout(resolve, 800));
  }

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email });

      // console.log(data);

      if (env.MODE === "test") {
        toast.success("E-mail verificado clique para continuar >>", {
          action: {
            label: "Continuar",
            onClick: () => {
              navigate("/");
            },
          },
        });
      } else {
        toast.success("Verifique seu e-mail para realizar a autenticação.", {
          action: {
            label: "Verificar",
            onClick: () => {
              handleSignIn(data);
            },
          },
        });
      }
    } catch {
      toast.error("Erro ao realizar login.");
    }
  }

  return (
    <div className="p-8">
      <Button asChild variant="ghost">
        <Link to="/sign-up" className="absolute top-8 right-8">
          Novo estabelecimento
        </Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          {testMode("Modo de teste, use: okelvincosta@gmail.com")}
          <p className="text-muted-foreground text-sm">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  );
}
