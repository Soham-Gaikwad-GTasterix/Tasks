import {
    renderHook,
    waitFor,
    act
} from "@testing-library/react";

import { describe, expect, vi, test, beforeEach } from "vitest";

import useAppointments from "../hooks/useAppointments";

import hospitalApi from "../api/hospitalApi";

vi.mock(
    "../api/hospitalApi",
    () => ({
        default: {
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn()
        }
    })
);

describe(
    "useAppointments Hook",
    () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        test(
            "fetches appointments successfully",
            async () => {
                hospitalApi.get.mockResolvedValue({
                    data: [
                        {
                            id: 1,
                            name: "John Doe"
                        }
                    ]
                });
                
                const { result } =
                    renderHook(() =>
                        useAppointments()
                    );

                await waitFor(
                    () => {
                        expect(
                            result.current.loading
                        ).toBe(false);
                    },
                    {
                        timeout: 2000
                    }
                );

                expect(
                    result.current.error
                ).toBe(null);

                expect(
                    result.current.appointments
                ).toHaveLength(1);

                expect(
                    result.current.appointments[0].name
                ).toBe("John Doe");
            }
        );

        test(
            "handles fetched error",
            async () => {
                hospitalApi.get.mockRejectedValue(
                    new Error("Server Error")
                );
                
                const { result } =
                    renderHook(() =>
                        useAppointments()
                    );

                await waitFor(
                    () => {
                        expect(
                            result.current.loading
                        ).toBe(false);
                    },
                    {
                        timeout: 2000
                    }
                );

                expect(
                    result.current.appointments
                ).toEqual([]);

                expect(
                    result.current.error
                ).toBe("Server Error");
            }
        );  

        test(
            "adds a appointments",
            async () => {
                hospitalApi.get.mockResolvedValue({
                    data: []
                });

                hospitalApi.post.mockResolvedValue({
                    data: {
                        id: 1,
                        name: "John Doe"
                    }
                });
                
                const { result } =
                    renderHook(() =>
                        useAppointments()
                    );

                await waitFor(
                    () => {
                        expect(
                            result.current.loading
                        ).toBe(false);
                    },
                    {
                        timeout: 2000
                    }
                );

                await act(async () => {
                    await result.current.addAppointment({
                        name: "John Doe"
                    });
                });

                expect(
                    hospitalApi.post
                ).toHaveBeenCalled();

                expect(
                    result.current.appointments
                ).toHaveLength(1);
            }
        );

        test(
            "deletes a appointment",
            async () => {
                hospitalApi.get.mockResolvedValue({
                    data: [
                        {
                            id: 1,
                            name: "John Doe"
                        }
                    ]
                });

                hospitalApi.delete.mockResolvedValue({
                    data: {}
                });
                
                const { result } =
                    renderHook(() =>
                        useAppointments()
                    );

                await waitFor(
                    () => {
                        expect(
                            result.current.loading
                        ).toBe(false);
                    },
                    {
                        timeout: 2000
                    }
                );

                await act(async () => {
                    await result.current.deleteAppointment(
                        1
                    );
                });

                expect(
                    hospitalApi.delete
                ).toHaveBeenCalledWith(
                    "/appointments/1"
                );

                expect(
                    result.current.appointments
                ).toHaveLength(0);
            }
        );

        test(
            "updates a appointment",
            async () => {
                hospitalApi.get.mockResolvedValue({
                    data: [
                        {
                            id: 1,
                            name: "John Doe"
                        }
                    ]
                });

                hospitalApi.put.mockResolvedValue({
                    data: {
                        id: 1,
                        name: "John Updated"
                    }
                });
                
                const { result } =
                    renderHook(() =>
                        useAppointments()
                    );

                await waitFor(
                    () => {
                        expect(
                            result.current.loading
                        ).toBe(false);
                    },
                    {
                        timeout: 2000
                    }
                );

                await act(async () => {
                    await result.current.updateAppointment({
                        id: 1,
                        name: "John Updated"
                    });
                });

                expect(
                    hospitalApi.put
                ).toHaveBeenCalled();

                expect(
                    result.current.appointments[0].name
                ).toBe(
                    "John Updated"
                );
            }
        );        
    }
);