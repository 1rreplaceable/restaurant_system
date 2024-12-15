import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { LoginResponse } from "./types/Login";
import useRestaurantStore from "../../stores/restaurantStore";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setRestaurantId } = useRestaurantStore();

  const handleLogin = async () => {
    try {
      const response = await api.post<LoginResponse>("/api/auth/login", {
        username,
        password,
      });
      const { token, role, id } = response.data;
      localStorage.setItem("token", token);
      setRestaurantId(id);
      navigate(role === "ADMIN" ? "/admin" : "/menu");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      } else {
        console.log(error);
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const goToRegister = () => {
    navigate("/setup");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="bg-gray-700 rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-6">로그인</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
          >
            로그인
          </button>
        </div>
        <div className="mt-6 text-center">
          <p>계정이 없으신가요?</p>
          <button
            onClick={goToRegister}
            className="mt-2 text-blue-400 hover:underline"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
