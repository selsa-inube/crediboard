import styled from "styled-components";


export const StyledBusiness = styled.div`
    box-shadow: 2px 2px 3px 2px #00000040;
    border-radius: 8px;
    background-color: white;
    margin-left: 1%;
    margin-top: 60px;
    position: absolute;
    z-index: 1;

    ul{
        margin: 0;
    }

    li{
        list-style: none;
        display: flex;
        align-items: center;
    }

    img{
        position: relative;
        width: 120px;
        height: 41px;
        right: 20px;
        padding-right: 20px;
        padding-bottom: 5px;
        padding-top: 5px;
        object-fit: contain;
    }

    hr{
        position: relative;
        right: 20px;
        width: 115%;
    }


`