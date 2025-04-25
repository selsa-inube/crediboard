import { useState, useEffect } from "react";
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

import { getCommercialManagerAndAnalyst } from "@services/commercialManagerAndAnalyst";
import { ICommercialManagerAndAnalyst } from "@pages/SubmitCreditApplication/types";

import { StyledModal, StyledContainerClose } from "./styles";

export interface StaffModalProps {
  commercialManager: string;
  analyst: string;
  portalId?: string;
  onChange: (key: string) => void;
  onSubmit?: (values: { commercialManager: string; analyst: string }) => void;
  onCloseModal?: () => void;
}

export function StaffModal(props: StaffModalProps) {
  const { portalId = "portal", onSubmit, onCloseModal } = props;
  const [analystList, setAnalystList] = useState<
    ICommercialManagerAndAnalyst[]
  >([]);
  const [accountManagerList, setAccountManagerList] = useState<
    ICommercialManagerAndAnalyst[]
  >([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 700px)");

  const node = document.getElementById(portalId);
  const validationSchema = Yup.object().shape({
    commercialManager: Yup.string(),
    analyst: Yup.string(),
  });

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [accountManagers, analysts] = await Promise.all([
          getCommercialManagerAndAnalyst("CredicarAccountManager", "Selsa"),
          getCommercialManagerAndAnalyst("CredicarAnalyst", "Selsa"),
        ]);

        setAccountManagerList(accountManagers);
        setAnalystList(analysts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                    onChange={(name, value) => setFieldValue(name, value)}
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
                    value={values.analyst}
                    onChange={(name, value) => setFieldValue(name, value)}
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
