import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@inube/design-system";

import { IAddBorrowedProps, AddBorrower } from "..";
import { parameters, props, TipeOfDocument } from "./props";

const meta: Meta<typeof AddBorrower> = {
    title: "components/modals/AddBorrower",
    component: AddBorrower,
    parameters,
    argTypes: props,
};

type Story = StoryObj<typeof AddBorrower>;
export const Default: Story = (args: IAddBorrowedProps) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Button onClick={() => setShowModal(true)}>Modal List</Button>
            {showModal && (
                <AddBorrower {...args} handleClose={() => setShowModal(false)} />
            )}
        </>
    );
};
Default.args = {
    title: "Agregar deudor",
    form: {
        tipeOfDocument: "",
        names: "",
        email: "",
        biologicalSex: "",
        relationship: "",
        document: "",
        lastNames: "",
        phone: "",
        age: "",
    },
    options: TipeOfDocument,
};

export default meta;