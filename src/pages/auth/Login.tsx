import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { LoginResponse } from "./types/Login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      const role = response.data.role;
      navigate(role === "ADMIN" ? "/setup" : "/menu");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      } else {
        console.log(error);
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-gray-100">
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Login;
