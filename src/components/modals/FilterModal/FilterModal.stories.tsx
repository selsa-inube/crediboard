import { BrowserRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";
import { FilterModal, IFilterModal } from ".";

const story = {
  component: FilterModal,
  title: "modals/FilterModal",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<IFilterModal> = (args) => <FilterModal {...args} />;

const Default = Template.bind({});
Default.args = {
  actionText: "Filtrar",
  appearance: "primary",
  portalId: "portal",
  title: "Filtrar",
  options: [
    { label: "Aplicación 1", id: "app1", checked: false },
    { label: "Aplicación 2", id: "app2", checked: false },
    { label: "Aplicación 3", id: "app3", checked: false },
  ],
  selectedOptions: [],
};
export { Default };
export default story;
