# FlagSwitch React

FlagSwitch React is a feature flagging utility for React apps, engineered to dynamically load and manage feature components based on versioning and traffic splits. It’s built to help you roll out features progressively and perform A/B tests with minimal friction.

---

## Installation

Install via npm:

```bash
npm install flagswitch-react
```

---

## Getting Started

### Basic Setup

Import and initialize the feature loader with global settings (if needed), then define your feature flags with a traffic split.

```tsx
// index.ts
import { flagSwitch } from "flagswitch-react";

// Initialize the feature loader with optional global settings.
const loadFeatures = flagSwitch({
  // global options can be set here
});

// Define feature flag configurations with traffic splits.
const CheckoutFlow = loadFeatures({
  split: {
    "single-step-checkout": 30,  // 30% of users
    "multi-step-checkout": 70,   // 70% of users
  },
});
```

> **Important:** Ensure that feature components exist in the `/src` directory next to your `flagSwitch` call and are exported as the default export.

---

## Advanced Configuration

### Global Options

Customize how FlagSwitch React resolves and loads your feature components by passing global options to the `flagSwitch` function.

```tsx
import { flagSwitch } from "flagswitch-react";

const loadFeatures = flagSwitch({
  path: {
    postfix: "feature", // Appends 'feature' to the module path.
    delimiter: ".",     // Uses '.' as the separator.
  },
  namePattern: /(?<name>[^\/]+)$/, // Regex to extract the feature name from a file path.
  flags: {
    // Define any global flags that apply across multiple features.
    [featureName]: {
      // feature-specific global configuration
    },
  },
});
```

### Feature-Level Definitions

When you load features, you can specify how each feature should behave:

#### Traffic Splitting (`split`)

Distribute user traffic between different versions of a feature. If omitted, an even split is assumed.

```tsx
loadFeatures({
  split: {
    "single-step-checkout": 30,
    "multi-step-checkout": 70,
  },
});
```

#### Forcing a Specific Version (`version`)

Explicitly choose a feature version to load. If not set, the version is selected based on the `split` configuration.

```tsx
loadFeatures({
  version: "single-step-checkout", // Force the single-step version.
});
```

---

## Additional Examples

Explore more usage patterns and advanced configurations in the [examples](https://github.com/arseniyx/flagswitch-react/tree/main/examples) directory.

---

## Roadmap

- **Webpack Support:** Integration for seamless bundling.
- **Dynamic Feature Flag Fetching:** Load flags dynamically from external sources.
- **Multi-Organization & Environment Support:** Configure flags across different environments.
- **Enhanced Versioning:** Support for multiple feature versions with metadata using the `name_version_metadata` pattern.

---

## Contributing

Contributions are highly encouraged! Please open an issue or submit a pull request on GitHub.

---

## License

[MIT](https://choosealicense.com/licenses/mit/)