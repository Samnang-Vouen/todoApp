import { Trash2 } from "lucide-react";
import type { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2">
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? "active" : "completed"}`}
      />
      <span
        className={cn(
          "flex-1 text-sm",
          todo.completed && "text-slate-400 line-through"
        )}
      >
        {todo.text}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        <Trash2 className="h-4 w-4 text-slate-500" />
      </Button>
    </li>
  );
}
