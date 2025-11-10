// import { createBrowserRouter } from 'react-router-dom';
// import Root from '../Root/Root';

// import { Suspense } from 'react';
// import Home from '../Pages/Home';
// import SingUP from '../Pages/SingUp';
// import SignIn from '../Pages/Singin';
// import Allissuses from '../Pages/AllIssuses';
// import Addissues from '../Pages/AddIssue';

// import MyIssues from '../Pages/MyIssues';
// import MyContribution from '../Pages/MyContribution';
// import PriveteRouter from './PriveteRouter';
// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     children: [
//       {
//         index: true,

//         element: (
//           <Suspense fallback={<div>loding</div>}>
//             <Home />
//           </Suspense>
//         ),
//       },
//       {
//         element: <PriveteRouter />,
//         children: [
//           {
//             path: '/allissues',
//             element: <Allissuses />,
//           },
//           {
//             path: '/addissues',
//             element: <Addissues />,
//           },
//           {
//             path: '/myissues',
//             element: <MyIssues />,
//           },
//           {
//             path: '/contribution',
//             element: <MyContribution></MyContribution>,
//           },
//         ],
//       },
//       {
//         path: '/signup',
//         element: <SingUP />,
//       },
//       {
//         path: '/signin',
//         element: <SignIn />,
//       },
//     ],
//   },
// ]);
import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root';
import { Suspense } from 'react';

import Home from '../Pages/Home';
import SingUP from '../Pages/SingUp';
import SignIn from '../Pages/Singin';
import Allissuses from '../Pages/AllIssuses';
import Addissues from '../Pages/AddIssue';
import MyIssues from '../Pages/MyIssues';
import MyContribution from '../Pages/MyContribution';
import PriveteRouter from './PriveteRouter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        element: <PriveteRouter />,
        children: [
          { path: '/allissues', element: <Allissuses /> },
          { path: '/addissues', element: <Addissues /> },
          { path: '/myissues', element: <MyIssues /> },
          { path: '/contribution', element: <MyContribution /> },
        ],
      },
      { path: '/signup', element: <SingUP /> },
      { path: '/signin', element: <SignIn /> },
    ],
  },
]);
