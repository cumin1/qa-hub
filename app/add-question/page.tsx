'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import useStore from '../store';

const AddQuestionPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [questionTitle, setQuestionTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const addQuestion = useStore((state) => state.addQuestion);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUsername(storedUser);
        } else {
            setError('请先登录以发布问题。');
        }
    }, []);

    const handleSubmit = () => {
        if (!username) {
            setError('请先登录以发布问题。');
            return;
        }
        if (questionTitle.trim() === '') {
            setError('问题标题不能为空。');
            return;
        }
        addQuestion(questionTitle);
        router.push('/questions'); // 发布成功后跳转到问题列表页
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: 'gray.100', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 600, p: 4, backgroundColor: 'white', boxShadow: 1, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
                    发布问题
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    fullWidth
                    variant="outlined"
                    label="问题标题"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    发布
                </Button>
            </Box>
        </Box>
    );
};

export default AddQuestionPage; 