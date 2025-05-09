import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Stack,
  Icon,
  Text,
  Spinner,
  useMediaQuery,
  Select,
  Blanket,
  Button,
} from "@inubekit/inubekit";

import { IToDo } from "@services/types";
import { ICommercialManagerAndAnalyst } from "@pages/SubmitCreditApplication/types";
import { validationMessages } from "@validations/validationMessages";

import { StyledModal, StyledContainerClose } from "./styles";

export interface StaffModalProps {
  commercialManager: string;
  analyst: string;
  loading: boolean;
  accountManagerList: ICommercialManagerAndAnalyst[];
  analystList: { staffId: string; staffName: string }[];
  handleCommercialManagerChange: (
    name: string,
    value: string,
    setFieldValue: (field: string, value: string) => void
  ) => void;
  handleAnalystChange: (
    name: string,
    value: string,
    setFieldValue: (field: string, value: string) => void
  ) => void;
  handleCreditRequests: () => void;
  portalId?: string;
  taskData?: IToDo | null;
  onChange: (key: string) => void;
  onSubmit?: (values: { commercialManager: string; analyst: string }) => void;
  onCloseModal?: () => void;
}

export function StaffModal(props: StaffModalProps) {
  const {
    portalId = "portal",
    onSubmit,
    onCloseModal,
    handleCommercialManagerChange,
    handleAnalystChange,
    handleCreditRequests,
    loading,
    accountManagerList,
    analystList,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  const node = document.getElementById(portalId);
  const validationSchema = Yup.object().shape({
    commercialManager: Yup.string(),
    analyst: Yup.string(),
  });

  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  const options = {
    commercialManager: accountManagerList.map((official) => ({
      id: official.staffId,
      label: official.staffName,
      value: official.staffName,
      document: official.identificationDocumentNumber,
    })),
    analyst: analystList.map((official) => ({
      id: official.staffId,
      label: official.staffName,
      value: official.staffName,
    })),
  };
  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            Gestor Comercial y Analista
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap="8px">
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>

        {loading ? (
          <Stack justifyContent="center">
            <Spinner size="large" appearance="primary" transparent={false} />
          </Stack>
        ) : (
          <Formik
            initialValues={{ commercialManager: "", analyst: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              onSubmit?.(values);
              setSubmitting(false);
              handleCreditRequests();
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <Stack direction="column" gap="24px">
                  <Select
                    name="commercialManager"
                    id="commercialManager"
                    label="Gestor Comercial"
                    placeholder={
                      options.commercialManager.length > 0
                        ? "Seleccione una opción"
                        : "No hay gestores disponibles"
                    }
                    options={options.commercialManager}
                    onChange={(name, value) =>
                      handleCommercialManagerChange(name, value, setFieldValue)
                    }
                    value={values.commercialManager}
                    fullwidth
                    disabled={options.commercialManager.length === 0}
                  />
                  <Select
                    name="analyst"
                    id="analyst"
                    label="Analista"
                    placeholder={
                      options.analyst.length > 0
                        ? "Seleccione una opción"
                        : "No hay analistas disponibles"
                    }
                    options={options.analyst}
                    onChange={(name, value) =>
                      handleAnalystChange(name, value, setFieldValue)
                    }
                    value={values.analyst}
                    fullwidth
                    disabled={options.analyst.length === 0}
                  />
                </Stack>
                <Stack justifyContent="flex-end" margin="16px 0">
                  <Button type="submit" disabled={isSubmitting}>
                    Aceptar
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
      </StyledModal>
    </Blanket>,
    node
  );
}
