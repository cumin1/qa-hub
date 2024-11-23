'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '../store'; // 导入 Zustand store

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const isUserRegistered = useStore((state: any) => state.isUserRegistered); // 获取 isUserRegistered 方法
    const setCurrentUser = useStore((state: any) => state.setCurrentUser); // 获取 setCurrentUser 方法

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (isUserRegistered(username, password)) {
            setCurrentUser(username); // 设置当前用户
            localStorage.setItem('currentUser', username); // 存储到 localStorage
            alert('登录成功！');
            router.push('/questions'); // 跳转到问题列表页
        } else {
            alert('用户名或密码错误！');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">登录</h1>
            <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-8 w-96">
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
                <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 w-full">
                    登录
                </button>
            </form>
        </div>
    );
};

export default LoginPage;