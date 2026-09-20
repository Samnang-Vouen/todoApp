import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <Compass className="h-10 w-10 text-slate-400" />
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-sm text-slate-500">The page you're looking for doesn't exist.</p>
      <Link
        to="/todos"
        className="inline-flex h-9 items-center justify-center rounded-md bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        Back to Todos
      </Link>
    </div>
  );
}
