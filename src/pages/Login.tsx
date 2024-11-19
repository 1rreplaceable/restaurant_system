import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/instance';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            const role = response.data.role; // e.g., 'ADMIN' or 'TABLE'
            navigate(role === 'ADMIN' ? '/setup' : '/menu');
        } catch (error) {
            alert('로그인 실패');
        }
    };

    return (
        <div>
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
