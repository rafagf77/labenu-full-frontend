import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { goToFeedPage } from '../../router/Coordinator'
import { Button } from '@material-ui/core'
import { ErrorContainer } from './styles'

const ErrorPage = () => {
    const history = useHistory()
    
    return (
        <div>
            <Header />
            <ErrorContainer>
                <h2>Esta página não existe!</h2>
                <Button variant="contained" color="primary" onClick={() => goToFeedPage(history)}>Voltar</Button>
            </ErrorContainer>

        </div>
    )
}

export default ErrorPage