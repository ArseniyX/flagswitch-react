import { describe, it, expect } from "vitest";
import { getFeatureModules } from "../src/feature-modules";

describe("getFeatureModules", () => {
    const dummyComponent = {}; // Use a dummy object or a mock if needed

    it("should correctly extract names from feature paths", () => {
        const featurePaths = {
            "/src/features/checkout-flow/multi-step-checkout.feature":
                dummyComponent,
            "src/features/feature2": dummyComponent,
            "src/features/subdir/feature3": dummyComponent,
        };
        const nameRegex = /(?<name>[^\/]+)$/;
        const result = getFeatureModules(featurePaths, nameRegex);
        expect(result).toEqual([
            {
                path: "/src/features/checkout-flow/multi-step-checkout.feature",
                component: dummyComponent,
                name: "multi-step-checkout",
            },
            {
                path: "src/features/feature2",
                component: dummyComponent,
                name: "feature2",
            },
            {
                path: "src/features/subdir/feature3",
                component: dummyComponent,
                name: "feature3",
            },
        ]);
    });

    it("should handle paths without file extensions", () => {
        const featurePaths = {
            "src/features/feature1": dummyComponent,
            "src/features/feature2": dummyComponent,
        };
        const nameRegex = /(?<name>[^\/]+)$/;
        const result = getFeatureModules(featurePaths, nameRegex);
        expect(result).toEqual([
            {
                path: "src/features/feature1",
                component: dummyComponent,
                name: "feature1",
            },
            {
                path: "src/features/feature2",
                component: dummyComponent,
                name: "feature2",
            },
        ]);
    });

    it("should handle paths with version", () => {
        const featurePaths = {
            "src/features/feature1_1.0.0.js": dummyComponent,
            "src/features/feature2_1.0.0.ts": dummyComponent,
            "src/features/subdir/feature3_1.0.0.jsx": dummyComponent,
        };
        const nameRegex =
            /(?<name>[^\/]+)_(?<version>\d+\.\d+\.\d+)(?=\.[^.]+$)/;
        const result = getFeatureModules(featurePaths, nameRegex);
        expect(result).toEqual([
            {
                path: "src/features/feature1_1.0.0.js",
                component: dummyComponent,
                name: "feature1",
                version: "1.0.0",
            },
            {
                path: "src/features/feature2_1.0.0.ts",
                component: dummyComponent,
                name: "feature2",
                version: "1.0.0",
            },
            {
                path: "src/features/subdir/feature3_1.0.0.jsx",
                component: dummyComponent,
                name: "feature3",
                version: "1.0.0",
            },
        ]);
    });

    it("should handle paths with version and metadata", () => {
        const featurePaths = {
            "src/features/feature1_1.0.0_beta.js": dummyComponent,
            "src/features/feature2_1.0.0_beta.ts": dummyComponent,
            "src/features/subdir/feature3_1.0.0_beta.jsx": dummyComponent,
        };
        const nameRegex =
            /(?<name>[^\/]+)_(?<version>\d+\.\d+\.\d+)_(?<metadata>[a-zA-Z0-9_-]+)(?=\.[^.]+$)/;
        const result = getFeatureModules(featurePaths, nameRegex);
        expect(result).toEqual([
            {
                path: "src/features/feature1_1.0.0_beta.js",
                component: dummyComponent,
                name: "feature1",
                version: "1.0.0",
                metadata: "beta",
            },
            {
                path: "src/features/feature2_1.0.0_beta.ts",
                component: dummyComponent,
                name: "feature2",
                version: "1.0.0",
                metadata: "beta",
            },
            {
                path: "src/features/subdir/feature3_1.0.0_beta.jsx",
                component: dummyComponent,
                name: "feature3",
                version: "1.0.0",
                metadata: "beta",
            },
        ]);
    });

    it("should handle empty object", () => {
        const featurePaths: Record<string, any> = {};
        const nameRegex = /(?<name>[^\/]+)$/; // To be consistent, but not used here
        const result = getFeatureModules(featurePaths, nameRegex);
        expect(result).toEqual([]);
    });
});
