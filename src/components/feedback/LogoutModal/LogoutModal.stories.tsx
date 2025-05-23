import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Stack, Button } from "@inubekit/inubekit";

import { ILogoutModalProps, LogoutModal } from ".";

const story = {
  title: "components/feedback/logout",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Default = (args: ILogoutModalProps) => {
  const [showBlanket, setShowBlanket] = useState(false);

  const handleShowBlanket = () => {
    setShowBlanket(!showBlanket);
  };

  return (
    <Stack padding="24px">
      <Button onClick={handleShowBlanket}>Cerrar sesión</Button>
      {showBlanket && (
        <LogoutModal {...args} handleShowBlanket={handleShowBlanket} />
      )}
    </Stack>
  );
};

Default.args = {
  handleShowBlanket: action("handleShowBlanket"),
  logoutPath: "/logout",
};

export { Default };
export default story;
