import { Navigate, Route, Routes } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Clock } from "@/components/Clock";
import { TodoApp } from "@/pages/TodoApp";
import { UserDirectory } from "@/pages/UserDirectory";
import { UserDetail } from "@/pages/UserDetail";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="flex items-center justify-between">
        <Nav />
        <Clock />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/todos" element={<TodoApp />} />
          <Route path="/users" element={<UserDirectory />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
