import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import {type FC, useMemo} from 'react';
import { App } from '@/App.tsx';
import { ErrorBoundary } from '@/ErrorBoundary.tsx';
import {AppRoot} from "@telegram-apps/telegram-ui";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import WebApp from '@twa-dev/sdk';
import DemoGraph from "@/pages/DemoGraph.tsx";
import Graph2D from "@/pages/Graph.tsx";

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  const lp = useLaunchParams();

  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      children: [
        {
          index: true,
          element: <Graph2D/>,
        },
        {
          path: '/demo-graph',
          element: <DemoGraph/>,
        },
      ],
    },
  ]);

  WebApp.expand();
  WebApp.setHeaderColor("#1E2337");
  WebApp.setBackgroundColor("#1E2337");
  WebApp.disableVerticalSwipes()

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles>
        <AppRoot platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
          </QueryClientProvider>
        </AppRoot>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner/>
  </ErrorBoundary>
);


