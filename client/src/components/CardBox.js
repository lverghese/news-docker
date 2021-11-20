import react from 'react';
import { Card, CardColumns, } from 'react-bootstrap';
import ArtCard from './ArtCard'
const CardBox = (props) => {
    console.log(props)

    return (
        <CardColumns style={{margin: '25px'}}>
            {props.articles.map(({ title, articleId, url, urlToImage, author, description, handleSave}) => {
                return (
                    <ArtCard
                    key={articleId}
                    title={title}
                    author={author}
                    url={url}
                    urlToImage={urlToImage}
                    description={description}
                    handleSave={(e) => handleSave(e)}
                    />
                )
            }
            
            )}


        </CardColumns>
    )
}


export default CardBox;