import { Meta } from "@storybook/react";
import { LoanCondition } from ".";

const meta: Meta<typeof LoanCondition> = {
    component: LoanCondition,
    title: "Components/inputs/LoanCondition",
}

const Default = () => {
    return (
        <LoanCondition />
    )
}

export {Default}
export default meta


