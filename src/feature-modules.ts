export const getFeatureModules = (
    featurePaths: Record<string, any>,
    nameRegex: RegExp
) => {
    return Object.keys(featurePaths).map((path) => {
        const match = path.match(nameRegex);
        const name = match ? match.groups?.name : null;
        const version = match ? match.groups?.version : null;
        const metadata = match ? match.groups?.metadata : null;
        return {
            component: featurePaths[path],
            name: name?.replace('.feature', ""),
            ...(version && { version }),
            ...(metadata && { metadata }),
        };
    });
};
