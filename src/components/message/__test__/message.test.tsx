import React from 'react';
import { render, act, fireEvent, cleanup } from '@testing-library/react';
import { message, MessageType } from '../index';
import { Button } from '../../button';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function changeIcon(type: MessageType) {
  cleanup();
  const wrapper = render(
    <Button
      id="btn"
      onClick={() => message[type](<span className="test3">111</span>)}
    >
      but
    </Button>
  );
  const btn = wrapper.container.querySelector('#btn');
  await act(async () => {
    fireEvent.click(btn!);
    await sleep(500);
  });
  expect(document.querySelector('.test3')).toBeTruthy();
}

const fn = jest.fn();

describe('test Message component', () => {
  it('render basic func', async () => {
    const wrapper = render(
      <Button
        id="btn"
        onClick={() => message.default(<span className="test">11</span>)}
      >
        but
      </Button>
    );
    const btn = wrapper.container.querySelector('#btn');
    await act(async () => {
      fireEvent.click(btn!);
      await sleep(500);
    });

    expect(document.querySelector('.test')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
    await act(async () => {
      await sleep(1500);
      expect(document.querySelector('.test')).toBeNull();
    });
  });
  it('can change color', () => {
    const wrapper = render(
      <Button
        id="btn"
        onClick={() =>
          message.default(<span className="test2">22</span>, {
            background: 'blue',
            color: 'red',
          })
        }
      >
        but2
      </Button>
    );
    const btn = wrapper.container.querySelector('#btn');
    act(() => {
      fireEvent.click(btn!);
    });
    const test2 = document.querySelector('.test2');
    expect(test2).toBeTruthy();
    const messageText = document.querySelector('.message-text');
    expect(messageText).toHaveStyle('color: red;');
    expect(messageText).toHaveStyle('background: blue;');
    expect(wrapper).toMatchSnapshot();
  });
  it('callback test', async () => {
    const wrapper = render(
      <Button
        id="btn"
        onClick={() =>
          message.default(<span className="callback">11</span>, {
            callback: fn,
          })
        }
      >
        but
      </Button>
    );
    expect(wrapper).toMatchSnapshot();
    const btn = wrapper.container.querySelector('#btn');
    expect(fn).not.toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(btn!);
      await sleep(2100);
    });
    expect(fn).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('can change icon', async () => {
    await changeIcon('default');
    await changeIcon('error');
    await changeIcon('info');
    await changeIcon('loading');
    await changeIcon('success');
    await changeIcon('warning');
  });
  it('animate duration', async () => {
    const wrapper = render(
      <Button
        id="btn"
        onClick={() =>
          message.default(<span className="callback">22</span>, {
            animationDuring: 1000,
            delay: 3000,
          })
        }
      >
        but
      </Button>
    );
    expect(wrapper).toMatchSnapshot();
    const btn = wrapper.container.querySelector('#btn');
    await act(async () => {
      fireEvent.click(btn!);
      await sleep(2100);
    });
  });
});
