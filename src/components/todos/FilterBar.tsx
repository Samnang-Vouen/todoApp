import type { TodoFilter } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  activeCount: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

const FILTERS: TodoFilter[] = ["all", "active", "completed"];

export function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  hasCompleted,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <span className="text-slate-500">
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>
      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <Button
            key={f}
            type="button"
            size="sm"
            variant={filter === f ? "default" : "outline"}
            className={cn("capitalize")}
            onClick={() => onFilterChange(f)}
            aria-pressed={filter === f}
          >
            {f}
          </Button>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </Button>
    </div>
  );
}
