import { Meta, StoryObj } from "@storybook/react";
import { inube } from "@inube/design-system";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { MdAndroid } from "react-icons/md";
import { Button } from "@inubekit/button";

import { CardInfoContainer } from ".";

type Story = StoryObj<typeof CardInfoContainer>;

const meta: Meta<typeof CardInfoContainer> = {
  component: CardInfoContainer,
  title: "components/data/CardInfoContainer",
  argTypes: {
    title: {
      control: {
        type: "text",
      },
      description: "title of the component",
    },
    children: {
      description: "children of the component",
    },
  },
};

const Example = () => (
  <Stack direction="column" gap={inube.spacing.s400}>
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
    title: "Estabilidad Laboral",
    icon: <MdAndroid />,
    children: <Example />,
  },
};

export default meta;
