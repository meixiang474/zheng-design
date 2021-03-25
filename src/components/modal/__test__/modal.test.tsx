import React, { useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Modal } from '../index';

function Test() {
  const [state, setState] = useState(false);
  return (
    <div>
      <Modal className="test" visible={state} parentSetState={setState} />
      <button onClick={() => setState(true)}>点击</button>
    </div>
  );
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe('test Modal component', () => {
  it('should work correct', async () => {
    const wrapper = render(<Test />);
    const button = wrapper.getByText('点击');
    await act(async () => {
      fireEvent.click(button);
      await sleep(300);
    });
    let modalWrapper = document.body.querySelector('.test');
    expect(modalWrapper).toBeTruthy();
    expect(modalWrapper).toMatchSnapshot();
    const closeBtn = modalWrapper.querySelector('.close-button');
    await act(async () => {
      fireEvent.click(closeBtn);
      await sleep(300);
    });
    modalWrapper = document.body.querySelector('.test');
    expect(modalWrapper).toBeNull();
  });
});
