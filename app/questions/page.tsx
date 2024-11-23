'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import useStore from '../store';

const QuestionsPage = () => {
    const router = useRouter();
    const [username, setUsername] = React.useState<string | null>(null);
    const questions = useStore((state) => state.questions);
    const setCurrentUser = useStore((state) => state.setCurrentUser);
    const loadQuestions = useStore((state) => state.loadQuestions);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUsername(storedUser);
            setCurrentUser(storedUser);
        }
        loadQuestions(); // 加载问题列表
    }, [setCurrentUser, loadQuestions]);

    const handleQuestionClick = (id: number, title: string) => {
        router.push(`/questions/${id}?title=${encodeURIComponent(title)}`); // 跳转到问题详情页并传递标题
    };

    const handleLoginRedirect = () => {
        router.push('/login'); // 跳转到登录页
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUsername(null);
        setCurrentUser(null);
        router.push('/login'); // 退出后跳转到登录页
    };

    const handleAddQuestion = () => {
        router.push('/add-question'); // 跳转到发布问题页
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: 'gray.100' }}>
            <Box sx={{ backgroundColor: 'primary.main', color: 'white', p: 2, boxShadow: 1 }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1">问题列表</Typography>
                    <Box>
                        {username ? (
                            <>
                                <Typography variant="body1" component="span" sx={{ mr: 2 }}>欢迎, {username}</Typography>
                                <Button variant="contained" color="secondary" onClick={handleLogout}>
                                    退出登录
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" color="secondary" onClick={handleLoginRedirect}>
                                登录
                            </Button>
                        )}
                        <Button variant="contained" color="primary" onClick={handleAddQuestion} sx={{ ml: 2 }}>
                            发布问题
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
                {questions.map((question) => (
                    <Card key={question.id} sx={{ mb: 2, cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }} onClick={() => handleQuestionClick(question.id, question.title)}>
                        <CardContent>
                            <Typography variant="h6" component="h2" color="textPrimary" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {question.title}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default QuestionsPage;
