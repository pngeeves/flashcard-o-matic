import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { readCard, readDeck, updateCard } from '../../../utils/api';
import { useParams, Link } from 'react-router-dom';
import CardForm from './CardForm';


function EditCard() {
    
    const { deckId, cardId } = useParams();
    const [card, setCard] = useState();
    const [deck,setDeck] = useState([])
    const history = useHistory();

    useEffect(() => {
        readDeck(deckId)
        .then(data => setDeck(data))
        .catch(err => console.log(err))
        },[deckId]);

    useEffect(loadCard, [cardId]);

    function loadCard() {
        readCard(cardId).then(setCard);
    }

    function cancel(){
        history.goBack();
    }

    async function submitHandler(card) {
        await updateCard(card).then(() => {
            history.push(`/decks/${deckId}`)
        })
    }

    const renderForm = card ? (
        <CardForm onCancel={cancel} onSubmit={submitHandler} initialState={card}/>
    ) : (
        <p>Loading...</p>
    );
    

    return (
        <div>
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                    <Link to='/'>
                    <span className='oi oi-home' /> Home
                    </Link>
                    </li>
                    <li className='breadcrumb-item'>
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                    Edit Card
                    </li>
                </ol>
            </nav>
            <h3>{deck.name}: Edit Card</h3>
            {renderForm}
        </div>
    )
}

export default EditCard;