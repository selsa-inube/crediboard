import { Meta } from '@storybook/react';
import { SubmitButton } from '@components/inputs/SubmitButton'

const meta: Meta<typeof SubmitButton> =  {
  title: 'components/inputs/SubmitButton',
  component: SubmitButton,
};
 
const Default = () => (
 <SubmitButton/>
);
 
export { Default }
export default meta;
