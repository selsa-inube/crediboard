import { Meta, StoryObj } from "@storybook/react";
import { Button, Stack, Text } from "@inube/design-system";

import { Fieldset } from ".";

type Story = StoryObj<typeof Fieldset>;

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  title: "components/data/Fieldset",
};

const Example = () => (
  <Stack direction="column" gap="16px">
    <Text appearance="dark">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum culpa
      neque ab! Ab, quibusdam magnam! Quod enim dolor blanditiis quos voluptatum
      dolores, asperiores maxime. Beatae possimus quo voluptatem doloribus
      cumque!
    </Text>
    <Button>Click me</Button>
  </Stack>
);

export const Default: Story = {
  args: {
    title: "Title",
    descriptionTitle: "Text Title",
    children: <Example />,
  },
};

export default meta;
