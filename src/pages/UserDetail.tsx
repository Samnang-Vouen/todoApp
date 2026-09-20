import { Link, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, Mail, Phone, Building2, Globe } from "lucide-react";
import type { User } from "@/types/user";
import { useFetch } from "@/hooks/useFetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: user, loading, error } = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return (
    <div className="flex flex-col gap-4">
      <Link to="/users" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Back to directory
      </Link>

      {loading && (
        <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading user">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Failed to load user: {error}</span>
        </div>
      )}

      {!loading && !error && user && (
        <Card>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <p className="text-sm text-slate-500">@{user.username}</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              {user.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400" />
              {user.phone}
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-400" />
              {user.website}
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-slate-400" />
              {user.company.name}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
