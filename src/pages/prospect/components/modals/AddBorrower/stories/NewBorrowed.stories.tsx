import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@inube/design-system";

import { IAddBorrowedProps, AddBorrower } from "..";
import { parameters, props } from "./props";

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
    title: "Title",
    form: {
        tipeOfDocument: "cc",
        names: "jose",
        email: "jose@gmal",
        biologicalSex: "woman",
        relationship: "friend",
        document: "12345",
        lastNames: "perez",
        phone: "123456",
        age: "25",
    },
};

export default meta;