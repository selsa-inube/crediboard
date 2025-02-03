import { Meta, StoryObj } from '@storybook/react';
import { useState } from "react";
import { Button } from "@inubekit/button";

import { ConsolidatedCredits } from '..';
import { ConsolidatedCreditsProps } from '..';
import { props } from './props';


const meta: Meta<typeof ConsolidatedCredits> = {
    title: 'components/modals/ConsolidatedCreditModal',
    component: ConsolidatedCredits,
    argTypes: props,
};

export default meta;

type Story = StoryObj<ConsolidatedCreditsProps>;

export const Default: Story = (args: ConsolidatedCreditsProps) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Button onClick={() => setShowModal(true)}>Abrir Modal</Button>
            {showModal && (
                <>
                    <ConsolidatedCredits {...args} handleClose={() => setShowModal(false)} />
                </>
            )}
        </>
    );
};
Default.args = {
    title: 'Obligaciones recogidas',
    investmentCode: 123456,
    expiredValue: 120000,
    collectedValue: 360000,
    nextExpiration: 240000,

};
