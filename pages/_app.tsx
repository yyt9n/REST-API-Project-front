import '../styles/globals.css'
import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

// project内でReactQueryを使用するため
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // reactQrueryClientデフォルトは、fetchに失敗すると3回リトライを繰り返す
      refetchOnWindowFocus: false, // ユーザーがフォーカス当てた時点でfetchが走る
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  // front⇄serverでクッキーのやり取りをする場合に必須
  axios.defaults.withCredentials = true

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      )
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Verdana, sans-serif',
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
    <ReactQueryDevtools/>
  </QueryClientProvider>
  )
}

export default MyApp
