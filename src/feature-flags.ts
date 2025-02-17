import { getFeatureVersion } from "./feature-version";
import { getFeatureModules } from "./feature-modules";
import { getFeaturePaths } from "./feature-paths";
import { FlagSwitchGlobalOptions } from "./types";
import { Fragment } from "react";

export const loadFeatures =
    (options: FlagSwitchGlobalOptions) => (featureName?: string) => {
        const features = Object.keys(options.features[featureName].split);
        const featureOptions = options.features[featureName];

        if (!featureOptions.enabled) {
            return Fragment;
        }

        const featurePaths = getFeaturePaths(features, options.featuresFolderEnabled);

        const featureModules = getFeatureModules(
            featurePaths,
            options.namePattern
        );

        const featureVersion = getFeatureVersion(
            featureModules,
            featureOptions
        );

        return featureVersion.component as React.LazyExoticComponent<
            React.ComponentType<any>
        >;
    };
