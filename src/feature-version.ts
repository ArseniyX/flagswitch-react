import { FeatureDefinition } from "./types";

export const getFeatureVersion = (
    availableFeatures: {
        component: any;
        name: string;
        version?: string;
        metadata?: string;
    }[],
    featureConfig: FeatureDefinition
) => {
    const { split: versionSplit } = featureConfig;

    const versionKeys = Object.keys(versionSplit);

    if (versionKeys.length === 0) {
        throw new Error("No versions defined for the feature");
    }

    // If no version split is defined, default to even split across all versions
    const splitPercentages = versionSplit
        ? versionKeys.map((version) => versionSplit[version] || 0)
        : new Array(versionKeys.length).fill(100 / versionKeys.length);

    const totalSplitPercentage = splitPercentages.reduce(
        (total, percentage) => total + percentage,
        0
    );

    if (totalSplitPercentage !== 100) {
        throw new Error("The version split percentages must sum to 100");
    }

    // Choose a version based on the split percentages
    const selectedVersion = getVersionByRandomSplit(
        versionKeys,
        splitPercentages
    );


    return availableFeatures.find((feature) => feature.name === selectedVersion);
};

export const getVersionByRandomSplit = (
    versionKeys: string[],
    splitPercentages: number[]
): string => {
    const randomValue = Math.random() * 100;
    let cumulativePercentage = 0;

    for (let i = 0; i < versionKeys.length; i++) {
        cumulativePercentage += splitPercentages[i];
        if (randomValue <= cumulativePercentage) {
            return versionKeys[i];
        }
    }

    return versionKeys[versionKeys.length - 1]; // Fallback to the last version
};
