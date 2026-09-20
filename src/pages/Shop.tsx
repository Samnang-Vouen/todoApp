import { Minus, Plus, ShoppingCart } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Shop() {
  const { items, dispatch } = useCart();

  return (
    <ul className="flex flex-col gap-2">
      {PRODUCTS.map((product) => {
        const line = items.find((item) => item.id === product.id);

        return (
          <li key={product.id}>
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-slate-500">${product.price.toFixed(2)}</p>
                </div>

                {line ? (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: product.id, quantity: line.quantity - 1 },
                        })
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 text-center text-sm font-medium">{line.quantity}</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: product.id, quantity: line.quantity + 1 },
                        })
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() =>
                      dispatch({
                        type: "ADD_ITEM",
                        payload: { id: product.id, name: product.name, price: product.price },
                      })
                    }
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
