import { lazy } from "react";

type FeaturePathOptions = {
    postfix?: string;
    delimiter?: string;
};

export const getFeaturePaths = () => {
    // Check for Vite's import.meta.glob
    // TODO: find better way to check for Vite
    if (import.meta.url) {
        // Glob all feature files first
        const allPaths = import.meta.glob<any>(
            "/src/features/**/*.feature.{tsx,jsx}"
        );

        const components = Object.keys(allPaths).reduce((acc, path) => {
            const componentName =
                path.split("/").pop()?.replace(".tsx", "") || "";
            acc[componentName] = lazy(() => allPaths[path]());
            return acc;
        }, {} as Record<string, React.LazyExoticComponent<React.ComponentType<any>>>);

        return components;
    }

    // Check for Webpack's require.context
    // TODO: find better way to check for Webpack and test it
    // if (
    //     typeof require !== "undefined" &&
    //     typeof require.context === "function"
    // ) {
    //     const loadAllFeatures = (
    //         requireContext: __WebpackModuleApi.RequireContext
    //     ) => requireContext.keys().map(requireContext);

    //     return loadAllFeatures(
    //         require.context(
    //             "./features",
    //             true,
    //             new RegExp(`*${postfixWithDelimiter}\\.tsx$`) // Ensure the postfix is included
    //         )
    //     );
    // }

    throw new Error(
        "Could not find a way to load feature files. Please use Vite or Webpack."
    );
};
