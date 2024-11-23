'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/imgs/bizhi7.jpg')" }}>
            <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50">
                <h1 className="text-6xl font-extrabold text-white mb-8 drop-shadow-lg animate-bounce">问答交流社区</h1>
                <div className="bg-white shadow-lg rounded-lg p-10 w-11/12 md:w-1/2 lg:w-1/3 bg-opacity-90 border border-gray-300">
                    <h2 className="text-3xl font-semibold mb-6 text-center">欢迎来到问答交流社区</h2>
                    <div className="flex flex-col space-y-4">
                        <button onClick={() => router.push('/login')} className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105 shadow-md">
                            登录
                        </button>
                        <button onClick={() => router.push('/register')} className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 transform hover:scale-105 shadow-md">
                            注册
                        </button>
                        <button onClick={() => router.push('/questions')} className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 transform hover:scale-105 shadow-md">
                            游客身份登录
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage; 