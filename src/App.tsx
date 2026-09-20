import { Navigate, Route, Routes } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Clock } from "@/components/Clock";
import { AuthStatus } from "@/components/AuthStatus";
import { TodoApp } from "@/pages/TodoApp";
import { UserDirectory } from "@/pages/UserDirectory";
import { UserDetail } from "@/pages/UserDetail";
import { Shop } from "@/pages/Shop";
import { Checkout } from "@/pages/Checkout";
import { Search } from "@/pages/Search";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <Nav />
        <div className="flex items-center gap-4">
          <AuthStatus />
          <Clock />
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/todos" element={<TodoApp />} />
          <Route path="/users" element={<UserDirectory />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
