import styled from 'styled-components'
import { Button, Fab } from '@material-ui/core'

export const FeedContainer = styled.div `
    display: flex;
    flex-direction: column;
`
export const NewPostContainer = styled.form `
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 80vw;
    max-width: 465px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    min-height: 18vh;
`
export const FeedPageContainer = styled.div `
    display: flex;
    flex-direction: column;
    padding-top: 9vh;
    height: 100%;
    min-height: 100vh;
    background-color: #DBE0E6;

    @media (max-width: 500px) {
        padding-top: 24vh;
    }
`
export const BackToTop = styled(Fab) `
    display: none;
    position: fixed;
    bottom: 30px;
    right: 30px;
`
export const Loading = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 10vh;
    margin: 20vh auto;
    align-items: center;
`