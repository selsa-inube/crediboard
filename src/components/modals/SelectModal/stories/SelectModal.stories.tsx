import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inube/design-system";

import { SelectModal, SelectModalProps } from "..";
import { props } from "./props";

const story: Meta<typeof SelectModal> = {
  component: SelectModal,
  title: "components/modals/SelectModal",
  argTypes: props,
};

const options = [
  {
    id: "option1",
    label: "option1",
    disabled: false,
  },
  {
    id: "option2",
    label: "option2",
    disabled: false,
  },
];

const DefaultTemplate: StoryFn<SelectModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && <SelectModal {...args} onCloseModal={handleShowModal} />}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: "Default Title",
  buttonText: "Submit",
  inputLabel: "Input Label",
  inputPlaceholder: "Type something...",
  portalId: "portal",
  options: options,
};

export default story;
