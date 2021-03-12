import styled from 'styled-components'
import { Fab } from '@material-ui/core'

export const PostPageContainer = styled.div `
    display: flex;
    flex-direction: column;
    padding-top: 9vh;
    height: 100%;
    min-height: 100vh;
    background-color: #DBE0E6;

    @media (max-width: 500px) {
        padding-top: 22vh;
    }
`