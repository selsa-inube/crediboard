import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@inube/design-system";

import { MobileMenu, MobileMenuProps } from "../MobileMenu";


const meta: Meta<typeof MobileMenu> = {
  title: "Components/modals/MobileMenu",
  component: MobileMenu,
};

type Story = StoryObj<typeof MobileMenu>;

export const Default: Story = (args: MobileMenuProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Button onClick={() => setShowMenu(true)}>Open Menu</Button>
      {showMenu && (
        <MobileMenu 
          {...args} 
          onClose={() => setShowMenu(false)} 
        />
      )}
    </>
  );
};

Default.args = {
  onClose: () => alert("Cerrar menú"),
  onReject: () => alert("Rechazar"),
  onCancel: () => alert("Anular"),
  onAttach: () => alert("Adjuntar"),
  onViewAttachments: () => alert("Ver Adjuntos"),
};

export default meta;
