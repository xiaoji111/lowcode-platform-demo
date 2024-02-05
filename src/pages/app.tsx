import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routes from '@/routes/index';

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
    </ConfigProvider>
  );
};

export default App;
