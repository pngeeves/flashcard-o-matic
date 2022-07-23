import React, { useState, useEffect} from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { createCard, readDeck } from '../../../utils/api';
import CardForm from './CardForm';

function CreateCard() {
    const { deckId } = useParams();
    const [deck,setDeck] = useState([])
    const history = useHistory();

    useEffect(() => {
        readDeck(deckId)
        .then(data => setDeck(data))
        .catch(err => console.log(err))
    },[deckId]);

    async function submitHandler(card){
        await createCard(deckId, card)
    }

    function cancel(){
        history.goBack();
    }

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
                    Add Card
                    </li>
                </ol>
            </nav>
            <h3>{deck.name}: Add Card</h3>
        <CardForm onCancel={cancel} onSubmit={submitHandler} />
        </div>
    );
}

export default CreateCard;