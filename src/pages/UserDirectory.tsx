import { Link } from "react-router-dom";
import { AlertCircle, ChevronRight, Users } from "lucide-react";
import type { User } from "@/types/user";
import { useFetch } from "@/hooks/useFetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserDirectory() {
  const { data: users, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading users">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>Failed to load users: {error}</span>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-slate-300 py-10 text-center text-slate-500">
        <Users className="h-8 w-8" />
        <p className="text-sm">No users found.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {users.map((user) => (
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
