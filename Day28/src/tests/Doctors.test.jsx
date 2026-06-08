import {
    render,
    screen
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/vitest";

import {
    describe,
    test,
    expect,
    vi,
    beforeEach
} from "vitest";

import Doctors from "../pages/Doctors";

const mockUseDoctors =vi.fn();

vi.mock(
    "../hooks/useDoctors",
    () => ({
        default: () => mockUseDoctors()
    })
);

vi.mock(
    "../context/ThemeContext",
    () => ({
        useTheme: () => ({
            colors: {
                background: "#000",
                text: "#fff",
                border: "#333"
            }
        })
    })
);

vi.mock(
    "../components/Loader",
    () => ({
        default: () => (
            <div>Loading...</div>
        )
    })
);

vi.mock(
    "../components/DoctorCard",
    () => ({
        default: ({ doctor }) => (
            <div>
                {doctor.name}
            </div>
        )
    })
);

describe(
    "Doctors Page",
    () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        test(
            "shows loading state",
            () => {
                mockUseDoctors.mockReturnValue({
                    doctors: [],
                    loading: true,
                    error: null,
                    addDoctor: vi.fn(),
                    deleteDoctor: vi.fn(),
                    updateDoctor: vi.fn()
                });

                render (
                    <Doctors/>
                );

                expect(
                    screen.getByText(
                        /loading/i
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "shows error state",
            () => {
                mockUseDoctors.mockReturnValue({
                    doctors: [],
                    loading: false,
                    error: "Failed",
                    addDoctor: vi.fn(),
                    deleteDoctor: vi.fn(),
                    updateDoctor: vi.fn()
                });

                render (
                    <Doctors/>
                );

                expect(
                    screen.getByText(
                        /failed to load doctors/i
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "shows empty state",
            () => {
                mockUseDoctors.mockReturnValue({
                    doctors: [],
                    loading: false,
                    error: null,
                    addDoctor: vi.fn(),
                    deleteDoctor: vi.fn(),
                    updateDoctor: vi.fn()
                });

                render (
                    <Doctors/>
                );

                expect(
                    screen.getByText(
                        /no doctors found/i
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "opens modal when add doctor clicked",
            async () => {
                mockUseDoctors.mockReturnValue({
                    doctors: [],
                    loading: false,
                    error: null,
                    addDoctor: vi.fn(),
                    deleteDoctor: vi.fn(),
                    updateDoctor: vi.fn()
                });

                render (
                    <Doctors/>
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /add doctor/i
                        }
                    )
                );

                expect(
                    screen.getByRole(
                        "dialog"
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "closes model when cancel clicked",
            async () => {
                mockUseDoctors.mockReturnValue({
                    doctors: [],
                    loading: false,
                    error: null,
                    addDoctor: vi.fn(),
                    deleteDoctor: vi.fn(),
                    updateDoctor: vi.fn()
                });

                render (
                    <Doctors/>
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /add doctor/i
                        }
                    )
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /cancel doctor/i
                        }
                    )
                );

                expect(
                    screen.queryByRole(
                        "dialog"
                    )
                ).not.toBeInTheDocument();
            }
        );
    }
);