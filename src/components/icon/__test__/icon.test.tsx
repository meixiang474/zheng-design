import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Icon, IconProps } from '../index';
import { icons } from '../../shared/icons';

function IconTest(icon: IconProps['icon']) {
  const wrapper = render(<Icon icon={icon} />);
  const path = wrapper.getByTestId('icon-path');
  expect(path).toHaveAttribute('d', icons[icon]);
  cleanup();
}

describe('test Icon component', () => {
  it('should render correct icon', () => {
    Object.keys(icons).forEach((key: IconProps['icon']) => {
      IconTest(key);
    });
  });
  it('should render correct with block', () => {
    const wrapper = render(<Icon icon="mobile" block />);
    expect(wrapper).toMatchSnapshot();
    const svg = wrapper.getByTestId('icon-svg');
    expect(svg).toHaveStyle('display: block');
  });
  it('should render correct color', () => {
    let wrapper = render(<Icon icon="mobile" />);
    expect(wrapper).toMatchSnapshot();
    let path = wrapper.getByTestId('icon-path');
    expect(path).toHaveAttribute('color', 'black');
    cleanup();
    wrapper = render(<Icon icon="mobile" color="blue" />);
    path = wrapper.getByTestId('icon-path');
    expect(path).toHaveAttribute('color', 'blue');
  });
});
