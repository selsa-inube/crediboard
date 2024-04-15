import { Stack, Text, inube } from "@inube/design-system";

import { StyledBoardSection, StyledDivider } from "./styles";
import { SectionBackground } from "./types";

interface IBoardSectionProps {
  sectionTitle: string;
  numberActiveCards: number;
  sectionBackground: SectionBackground;
  children: JSX.Element | JSX.Element[];
}

function BoardSection(props: IBoardSectionProps) {
  const {
    sectionTitle,
    numberActiveCards,
    sectionBackground = "light",
    children,
  } = props;
  return (
    <>
      <StyledDivider />
      <StyledBoardSection sectionBackground={sectionBackground}>
        <Stack justifyContent="space-between" gap={inube.spacing.s200}>
          <Text type="title" ellipsis>
            {sectionTitle}
          </Text>
          <Text type="title" size="medium">
            {numberActiveCards}
          </Text>
        </Stack>
        <Stack direction="column" gap={inube.spacing.s200}>
          {children}
        </Stack>
      </StyledBoardSection>
    </>
  );
}

export { BoardSection };
export type { IBoardSectionProps };
