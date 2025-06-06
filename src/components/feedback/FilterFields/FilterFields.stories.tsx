import { BrowserRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";

import {
  FilterFieldController,
  IFilterFieldController,
} from "./FilterFields.Controller";

const story = {
  component: FilterFieldController,
  title: "feedback/FilterFields",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<IFilterFieldController> = (args) => {
  return <FilterFieldController {...args} />;
};

const Default = Template.bind({});
Default.args = {
  options: [
    { id: "Aplicacion.", label: "Aplicación." },
    { id: "Sistemas.", label: "Sistemas." },
    { id: "Contabilidad.", label: "Contabilidad." },
  ],
};

export { Default };
export default story;
