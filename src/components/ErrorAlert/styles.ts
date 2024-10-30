import styled, { keyframes } from "styled-components";
import { inube } from "@inube/design-system";

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

export const AlertContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 7px;
  border-radius: 4px;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.gray?.regular || inube.color.surface.warning.clear};
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.gray?.regular || inube.color.surface.gray.regular};
  animation: ${slideDown} 2s ease-in-out;
`;