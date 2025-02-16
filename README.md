# Flag Switch React

A feature flagging library for React applications enabling seamless loading and management of feature flags based on versioning and split percentages.

## Installation

```bash
npm install flagswitch-react
```

## Usage

### Basic Example
```tsx
// index.ts
import { flagSwitch } from "flagswitch-react";

const loadFeatures = flagSwitch({
    /* global options */
);

const CheckoutFlow = loadFeatures({
    split: {
        "single-step-checkout": 30,
        "multi-step-checkout": 70,
    },
});
```

**Make sure feature components reside under /src in the same directory as the `flagSwitch` invocation and are exported as default.**

### Advanced Example

#### Global Options

Customize the library's behavior by passing global options to the `flagSwitch` function.

```tsx
import { flagSwitch } from "flagswitch-react";

const loadFeatures = flagSwitch({
    path: {
        postfix: "feature",
        delimiter: ".",
    },
    namePattern: /(?<name>[^\/]+)$/,
    flags: {
        /* global flags */
        [featureName]: {
            /* feature definition */
        }
    }
});
```

#### Feature Definition

Pass an object to `flagSwitch` defining the features to load, where each key represents a feature name and its value dictates the feature's behavior.

##### `split`

Define the percentage split between different feature versions. Without this, the library defaults to an even distribution across versions.

Example:

```tsx
loadFeatures({
    split: {
        "single-step-checkout": 30,
        "multi-step-checkout": 70,
    },
});
```

##### `version`

Specify a feature version to load. If omitted, the version is chosen automatically based on the `split` property.

Example:

```tsx
loadFeatures({
    version: "single-step-checkout",
});
```

## Examples

Explore additional examples in the [examples](https://github.com/arseniyx/flagswitch-react/tree/main/examples) folder.

## Coming Soon

- Support for Webpack
- Dynamic feature flag fetching
- Support organizations and multiple environments
- Multiple feature versions supporting name_version_metadata pattern

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)