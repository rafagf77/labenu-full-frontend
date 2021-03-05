import React from 'react'
import { PostContainer, CountContainer, VotesContainer, ClickContainer, PostedContainer, PostedText, TagText } from './styles'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { IconButton, Card, Button, Typography } from '@material-ui/core'
import Axios from 'axios'
import { grey, red } from '@material-ui/core/colors'
import { goToCollectionPage } from '../../router/Coordinator'
import { useHistory } from 'react-router-dom'
import { BASE_URL } from '../../constants/URLs'
import { ButtonStyled } from './styles'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const CollectionCard = (props) => {
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

    const RemoveCollection = (id) => {
        // Swal.fire({
        //     title: 'Tem certeza?',
        //     text: "Essa ação é irreversível!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Sim, apagar!'
        //   }).then((result) => {
        //     if (result.isConfirmed) {
        //         Axios.delete(`${BASE_URL}/images/del/${id}`,
        //         {
        //             headers: {
        //                 Authorization: localStorage.getItem("token")
        //             }
        //         })
        //         .then((res)=>{
        //             goToFeedPage(history)
        //             Swal.fire(
        //                 'Concluído!',
        //                 'Sua imagem foi apagada.',
        //                 'success'
        //             )
        //         })
        //         .catch((err)=>{
        //             console.log(err)
        //             Swal.fire(
        //                 'Problema!',
        //                 'Sua imagem NÃO foi apagada.',
        //                 'error'
        //             )
        //         })
        //     }
        //   })
    }

    const ViewImages = (id) => {
        // if (window.confirm("Deseja apagar esta imagem?")){
        //     Axios.delete(`${BASE_URL}/images/del/${id}`,
        //     {
        //         headers: {
        //             Authorization: localStorage.getItem("token")
        //         }
        //     })
        //     .then((res)=>{
        //         goToFeedPage(history)
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
        // }
    }

    return (
        <PostContainer>
            <Card variant="contained">
                <ClickContainer>
                    <img src={props.image} alt={props.image}/>
                    <Typography color="textSecondary" gutterBottom>
                        <PostedText> <img src={props.file}/></PostedText>
                        <Typography variant="h6" component="h6">
                            <p><b>{props.title}</b></p>
                        </Typography>
                        <PostedContainer>
                            <PostedText>{props.subtitle}</PostedText>
                            <ButtonStyled variant="contained" style={{ color: grey[50], backgroundColor: red[500] }} onClick={()=> goToCollectionPage (history,props.id)}>Ver Álbum</ButtonStyled>
                            <ButtonStyled variant="outlined" style={{ color: red[500], borderColor: red[500] }} onClick={()=>RemoveCollection(props.id)}>Remover</ButtonStyled>
                        </PostedContainer>
                    </Typography>
                </ClickContainer>
            </Card>
        </PostContainer>
    )
}

export default CollectionCard