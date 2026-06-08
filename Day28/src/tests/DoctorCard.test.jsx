import {
    screen,
    render
} from "@testing-library/react";

import { describe, expect, vi, test } from "vitest";

import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/vitest";

import DoctorCard from "../components/DoctorCard";

vi.mock(
    "../context/ThemeContext",
    () => ({
        useTheme: () => ({
            colors: {
                card: "#000"
            }
        })
    })
);

describe(
    "DoctorCard",
    () => {
        const doctor = {
            id: 1,
            name: "John Doe",
            email: "john@test.com",
        };

        test(
            "renders doctor information",
            () => {
                render(
                    <DoctorCard
                        doctor={doctor}
                        onDelete={vi.fn()}
                        onUpdate={vi.fn()}
                    />
                );

                expect(
                    screen.getByText(
                        "John Doe"
                    )
                ).toBeInTheDocument();

                expect(
                    screen.getByText(
                        "john@test.com"
                    )
                ).toBeInTheDocument();
            }
        );

        test(
            "calls deleted callback",
            async () => {
                const onDelete = vi.fn();
                render(
                    <DoctorCard
                        doctor={doctor}
                        onDelete={onDelete}
                        onUpdate={vi.fn()}
                    />
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /delete doctor/i
                        }
                    )
                );

                expect(
                    onDelete
                ).toHaveBeenCalledWith(1);
            }
        );

        test(
            "cals update callback",
            async () => {
                const onUpdate = vi.fn();
                render(
                    <DoctorCard
                        doctor={doctor}
                        onDelete={vi.fn()}
                        onUpdate={onUpdate}
                    />
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /update doctor/i
                        }
                    )
                );

                expect(
                    onUpdate
                ).toHaveBeenCalledWith(
                    doctor
                );
            }
        );
    }
);