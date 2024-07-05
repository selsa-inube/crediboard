import { Meta, StoryFn } from '@storybook/react';
import ErrorAlert, { ErrorAlertProps } from './index';

export default {
  title: 'layouts/ErrorAlert',
  component: ErrorAlert,
  argTypes: {
    errorKey: { control: 'boolean' },
    message: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<ErrorAlertProps> = (args) => <ErrorAlert {...args} />;

export const Default = Template.bind({});
Default.args = {
  errorKey: true,
  message: 'Existe un error sin evaluar',
};

export const CustomMessage = Template.bind({});
CustomMessage.args = {
  errorKey: true,
  message: 'Este es un mensaje de error personalizado',
};
