import styled from 'styled-components'
import { CardContent } from '@material-ui/core'

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
export const CountContainer = styled.div `
    display: flex;
    justify-content: space-between;
    padding: 10px;
`
export const VotesContainer = styled.div `
    display: flex;
`
export const ClickContainer = styled(CardContent)`
    cursor: pointer;
    &:hover {
    background-color: lightgrey;
    };
`
export const PostedContainer = styled.div `
    display: flex;
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