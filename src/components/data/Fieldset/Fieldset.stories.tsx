import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { Fieldset } from ".";

type Story = StoryObj<typeof Fieldset>;

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  title: "components/data/Fieldset",
  argTypes: {
    title: {
      control: {
        type: "text",
      },
      description: "title of the component",
    },
    descriptionTitle: {
      control: {
        type: "text",
      },
      description: "description title of the component",
    },
    children: {
      description: "children of the component",
    },
  },
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
    title: "Por hacer",
    descriptionTitle: "Dorian Medina López",
    children: <Example />,
  },
};

export default meta;
