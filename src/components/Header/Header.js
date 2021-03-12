import React from 'react'
import { useHistory } from 'react-router-dom'
import { goToLoginPage, goToFeedPage, goToSignUpPage, goToPostPage, goToCollectionsListPage } from '../../router/Coordinator'
import { NavBar, Options, Hello, Title, ButtonStyled, TitleContainer, TitleColor, SearchContainer } from './styles'
import { AppBar, TextField, Grid } from '@material-ui/core'
import { red, grey } from '@material-ui/core/colors'
import SearchIcon from '@material-ui/icons/Search'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Header = (props) => {
    const history = useHistory()
    const token = localStorage.getItem("token")
    const nickname = localStorage.getItem("nickname")
    
    const logout = () => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Esta ação encerrará a sessão atual",
            icon: 'warning',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, sair!'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token")
                goToLoginPage(history)
            }
          })
    }

    const post = () => {
        goToPostPage(history)
    }
    
    const collection = () => {
        goToCollectionsListPage(history)
    }

    return (
        <AppBar color="inherit" position="fixed">
                {token ?
                    history.location.pathname==='/feed' ||  history.location.pathname==='/' ||  history.location.pathname.includes('collection/')?
                    <NavBar>
                        <TitleContainer onClick={()=> goToFeedPage(history)}>
                            <Title variant="h3">Insta</Title>
                            <TitleColor variant="h3">Lab</TitleColor>
                        </TitleContainer>
                        <SearchContainer>
                            <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <SearchIcon />
                            </Grid>
                            <Grid item>
                                <TextField
                                    onChange={props.onChangeSearch}
                                    value={props.searchInput}
                                    id="input-with-icon-grid"
                                    label="Busca" />
                            </Grid>
                            </Grid>
                        </SearchContainer>
                        <Options>
                            <Hello style={{ color: red[500] }}>Olá {nickname}!</Hello>
                            <ButtonStyled style={{ color: red[500], borderColor: red[500] }} variant="outlined" onClick={logout}>Sair</ButtonStyled>
                            <ButtonStyled style={{ color: red[500], backgroundColor: grey[300] }} variant="contained" onClick={collection}>Álbuns</ButtonStyled>
                            <ButtonStyled style={{ color: grey[50], backgroundColor: red[500] }} variant="contained" onClick={post}>Postar</ButtonStyled>
                        </Options>
                    </NavBar>
                :
                    <NavBar>
                        <TitleContainer onClick={()=> goToFeedPage(history)}>
                            <Title variant="h3">Insta</Title>
                            <TitleColor variant="h3">Lab</TitleColor>
                        </TitleContainer>
                        <Options>
                            <Hello style={{ color: red[500] }}>Olá {nickname}!</Hello>
                            <ButtonStyled style={{ color: red[500], borderColor: red[500] }} variant="outlined" onClick={logout}>Sair</ButtonStyled>
                            <ButtonStyled style={{ color: red[500], backgroundColor: grey[300] }} variant="contained" onClick={collection}>Álbuns</ButtonStyled>
                            <ButtonStyled style={{ color: grey[50], backgroundColor: red[500] }} variant="contained" onClick={post}>Postar</ButtonStyled>
                        </Options>
                    </NavBar>
                :
                <NavBar>
                    <TitleContainer onClick={()=> goToFeedPage(history)}>
                        <Title variant="h3">Insta</Title>
                        <TitleColor variant="h3">Lab</TitleColor>
                    </TitleContainer>
                    <Options>
                        <ButtonStyled style={{ color: red[500], borderColor: red[500] }} variant="outlined" onClick={()=> goToLoginPage(history)}>Entrar</ButtonStyled>
                        <ButtonStyled style={{ color: grey[50], backgroundColor: red[500] }} variant="contained" onClick={()=> goToSignUpPage(history)}>Cadastrar</ButtonStyled>
                    </Options>
                </NavBar>
                }            
        </AppBar>
    )
}

export default Header