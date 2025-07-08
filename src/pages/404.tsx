import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-accent-foreground">
        <Button asChild variant="outline">
          <Link to="/">Voltar ao Dashboard</Link>
        </Button>
      </p>
    </div>
  );
}
