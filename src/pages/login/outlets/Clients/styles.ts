import styled from "styled-components";

interface StyledClientsListProps {
  $scroll?: boolean;
}

const StyledClients = styled.div`
  & form {
    & > div {
      margin: ${({ theme }) =>
        `${theme? "48px" : "48px"} auto ${
          theme? "0px" : "0px"
        }`};
      width: 500px;
      @media screen and (max-width: 532px) {
        width: auto;
      }
    }
  }

  & button {
    margin-top: ${({ theme }) =>
      `${theme? "24px" : "24px"}`};
  }
`;

const StyledClientsList = styled.div<StyledClientsListProps>`
  & > div {
    list-style: none;
    min-height: 300px;
    max-height: 430px;
    width: inherit;
    overflow-y: ${({ $scroll }) => ($scroll ? "scroll" : "visible")};
    @media screen and (max-height: 1000px) {
      min-height: 200px;
    }
  }
`;

const StyledNoResults = styled.div`
  margin: ${({ theme }) =>
    `${theme? "16px" : "16px"} ${
      theme? "0px" : "0px"
    }`};
`;

const StyledClientsItem = styled.li`
  width: 100%;
`;

export { StyledClients, StyledClientsList, StyledNoResults, StyledClientsItem };
