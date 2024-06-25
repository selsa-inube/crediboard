import React, { useState } from 'react';
import { MdOutlineSend } from "react-icons/md";
import { Icon } from "@inubekit/icon"
import { Stack } from "@inubekit/Stack";
import { Textfield } from "@inubekit/textfield";
import { LuPaperclip } from "react-icons/lu";

import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/Chat";

import { ManagementContainer, ChatContent } from './styles';

interface MessageType {
    type: 'sent' | 'received';
    timestamp: number;
    text: string;
}

export const Management: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([
        { type: 'received', timestamp: Date.now() - 3600000, text: 'Buenas tardes señores' },
        { type: 'sent', timestamp: Date.now() - 2700000, text: 'Buenas tardes, gracias por comunicarse con nosotros en un gusto atenderlo, cómo le puedo colaborar?' },
        { type: 'received', timestamp: Date.now() - 1800000, text: 'Quiero conocer el estado de mi solicitud' }
    ]);

    const [newMessage, setNewMessage] = useState<string>('');

    const handleSendClick = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { type: 'sent', timestamp: Date.now(), text: newMessage }]);
            setNewMessage('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    };

    return (
        <Fieldset title="Gestión" heigthFieldset="340px" aspectRatio="1">
            <ManagementContainer>
                <ChatContent>
                    {messages.map((msg, index) => (
                        <Message key={index} type={msg.type} timestamp={msg.timestamp}>
                            {msg.text}
                        </Message>
                    ))}
                </ChatContent>
                <Stack direction="row" gap="8px" alignItems="center">
                    <Icon
                        appearance="primary"
                        cursorHover
                        size="36px"
                        icon={<LuPaperclip />}
                    />
                    <Textfield
                        id="text"
                        placeholder="Ej.: Escriba su mensaje"
                        fullwidth
                        value={newMessage}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSendClick}>
                        <Icon
                            appearance="primary"
                            cursorHover
                            size="36px"
                            icon={<MdOutlineSend />}
                        />
                    </button>
                </Stack>
            </ManagementContainer>
        </Fieldset>
    );
};
