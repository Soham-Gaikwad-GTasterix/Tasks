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

import Appointments from "../pages/Appointments";

const mockUseAppointments = vi.fn();

vi.mock(
    "../hooks/useAppointments",
    () => ({
        default: () => mockUseAppointments()
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
    "../components/AppointmentCard",
    () => ({
        default: ({ patient }) => (
            <div>
                {patient.name}
            </div>
        )
    })
);

describe(
    "Appointment Page",
    () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        test(
            "shows loading state",
            () => {
                mockUseAppointments.mockReturnValue({
                    appointments: [],
                    loading: true,
                    error: null,
                    addAppointment: vi.fn(),
                    deleteAppointment: vi.fn(),
                    updateAppointment: vi.fn()
                });

                render (
                    <Appointments/>
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
                mockUseAppointments.mockReturnValue({
                    appointments: [],
                    loading: false,
                    error: "Failed",
                    addAppointment: vi.fn(),
                    deleteAppointment: vi.fn(),
                    updateAppointment: vi.fn()
                });

                render (
                    <Appointments/>
                );

                expect(
                    screen.getByText(
                        /failed to load appointments/i
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "shows empty state",
            () => {
                mockUseAppointments.mockReturnValue({
                    appointments: [],
                    loading: false,
                    error: null,
                    addAppointment: vi.fn(),
                    deleteAppointment: vi.fn(),
                    updateAppointment: vi.fn()
                });

                render (
                    <Appointments/>
                );

                expect(
                    screen.getByText(
                        /no appointments found/i
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "opens modal when add appointment clicked",
            async () => {
                mockUseAppointments.mockReturnValue({
                    appointments: [],
                    loading: false,
                    error: null,
                    addAppointment: vi.fn(),
                    deleteAppointment: vi.fn(),
                    updateAppointment: vi.fn()
                });

                render (
                    <Appointments/>
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /add appointment/i
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
                mockUseAppointments.mockReturnValue({
                    appointments: [],
                    loading: false,
                    error: null,
                    addAppointment: vi.fn(),
                    deleteAppointment: vi.fn(),
                    updateAppointment: vi.fn()
                });

                render (
                    <Appointments/>
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /add appointment/i
                        }
                    )
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /cancel appointment/i
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