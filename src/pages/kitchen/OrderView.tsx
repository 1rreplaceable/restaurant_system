import React, { useState, useEffect } from "react";
import api from "../../config/api";

interface Order {
  id: number;
  tableId: number;
  menuName: string;
  status: string;
}

const OrderView = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-gray-100">
      <h1>주방 화면</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.tableId}: {order.menuName} - {order.status}
            <button onClick={() => {}}>완료</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderView;
