import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledFile {
  theme: typeof inube;
  $withBorder?: boolean;
}

const StyledFile = styled.div<IStyledFile>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 12px;
  ${({ $withBorder, theme }) =>
    $withBorder
      ? `
          border: 1px solid ${theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
        `
      : "border: none;"};
`;

export { StyledFile };
