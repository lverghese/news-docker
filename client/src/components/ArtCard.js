import react from 'react';
import { Card } from 'react-bootstrap';

const ArtCard = (props) => {
    console.log(props)
    return (
        <Card width={18}>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
            <Card.Img src={props.urlToImage}></Card.Img>
            <Card.Link href={props.url}>Details </Card.Link>
            <Card.Link onClick={(e) => props.handleSave(e)}>Save</Card.Link>
            
        </Card>
    )
}

export default ArtCard;