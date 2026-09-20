import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Checkout() {
  const { items, dispatch, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-slate-300 py-10 text-center text-slate-500">
        <ShoppingBag className="h-8 w-8" />
        <p className="text-sm">Your cart is empty.</p>
        <Link to="/shop" className="text-sm font-medium text-slate-900 underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: { id: item.id, quantity: item.quantity - 1 },
                      })
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: { id: item.id, quantity: item.quantity + 1 },
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })}
                  >
                    <Trash2 className="h-4 w-4 text-slate-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <span className="font-medium">Total</span>
          <span className="text-lg font-semibold">${total.toFixed(2)}</span>
        </CardContent>
      </Card>
    </div>
  );
}
