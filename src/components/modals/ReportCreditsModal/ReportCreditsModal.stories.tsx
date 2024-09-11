import { Meta } from "@storybook/react";
import { ReportCreditsModal } from ".";

const meta: Meta<typeof ReportCreditsModal> = {
  title: "components/modals/ReportCreditsModal",
  component: ReportCreditsModal,
};

const Default = () => {
  return <ReportCreditsModal />;
};

export { Default };
export default meta;
