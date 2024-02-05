import { RouteObject } from 'react-router-dom';

import NotFound from '@/pages/404';
import ReactSortableApp from '@/pages/sortable';

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <ReactSortableApp />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
];

export default routesConfig;
