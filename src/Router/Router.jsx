import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Root from '../Root/Root';
import PrivateRouter from './PriveteRouter';
import PublicRoute from './PublicRouter';
import Loading from '../Pages/Loding';

// Lazy load all pages
const Home = lazy(() => import('../Pages/Home'));
const SignUp = lazy(() => import('../Pages/SingUp'));
const SignIn = lazy(() => import('../Pages/Singin'));
const AddIssue = lazy(() => import('../Pages/AddIssue'));
const MyContribution = lazy(() => import('../Pages/MyContribution'));
const Terms = lazy(() => import('../Pages/Terms'));
const Privacy = lazy(() => import('../Pages/Privacyssss'));
const Contact = lazy(() => import('../Pages/Contact'));
const IssueDetails = lazy(() => import('../Pages/IssueDetails'));
const ContributeCard = lazy(() => import('../Pages/ContributeCard'));
const AllIssues = lazy(() => import('../Pages/AllIssuses'));
const MYIssues = lazy(() => import('../Pages/MYIssues'));
const NotFound = lazy(() => import('../Pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
        loader: () => fetch('https://community-clen.vercel.app/latest-data'),
      },

      {
        path: 'allissues',
        element: (
          <Suspense fallback={<Loading />}>
            <AllIssues />
          </Suspense>
        ),
        loader: () => fetch('https://community-clen.vercel.app/issue'),
      },

      {
        element: <PrivateRouter />,
        children: [
          {
            path: 'addissues',
            element: (
              <Suspense fallback={<Loading />}>
                <AddIssue />
              </Suspense>
            ),
          },
          {
            path: 'myissues',
            element: (
              <Suspense fallback={<Loading />}>
                <MYIssues />
              </Suspense>
            ),
            loader: () =>
              fetch('https://community-clen.vercel.app/allmyissues'),
          },
          {
            path: 'contribution',
            element: (
              <Suspense fallback={<Loading />}>
                <MyContribution />
              </Suspense>
            ),
            loader: () =>
              fetch('https://community-clen.vercel.app/contrbutessssssssssss'),
          },
          {
            path: '/issue/:id',
            element: (
              <Suspense fallback={<Loading />}>
                <IssueDetails />
              </Suspense>
            ),
            loader: ({ params }) =>
              fetch(`https://community-clen.vercel.app/issue/${params.id}`),
          },
          {
            path: '/allmyissues/:id',
            element: (
              <Suspense fallback={<Loading />}>
                <ContributeCard />
              </Suspense>
            ),
            loader: ({ params }) =>
              fetch(
                `https://community-clen.vercel.app/allmyissues/${params.id}`
              ),
          },
          {
            path: '/contributionss/:id',
            element: (
              <Suspense fallback={<Loading />}>
                <ContributeCard />
              </Suspense>
            ),
            loader: ({ params }) =>
              fetch(`https://community-clen.vercel.app/issue/${params.id}`),
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: 'signup',
            element: (
              <Suspense fallback={<Loading />}>
                <SignUp />
              </Suspense>
            ),
          },
          {
            path: 'signin',
            element: (
              <Suspense fallback={<Loading />}>
                <SignIn />
              </Suspense>
            ),
          },
          // {
          //   path: '/issue/:id',
          //   element: (
          //     <Suspense fallback={<Loading />}>
          //       <IssueDetails />
          //     </Suspense>
          //   ),
          //   loader: ({ params }) =>
          //     fetch(`https://community-clen.vercel.app/issue/${params.id}`),
          // },
        ],
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<Loading />}>
            <Terms />
          </Suspense>
        ),
      },
      {
        path: 'privacy',
        element: (
          <Suspense fallback={<Loading />}>
            <Privacy />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
