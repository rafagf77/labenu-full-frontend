import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { goToFeedPage, goToLoginPage } from '../../router/Coordinator'
import { useForm } from '../../hooks/UseForm'
import axios from 'axios'
import { useUnprotectedPage } from '../../hooks/UseUnprotectedPage'
import { FormContainer, SignUpPageContainer } from './styles'
import { Button, TextField } from '@material-ui/core'
import { grey,red } from '@material-ui/core/colors'
import { BASE_URL } from '../../constants/URLs'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const SignUpPage = () => {
    useUnprotectedPage()

    const history = useHistory()
    const {form, onChange, resetState} = useForm({ name: "", email: "", password: "", nickname: "" })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
    }
  
    const onSubmitForm = (event) => {
        event.preventDefault()
        const body = {
            "email": form.email,
            "password": form.password,
            "nickname": form.nickname,
            "name": form.name
        }

        axios.post(`${BASE_URL}/users/signup`,body)
        .then((res)=> {
            localStorage.setItem('token',res.data.accessToken)
            // localStorage.setItem('nickname',res.data.user.nickname)
            goToFeedPage(history)
            Swal.fire(
                'Bem-vinde!',
                'Cadastro criado.',
                'success'
            )
        })
        .catch((err)=> {
            console.log(err)
            Swal.fire(
                'Problema!',
                'Verifique os dados e tente novamente',
                'error'
            )
        })
    }

    return (
        <div>
            <Header />
            <SignUpPageContainer>
                <FormContainer onSubmit={onSubmitForm}>
                    <TextField
                        label="Nome"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        variant="outlined"
                        name='name'
                        value={form.name}
                        type='text'
                        required
                        onChange={handleInputChange}/>
                    <TextField
                        label="E-mail"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        variant="outlined"
                        name='email'
                        value={form.email}
                        type='email'
                        required
                        onChange={handleInputChange}/>
                    <TextField
                        label="Apelido"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        variant="outlined"
                        name='nickname'
                        value={form.nickname}
                        type='text'
                        required
                        onChange={handleInputChange}/>
                    <TextField
                        label="Senha"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        variant="outlined"
                        name='password'
                        value={form.password}
                        type='password'
                        required
                        onChange={handleInputChange}/>
                    <Button type='submit' style={{ color: grey[50], backgroundColor: red[500] }} variant="contained">Cadastrar</Button>    
                </FormContainer>
                <Button onClick={()=> goToLoginPage(history)}>Voltar para tela de acesso</Button>
            </SignUpPageContainer>
        </div>
    )
}

export default SignUpPage