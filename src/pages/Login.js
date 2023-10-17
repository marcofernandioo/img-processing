import React, {useState} from 'react';
import axios from 'axios';
import * as api from '../api' 

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleLogin = (email, pw) => {
        // 1. Sanitize & validate email pw.
        // 2. Call the Login API.
        const res = api.login(email,pw);

        if (res.status !== 200){
            alert(res.error);
            return;
        }

        // 3. Set JWT in cookie.
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        document.cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}; path=/; expires=${new Date(Date.now() + 604800000).toUTCString()}`; // Token expires in 7 days.

        // 4. Redirect to 'Body' page.
        
    }


    return (
        <div>
            <div class="min-h-screen bg-purple-400 flex justify-center items-center">
                <div class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
                </div>
                <div class="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
                </div>
                <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                    <div>
                        <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Welcome Back!</h1>
                        <p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an
                            account to enjoy all the services without any ads for free!</p>
                    </div>
                    <div class="space-y-4">
                        <input type="text" placeholder="Email Addres" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                        <input type="text" placeholder="Password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    </div>
                    <div class="text-center mt-6">
                        <button class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl" onClick = {handleLogin(user.email, user.password)}>Log In</button>
                        <p class="mt-4 text-sm">Do Not Have an Account? <span class="underline cursor-pointer"> here.</span>
                        </p>
                    </div>
                </div>
                <div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
                <div
                    class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
                </div>
            </div>
        </div>
    );
};

export default Login;