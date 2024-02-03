import { PropsWithChildren, ReactNode } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupStore, type RootState } from '../../store';
import { BrowserRouter } from 'react-router-dom';
import userContext, { ContextProps } from '../../lib/context';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: EnhancedStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function customRender(
  ui: ReactNode,
  { providerProps, ...renderOptions }: { providerProps: { value: ContextProps } }
) {
  return render(
    <BrowserRouter>
      <userContext.Provider {...providerProps}>{ui}</userContext.Provider>
    </BrowserRouter>,
    renderOptions
  );
}
