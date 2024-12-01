import React, { useState } from 'react';

const menuItems = [
  { id: 1, name: '소주', price: 4000, image: 'soju.jpg' },
  { id: 2, name: '마늘닭발', price: 11000, image: 'garlic-chicken.jpg' },
  { id: 3, name: '폭립양념', price: 18500, image: 'pork-ribs.jpg' },
];

const MenuList: React.FC<{ onAddToCart: (item: any) => void }> = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {menuItems.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded shadow">
          <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded" />
          <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
          <p className="text-gray-600">{item.price.toLocaleString()}원</p>
          <div className="flex items-center justify-between mt-2">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => onAddToCart({ ...item, quantity })}
            >
              추가
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 text-center border rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
