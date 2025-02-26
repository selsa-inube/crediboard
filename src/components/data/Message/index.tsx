import { MessageWrapper, MessageContent, Timestamp } from "./styles";
import { formatPrimaryDate } from "@utils/formatData/date";

export interface MessageProps {
  type: "sent" | "received";
  timestamp: Date | string | number;
  message: string;
}

const formatDate = (timestamp: Date | string | number) => {
  return formatPrimaryDate(new Date(timestamp), true);
};

export const Message: React.FC<MessageProps> = ({
  type,
  timestamp,
  message,
}) => {
  return (
    <MessageWrapper type={type}>
      <MessageContent type={type}>{message}</MessageContent>
      <Timestamp type={type}>{formatDate(timestamp)}</Timestamp>
    </MessageWrapper>
  );
};
