import { Form, Input } from 'antd';
import { type FC, useContext } from 'react';

import ColorPicker from '@/components/color-picker';

import { SortableContext } from '../..';

const ButtonForm: FC = () => {
  const context = useContext(SortableContext);
  return (
    <Form
      layout="vertical"
      initialValues={{
        buttonText: 'Confirm',
        fontColor: 'rgba(250,250,250,1)',
        backgroundColor: 'rgba(248,231,28,1)',
        ...context?.currentComponent?.config,
      }}
      onValuesChange={(v, b) => context.onFormValuesChange?.(v, b)}
    >
      <Form.Item name="backgroundColor" label="背景颜色">
        <ColorPicker />
      </Form.Item>
      <Form.Item name="fontColor" label="文字颜色">
        <ColorPicker />
      </Form.Item>
      <Form.Item name="buttonText" label="按钮文案">
        <Input />
      </Form.Item>
      <Form.Item name="link" label="点击跳转链接">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ButtonForm;
