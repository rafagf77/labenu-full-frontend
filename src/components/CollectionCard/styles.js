import styled from 'styled-components'
import { CardContent, Button } from '@material-ui/core'

export const PostContainer = styled.div `
    display: flex;
    flex-direction: column;
    width: 80vw;
    max-width: 465px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 15px;
`
export const ClickContainer = styled(CardContent)`
    /* cursor: pointer; */
    &:hover {
    background-color: lightgrey;
    };
`
export const PostedContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5px;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`
export const PostedText = styled.p `
    margin-right: 8px;
    
    @media (max-width: 500px) {
        margin: 0;
        padding: 0;
    }
`
export const ButtonStyled = styled(Button) `
    height: 4vh;
    margin-left: 10px;
`