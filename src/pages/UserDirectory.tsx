import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ChevronRight, Users } from "lucide-react";
import type { User } from "@/types/user";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; users: User[] };

export function UserDirectory() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      setState({ status: "loading" });
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const users: User[] = await response.json();
        if (!cancelled) {
          setState({ status: "success", users });
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "Something went wrong";
          setState({ status: "error", message });
        }
      }
    }

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading users">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>Failed to load users: {state.message}</span>
      </div>
    );
  }

  if (state.users.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-slate-300 py-10 text-center text-slate-500">
        <Users className="h-8 w-8" />
        <p className="text-sm">No users found.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {state.users.map((user) => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`} className="block">
            <Card className="transition-colors hover:bg-slate-50">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
