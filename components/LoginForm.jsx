"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "public/logo.svg"

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <div className="grid place-items-center  h-screen bg-black">
          <div className=" absolute text-7xl font-semibold mb-[44rem]
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text
            ">
      Welcome to <span className="italic pr-3 text-8xl">ur </span> new era
      </div>
      <div className=" shadow-lg p-5 rounded-lg border-t-4 border-purple-500 bg-white">
        <div className="flex ml-14 mb-4 pb-2  w-72 ">
        <Image src={logo} alt="Login Image" />
        </div>
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="animate-border text-white font-bold cursor-pointer px-1 py-1  inline-block rounded-lg bg-white bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:400%_400%]">
          <span className="block rounded-md bg-slate-900 px-5 py-3 font-bold text-white"> Login </span>
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Ready for UR new era? <span className="underline text-purple-500">Register Here</span>
          </Link>
       </form>
      </div>
    </div>
  );
}

{/* <div className="grid grid-cols-2 gap-5 md:grid-cols-2"> 
<Image src={logo} alt="Login Image" className="" />
</div> */}
