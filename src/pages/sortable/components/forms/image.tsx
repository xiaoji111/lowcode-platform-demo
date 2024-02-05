import { Form, Input, Upload } from 'antd';
import { type FC, useContext } from 'react';

import { SortableContext } from '../..';

const ImageForm: FC = (props) => {
  const context = useContext(SortableContext);
  return (
    <Form
      layout="vertical"
      initialValues={{
        ...context?.currentComponent?.config,
      }}
      onValuesChange={(v, b) => context.onFormValuesChange?.(v, b)}
    >
      <div>
        <p>
          https://sit-marketing-img.bankneo.co.id/news/img/TaiQRHrHrKuSJ3PDmX2ohtmAfXwMXpQ4LUmZSiN-atY.png
        </p>
        <p>
          https://sit-marketing-img.bankneo.co.id/news/img/m_dSK6IxEGpYbefHRSF7iC9RhtIzOMg_zZu1HqlW4_U.png
        </p>
        <p>
          https://sit-marketing-img.bankneo.co.id/news/img/tT60txwVp6Bn6SXQO0bbUn8RTBPH9jtUxeQtwbg-QwA.gif
        </p>
        <p>
          https://sit-marketing-img.bankneo.co.id/news/img/_Li9y7-fzYE0jtlV8k6faf2jTjgwhyTvGFQpogNAA4Y.png
        </p>
      </div>
      <Form.Item label="图片链接" name="url">
        <Input />
      </Form.Item>
      <Form.Item name="link" label="点击跳转链接">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ImageForm;
