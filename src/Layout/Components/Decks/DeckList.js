import React, { useState, useEffect } from 'react';
import { deleteDeck, listDecks } from '../../../utils/api';
import { Link } from 'react-router-dom';

function DeckList() {
    const [deckList, setDeckList] = useState([]);

    function getDecks() {
        listDecks()
        .then(setDeckList);
    }

    useEffect(() => {
        getDecks()
    },[]);

    function deleteHandler(deckId) {
        const confirmed = window.confirm('Do you really want to delete this?');
        if (confirmed) {
            deleteDeck(deckId)
        }
      }

    const list = deckList.map((deck) => (
        <li key={deck.id} className='border list-group-item list-group-item-action flex-column align-items-start'>
          <div className='d-flex w-100 justify-content-between'>
            <h3 className='mb-1'>{deck.name}</h3>
            <small>{deck.cards.length} cards</small>
          </div>
          <p className='mb-1'>{deck.description}</p>
        
          <div className='btn-group'>
            <Link to={`decks/${deck.id}`} className='btn btn-secondary'><span className='oi oi-eye'/> View</Link>
            <Link to={`decks/${deck.id}/study`} className='btn btn-primary'><span className='oi oi-book'/> Study</Link>
            <Link to='' className='btn btn-danger float-right' id={deck.id} onClick={() => deleteHandler(deck.id)}>
              <span className='oi oi-trash'/>
            </Link>
          </div>
        </li>
      ));

      return (
        <div>
          <Link to='/decks/new' className='btn btn-secondary'>
            <span className='oi oi-plus' /> Create Deck
          </Link>
          <ul className='list-group mt-2 deck-list'>{list}</ul>
        </div>
      );
    }

export default DeckList; 