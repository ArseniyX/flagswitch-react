import { flagSwitch } from "../../../../src/flag-switch";
// import { flagSwitch } from "flagswitch-react";

export const loadFeature = flagSwitch({
    features: JSON.parse(import.meta.env.VITE_FEATURES),
});
