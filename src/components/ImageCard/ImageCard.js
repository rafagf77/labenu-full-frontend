import React from 'react'
import { PostContainer, CountContainer, VotesContainer, ClickContainer, PostedContainer, PostedText } from './styles'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { IconButton, Card, Button, Typography } from '@material-ui/core'
import Axios from 'axios'
import { grey, red } from '@material-ui/core/colors'
import { goToFeedPage } from '../../router/Coordinator'
import { useHistory } from 'react-router-dom'
import { BASE_URL } from '../../constants/URLs'
import { ButtonStyled } from './styles'

const ImageCard = (props) => {
    const history = useHistory()

    const timeCalculator = () => {
        const timeCalc=Math.round((Date.now()-props.createdAt))
        if (timeCalc<=86400000) {
            return 'hoje'
        } else if((timeCalc/86400000)>1 && (timeCalc/86400000)<2) {
                return 'ontem'
            } else {
                return 'há ' + ((Math.round(timeCalc/86400000)) - 1) + ' dias'
        } 
    }

    const RemoveImage = (id) => {
        if (window.confirm("Deseja apagar esta imagem?")){
            Axios.delete(`${BASE_URL}/images/del/${id}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            .then((res)=>{
                alert("Imagem removida")
                goToFeedPage(history)
            })
            .catch((err)=>{
                console.log(err)
            })
        }

    }

    return (
        <PostContainer>
            <Card variant="contained">
                <ClickContainer>
                    <Typography color="textSecondary" gutterBottom>
                        <PostedText> <img src={props.file}/></PostedText>
                        <Typography variant="h6" component="h6">
                            <p><b>{props.subtitle}</b></p>
                        </Typography>
                        <PostedContainer>
                            <PostedText>Postado {timeCalculator()} por <b>{props.nickname}</b></PostedText>
                            <PostedText>Tags <b>{props.tags}</b></PostedText>
                            <PostedText>Álbum: <b>{props.collection}</b></PostedText>
                            <ButtonStyled variant="outlined" style={{ color: red[500], borderColor: red[500] }} onClick={()=>RemoveImage(props.id)}>Remover</ButtonStyled>
                        </PostedContainer>
                    </Typography>
                </ClickContainer>
            </Card>
        </PostContainer>
    )
}

export default ImageCard