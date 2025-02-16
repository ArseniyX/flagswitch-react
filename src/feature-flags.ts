import { getFeatureVersion } from "./feature-version";
import { getFeatureModules } from "./feature-modules";
import { getFeaturePaths } from "./feature-paths";
import { FeatureDefinition, FlagSwitchGlobalOptions } from "./types";

export const loadFeatures =
    (options: FlagSwitchGlobalOptions) =>
    (featureDefinition?: FeatureDefinition) => {
        const featurePaths = getFeaturePaths(Object.keys(featureDefinition.split));

        const featureModules = getFeatureModules(
            featurePaths,
            options.namePattern
        );

        const featureVersion = getFeatureVersion(
            featureModules,
            featureDefinition
        );

        return featureVersion.component as React.LazyExoticComponent<
            React.ComponentType<any>
        >;
    };
