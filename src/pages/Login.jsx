// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { alpha, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';
// import axios from 'axios';

// import * as api from '../api'

// const Login = () => {
//     const [user, setUser] = useState({
//         email: '',
//         password: ''
//     });

//     const theme = useTheme();

//     const handleLogin = (email, pw) => {
//         // 1. Sanitize & validate email pw.
//         // 2. Call the Login API.
//         const res = api.login(email, pw);

//         if (res.status !== 200) {
//             alert(res.error);
//             return;
//         }

//         // 3. Set JWT in cookie.
//         const accessToken = res.data.accessToken;
//         const refreshToken = res.data.refreshToken;
//         document.cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}; path=/; expires=${new Date(Date.now() + 604800000).toUTCString()}`; // Token expires in 7 days.

//         // 4. Redirect to 'Body' page.

//     }

//     React.useEffect(() => {
//         console.log('load');
//     }, [])


//     return (
//         // <div>
//         //     <div class="min-h-screen bg-purple-400 flex justify-center items-center">
//         //         <div class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
//         //         </div>
//         //         <div class="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
//         //         </div>
//         //         <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
//         //             <div>
//         //                 <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Welcome Back!</h1>
//         //                 <p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an
//         //                     account to enjoy all the services without any ads for free!</p>
//         //             </div>
//         //             <div class="space-y-4">
//         //                 <input type="text" placeholder="Email Addres" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
//         //                 <input type="text" placeholder="Password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
//         //             </div>
//         //             <div class="text-center mt-6">
//         //                 <button class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl" onClick = {handleLogin(user.email, user.password)}>Log In</button>
//         //                 <p class="mt-4 text-sm">Do Not Have an Account? <span class="underline cursor-pointer"> here.</span>
//         //                 </p>
//         //             </div>
//         //         </div>
//         //         <div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
//         //         <div
//         //             class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
//         //         </div>
//         //     </div>
//         // </div>
//         <Box
//             sx={{
//                 ...bgGradient({
//                     color: alpha(theme.palette.background.default, 0.9),
//                     imgUrl: '/assets/background/overlay_4.jpg',
//                 }),
//                 height: 1,
//             }}
//         >
//             <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
//                 <Card sx={{
//                     p: 5,
//                     width: 1,
//                     maxWidth: 420,
//                 }}>
//                     <Typography variant="h4">Sign in to Minimal</Typography>
//                     <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
//                         Don’t have an account?
//                         <Link variant="subtitle2" sx={{ ml: 0.5 }}>
//                             Get started
//                         </Link>
//                     </Typography>
//                     <Divider sx={{ my: 3 }}>
//                         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                             OR
//                         </Typography>
//                     </Divider>
//                     <Stack spacing={3}>
//                         <TextField name="email" label="Email address" />

//                         <TextField
//                             name="password"
//                             label="Password"
//                             type={showPassword ? 'text' : 'password'}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                                             <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />
//                     </Stack>

//                     <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
//                         <Link variant="subtitle2" underline="hover">
//                             Forgot password?
//                         </Link>
//                     </Stack>

//                     <LoadingButton
//                         fullWidth
//                         size="large"
//                         type="submit"
//                         variant="contained"
//                         color="inherit"
//                         onClick={handleClick}
//                     >
//                         Login
//                     </LoadingButton>

//                 </Card>
//             </Stack>
//         </Box>
//     );
// };

// export default Login;