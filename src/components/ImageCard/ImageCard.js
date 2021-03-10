import React, { useState } from 'react'
import { PostContainer, ClickContainer, PostedContainer, PostedText, TagText } from './styles'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { IconButton, Card, Button, Typography } from '@material-ui/core'
import Axios from 'axios'
import { grey, red } from '@material-ui/core/colors'
import { goToCollectionPage, goToFeedPage, goToFilterPage } from '../../router/Coordinator'
import { useHistory } from 'react-router-dom'
import { BASE_URL } from '../../constants/URLs'
import { ButtonStyled } from './styles'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import CollectionsListModal from '../Modal/CollectionsListModal'

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
        Swal.fire({
            title: 'Tem certeza?',
            text: "Essa ação é irreversível!",
            icon: 'warning',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, apagar!'
          }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`${BASE_URL}/images/del/${id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                .then((res)=>{
                    history.goBack()
                    Swal.fire(
                        'Concluído!',
                        'Sua imagem foi apagada.',
                        'success'
                    )
                })
                .catch((err)=>{
                    console.log(err)
                    Swal.fire(
                        'Problema!',
                        'Sua imagem NÃO foi apagada.',
                        'error'
                    )
                })
            }
          })
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
                            <PostedText>Etiquetas</PostedText>
                            {props.tags && props.tags.map(tag => {
                                return (<TagText onClick={()=>goToFilterPage(history,`${tag.id}`)} key={tag}>{tag.name}</TagText>)
                            })}
                            <PostedText>Álbuns</PostedText>
                            {props.collections && props.collections.map(collection => {
                                return (<TagText onClick={()=>goToCollectionPage(history,`${collection.id}`)} key={collection}>{collection.title}</TagText>)
                            })}
                            <CollectionsListModal />
                            <ButtonStyled variant="outlined" style={{ color: red[500], borderColor: red[500] }} onClick={()=>RemoveImage(props.id)}>Remover</ButtonStyled>
                        </PostedContainer>
                    </Typography>
                </ClickContainer>
            </Card>
        </PostContainer>
    )
}

export default ImageCard