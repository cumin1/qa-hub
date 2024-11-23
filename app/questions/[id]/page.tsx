'use client'

import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import useStore from '../../store';
import { useParams, useRouter } from 'next/navigation';

const QuestionDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [questionContent, setQuestionContent] = useState<string>('这是一个示例问题内容。');
    const [comments, setComments] = useState<Array<{ id: number, text: string, likes: number, username: string }>>([
        { id: 1, text: '这是一个示例评论。', likes: 0, username: '示例用户' }
    ]);
    const [newComment, setNewComment] = useState<string>('');
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUsername(storedUser);
        }

        const query = new URLSearchParams(window.location.search);
        const title = query.get('title');
        if (title) {
            setQuestionContent(title);
        }
    }, [id]);

    const addComment = (id: string, text: string) => {
        const newComment = { id: comments.length + 1, text, likes: 0, username: username || '匿名用户' };
        return Promise.resolve(newComment);
    };

    const likeComment = (commentId: number) => {
        return Promise.resolve();
    };

    const handleAddComment = () => {
        if (!username) {
            alert('请先登录以发布评论。');
            return;
        }
        if (newComment.trim()) {
            addComment(id, newComment).then(comment => {
                setComments([...comments, comment]);
                setNewComment('');
            });
        }
    };

    const handleLike = (commentId: number) => {
        if (!username) {
            alert('请先登录以点赞。');
            return;
        }
        likeComment(commentId).then(() => {
            setComments(comments.map(comment =>
                comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
            ));
        });
    };

    const handleLoginRedirect = () => {
        router.push('/login'); // 跳转到登录页
    };

    const handleBackToList = () => {
        router.push('/questions'); // 返回问题列表页
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUsername(null);
        router.push('/login'); // 退出后跳转到登录页
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">问题详情</h1>
                    <div>
                        <button onClick={handleBackToList} className="bg-white text-blue-600 py-1 px-3 rounded mr-2">
                            返回列表
                        </button>
                        {username ? (
                            <>
                                <span className="mr-4">欢迎, {username}</span>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
                                    退出登录
                                </button>
                            </>
                        ) : (
                            <button onClick={handleLoginRedirect} className="bg-white text-blue-600 py-1 px-3 rounded">
                                登录
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">问题 {id}</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{questionContent}</Typography>
                        <Typography variant="h6">评论</Typography>
                        {comments.map(comment => (
                            <Box key={comment.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                    {comment.username}: {comment.text}
                                </Typography>
                                <IconButton onClick={() => handleLike(comment.id)}>
                                    <ThumbUpIcon />
                                </IconButton>
                                <Typography variant="body2">{comment.likes}</Typography>
                            </Box>
                        ))}
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="添加评论"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" onClick={handleAddComment}>发布评论</Button>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default QuestionDetailPage; 