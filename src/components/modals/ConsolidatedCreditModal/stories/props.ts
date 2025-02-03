import { ArgTypes } from "@storybook/react";
import { ConsolidatedCreditsProps } from '..';

export const props: Partial<ArgTypes<ConsolidatedCreditsProps>> = {
    title: {
        control: { type: "text" },
    },
    handleClose: { action: "closed" },
}