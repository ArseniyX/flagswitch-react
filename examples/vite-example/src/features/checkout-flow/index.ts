import { flagSwitch } from "../../../../../src/flag-switch";

const loadFeatures = flagSwitch();

export const CheckoutFlow = loadFeatures({
    split: {
        "multi-step-checkout": 10,
        "single-step-checkout": 90,
    },
});
