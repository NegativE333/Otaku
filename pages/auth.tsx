import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import {signIn} from 'next-auth/react';
import { useRouter } from "next/router";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [varient, setVarient] = useState('login');

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) => currentVarient==='login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try{
      await signIn('credentials', {
        email, 
        password,
        callbackUrl: '/profiles'
      });
    }
    catch(error){
      console.log(error);
    }
  },[email, password]);

  const register = useCallback(async () => {
    try{
      await axios.post('/api/register',{
        email,
        name,
        password
      });
      login();
    }
    catch(error){
      console.log(error);
    }
  }, [email, name, password, login]);

  

  return (
    <div className="relative h-full w-full bg-[url('/images/heroall2.jpg')] bg-no-repeat bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-6">
          {/* <img src="/images/l.png" alt="logo" className="h-12" /> */}
          <h3 className="h-12 text-4xl text-white">Otaku</h3>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold ">
                {varient === 'login' ? 'Sign In': 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {varient === 'register' && (
                    <Input
                    lable="Username"
                    onChange={(ev: any) => setName(ev.target.value)}
                    id="name"
                    type="text"
                    value={name}
                  />
                )}
                <Input
                  lable="Email"
                  onChange={(ev: any) => setEmail(ev.target.value)}
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  lable="Password"
                  onChange={(ev: any) => setPassword(ev.target.value)}
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button 
              onClick={varient === 'login' ? login : register}
              className="bg-red-600 my-3 py-3 text-white rounded-md w-full hover:bg-red-700 transition">
                {varient === 'login' ? 'Login' : 'Sign Up'}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                  <div 
                  onClick={() => signIn('google', {callbackUrl: '/profiles'})}
                  className="
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex 
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-80
                    transition
                  ">
                    <FcGoogle size={30} />
                  </div>
                  {/* <div
                   onClick={() => signIn('github', {callbackUrl: '/'})}
                  className="
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex 
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-80
                    transition
                  ">
                    <FaGithub size={30} />
                  </div> */}
              </div>
              <p className="text-neutral-500 mt-12">
                {varient === 'login' ? "First time using Otaku?" : "Already have an account?"}
                <span onClick={toggleVarient} className="text-white ml-1 hover:underline cursor-pointer">
                    {varient === 'login' ? "Create an account." : "Login."}
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Auth;
