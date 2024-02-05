import { Form, Input } from 'antd';
import { type FC, useContext } from 'react';

import ColorPicker from '@/components/color-picker';

import { SortableContext } from '../..';

const CanvasForm: FC = () => {
  const context = useContext(SortableContext);
  return (
    <Form
      layout="vertical"
      initialValues={{
        backgroundColor: '',
        ...context?.currentComponent?.config,
      }}
      onValuesChange={(v, b) => context.onCanvasConfigChange?.(v, b)}
    >
      <Form.Item name="backgroundColor" label="背景颜色">
        <ColorPicker />
      </Form.Item>
    </Form>
  );
};

export default CanvasForm;
