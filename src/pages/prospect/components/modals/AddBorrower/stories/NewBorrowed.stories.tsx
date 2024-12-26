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
    buttonLabel: "Close",
    formValues: {
        field1: "usuario@inube.com",
        field2: "3122638128",
        field3: "3122638128",
        field4: "usuario@inube.com",
        field5: "3122638128",
        field6: "3122638128",
        field7: "usuario@inube.com",
        field8: "3122638128",
        field9: "3122638128",
    },
};

export default meta;