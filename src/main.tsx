import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import './theme/spg-theme.scss';
import esCol from './locales/es-COL.json';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from  '@tanstack/react-query-devtools';
import { queryClient } from './config/queryClient.ts';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources:{
    es: {
      global: esCol
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools/>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>      
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
