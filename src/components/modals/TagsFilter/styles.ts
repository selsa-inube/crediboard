import styled from "styled-components";
type ITagAppearance =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "help"
  | "dark"
  | "gray"
  | "light"
  | "white";

interface StyledTagProps {
  $removable: boolean;
  $background: string;
  $appearance?: ITagAppearance;
}

const StyledTag = styled.div<StyledTagProps>`
  display: inline-block;
  position: relative;
  border-radius: 4px;
  padding: ${({ $removable }) => ($removable ? "0 0 0 5px" : "0 4px")};
  background: ${({ $background }) => $background};
`;

export { StyledTag };
