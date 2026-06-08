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

import Patients from "../pages/Patients";

const mockUsePatients =vi.fn();

vi.mock(
    "../hooks/usePatients",
    () => ({
        default: () => mockUsePatients()
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
    "../components/PatientCard",
    () => ({
        default: ({ patient }) => (
            <div>
                {patient.name}
            </div>
        )
    })
);

describe(
    "Patients Page",
    () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        test(
            "shows loading state",
            () => {
                mockUsePatients.mockReturnValue({
                    patients: [],
                    loading: true,
                    error: null,
                    addPatient: vi.fn(),
                    deletePatient: vi.fn(),
                    updatePatient: vi.fn()
                });

                render (
                    <Patients/>
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
                mockUsePatients.mockReturnValue({
                    patients: [],
                    loading: false,
                    error: "Failed",
                    addPatient: vi.fn(),
                    deletePatient: vi.fn(),
                    updatePatient: vi.fn()
                });

                render (
                    <Patients/>
                );

                expect(
                    screen.getByText(
                        /failed to load patients/i
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "shows empty state",
            () => {
                mockUsePatients.mockReturnValue({
                    patients: [],
                    loading: false,
                    error: null,
                    addPatient: vi.fn(),
                    deletePatient: vi.fn(),
                    updatePatient: vi.fn()
                });

                render (
                    <Patients/>
                );

                expect(
                    screen.getByText(
                        /no patients found/i
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "opens modal when add patient clicked",
            async () => {
                mockUsePatients.mockReturnValue({
                    patients: [],
                    loading: false,
                    error: null,
                    addPatient: vi.fn(),
                    deletePatient: vi.fn(),
                    updatePatient: vi.fn()
                });

                render (
                    <Patients/>
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /add patient/i
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
                mockUsePatients.mockReturnValue({
                    patients: [],
                    loading: false,
                    error: null,
                    addPatient: vi.fn(),
                    deletePatient: vi.fn(),
                    updatePatient: vi.fn()
                });

                render (
                    <Patients/>
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /add patient/i
                        }
                    )
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /cancel patient/i
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