import React from 'react'
import { PostContainer, CountContainer, VotesContainer, ClickContainer, PostedContainer, PostedText } from './styles'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { IconButton, Card, Typography } from '@material-ui/core'
import Axios from 'axios'
import { green, red } from '@material-ui/core/colors'

const ImageCard = (props) => {

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
                        </PostedContainer>
                    </Typography>
                </ClickContainer>
            </Card>
        </PostContainer>
    )
}

export default ImageCard