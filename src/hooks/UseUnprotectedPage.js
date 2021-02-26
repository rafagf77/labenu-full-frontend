import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { goToFeedPage, goToLoginPage } from '../router/Coordinator'

export function useUnprotectedPage(props) {
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token) {
            goToFeedPage(history)
        }
    }, [history])

}