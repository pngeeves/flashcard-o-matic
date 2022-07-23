import React, { useState, useEffect } from 'react';
import { readDeck } from '../../../utils/api';
import { useParams } from 'react-router-dom';


function CardForm({onSubmit, onCancel, initialState = {front: '', back: ''}}) {
    
    const [card, setCard] = useState(initialState);
    const [deck, setDeck] = useState({ name: '', description: '' });
    const { deckId } = useParams();

    function changeHandler({ target: {name, value}}) {
        setCard((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    };

    useEffect(() => {
        readDeck(deckId)
        .then(data => setDeck(data))
    },[deckId]);

    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        onSubmit(card);
        setCard(initialState);
    }

    return (
        <div>
            <form onSubmit={submitHandler} className='card-edit'>
                <fieldset>
                <div className='form-group'>
                        <label htmlFor='front'>Front</label> 
                        <textarea
                        id='front'
                        name='front'
                        className='form-control'
                        value={card.front}
                        required={true}
                        placeholder='Front side of card'
                        onChange={changeHandler}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='back'>Back</label>
                        <textarea
                        id='back'
                        name='back'
                        className='form-control'
                        required={true}
                        placeholder='Back side of card'
                        value={card.back}
                        onChange={changeHandler}
                        />
                    </div>
                <button className='btn btn-secondary mr-2' type='button' onClick={onCancel}>Done</button>
                <button className='btn btn-primary' type='submit' >Save</button>
                </fieldset>
            </form>
        </div>
    );
};

export default CardForm;