import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { Icon } from "@inubekit/icon";

import { StyledContainer, StyledTextField, StyledSupport } from "./styles";
import { incomeCardData } from "./config";
import {
  currencyFormat,
  handleChangeWithCurrency,
  parseCurrencyString,
  validateCurrencyField,
} from "@utils/formatData/currency";

export interface IIncomeCardProps {
  title: string;
  labels: string[];
  placeholders: string[];
  values: string[];
  ShowSupport?: boolean;
  disabled?: boolean;
}

export function IncomeCard(props: IIncomeCardProps) {
  const { title, labels, placeholders, values, ShowSupport, disabled } = props;

  const validationSchema = Yup.object({
    field: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: values.reduce(
      (acc, val, index) => {
        acc[`field${index}`] = currencyFormat(parseCurrencyString(val));
        return acc;
      },
      {} as Record<string, string>
    ),
    validationSchema,
    validateOnMount: true,
    onSubmit: () => {},
  });

  return (
    <StyledContainer>
      <Stack
        direction="column"
        padding="16px"
        height={!ShowSupport ? "auto" : "318px"}
        gap="8px"
      >
        <Text size="medium" type="title" weight="bold">
          {title}
        </Text>
        <Divider />
        <Stack direction="column" padding="10px 8px">
          {labels.map((label, index) => (
            <StyledTextField key={index}>
              <Text type="label" weight="bold" size="medium">
                {label}
              </Text>
              <Textfield
                name={`field${index}`}
                id={`field${index}`}
                placeholder={placeholders[index]}
                value={validateCurrencyField(`field${index}`, formik, true, "")}
                onChange={(e) => handleChangeWithCurrency(formik, e)}
                size="compact"
                disabled={disabled}
                fullwidth
              />
            </StyledTextField>
          ))}
        </Stack>
        {ShowSupport && (
          <Stack justifyContent="end" margin="auto 12px 5px 0px">
            <StyledSupport onClick={() => console.log("Ver soporte")}>
              <Stack gap="8px" alignItems="center">
                <Text appearance="primary" type="label" size="large">
                  {incomeCardData.support}
                </Text>
                <Icon
                  icon={<MdOutlineRemoveRedEye />}
                  size="15px"
                  appearance="primary"
                  variant="filled"
                  shape="circle"
                />
              </Stack>
            </StyledSupport>
          </Stack>
        )}
      </Stack>
    </StyledContainer>
  );
}
