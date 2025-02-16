import { describe, it, expect, vi } from "vitest";
import { getFeatureVersion } from "../src/feature-version";

describe("getFeatureVersion", () => {
    it("should throw an error if no versions are defined", () => {
        const availableFeatures: {
            path: string;
            component: any;
            name: string;
            version?: string;
            metadata?: string;
        }[] = [];
        const featureConfig = {
            split: {},
        };
        expect(() => getFeatureVersion(availableFeatures, featureConfig)).toThrow(
            "No versions defined for the feature"
        );
    });

    it("should throw an error if the version split percentages do not sum to 100", () => {
        const availableFeatures = [
            { path: "feature1", component: vi.fn(), name: "1.0.0" },
            { path: "feature2", component: vi.fn(), name: "2.0.0" },
        ];
        const featureConfig = {
            split: {
                "1.0.0": 50,
                "2.0.0": 40,
            },
        };
        expect(() => getFeatureVersion(availableFeatures, featureConfig)).toThrow(
            "The version split percentages must sum to 100"
        );
    });

    it("should return the version based on the split percentages", () => {
        const availableFeatures = [
            { path: "feature1", component: vi.fn(), name: "1.0.0" },
            { path: "feature2", component: vi.fn(), name: "2.0.0" },
        ];
        const featureConfig = {
            split: {
                "1.0.0": 0,
                "2.0.0": 100,
            },
        };
        const result = getFeatureVersion(availableFeatures, featureConfig);
        expect(result).toBe(availableFeatures[1]);
    });
});
