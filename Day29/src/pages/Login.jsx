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

import {
    useDispatch
} from "react-redux";

import { login } from "../store/authSlice";

function Login() {


    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        
        e.preventDefault();
        
        setError("");

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            setError(
                "Please fill in all fields"
            );
            return;
        }

        if (
            !emailRegex.test(email)
        ) {
            setError(
                "Please input a valid email address"
            );
            return;
        }

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

        
        dispatch(

            login(user)
            
        );

        navigate("/dashboard");

    };

    const { colors } = useTheme();

    return (
        <div

            style={{ backgroundColor: colors.card }}

            className="min-h-screen flex items-center justify-center p-10"

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

                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl"

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

                        type="text"

                        placeholder="Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }

                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 mb-5 text-white outline-none"
                    
                    />

                    <div
                        className="relative"
                    >

                    <input
                    
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }

                        placeholder="Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }

                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 mb-5 text-white outline-none"
                    
                    />

                    <button
                        type="button"
                        aria-label={
                            showPassword
                                ? "Hide Password"
                                : "Show Password"
                        }
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        className="
                            absolute
                            right-4
                            top-4
                            text-blue-600
                            font-semibold
                        "
                    >
                        {
                            showPassword
                                ? "Hide"
                                : "Show"
                        }
                    </button>

                        {
                            error && (
                                <p role="alert" className="text-red-500 text-sm"> {error} </p>
                            )
                        }

                    </div>

                    <motion.button

                        whileHover={{
                            scale: 1.03
                        }}

                        whileTap={{
                            scale:0.97
                        }}

                        type="submit"
                    
                        className="w-full bg-indigo-700 hover:bg-indigo-800 transition-all text-white py-3 rounded-xl font-semibold"
                    
                    >

                        Login

                    </motion.button>

                </form>

            </motion.div>

        </div>

    );

}

export default Login;