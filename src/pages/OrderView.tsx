import React, { useState, useEffect } from "react";
import api from "../config/api";

const OrderView = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api.get("/orders");
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status });
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      alert("상태 변경 실패");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-gray-100">
      <h1>주방 화면</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.tableId}: {order.menuName} - {order.status}
            <button onClick={() => updateOrderStatus(order.id, "completed")}>
              완료
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderView;
