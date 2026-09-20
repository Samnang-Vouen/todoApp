import { useState, type FormEvent } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AuthStatus() {
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (user) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-600">
          Hi, <span className="font-medium text-slate-900">{user.email}</span>
        </span>
        <Button type="button" size="sm" variant="ghost" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    );
  }

  if (!isSigningIn) {
    return (
      <Button type="button" size="sm" variant="outline" onClick={() => setIsSigningIn(true)}>
        Sign in
      </Button>
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    signIn(trimmed);
    setEmail("");
    setIsSigningIn(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="email"
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email"
        className="h-8 w-44"
      />
      <Button type="submit" size="sm">
        Sign in
      </Button>
    </form>
  );
}
