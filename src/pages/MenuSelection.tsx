import { useState } from "react";
import Cart from "../components/Cart";
import CategoryTabs from "../components/CategoryTabs";
import MenuList from "../components/MenuList";

const MenuSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState("안주");
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-800 text-white">
        <CategoryTabs onSelect={setSelectedCategory} />
      </div>
      <div className="w-3/5 bg-gray-100 overflow-y-scroll">
        <MenuList onAddToCart={addToCart} />
      </div>
      <div className="w-1/5 bg-white">
        <Cart items={cartItems} onRemove={removeFromCart} />
      </div>
    </div>
  );
};

export default MenuSelection;
