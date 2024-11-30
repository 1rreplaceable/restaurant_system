import React, { useState } from "react";
import api from "../../config/api";

const RestaurantSetup = () => {
  const [form, setForm] = useState({
    name: "",
    tableCount: 0,
    location: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/restaurants", form);
      alert("식당 설정 완료");
    } catch (error) {
      alert("설정 실패");
    }
  };

  return (
    <div>
      <h1>식당 설정</h1>
      <input name="name" placeholder="식당 이름" onChange={handleChange} />
      <input
        name="tableCount"
        placeholder="테이블 개수"
        type="number"
        onChange={handleChange}
      />
      <input name="location" placeholder="위치" onChange={handleChange} />
      <input name="phone" placeholder="전화번호" onChange={handleChange} />
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
};

export default RestaurantSetup;
