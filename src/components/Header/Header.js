import React from 'react'
import { useHistory } from 'react-router-dom'
import { goToLoginPage, goToFeedPage, goToSignUpPage, goToPostPage } from '../../router/Coordinator'
import { NavBar, Options, Hello, Title, ButtonStyled, TitleContainer, TitleColor, SearchContainer } from './styles'
import { AppBar, TextField, Grid } from '@material-ui/core'
import { red, grey } from '@material-ui/core/colors'
import SearchIcon from '@material-ui/icons/Search'
import { HistoryTwoTone } from '@material-ui/icons'

const Header = (props) => {
    const history = useHistory()
    const token = localStorage.getItem("token")
    const nickname = localStorage.getItem("nickname")
    const logout = () => {
        if(window.confirm("Deseja sair da área de acesso ao usuário?")){
            localStorage.removeItem("token")
            goToLoginPage(history)
        }
    }

    const post = () => {
            goToPostPage(history)
    }

    return (
        <AppBar color="inherit" position="fixed">
                {token ?
                history.location.pathname==='/feed' ||  history.location.pathname==='/'?
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
                                    label="Busca por autor e título" />
                            </Grid>
                            </Grid>
                        </SearchContainer>
                        <Options>
                            <Hello style={{ color: red[500] }}>Olá {nickname}!</Hello>
                            <ButtonStyled style={{ color: red[500], borderColor: red[500] }} variant="outlined" onClick={logout}>Sair</ButtonStyled>
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