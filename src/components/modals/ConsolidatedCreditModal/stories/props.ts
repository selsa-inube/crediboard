import { ArgTypes } from "@storybook/react";
import { ConsolidatedCreditsProps } from '..';

export const props: Partial<ArgTypes<ConsolidatedCreditsProps>> = {
    handleClose: { action: "closed" },
}