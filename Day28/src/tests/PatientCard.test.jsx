import {
    screen,
    render
} from "@testing-library/react";

import { describe, expect, vi, test } from "vitest";

import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/vitest";

import PatientCard from "../components/PatientCard";

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
    "PatientCard",
    () => {
        const patient = {
            id: 1,
            name: "John Doe",
            email: "john@test.com",
        };

        test(
            "renders patient information",
            () => {
                render(
                    <PatientCard
                        patient={patient}
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
                    <PatientCard
                        patient={patient}
                        onDelete={onDelete}
                        onUpdate={vi.fn()}
                    />
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /delete button/i
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
                    <PatientCard
                        patient={patient}
                        onDelete={vi.fn()}
                        onUpdate={onUpdate}
                    />
                );

                await userEvent.click(
                    screen.getByRole(
                        "button",
                        {
                            name: /update button/i
                        }
                    )
                );

                expect(
                    onUpdate
                ).toHaveBeenCalledWith(
                    patient
                );
            }
        );
    }
);