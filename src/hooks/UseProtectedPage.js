import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { goToFeedPage, goToLoginPage } from '../router/Coordinator'

export function useProtectedPage(props) {
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            goToLoginPage(history)
        }
    }, [history])

}