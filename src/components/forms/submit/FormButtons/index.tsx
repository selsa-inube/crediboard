import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";

interface FormButtonsProps {
  handleReset: () => void;
  handleSubmit: () => void;
  cancelButtonText?: string;
  children?: React.ReactNode;
  withDisabledButtons?: boolean;
  withDisableReset?: boolean;
  loading?: boolean;
  submitButtonText?: string;
}

function FormButtons(props: FormButtonsProps) {
  const {
    handleSubmit,
    handleReset,
    cancelButtonText = "Cancelar",
    children,
    withDisabledButtons,
    withDisableReset,
    loading,
    submitButtonText = "Guardar",
  } = props;

  let disableCancel: boolean | undefined;

  if (!withDisableReset && withDisabledButtons) {
    disableCancel = withDisabledButtons;
  } else {
    disableCancel = withDisableReset;
  }

  return (
    <Stack direction="column" gap="24px">
      <Stack direction="column">{children}</Stack>
      <Stack justifyContent="flex-end" gap="8px">
        <Button
          appearance="gray"
          disabled={disableCancel}
          onClick={handleReset}
          type="reset"
        >
          {cancelButtonText}
        </Button>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={withDisabledButtons}
        >
          {submitButtonText}
        </Button>
      </Stack>
    </Stack>
  );
}

export { FormButtons };
export type { FormButtonsProps };
