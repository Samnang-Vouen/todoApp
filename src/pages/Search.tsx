import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
        aria-label="Search"
      />
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Raw value</p>
            <p className="mt-1 font-medium">{query || "—"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Debounced (500ms)</p>
            <p className="mt-1 font-medium">{debouncedQuery || "—"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
