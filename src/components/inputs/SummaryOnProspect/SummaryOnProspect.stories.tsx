import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SummaryProspect, SummaryProspectProps } from "./index";
import { ListModal } from "@components/modals/ListModal";

export default {
  title: "Components/inputs/SummaryProspect",
  component: SummaryProspect,
} as Meta<typeof SummaryProspect>;

const Template: StoryObj<SummaryProspectProps> = {
  render: (args) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleIconClick = () => {
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setModalOpen(false);
    };

    return (
      <>
        <SummaryProspect {...args} onIconClick={handleIconClick} />
        {isModalOpen && (
          <ListModal
            title="Resumen Prospectivo"
            handleClose={handleCloseModal}
            buttonLabel="Cerrar"
            content={<div>Contenido del modal</div>} 
          />
        )}
      </>
    );
  },
};

export const Default: StoryObj<SummaryProspectProps> = {
  ...Template,
  args: {
    items: [
      { title: "Obligaciones recogidas", amount: "$5.000.000" },
    ],
  },
};

export const WithoutIcon: StoryObj<SummaryProspectProps> = {
  ...Template,
  args: {
    items: [
      { title: "Monto prestamo", amount: "$16.000.000" },
      { title: "Obligaciones recogidas", amount: "$5.000.000" },
      { title: "Gastos descontables", amount: "$1.000.000" },
      { title: "Neto a girar", amount: "$10.000.000" },
      { title: "Cuotas ordinarias", amount: "$1.200.000" },
    ],
    showIcon: false, 
  },
};
