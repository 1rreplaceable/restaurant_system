import React, { useState } from "react";
import api from "../../config/api";
import { useNavigate } from "react-router-dom";

const RestaurantSetup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    tableCount: 0,
    location: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/restaurant/setup", form);
      alert("식당 설정 완료");
      navigate('/login');
    } catch (error) {
      alert("설정 실패");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="bg-gray-700 rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-6">식당 설정</h1>
        <div className="space-y-4">
          <input
            name="name"
            placeholder="식당 이름"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            name="username"
            placeholder="관리자 아이디"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            name="password"
            type="password"
            placeholder="관리자 비밀번호"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            name="tableCount"
            placeholder="테이블 개수"
            type="number"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            name="location"
            placeholder="위치"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            name="phone"
            placeholder="전화번호"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSetup;
