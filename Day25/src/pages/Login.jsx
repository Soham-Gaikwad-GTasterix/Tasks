import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { users } from "../data/users";

import {
  useTheme
} from "../context/ThemeContext";

import {
  typography
} from "../theme/typography";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        
        e.preventDefault();

        const user =

            users.find(

                (u) =>

                    u.email === email &&

                    u.password === password

            );
        
        if (!user) {

            setError(
                "Invalid credentials"
            );

            return;

        }   
        
        localStorage.setItem(

            "user",

            JSON.stringify(user)

        );

        navigate("/dashboard");

    };

    const { colors } = useTheme();

    {
        error && (
            <p className="text-red-500 text-sm"> {error} </p>
        )
    }

    return (
        <div

            style={{ backgroundColor: colors.card }}

            className="min-h-screen flex items-center justify-center p-6"

        >

            <motion.div

                initial={{
                    opacity: 0,
                    y: 40,
                    scale: 0.95
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                }}

                transition={{
                    duraton: 0.5
                }}

                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"

            >

                {/* LOGO */}

                <div
                className="
                    text-center
                    mb-8
                "
                >

                <div
                    className="
                    text-6xl
                    "
                >
                    🏥
                </div>

                <h1
                    className="
                    text-5xl
                    font-bold
                    text-blue-700
                    mt-4
                    "
                >
                    Hospital Login
                </h1>

                <p
                    className="
                    text-gray-500
                    mt-2
                    "
                >
                    Welcome Back
                </p>

                </div>

                <form

                    onSubmit={
                        handleLogin
                    }

                    className="space-y-5"

                >

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }

                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    
                    />

                    <input
                    
                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }

                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    
                    />

                    <motion.button

                        whileHover={{
                            scale: 1.03
                        }}

                        whileTap={{
                            scale:0.97
                        }}

                        type="submit"
                    
                        className="w-full bg-indigo-700 text-white py-3 rounded-xl font-semibold"
                    
                    >

                        Login

                    </motion.button>

                </form>

            </motion.div>

        </div>

    );

}

export default Login;