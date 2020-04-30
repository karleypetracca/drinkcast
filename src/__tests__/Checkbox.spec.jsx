import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import CheckBox from '../components/CheckBox';


// WIP!!!

describe('<CheckBox/>', () => {

  afterEach(cleanup);

  it('Clicking checkbox toggles check', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <CheckBox
        label="Publish Video"
        initialChecked={true}
        onChange={onChange}
      />,
    );

    fireEvent.click(getByTestId('checkbox'));

    expect(getByTestId('checkbox').checked).toEqual(false);
  });
});
