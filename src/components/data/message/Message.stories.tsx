import { Meta } from "@storybook/react";
import { Message } from "@components/data/message";

export default {
  title: "components/data/message",
  component: Message,
} as Meta;

export const SentMessage = (args: { message: string }) => (
  <Message type="sent" timestamp={Date.now()}>
    {args.message}
  </Message>
);

SentMessage.args = {
  message: "Esto es un mensaje enviado.",
};

export const ReceivedMessage = (args: { message: string }) => (
  <Message type="received" timestamp={Date.now()}>
    {args.message}
  </Message>
);

ReceivedMessage.args = {
  message: "Esto es un mensaje recibido.",
};
