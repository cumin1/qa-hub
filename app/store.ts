import { create } from 'zustand';

// 定义问题类型
interface Question {
    id: number;
    title: string;
}

// 定义用户类型
interface User {
    username: string;
    password: string;
}

// 定义 Zustand store 的状态类型
interface Store {
    users: User[]; // 存储所有注册用户
    currentUser: string | null; // 当前登录用户
    questions: Question[]; // 存储所有问题
    setAuth: (auth: User) => void; // 设置用户
    setCurrentUser: (username: string) => void; // 设置当前登录用户
    isUserRegistered: (username: string, password: string) => boolean; // 检查用户是否注册
    addQuestion: (title: string) => void; // 添加问题
    loadQuestions: () => void; // 加载问题列表
}

// 创建 Zustand store
const useStore = create<Store>((set) => ({
    users: [
        { username: '10001', password: '123456' } // 添加初始用户
    ],
    currentUser: null, // 初始值为 null
    questions: [], // 初始为空，稍后加载
    setAuth: (auth) => set((state) => ({
        users: [...state.users, auth] // 添加新用户到用户列表
    })),
    setCurrentUser: (username) => set(() => ({
        currentUser: username // 设置当前用户
    })),
    isUserRegistered: (username, password): boolean => {
        return useStore.getState().users.some(user => user.username === username && user.password === password);
    },
    addQuestion: (title) => set((state) => {
        const newQuestions = [...state.questions, { id: state.questions.length + 1, title }];
        localStorage.setItem('questions', JSON.stringify(newQuestions)); // 更新 localStorage
        return { questions: newQuestions };
    }),
    loadQuestions: () => set(() => {
        const storedQuestions = localStorage.getItem('questions');
        return { questions: storedQuestions ? JSON.parse(storedQuestions) : [
            { id: 1, title: '如何提高代码性能？' },
            { id: 2, title: 'React 和 Vue 的区别是什么？' },
            { id: 3, title: '如何使用 Zustand 管理状态？' },
        ]};
    }),
}));

export default useStore;