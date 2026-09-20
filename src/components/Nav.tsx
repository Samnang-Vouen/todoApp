import { NavLink } from "react-router-dom";
import { ListTodo, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/todos", label: "Todos", icon: ListTodo },
  { to: "/users", label: "Users", icon: Users },
];

export function Nav() {
  return (
    <nav className="flex gap-1">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            )
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
