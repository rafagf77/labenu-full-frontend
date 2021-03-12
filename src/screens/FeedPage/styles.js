import styled from 'styled-components'
import { Fab } from '@material-ui/core'

export const FeedContainer = styled.div `
    display: flex;
    flex-direction: column;
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