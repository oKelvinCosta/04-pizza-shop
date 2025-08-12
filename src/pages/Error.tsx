import { Link, useRouteError } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function Error() {
  const error = useRouteError() as Error;
  // Here is the place to make observability
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whooop, algo aconteceu...</h1>
      <p>Um erro inesperado aconteceu, abaixo você encontra mais detalhes:</p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        <Button asChild variant="outline">
          <Link to="/">Voltar ao Dashboard</Link>
        </Button>
      </p>
    </div>
  );
}
