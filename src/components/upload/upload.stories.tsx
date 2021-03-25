/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {
  select,
  withKnobs,
  text,
  boolean,
  number,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Upload } from './index';
import { Method, AxiosRequestConfig } from 'axios';

const methods: Method[] = [
  'get',
  'GET',
  'delete',
  'DELETE',
  'head',
  'HEAD',
  'options',
  'OPTIONS',
  'post',
  'POST',
  'put',
  'PUT',
  'patch',
  'PATCH',
  'link',
  'LINK',
  'unlink',
  'UNLINK',
];

export default {
  title: 'Upload',
  component: Upload,
  decorators: [withKnobs],
};

export const knobsUpload = () => {
  const uploadMode = select('uploadMode', ['default', 'img'], 'default');
  const axiosConfig: Partial<AxiosRequestConfig> = {
    url: text('url', 'http://localhost:51111/user/uploadAvatar'),
    method: select('method', methods, 'post'),
  };
  const uploadFilename = text('uploadFilename', 'avatar');
  return (
    <Upload
      multiple={boolean('multiple', false)}
      accept={text('accept', '*')}
      slice={boolean('slice', true)}
      progress={boolean('progress', false)}
      max={number('max', 100)}
      onProgress={action('onProgress')}
      onRemoveCallback={action('onRemoveCallback')}
      uploadFilename={uploadFilename}
      axiosConfig={axiosConfig}
      uploadMode={uploadMode}
    />
  );
};

export const imgUpload = () => <Upload uploadMode="img" />;

export const progressUpload = () => <Upload progress={true} />;
