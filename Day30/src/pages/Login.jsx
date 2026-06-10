import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { users } from "../data/users";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import FormField from "../components/ui/FormField";

import { FaHospital } from "react-icons/fa";

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

            className="min-h-screen flex items-center justify-center p-8"

        >

            <Card 
                className="
                    w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl
                "
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

                >

                    {/* LOGO */}

                    <div
                    className="
                        flex
                        text-center
                        flex-col
                        items-center
                        mb-8
                    "
                    >

                    <FaHospital
                        className="
                        text-indigo-500
                        text-4xl
                        "
                    />
                    

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

                    >
                        <FormField
                            label="Email"
                        >

                            <Input

                                type="text"

                                placeholder="Email"

                                value={email}

                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                style={{
                                    color: colors.text
                                }}

                            />

                        </FormField>

                        <FormField
                            label="Password"
                        >

                            <div
                                className="relative"
                            >

                                <Input
                                
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
                                    style={{
                                        color: colors.text
                                    }}

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

                            </div>

                        </FormField>

                        {
                            error && (
                                <p role="alert" className="text-red-500 text-sm mb-2"> {error} </p>
                            )
                        }

                        <Button

                            variant="primary"

                            type="submit"
                        
                            className="w-full"
                        
                        >

                            Login

                        </Button>

                    </form>

                </motion.div>

            </Card>

        </div>

    );

}

export default Login;