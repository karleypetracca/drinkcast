import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const FormDiv = styled.div`
  display: flex;
  background-color: var(--yellow);
  height: 100vh;
`;

const Form = styled.form`
  border: 2px solid var(--tertiary);
  display: flex;
  flex-direction: column;
  background-color: var(--primary);
  width: 500px;
  height: 350px;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 3px;
  text-align: center;

  h1 {
    display: inherit;
    flex-direction: inherit;
    align-self: flex-start;
    margin: 18px auto 38px auto;
  }

  input {
    border: none;
    font-family: inherit;
    padding: 10px;
    border-radius: 2px;
    margin: 7px auto;
    text-align: center;
  }
`;

function Understood() {
  const acceptance = (e) => {
    e.preventDefault();
    window.location.assign('http://www.death-clock.org/');
    return false;
  };

  return (
    <FormDiv>
      <Form onSubmit={acceptance}>
        <strong>
          <h2>Unfortunately, the clock is ticking.</h2>
        </strong>
        <br />
        <br />
        <br />
        The hours are going by. The past increases, the future recedes.
        Possibiliites decreasing, regrets mounting.
        <br />
        <br />
        <br />
        Do you understand?
        <br />
        <br />
        <Button url="" type="submit">I understand</Button>
      </Form>
    </FormDiv>
  );
}

export default Understood;
