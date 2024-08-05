import styled, { keyframes } from "styled-components";
import { inube } from "@inube/design-system";

/* interface AlertContainerProps {
  $top: string;
  $left: string;
} */

/* export const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.gray?.regular || inube.color.surface.warning.clear};
  padding: 7px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.gray?.regular || inube.color.surface.gray.regular};
  position: absolute;
  min-width: 250px;
  z-index: 1;
`;
 */

interface IAlertContainer {
  $top: number;
}

const slideDown = keyframes`
 
	0% {
		animation-timing-function: ease-in;
		opacity: 0;
		transform: translateY(-250px);
	}

	38% {
		animation-timing-function: ease-out;
		opacity: 1;
		transform: translateY(0);
	}

	55% {
		animation-timing-function: ease-in;
		transform: translateY(-65px);
	}

	72% {
		animation-timing-function: ease-out;
		transform: translateY(0);
	}

	81% {
		animation-timing-function: ease-in;
		transform: translateY(-28px);
	}

	90% {
		animation-timing-function: ease-out;
		transform: translateY(0);
	}

	95% {
		animation-timing-function: ease-in;
		transform: translateY(-8px);
	}

	100% {
		animation-timing-function: ease-out;
		transform: translateY(0);
	}

`;

export const AlertContainer = styled.div<IAlertContainer>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.gray?.regular || inube.color.surface.warning.clear};
  padding: 7px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.gray?.regular || inube.color.surface.gray.regular};
  min-width: 250px;
  justify-content: center;
  animation: ${slideDown} 2s ease-in-out;
  position: relative; // Add position: relative
  //transform: translateY(10px); // Lower the hovered alert

  &:hover {
    transition: transform 0.3s ease-in-out; // Smooth transition
  }
`;
