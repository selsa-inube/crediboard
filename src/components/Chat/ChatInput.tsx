// src/components/Chat/ChatInput.tsx
import React, { useState } from 'react';
import { Textfield } from "@inubekit/textfield";
import { MdOutlineSend } from "react-icons/md";
import { Icon } from "@inube/design-system";
import { LuPaperclip } from "react-icons/lu";
import { Stack , inube} from "@inube/design-system";

const ChatInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSendClick = () => {
    // Aquí iría la lógica para enviar el mensaje
    setInputValue('');
  };

  return (
    <Stack direction="row" gap={inube.spacing.s200} alignItems="center">
      <Icon appearance="primary" cursorHover size="36px" icon={<LuPaperclip />} />
      <Textfield 
        id="text" 
        placeholder="Ej.: Escriba su mensaje" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <Icon 
        appearance="primary" 
        cursorHover 
        size="36px" 
        icon={<MdOutlineSend />} 
        onClick={handleSendClick} 
      />
    </Stack>
  );
};

export default ChatInput;
