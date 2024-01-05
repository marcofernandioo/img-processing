import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';

import * as api from '../../api'
import { bgGradient } from '../../themes/css';
import Iconify from '../../components/Iconify';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const theme = useTheme();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleLogin = async (email, pw) => {
        if (!email || !pw) {
            alert("Enter a valid email and password")
            setIsLoginLoading(false);
            return
        }

        setIsLoginLoading(true);
        const res = await api.login(email, pw, 'customer');
        if (res.error) {
            alert(`${res.error}`);
            setIsLoginLoading(false);
            return;
        }

        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        document.cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}; path=/; expires=${new Date(Date.now() + 604800000).toUTCString()}`; // Token expires in 7 days.

        setIsLoginLoading(false);
        window.location.href = '/head';

    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoginLoading}
            >
                <CircularProgress />
            </Backdrop>
            <Box
                sx={{
                    ...bgGradient({
                        color: alpha(theme.palette.background.default, 0.9),
                    }),
                    height: 1,
                }}
            >
                <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                    <Card
                        sx={{
                            p: 5,
                            width: 1,
                            maxWidth: 420,
                        }}
                    >
                        <Typography variant="h4">Welcome to efka</Typography>
                        <Stack spacing={3} sx={{ my: 3 }}>
                            <TextField
                                name="email"
                                label="Email address"
                                onChange={(e) => handleInputChange(e)}
                            />
                            <TextField
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Stack>
                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                OR
                            </Typography>
                        </Divider>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Don’t have an account?
                            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                                Register now
                            </Link>
                        </Typography>
                        <Button
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => handleLogin(user.email, user.password)}
                        >
                            Login
                        </Button>
                    </Card>
                </Stack>
            </Box>
        </>

    );
};

export default Login;