import React from "react";
import Header from "./Header";

import DeckList from "./Components/Decks/DeckList"
import NewDeck from "./Components/Decks/CreateDeck"
import EditDeck from "./Components/Decks/EditDeck"
import Study from "./Components/Study/Study"
import EditCard from "./Components/Cards/EditCard"
import CreateCard from "./Components/Cards/CreateCard"

import Deck from "./Components/Decks/Deck"
import NotFound from "./NotFound";


import { Switch, Route } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <DeckList />
          </Route>
          <Route exact path='/decks/new'>
            <NewDeck />
          </Route>
          <Route exact path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route exact path='/decks/:deckId/study'>
            <Study />
          </Route>
          <Route exact path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route exact path='/decks/:deckId/cards/new'>
            <CreateCard />
          </Route>
          <Route exact path='/decks/:deckId'>
            <Deck />
          </Route>
          <Route >
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;