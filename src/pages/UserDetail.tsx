import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, Mail, Phone, Building2, Globe } from "lucide-react";
import type { User } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; user: User };

export function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      setState({ status: "loading" });
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const user: User = await response.json();
        if (!cancelled) {
          if (!user || !user.id) {
            setState({ status: "error", message: "User not found" });
          } else {
            setState({ status: "success", user });
          }
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "Something went wrong";
          setState({ status: "error", message });
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="flex flex-col gap-4">
      <Link to="/users" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Back to directory
      </Link>

      {state.status === "loading" && (
        <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading user">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {state.status === "error" && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Failed to load user: {state.message}</span>
        </div>
      )}

      {state.status === "success" && (
        <Card>
          <CardHeader>
            <CardTitle>{state.user.name}</CardTitle>
            <p className="text-sm text-slate-500">@{state.user.username}</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              {state.user.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400" />
              {state.user.phone}
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-400" />
              {state.user.website}
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-slate-400" />
              {state.user.company.name}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
