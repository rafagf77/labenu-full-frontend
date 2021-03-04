import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { goToFeedPage, goToSignUpPage } from '../../router/Coordinator'
import { useForm } from '../../hooks/UseForm'
import axios from 'axios'
import { useUnprotectedPage } from '../../hooks/UseUnprotectedPage'
import { FormContainer, LoginPageContainer } from './styles'
import { Button, TextField } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import { BASE_URL } from '../../constants/URLs'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const LoginPage = () => {
    useUnprotectedPage()

    const history = useHistory()
    const {form, onChange, resetState} = useForm({ email: "", password: "" })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
    }
  
    const onSubmitForm = (event) => {
        event.preventDefault()
        const body = {
            "email": form.email,
            "password": form.password
        }
        
        axios.post(`${BASE_URL}/users/login`,body)
        .then((res)=> {
            console.log(res)
            localStorage.setItem('token',res.data.accessToken)
            // localStorage.setItem('nickname',res.data.user.nickname)
            goToFeedPage(history)
            Swal.fire({
                title: 'Bem-vinde!',
                text: 'Acesso autorizado.',
                icon:'success',
                showConfirmButton: false,
                timer: 2000
            })
        })
        .catch((err)=> {
            console.log(err)
            Swal.fire(
                'Problema!',
                'Senha e/ou usuário não encontrados',
                'error'
            )
        })
    }

    return (
        <div>
            <Header />
            <LoginPageContainer>
                <FormContainer onSubmit={onSubmitForm}>
                    <TextField
                        label="E-mail"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        variant="outlined" name='email'
                        value={form.email} type='email'
                        required
                        onChange={handleInputChange}/>
                    <TextField
                        label="Senha" color="primary"
                        style={{ backgroundColor: grey[50] }}
                        variant="outlined"
                        name='password'
                        value={form.password}
                        type='password'
                        required
                        onChange={handleInputChange}/>
                    <Button type='submit' style={{ color: grey[50], backgroundColor: red[500] }} variant="contained">Entrar</Button>    
                </FormContainer>
                <Button onClick={()=> goToSignUpPage(history)}>Não possui cadastro? Clique Aqui!</Button>
            </LoginPageContainer>
        </div>
    )
}

export default LoginPage