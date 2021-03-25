/* eslint-disable import/no-anonymous-default-export */
import React, { useCallback, useState } from 'react';
import { Radio } from './index';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { color } from '../shared/styles';
import { Icon } from '../icon';

const onChange = action('change');

export default {
  title: 'Radio',
  component: Radio,
  decorators: [withKnobs],
};

export const knobsRadio = () => (
  <Radio
    appearance={select<keyof typeof color>(
      'color',
      Object.keys(color) as (keyof typeof color)[],
      'primary'
    )}
    label={text('label', 'i am a radio')}
    onChange={onChange}
    hideLabel={boolean('hideLabel', false)}
    error={text('error', '')}
    description={text('description', '')}
    disabled={boolean('disabled', false)}
  />
);

export const testColors = () => (
  <div>
    {Object.keys(color).map((item, index) => (
      <Radio
        key={index}
        name="group2"
        label={item}
        appearance={item as keyof typeof color}
      />
    ))}
  </div>
);

export const testOnchange = () => (
  <form>
    <Radio name="group1" label="apple" onChange={onChange} />
    <Radio name="group1" label="banana" onChange={onChange} />
    <Radio name="group1" label="pear" onChange={onChange} />
    <Radio name="group1" label="mongo" onChange={onChange} />
    <Radio name="group1" label="watermelon" onChange={onChange} />
  </form>
);

export const testDisabled = () => <Radio disabled label="disabled" />;

export const testExtraText = () => (
  <Radio
    label="the radio has extra text"
    error="error text"
    description="description text"
  />
);

export const testHideLabel = () => (
  <Radio
    label="the radio has extra text"
    description="label will hidden"
    hideLabel
  />
);

export const withIcon = () => (
  <Radio
    label={
      <span>
        <Icon icon="redux" />
        with icon
      </span>
    }
  />
);

function ParentControl() {
  const [state, setState] = useState(new Array(5).fill(false));
  const arr = ['apple', 'pear', 'banana', 'orange', 'watermelon'];
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      const target = e.target as HTMLInputElement;
      const index = (target.value as unknown) as number;
      let newArr = new Array(5).fill(false);
      newArr[index] = true;
      setState(newArr);
    },
    []
  );
  return (
    <div>
      {arr.map((item, index) => (
        <Radio
          key={index}
          onClick={onClick}
          checked={state[index]}
          label={item}
          value={index}
        />
      ))}
    </div>
  );
}

export const testParentControl = () => <ParentControl />;
