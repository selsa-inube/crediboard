import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdOutlineAdd,
  MdOutlineChevronRight,
  MdOutlineMoreVert,
  MdOutlinePhone,
  MdOutlinePictureAsPdf,
  MdOutlineShare,
  MdOutlineVideocam,
  MdOutlinePayments,
  MdOutlineMonetizationOn,
  MdOutlineAccountBalanceWallet,
  MdOutlineBalance,
} from "react-icons/md";

import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { Fieldset } from "@components/data/Fieldset";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { formatISODatetoCustomFormat } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";
import { Requests } from "@services/types";
import { MenuPropect } from "@components/navigation/MenuPropect";
import { IncomeModal } from "@src/components/modals/IncomeModal";
import { incomeOptions } from "./config/config";

import {
  StyledCollapseIcon,
  StyledDivider,
  StyledFieldset,
  StyledVerticalDivider,
  StyledContainerIcon,
  StyledHorizontalDivider
} from "./styles";

interface ComercialManagementProps {
  data: Requests;
  children?: JSX.Element;
  print: () => void;
  isPrint?: boolean;
}

export const ComercialManagement = (props: ComercialManagementProps) => {
  const { data, children, print, isPrint } = props;
  const [collapse, setCollapse] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [form, setForm] = useState({
    deudor: "",
    salarioMensual: 2500000,
    otrosPagos: 0,
    mesadaPensional: 0,
    serviciosProfesionales: 0,
    arrendamientos: 600000,
    dividendos: 0,
    rendimientosFinancieros: 0,
    gananciaPromedio: 200000,
    total: 3300000,
  });

  const onChanges = (name: string, newValue: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  const { id } = useParams();

  const isMobile: boolean = useMediaQuery("(max-width: 720px)");

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const menuOptions = [
    {
      title: "Origen de cupo",
      onClik: () => {},
      icon: <MdOutlineBalance />,
    },
    {
      title: "Fuentes de ingreso",
      onClik: () => {
        setShowIncomeModal(true);
      },
      icon: <MdOutlineAccountBalanceWallet />,
    },
    {
      title: "Obligaciones financieras",
      onClik: () => {},
      icon: <MdOutlineMonetizationOn />,
    },
    {
      title: "Pagos extras",
      onClik: () => {},
      icon: <MdOutlinePayments />,
    },
  ];

  return (
    <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
      <StyledFieldset>
        <Stack direction="column" gap="12px">
          <Stack justifyContent="space-between" alignItems="center">
            <Stack direction="column">
              <Stack>
                <Stack gap="6px" width="max-content">
                  <Text type="title" size="small" appearance="gray">
                    No. Rad.:
                  </Text>
                  <Text type="title" size="small">
                    {data.k_Prospe}
                  </Text>
                  <Text
                    type="title"
                    size="small"
                    appearance="gray"
                    padding={`0px 0px 0px 8px`}
                  >
                    {capitalizeFirstLetter(
                      formatISODatetoCustomFormat(data.f_Prospe)
                    )}
                  </Text>
                </Stack>
              </Stack>
              {isMobile && (
                <Stack margin="4px 0px">
                  <Text type="title" size={!isMobile ? "large" : "medium"}>
                    {data.nnasocia &&
                      capitalizeFirstLetterEachWord(
                        truncateTextToMaxLength(data.nnasocia)
                      )}
                  </Text>
                </Stack>
              )}
              <Stack gap={!isMobile ? "4px" : "4px"}>
                <Text type="title" size="small" appearance="gray">
                  Destino:
                </Text>
                <Text type="title" size="small">
                  {data.nnasocia &&
                    capitalizeFirstLetter(
                      truncateTextToMaxLength(data.k_Desdin, 60)
                    )}
                </Text>
              </Stack>
              <Stack gap="4px">
                <Text type="title" size="small" appearance="gray">
                  Valor:
                </Text>
                <Text type="title" size="small">
                  {data.v_Monto === 0 ? "$ 0" : currencyFormat(data.v_Monto)}
                </Text>
              </Stack>
            </Stack>

            {!isMobile && (
              <Stack gap="36px">
                <Text type="title">
                  {data.nnasocia &&
                    capitalizeFirstLetterEachWord(
                      truncateTextToMaxLength(data.nnasocia)
                    )}
                </Text>
              </Stack>
            )}
            <Stack gap="2px">
              {!isMobile && (
                <>
                  <Button
                    type="link"
                    spacing="compact"
                    path={`/extended-card/${id}/credit-profile`}
                  >
                    Ver perfil crediticio
                  </Button>
                  <StyledHorizontalDivider />
                  <Icon
                    icon={<MdOutlinePhone />}
                    appearance="primary"
                    size="24px"
                    cursorHover
                  />
                  <Icon
                    icon={<MdOutlineVideocam />}
                    appearance="primary"
                    size="24px"
                    cursorHover
                  />
                  <StyledHorizontalDivider />
                </>
              )}
              <StyledCollapseIcon $collapse={collapse} onClick={handleCollapse}>
                <Icon
                  icon={<MdOutlineChevronRight />}
                  appearance="primary"
                  size={isMobile ? "32px" : "24px"}
                  cursorHover
                />
              </StyledCollapseIcon>
            </Stack>
          </Stack>
          {isMobile && (
            <Button
              type="link"
              path={`/extended-card/${id}/credit-profile`}
              fullwidth
            >
              Ver perfil crediticio
            </Button>
          )}
          {collapse && <StyledDivider />}
          {collapse && (
            <Stack direction="column" gap="24px">
              {!isMobile && (
                <Stack gap="24px" justifyContent="end" alignItems="center">
                  <Button
                    type="button"
                    appearance="primary"
                    spacing="compact"
                    iconBefore={
                      <Icon
                        icon={<MdOutlineAdd />}
                        appearance="light"
                        size="18px"
                        spacing="compact"
                      />
                    }
                  >
                    Agregar producto
                  </Button>
                  <Button
                    type="button"
                    appearance="primary"
                    spacing="compact"
                    variant="outlined"
                    iconBefore={
                      <Icon
                        icon={<MdOutlinePayments />}
                        appearance="primary"
                        size="18px"
                        spacing="compact"
                      />
                    }
                  >
                    Pagos extras
                  </Button>
                  <StyledVerticalDivider />
                  <StyledContainerIcon>
                    <Icon
                      icon={<MdOutlinePictureAsPdf />}
                      appearance="primary"
                      size="24px"
                      disabled={isPrint}
                      cursorHover
                      onClick={print}
                    />
                    <Icon
                      icon={<MdOutlineShare />}
                      appearance="primary"
                      size="24px"
                      cursorHover
                    />
                    <Icon
                      icon={<MdOutlineMoreVert />}
                      appearance="primary"
                      size="24px"
                      cursorHover
                      onClick={() => setShowMenu(!showMenu)}
                    />
                    {showMenu && (
                      <MenuPropect
                        options={menuOptions}
                        onMouseLeave={() => setShowMenu(false)}
                      />
                    )}
                  </StyledContainerIcon>
                </Stack>
              )}
              <Stack direction="column">{children}</Stack>
            </Stack>
          )}
        </Stack>
        {showIncomeModal && (
          <IncomeModal
            onChange={onChanges}
            form={form}
            handleClose={() => setShowIncomeModal(false)}
            options={incomeOptions}
          />
        )}
      </StyledFieldset>
    </Fieldset>
  );
};
