import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WagmiProvider } from 'wagmi'
import { bsc} from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react';


const queryClient = new QueryClient()

const projectId = `${import.meta.env.VITE_API_KEY}`;

const metadata = {
  name: 'LuckyToken',
  description: 'LuckyToken your favorite token, go to the moon! 🚀',
  url: 'http://lucky-interface.vercel.app/',
  icons: ['']
}

const networks = [bsc]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [bsc],
  projectId,
  metadata,
  features: {
    analytics: true
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#0093e7',
    '--w3m-border-radius-master': '1px'
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
