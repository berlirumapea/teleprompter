import React from 'react';
import { Header } from 'semantic-ui-react';
import { navigate } from "@reach/router";

const PickOne = () => {

  const goTo = (url) => {
    navigate(url);
  }

  return (
    <div className="pick-one">
      <Header as ="h2" className="pick-header">Who are you?</Header>
      <button className="part one" tabIndex="0" onClick={() => goTo('/signin')}>
        <Header as="h3">Interview Savior</Header>
        <p className="description">A person that helps another person on the right to do his/her interview</p>
      </button>
      <button className="part two" tabIndex="0" onClick={() => goTo('/prompter')}>
        <Header as="h3">Help me</Header>
        <p className="description">This is for the one who's going to do an interview and need help from people on the left</p>
      </button>
    </div>
  )
}

export default PickOne;