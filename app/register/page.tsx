'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '../store'; // 导入 Zustand store

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const setAuth = useStore((state: any) => state.setAuth); // 获取 setAuth 方法

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setAuth({ username, password }); // 存储用户名和密码
            alert('注册成功！');
            router.push('/login'); // 注册成功后跳转到登录页
        } else {
            alert('密码不匹配！');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">注册</h1>
            <form onSubmit={handleRegister} className="bg-white shadow-md rounded-lg p-8 w-96">
                <div className="mb-4">
                    <label className="block text-gray-700">用户名</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">密码</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">确认密码</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200 w-full">
                    注册
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;