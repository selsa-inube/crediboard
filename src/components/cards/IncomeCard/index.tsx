import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { Icon } from "@inubekit/icon";

import { currencyFormat } from "@utils/formatData/currency";

import { StyledContainer, StyledTextField, StyledSupport } from "./styles";
import { incomeCardData } from "./config";

export interface IIncomeCardProps {
  title: string;
  labels: string[];
  placeholders: string[];
  values: string[];
  ShowSupport?: boolean;
  onChange: (index: number, newValue: string) => void;
}

export function IncomeCard(props: IIncomeCardProps) {
  const { title, labels, placeholders, values, onChange, ShowSupport } = props;

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
              <Textfield
                id={`field${index}`}
                label={label}
                placeholder={placeholders[index]}
                value={currencyFormat(parseFloat(values[index]), false)}
                onChange={(e) => onChange(index, e.target.value)}
                size="compact"
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
