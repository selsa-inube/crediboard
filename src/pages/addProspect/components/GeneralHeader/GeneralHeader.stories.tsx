import { Meta, StoryObj } from "@storybook/react";
import { GeneralHeader } from ".";
import { MdCancel } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

type Story = StoryObj<typeof GeneralHeader>;

const generalHeader: Meta<typeof GeneralHeader> = {
    component: GeneralHeader,
    title: "pages/addProspect/components/GeneralHeader",
    argTypes: {
        name: {
            control: { type: "text" },
            description: "Name of the client or user",
        },
        state: {
            control: { type: "text" },
            description: "Current status",
        },
        imgPerfil: {
            control: { type: "text" },
            description: "Profile Picture URL",
        },
        buttonText: {
            control: { type: "text" },
            description: "button text",
        },
    },
};

export const Default: Story = {
    args: {
        imgPerfil: "https://s3-alpha-sig.figma.com/img/27d0/10fa/3d2630d7b4cf8d8135968f727bd6d965?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h5lEzRE3Uk8fW5GT2LOd5m8eC6TYIJEH84ZLfY7WyFqMx-zv8TC1yzz-OV9FCH9veCgWZ5eBfKi4t0YrdpoWZriy4E1Ic2odZiUbH9uQrHkpxLjFwcMI2VJbWzTXKon-HkgvkcCnKFzMFv3BwmCqd34wNDkLlyDrFSjBbXdGj9NZWS0P3pf8PDWZe67ND1kropkpGAWmRp-qf9Sp4QTJW-7Wcyg1KPRy8G-joR0lsQD86zW6G6iJ7PuNHC8Pq3t7Jnod4tEipN~OkBI8cowG7V5pmY41GSjBolrBWp2ls4Bf-Vr1BKdzSqVvivSTQMYCi8YbRy7ejJo9-ZNVCbaxRg__",
        name: "José Manuel Hernández Díaz",
        state: "Inactivo",
        iconstate: <MdCancel />,
        iconbutton: <MdOutlineManageAccounts />,
        iconconfig: <AiOutlinePlus />,
        buttonText: "Agregar vinculación",
    },
};

export default generalHeader;