import React from 'react';

const Cart: React.FC<{ items: any[]; onRemove: (id: number) => void }> = ({ items, onRemove }) => {
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">장바구니</h2>
      {items.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span>
                {item.quantity}개 | {(item.price * item.quantity).toLocaleString()}원
              </span>
              <button className="text-red-500" onClick={() => onRemove(item.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <p className="font-semibold">총액: {totalPrice.toLocaleString()}원</p>
        <button className="w-full bg-red-500 text-white py-2 rounded mt-2">주문하기</button>
      </div>
    </div>
  );
};

export default Cart;
