import {
    render,
    screen
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/vitest";

import Login from "../pages/Login";

import { BrowserRouter } from "react-router-dom";

import { describe, expect, vi, test, beforeEach } from "vitest";

const mockNavigate = vi.fn();

vi.mock(
    "react-router-dom",
    async () => {
        const actual =
            await vi.importActual(
                "react-router-dom"
            );

        return {
            ...actual,
            useNavigate: () => mockNavigate
        };
    }
);

vi.mock(
    "../context/ThemeContext",
    () => ({
        useTheme: () => ({
            colors:{
                card: "#000"
            }
        })
    })
);

vi.mock(
    "../data/users",
    () => ({
        users: [
            {
                email: "admin@hospital.com",
                password: "admin123"
            }
        ]
    })
);

function renderLogin() {
    return render (
        <BrowserRouter>

            <Login/>

        </BrowserRouter>
    );
}

describe(
    "Login Component",
    () => {
        beforeEach(() => {
            vi.clearAllMocks();
            localStorage.clear();
        });

        test(
            "renders login form",
            () => {
                renderLogin();
                expect(
                    screen.getByPlaceholderText(
                        /email/i
                    )
                ).toBeInTheDocument();

                expect(
                    screen.getByPlaceholderText(
                        /password/i
                    )
                ).toBeInTheDocument();

                expect(
                    screen.getByRole(
                        "button",
                        {
                            name: /login/i
                        }
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "shows error when fields are empty",
            async() => {
                renderLogin();
                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /login/i
                        }
                    )
                );

                expect(
                    screen.getByText(
                        /please fill in all fields/i
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "shows invald email error",
            async () => {
                renderLogin();
                await userEvent.type(
                    screen.getByPlaceholderText(
                        /email/i
                    ),
                    "invalidemail"
                );

                await userEvent.type(
                    screen.getByPlaceholderText(
                        /password/i
                    ),
                    "admin123"
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /login/i
                        }
                    )
                );

                expect(
                    screen.getByText(
                        /please input a valid email address/i
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "show invalid credentials",
            async () => {
                renderLogin();
                await userEvent.type(
                    screen.getByPlaceholderText(
                        /email/i
                    ),
                    "wrong@test.com"
                );

                await userEvent.type(
                    screen.getByPlaceholderText(
                        /password/i
                    ),
                    "wrongpassword"
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /login/i
                        }
                    )
                );

                expect(
                    screen.getByText(
                        /invalid credentials/i
                    )
                ).toBeInTheDocument();
            }
        );
        
        test(
            "toggles password visibility",
            async () => {
                renderLogin();
                const passwordInput =
                    screen.getByPlaceholderText(
                        /password/i
                    );
                
                const toggleButton =
                    screen.getByRole(
                        "button",
                        {
                            name: /show password/i
                        }
                    );

                expect(
                    passwordInput
                ).toHaveAttribute(
                    "type",
                    "password"
                );

                await userEvent.click(
                    toggleButton
                );

                expect(
                    passwordInput
                ).toHaveAttribute(
                    "type",
                    "text"
                );
            }
        );

        test(
            "logs in successfully",
            async () => {
                renderLogin();
                await userEvent.type(
                    screen.getByPlaceholderText(
                        /email/i
                    ),
                    "admin@hospital.com"
                );

                await userEvent.type(
                    screen.getByPlaceholderText(
                        /password/i
                    ),
                    "admin123"
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /login/i
                        }
                    )
                );

                expect (
                    mockNavigate
                ).toHaveBeenCalledWith(
                    "/dashboard"
                );
            }
        );
    }
);