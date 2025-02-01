import type { Meta, StoryObj } from "@storybook/react";

import { props } from "./props";
import { TableExtraordinaryInstallment } from "..";
import { mockExtraordinaryInstallments } from "@mocks/add-prospect/extraordinary-installments/extraordinaryinstallments.mock";

type Story = StoryObj<typeof TableExtraordinaryInstallment>;

const meta: Meta<typeof TableExtraordinaryInstallment> = {
  title: "components/data/TableExtraordinaryInstallment",
  component: TableExtraordinaryInstallment,
  argTypes: props,
};

const data = mockExtraordinaryInstallments;
export const Default: Story = {
  args: {
    data,
    onClickDetails: (id: string) => console.log("onClickDetails", id),
    onClickEdit: (id: string) => console.log("onClickEdit", id),
    onClickEliminate: (id: string) => console.log("onClickEliminate", id),
  },
};
export default meta;
