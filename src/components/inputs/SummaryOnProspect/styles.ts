import styled from "styled-components";

interface IStyledCollapseIcon {
  $showIcon: boolean;
}

export const Container = styled.div<IStyledCollapseIcon>`
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  gap: ${({ $showIcon }) => ($showIcon ? "16px" : "64px")};
  padding: 8px 12px 12px 12px;
  border: 1px solid var(--Neutral-color-palette-neutral-N30, #EBECF0);
  box-shadow: 0px 1px 3px 0px #091E4221;

`;

export const IconWrapper = styled.div`
  border-left: 1px solid #A5ADBA;
  padding: 0px 8px 0px 8px;
  display: flex;
  align-items: center;
  padding-top: 4px; 
  padding-bottom: 4px; 
`;


export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 64px;
`;
