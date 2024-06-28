import { MessageWrapper, MessageContent, Timestamp } from './styles';

interface MessageProps {
  type: 'sent' | 'received';
  timestamp: number;
  children: JSX.Element | JSX.Element[] | string;
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const Message: React.FC<MessageProps> = ({ type, timestamp, children }) => {
  return (
    <>
      <MessageWrapper type={type}>
        <MessageContent type={type}>
          {children}
        </MessageContent>
        <Timestamp type={type}>{formatDate(timestamp)}</Timestamp>
      </MessageWrapper>
    </>
  );
};