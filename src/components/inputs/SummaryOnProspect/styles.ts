import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { inube as inubeDesign } from "@inube/design-system";

interface IStyledCollapseIcon {
  $showIcon: boolean;
  theme?: typeof inube;
}

export const Container = styled.div<IStyledCollapseIcon>`
  align-items: center;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  border: 1px solid ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  border-radius: 8px;
  box-shadow:
    0px 1px 3px 0px ${({ theme }) => theme?.palette?.neutralAlpha?.N40A || inube?.palette?.neutralAlpha?.N40A},
    0px 4px 8px 3px ${({ theme }) => theme?.palette?.neutralAlpha?.N40A || inube?.palette?.neutralAlpha?.N40A};
  display: flex;
  gap: ${({ $showIcon }) =>
    $showIcon ? inubeDesign.spacing.s200 : inubeDesign.spacing.s800};
  padding: ${inubeDesign.spacing.s100} ${inubeDesign.spacing.s150}
    ${inubeDesign.spacing.s150} ${inubeDesign.spacing.s150};
`;

export const IconWrapper = styled.div`
  align-items: center;
  border-left: 1px solid ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inubeDesign.color.stroke.divider.regular};
  display: flex;
  padding: ${inubeDesign.spacing.s0} ${inubeDesign.spacing.s100};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${inubeDesign.spacing.s800};
`;