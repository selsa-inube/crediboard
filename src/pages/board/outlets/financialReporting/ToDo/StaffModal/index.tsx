import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { Select } from "@inubekit/select";
import { Icon } from "@inubekit/inubekit";
import { Spinner } from "@inubekit/spinner";

import { IStaff } from "@services/types";
import { get } from "@mocks/utils/dataMock.service";

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

  const [analystList, setAnalystList] = useState<IStaff[]>([]);
  const [accountManagerList, setAccountManagerList] = useState<IStaff[]>([]);
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
    let isSubscribed = true;

    const fetchStaffData = async () => {
      try {
        const results = await Promise.allSettled([
          get("analyst"),
          get("account-manager"),
        ]);

        if (!isSubscribed) return;

        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            const data = result.value;
            if (data instanceof Array) {
              if (index === 0) {
                setAnalystList(data);
              } else {
                setAccountManagerList(data);
              }
            }
          } else {
            console.error(
              `Error al obtener ${index === 0 ? "analistas" : "gestores"}:`,
              result.reason
            );
          }
        });
      } catch (error) {
        console.error("Error inesperado al obtener el staff:", error);
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchStaffData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const options = {
    analyst: analystList.map((official) => ({
      id: official.userId,
      label: official.userName,
      value: official.userName,
    })),
    accountManager: accountManagerList.map((official) => ({
      id: official.userId,
      label: official.userName,
      value: official.userName,
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
                    placeholder="Seleccione una opción"
                    options={options.accountManager}
                    onChange={(name, values) => setFieldValue(name, values)}
                    value={values.commercialManager}
                    fullwidth
                  />
                  <Select
                    name="analyst"
                    id="analyst"
                    label="Analista"
                    options={options.analyst}
                    value={values.analyst}
                    placeholder="Seleccione una opción"
                    onChange={(name, value) => setFieldValue(name, value)}
                    fullwidth
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
