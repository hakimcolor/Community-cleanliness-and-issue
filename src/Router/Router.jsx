import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root';

import { Suspense } from 'react';
import Home from '../Pages/Home';
import SingUP from '../Pages/SingUp';
import SignIn from '../Pages/Singin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,

        element: (
          <Suspense fallback={<div>loding</div>}>
            <Home />
          </Suspense>
        ),
      },
      // {
      //   element: <PrivateRoute />,
      //   children: [
      //     {
      //       path: '/services',
      //       element: <Services />,
      //     },
      //     {
      //       path: '/profile',
      //       element: <MyProfile />,
      //     },
      //   ],
      // },
      {
        path: '/signup',
        element: <SingUP />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
]);
