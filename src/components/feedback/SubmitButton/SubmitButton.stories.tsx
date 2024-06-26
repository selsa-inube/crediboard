import { Meta } from '@storybook/react';
import { SubmitButton } from '@components/feedback/SubmitButton'
import { MdOutlineSend } from "react-icons/md";
import { Icon } from "@inubekit/icon";
 
export default {
  title: 'Components/feedback/SubmitButton',
  component: SubmitButton,
} as Meta;
 
export const Default = () => (
  <>
    <button type="submit" >
      <Icon
        appearance="primary"
        cursorHover
        size="36px"
        icon={<MdOutlineSend />}
      />
    </button>
  </>
);
 
