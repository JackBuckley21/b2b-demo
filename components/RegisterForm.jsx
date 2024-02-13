"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "public/logo.svg"

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }
    
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center  h-screen bg-black">
          <div className=" absolute text-7xl font-semibold mb-[36rem] h-48
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text
            ">
      Register  <span className="italic pr-3 text-8xl">ur </span> interest today
      </div>
    <div className="grid place-items-center h-screen bg-black">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-500 bg-white">
      <div className="flex ml-14 mb-4 pb-2  w-72 ">
§        </div>
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Business Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          {/* <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          /> */}
          <button className="animate-border text-white font-bold cursor-pointer px-1 py-1  inline-block rounded-lg bg-white bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:400%_400%]">
          <span className="block rounded-md bg-slate-900 px-5 py-3 font-bold text-white"> Register </span>
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
        </div>
      </div>
    </div>
  );
}
