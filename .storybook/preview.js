import React from 'react';
import { GlobalStyle } from '../src/components/shared/global';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { color } from '../src/components/shared/styles';

const bgArr = Object.keys(color).map((key) => {
  return {
    name: key,
    value: color[key],
    default: key === 'light' ? true : false,
  };
});
addParameters({
  options: {
    showRoots: true,
  },
  dependencies: {
    withStoriesOnly: true,
    hideEmpty: true,
  },
  backgrounds: [...bgArr],
});
addDecorator(withA11y);
addDecorator((story) => (
  <>
    <GlobalStyle />
    {story()}
  </>
));
const loaderFn = () => {
  return [
    require('../src/stories/0-Welcome.stories.mdx'),
    require('../src/stories/typography.stories.mdx'),
    require('../src/stories/color.stories.mdx'),
  ];
};
configure(loaderFn, module);
