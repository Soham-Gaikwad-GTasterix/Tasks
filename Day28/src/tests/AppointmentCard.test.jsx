import {
    screen,
    render
} from "@testing-library/react";

import { describe, expect, vi, test } from "vitest";

import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/vitest";

import AppointmentCard from "../components/AppointmentCard";

vi.mock(
    "../context/ThemeContext",
    () => ({
        useTheme: () => ({
            colors: {
                card: "#000",
                text: "#fff"
            }
        })
    })
);

describe(
    "AppointmentCard",
    () => {
        const appointment = {
            id: 1,
            patient: "John Doe",
            doctor: "Dr Raj",
        };

        test(
            "renders appointment information",
            () => {
                render(
                    <AppointmentCard
                        appointment={appointment}
                        onDelete={vi.fn()}
                        onUpdateStatus={vi.fn()}
                    />
                );

                expect(
                    screen.getByText(
                        "John Doe"
                    )
                ).toBeInTheDocument();

                expect(
                    screen.getByText(
                        "Dr Raj"
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "calls remove callback",
            async () => {
                const onDelete = vi.fn();
                render(
                    <AppointmentCard
                        appointment={appointment}
                        onDelete={onDelete}
                        onUpdateStatus={vi.fn()}
                    />
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /remove appointment/i
                        }
                    )
                );

                expect(
                    onDelete
                ).toHaveBeenCalledWith(1);
            }
        );

        test(
            "calls update status callback",
            async () => {
                const onUpdateStatus = vi.fn();
                render(
                    <AppointmentCard
                        appointment={appointment}
                        onDelete={vi.fn()}
                        onUpdateStatus={onUpdateStatus}
                    />
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /update status/i
                        }
                    )
                );

                expect(
                    onUpdateStatus
                ).toHaveBeenCalledWith(
                    appointment
                );
            }
        );
    }
);