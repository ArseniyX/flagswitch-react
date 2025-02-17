export type FlagSwitchGlobalOptions = {
    /**
     * Enables the features folder.
     * @default true
     */
    featuresFolderEnabled?: boolean;
    /**
     * Path-related options.
     * @default /(?<name>[^\/]+)$/
     * @example /(?<name>[^\/]+)$/
     */
    namePattern?: RegExp;
    /**
     * An object where keys are feature names and values are their definitions.
     * @example { CheckoutFlow: { enabled: true, split: { MultiStepCheckout: 30, SingleStepCheckout: 70 } } }
     */
    features?: {
        [featureName: string]: FeatureDefinition;
    };
}

export type ModuleDescriptor = {
    path: string;
    name: string;
    version?: string;
    metadata?: string;
}[];

export type FeatureDefinition = {
    /**
     * Force a specific version of a feature.
     * If not set, the version is selected based on the `split` configuration.
     * @default false
     */
    enabled?: boolean;
    /**
     * Explicitly choose a feature version to load.
     * If not set, the version is selected based on the `split` configuration.
     * @default "latest"
     * @example "1.4"
     */
    version?: string;
    /**
     * Split traffic between different versions of a feature.
     * If omitted, an even split is assumed.
     * @example { "1.0": 30, "1.1": 70 }
     */
    split?: Record<string, number>;
};
