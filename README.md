# FlagSwitch React

FlagSwitch React is a feature flagging utility for React applications that dynamically loads and manages feature components based on versioning and traffic splits. Designed to simplify progressive rollouts and A/B testing, it allows you to experiment and iterate on features with minimal friction.

---

## Installation

Install FlagSwitch React via npm:

```bash
npm install flagswitch-react
```

---

## Getting Started

### Basic Setup

Begin by importing and initializing the feature loader with any global settings you require. Then, define your feature flags along with their respective traffic splits.

**Create your feature configuration:**

```ts
// flag-switch.ts
import { flagSwitch } from "flagswitch-react";

export const loadFeatures = flagSwitch({
  features: {
    CheckoutFlow: {
      enabled: true,
      split: { MultiStepCheckout: 30, SingleStepCheckout: 70 },
    },
  },
});
```

**Load and export your feature flag:**

```ts
// index.ts
import { loadFeatures } from "./flag-switch";

// Load the CheckoutFlow feature configuration.
export const CheckoutFlow = loadFeatures('CheckoutFlow');
```

> **Important:** Place your feature components in the `/src/features` directory next to your `loadFeatures` call and export each component as the default export.

---

## Advanced Configuration

### Global Options

Customize the loading behavior and feature definitions with global options. For example, you can define a custom naming pattern using a regular expression:

```ts
import { flagSwitch } from "flagswitch-react";

export const loadFeatures = flagSwitch({
  namePattern: /(?<name>[^\/]+)$/, // Regex to extract the feature name from a file path.
  features: {
    // Define global configurations for specific features.
    // [featureName]: { ... },
  },
});
```

### Using Environment Variables

You can also load feature definitions from environment variables. This approach is particularly useful for CI/CD pipelines or other scenarios where configuration is managed outside of your source code:

```ts
import { flagSwitch } from "flagswitch-react";

export const loadFeatures = flagSwitch({
  features: import.meta.env.VITE_FEATURES,
});
```

---

## Roadmap

The following features are planned for future releases:

- **Webpack Support:** Seamless integration with bundling processes.
- **Multi-Organization & Environment Support:** Configure flags across various environments and organizational setups.
- **Enhanced Versioning:** Support for multiple feature versions with metadata using the `name_version_metadata` pattern.

---

## Additional Examples

For more advanced usage and configuration examples, please refer to the [examples directory](https://github.com/arseniyx/flagswitch-react/tree/main/examples) on GitHub.

---

## Contributing

Contributions are highly encouraged! If you’d like to improve FlagSwitch React, please open an issue or submit a pull request on [GitHub](https://github.com/arseniyx/flagswitch-react).

---

## License

FlagSwitch React is [MIT Licensed](https://choosealicense.com/licenses/mit/).