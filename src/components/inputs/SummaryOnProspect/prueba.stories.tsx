import { Meta } from "@storybook/react";
import ObligationCard from "./index"; 


interface ObligationCardProps {
  title: string;
  amount: string;
}

const meta: Meta<typeof ObligationCard> = {
  title: 'components/ObligationCard',
  component: ObligationCard,
  argTypes: {
    title: { control: 'text' },
    amount: { control: 'text' },
  },
};

const Default = (args: ObligationCardProps) => <ObligationCard {...args} />;

Default.args = {
  title: 'Obligaciones recogidas',
  amount: '$5.000.000',
};

export { Default };
export default meta;
