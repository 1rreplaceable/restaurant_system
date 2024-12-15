import { useState } from "react";
import Cart from "../../components/Cart";
import CategoryTabs from "../../components/CategoryTabs";
import MenuList from "../../components/MenuList";
import { useNavigate } from "react-router-dom";

const MenuSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState("안주");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="w-full bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">메뉴 선택</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          로그아웃
        </button>
      </header>

      <div className="flex flex-grow">
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
    </div>
  );
};

export default MenuSelection;
