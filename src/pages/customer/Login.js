import React, {useState} from 'react';
import * as api from '../../api' 

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

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
            return
        }

        const res = await api.login(email,pw,'customer');
        if (res.error) {
            alert(`${res.error}`);
            return;
        }
        
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        document.cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}; path=/; expires=${new Date(Date.now() + 604800000).toUTCString()}`; // Token expires in 7 days.

        window.location.href = '/head';
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
                        <input name="email" onChange={(e) => {handleInputChange(e)}} type="text" placeholder="Email Addres" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                        <input name="password" onChange={(e) => {handleInputChange(e)}} type="text" placeholder="Password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    </div>
                    <div class="text-center mt-6">
                        <button class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl" onClick = {() => handleLogin(user.email, user.password)}>Log In</button>
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