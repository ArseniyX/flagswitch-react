import { describe, it, expect, vi } from "vitest";
import { getVersionByRandomSplit } from "../src/feature-version";

describe("getVersionByRandomSplit", () => {
    it("returns the correct version based on random values", () => {
        const versionKeys = ["1.0.0", "2.0.0", "3.0.0"];
        const splitPercentages = [30, 50, 20]; // 30% -> 1.0.0, 50% -> 2.0.0, 20% -> 3.0.0

        // Mock Math.random() to return a deterministic value
        vi.spyOn(global.Math, "random").mockReturnValue(0.25); // 25% -> Should return "1.0.0"
        expect(getVersionByRandomSplit(versionKeys, splitPercentages)).toBe(
            "1.0.0"
        );

        vi.spyOn(global.Math, "random").mockReturnValue(0.6); // 60% -> Should return "2.0.0"
        expect(getVersionByRandomSplit(versionKeys, splitPercentages)).toBe(
            "2.0.0"
        );

        vi.spyOn(global.Math, "random").mockReturnValue(0.9); // 90% -> Should return "3.0.0"
        expect(getVersionByRandomSplit(versionKeys, splitPercentages)).toBe(
            "3.0.0"
        );

        vi.restoreAllMocks(); // Restore original Math.random()
    });

    it("falls back to the last version if cumulative sum is less than 100%", () => {
        const versionKeys = ["1.0.0", "2.0.0", "3.0.0"];
        const splitPercentages = [30, 40]; // Sum is 70%, last one should always be returned for 71%+

        vi.spyOn(global.Math, "random").mockReturnValue(0.75); // 75% -> Should return "3.0.0"
        expect(getVersionByRandomSplit(versionKeys, splitPercentages)).toBe(
            "3.0.0"
        );

        vi.restoreAllMocks();
    });

    it("handles 100% allocation correctly", () => {
        const versionKeys = ["1.0.0"];
        const splitPercentages = [100]; // Single version with 100%

        vi.spyOn(global.Math, "random").mockReturnValue(0.99); // Any value should return "1.0.0"
        expect(getVersionByRandomSplit(versionKeys, splitPercentages)).toBe(
            "1.0.0"
        );

        vi.restoreAllMocks();
    });

    it("handles empty arrays gracefully", () => {
        const versionKeys: string[] = [];
        const splitPercentages: number[] = [];

        expect(
            getVersionByRandomSplit(versionKeys, splitPercentages)
        ).toBeUndefined();
    });

    it("handles mismatched array lengths by defaulting to the last version", () => {
        const versionKeys = ["1.0.0", "2.0.0"];
        const splitPercentages = [50]; // Only one percentage

        vi.spyOn(global.Math, "random").mockReturnValue(0.75); // Should return last version "2.0.0"
        expect(getVersionByRandomSplit(versionKeys, splitPercentages)).toBe(
            "2.0.0"
        );

        vi.restoreAllMocks();
    });
});
