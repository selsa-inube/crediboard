import { MessageWrapper, MessageContent, Timestamp } from './styles';

export interface MessageProps {
  type: 'sent' | 'received';
  timestamp: number;
  message: string;
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const Message: React.FC<MessageProps> = ({ type, timestamp, message }) => {
  return (
    <>
      <MessageWrapper type={type}>
        <MessageContent type={type}>
          {message}
        </MessageContent>
        <Timestamp type={type}>{formatDate(timestamp)}</Timestamp>
      </MessageWrapper>
    </>
  );
};
