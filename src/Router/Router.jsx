import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root';
import { Suspense } from 'react';

import Home from '../Pages/Home';
import SignUp from '../Pages/SingUp'; // make sure the file name matches
import SignIn from '../Pages/Singin';
import AllIssues from '../Pages/AllIssuses';
import AddIssue from '../Pages/AddIssue';
import MyIssues from '../Pages/MyIssues';
import MyContribution from '../Pages/MyContribution';
import PrivateRouter from './PriveteRouter'; // check file name
import PublicRoute from './PublicRouter';
import Terms from '../Pages/Terms';
import Privacy from '../Pages/Privacyssss';
import Contact from '../Pages/Contact';
import IssueDetails from '../Pages/IssueDetails';
import ContributeCard from '../Pages/ContributeCard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        element: <PrivateRouter />,
        children: [
          {
            path: 'allissues',
            element: <AllIssues />,
            loader: () => fetch('http://localhost:3000/issue'),
          },
          { path: 'addissues', element: <AddIssue /> },
          { path: 'myissues', element: <MyIssues /> },
          { path: 'contribution', element: <MyContribution /> },

          {
            path: '/issue/:id',
            element: <IssueDetails />,
            loader: ({ params }) =>
              fetch(`http://localhost:3000/issue/${params.id}`),
          },
          // { path: 'contribution', element: <ContributeCard /> },
          // {
          //   path: '/contribute',
          //   element:<ContributeCard></ContributeCard>
          // },

          {
            path: '/contributionss/:id',
            element: <ContributeCard />,
            loader: ({ params }) =>
              fetch(`http://localhost:3000/issue/${params.id}`),
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: 'signup', element: <SignUp /> },
          { path: 'signin', element: <SignIn /> },
        ],
      },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);
