import { NavLink } from "react-router-dom";
import { ListTodo, SearchIcon, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const links = [
  { to: "/todos", label: "Todos", icon: ListTodo },
  { to: "/users", label: "Users", icon: Users },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/search", label: "Search", icon: SearchIcon },
];

export function Nav() {
  const { itemCount } = useCart();

  return (
    <nav className="flex flex-wrap gap-1">
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
      <NavLink
        to="/checkout"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          )
        }
      >
        <ShoppingCart className="h-4 w-4" />
        Checkout
        {itemCount > 0 && (
          <span className="rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
            {itemCount}
          </span>
        )}
      </NavLink>
    </nav>
  );
}
