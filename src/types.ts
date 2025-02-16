export type FlagSwitchGlobalOptions = {
    path?: {
        postfix?: string;
        delimiter?: string;
    };
    namePattern?: RegExp;
    flags?: {
        [featureName: string]: FeatureDefinition;
    };
};

export type ModuleDescriptor = {
    path: string;
    name: string;
    version?: string;
    metadata?: string;
}[];

export type FeatureDefinition = {
    split: Record<string, number>; // e.g., { "1.4": 50, "1.5_beta": 50 } for 50/50 A/B testing
};
