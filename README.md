# Flag Switch React

A library for feature flagging in React applications. It allows you to easily load and manage feature flags based on their version and split percentages.

## Installation

```bash
npm install flagswitch-react
```

## Usage

### Basic Usage
```tsx
// index.ts
import { flagSwitch } from "flagswitch-react";

const loadFeatures = flagSwitch(
    /* global options */
    [featureName]: {
        /* feature definition */
    }
);

const CheckoutFlow = loadFeatures({
    /* feature definition */
    split: {
        "single-step-checkout": 30,
        "multi-step-checkout": 70,
    },
});
```

**Ensure that the feature components located under /src in the same directory as the `flagSwitch` function call and exported as default.**

### Advanced Usage

#### Global Options

You can pass global options to the `flagSwitch` function to customize the behavior of the library.

```tsx
import { flagSwitch } from "flagswitch-react";

const loadFeatures = flagSwitch({
    path: {
        postfix: "feature",
        delimiter: ".",
    },
    namePattern: /(?<name>[^\/]+)$/,
});
```

#### Feature Definition

The `flagSwitch` function takes a single argument, which is an object that defines the features to be loaded.

Each key in the object is the name of the feature, and the value is an object that defines the feature's behavior.

##### `split`

This property is optional and allows you to specify the percentage split between different versions of the feature.

If this property is not provided, the feature will be loaded with an even split across all versions.

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

This property is optional and allows you to specify the version of the feature to be loaded.

If this property is not provided, the library will automatically choose a version based on the `split` property.

Example:

```tsx
loadFeatures({
    version: "single-step-checkout",
});
```

## Examples

Check out the [examples](https://github.com/arseniyx/flagswitch-react/tree/main/examples) folder for more usage examples.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)