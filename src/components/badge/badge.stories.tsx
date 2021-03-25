/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Badge, BadgeProps, badgeColor } from './index';
import { select, withKnobs, text } from '@storybook/addon-knobs';
import { Icon } from '../icon';

export default {
  title: 'Badge',
  component: Badge,
  decorators: [withKnobs],
};

export const knobsBadge = () => (
  <Badge
    status={select<BadgeProps['status']>(
      'status',
      Object.keys(badgeColor) as BadgeProps['status'][],
      'neutral'
    )}
  >
    {text('children', 'i am a badge')}
  </Badge>
);

export const all = () => (
  <div>
    <Badge status="positive">Positive</Badge>
    <Badge status="negative">Negative</Badge>
    <Badge status="neutral">Neutral</Badge>
    <Badge status="error">Error</Badge>
    <Badge status="warning">Warning</Badge>
  </div>
);

export const withIcon = () => (
  <Badge status="warning">
    <Icon icon="check" />
    with icon
  </Badge>
);
