import {
    renderHook,
    waitFor,
    act
} from "@testing-library/react";

import { describe, expect, vi, test, beforeEach } from "vitest";

import useDoctors from "../hooks/useDoctors";

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
    "useDoctors Hook",
    () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        test(
            "fetches Doctors successfully",
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
                        useDoctors()
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
                    result.current.doctors
                ).toHaveLength(1);

                expect(
                    result.current.doctors[0].name
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
                        useDoctors()
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
                    result.current.doctors
                ).toEqual([]);

                expect(
                    result.current.error
                ).toBe("Server Error");
            }
        );  

        test(
            "adds a doctor",
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
                        useDoctors()
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
                    await result.current.addDoctor({
                        name: "John Doe"
                    });
                });

                expect(
                    hospitalApi.post
                ).toHaveBeenCalled();

                expect(
                    result.current.doctors
                ).toHaveLength(1);
            }
        );

        test(
            "deletes a doctor",
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
                        useDoctors()
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
                    await result.current.deleteDoctor(
                        1
                    );
                });

                expect(
                    hospitalApi.delete
                ).toHaveBeenCalledWith(
                    "/doctors/1"
                );

                expect(
                    result.current.doctors
                ).toHaveLength(0);
            }
        );

        test(
            "updates a doctor",
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
                        useDoctors()
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
                    await result.current.updateDoctor({
                        id: 1,
                        name: "John Updated"
                    });
                });

                expect(
                    hospitalApi.put
                ).toHaveBeenCalled();

                expect(
                    result.current.doctors[0].name
                ).toBe(
                    "John Updated"
                );
            }
        );        
    }
);