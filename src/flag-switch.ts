import { loadFeatures } from "./feature-flags";
import { FlagSwitchGlobalOptions } from "./types";

/**
 * Initializes and loads feature flags based on the provided options.
 *
 * @param {FlagSwitchGlobalOptions} [flagSwitchOptions] - Optional configuration for the feature flags.
 * @param {Object} [flagSwitchOptions.path] - Specifies path-related options.
 * @param {string} [flagSwitchOptions.path.postfix="feature"] - Sets the default postfix for the feature files.
 * @param {string} [flagSwitchOptions.path.delimiter="."] - Sets the delimiter used in the path.
 * @param {RegExp} [flagSwitchOptions.namePattern] - Regular expression to match the feature filename pattern. Defaults to matching filenames like 'featureName_version_metadata.ext'.
 * @param {Object} [flagSwitchOptions.flags] - An object where keys are feature names and values are their definitions.
 */
export const flagSwitch = (flagSwitchOptions?: FlagSwitchGlobalOptions) => {
    return loadFeatures({
        path: {
            postfix: flagSwitchOptions?.path?.postfix || "feature",
            delimiter: flagSwitchOptions?.path?.delimiter || ".",
        },
        namePattern: flagSwitchOptions?.namePattern || /(?<name>[^\/]+)$/,
    });
};
