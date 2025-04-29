import { useState } from "react";
import { Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";
import { Consulting } from ".";

const meta: Meta<typeof Consulting> = {
  component: Consulting,
  title: "Components/modals/Consulting",
};

const Default = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Modal Report Credit</Button>
      {showModal && <Consulting />}
    </>
  );
};

export { Default };
export default meta;
