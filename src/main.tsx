import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './app/store/store'
import App from './App'
import './index.css'

// Создаем роутер с будущими флагами
const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  }
], {
  future: {
    // v7_startTransition: true,
    // v7_relativeSplatPath: true
  },
})

// Инициализация темы
const initTheme = () => {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved ? saved : prefersDark ? 'dark' : 'light';
  document.documentElement.classList.add(theme);
};

initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
