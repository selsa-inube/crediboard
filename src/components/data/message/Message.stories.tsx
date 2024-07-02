import { Meta, StoryFn } from "@storybook/react";
import { Message, MessageProps } from "@components/data/message";

export default {
  title: "components/data/Message",
  component: Message,
} as Meta<typeof Message>;

const Template: StoryFn<MessageProps> = (args) => <Message {...args} />;

export const SentMessage = Template.bind({});
SentMessage.args = {
  type: 'sent',
  timestamp: Date.now(),
  message: "Esto es un mensaje enviado.",
};

export const ReceivedMessage = Template.bind({});
ReceivedMessage.args = {
  type: 'received',
  timestamp: Date.now(),
  message: "Esto es un mensaje recibido.",
};
