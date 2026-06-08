import {
    renderHook,
    waitFor,
    act
} from "@testing-library/react";

import { describe, expect, vi, test, beforeEach } from "vitest";

import usePatients from "../hooks/usePatients";

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
    "usePatients Hook",
    () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        test(
            "fetches patients successfully",
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
                        usePatients()
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
                    result.current.patients
                ).toHaveLength(1);

                expect(
                    result.current.patients[0].name
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
                        usePatients()
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
                    result.current.patients
                ).toEqual([]);

                expect(
                    result.current.error
                ).toBe("Server Error");
            }
        );  

        test(
            "adds a patient",
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
                        usePatients()
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
                    await result.current.addPatient({
                        name: "John Doe"
                    });
                });

                expect(
                    hospitalApi.post
                ).toHaveBeenCalled();

                expect(
                    result.current.patients
                ).toHaveLength(1);
            }
        );

        test(
            "deletes a patient",
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
                        usePatients()
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
                    await result.current.deletePatient(
                        1
                    );
                });

                expect(
                    hospitalApi.delete
                ).toHaveBeenCalledWith(
                    "/patients/1"
                );

                expect(
                    result.current.patients
                ).toHaveLength(0);
            }
        );

        test(
            "updates a patient",
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
                        usePatients()
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
                    await result.current.updatePatient({
                        id: 1,
                        name: "John Updated"
                    });
                });

                expect(
                    hospitalApi.put
                ).toHaveBeenCalled();

                expect(
                    result.current.patients[0].name
                ).toBe(
                    "John Updated"
                );
            }
        );        
    }
);