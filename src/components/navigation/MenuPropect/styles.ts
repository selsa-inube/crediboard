import styled from "styled-components";


const StyledMenu = styled.div`
    background-color: #ffff;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px #091E4221, 0px 8px 12px 6px #091E4221;
    padding: 6px 0px;
    position: absolute;
    right: 1px;
    width: 227px;
    z-index: 2;
`;

const StyledContainerLabel = styled.div`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 40px;
    gap: 8px;
    margin: 0px;
    padding: 12px 16px;

    &:hover {
        background-color: #F4F5F7;
        cursor: pointer;
    }
`;

export {
  StyledMenu,
  StyledContainerLabel,
};
