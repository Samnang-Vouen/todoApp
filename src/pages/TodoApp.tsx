import { useMemo, useState } from "react";
import type { Todo, TodoFilter } from "@/types/todo";
import { AddTodo } from "@/components/todos/AddTodo";
import { TodoList } from "@/components/todos/TodoList";
import { FilterBar } from "@/components/todos/FilterBar";
import { Card, CardContent } from "@/components/ui/card";

function createId() {
  return crypto.randomUUID();
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>("all");

  function handleAdd(text: string) {
    setTodos((prev) => [...prev, { id: createId(), text, completed: false }]);
  }

  function handleToggle(id: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleClearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);
  const hasCompleted = todos.some((todo) => todo.completed);

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4">
        <AddTodo onAdd={handleAdd} />
        <TodoList todos={visibleTodos} onToggle={handleToggle} onDelete={handleDelete} />
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          hasCompleted={hasCompleted}
          onClearCompleted={handleClearCompleted}
        />
      </CardContent>
    </Card>
  );
}
