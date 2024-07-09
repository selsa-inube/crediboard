import {
  Stack,
  useMediaQuery,
  Blanket,
  Text,
  Button,
  inube,
  Select,
} from "@inube/design-system";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { StyledModal } from "./styles";
import { IStaff } from "@services/types";

interface FormValues {
  commercialManager: string;
  analyst: string;
}

export interface StaffModalProps {
  commercialManager: string;
  analyst: string;
  staff: IStaff[];
  portalId?: string;
  onChange: (key: string) => void;
  onSubmit?: (values: { commercialManager: string; analyst: string }) => void;
  onCloseModal?: () => void;
}

export function StaffModal(props: StaffModalProps) {
  const {
    commercialManager,
    analyst,
    staff,
    portalId = "portal",
    onChange,
    onSubmit,
    onCloseModal,
  } = props;

  const validationSchema = Yup.object().shape({
    commercialManager: Yup.string(),
    analyst: Yup.string(),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const getOptions = (position: string) =>
    staff
      .filter((official) => official.position === position)
      .map((official) => ({ id: official.id, label: official.name }));

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            Gestor Comercial y Analista
          </Text>
          <Stack gap={inube.spacing.s100}>
            <Text>Cerrar</Text>
            <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
          </Stack>
        </Stack>
        <Formik
          initialValues={{ commercialManager: "", analyst: "" }}
          validationSchema={validationSchema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            onSubmit?.(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack direction="column" gap={inube.spacing.s300}>
                <Select
                  name="commercialManager"
                  id="commercialManager"
                  label="Gestor Comercial"
                  placeholder="Seleccione una opción"
                  options={getOptions("commercialManager")}
                  value={commercialManager}
                  onChange={onChange("commercialManager")}
                  fullwidth
                />
                <Select
                  name="analyst"
                  id="analyst"
                  label="Analista"
                  options={getOptions("analyst")}
                  value={analyst}
                  placeholder="Seleccione una opción"
                  onChange={onChange("analyst")}
                  fullwidth
                />
              </Stack>
              <Stack justifyContent="flex-end" margin="s200 s0">
                <Button type="submit" disabled={isSubmitting}>
                  Aceptar
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </StyledModal>
    </Blanket>,
    node
  );
}
