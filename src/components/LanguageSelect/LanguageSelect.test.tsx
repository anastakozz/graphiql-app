import { ReactNode } from 'react';
import { ContextProps } from '../../lib/context';
import userContext from '../../lib/context';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelect from './LanguageSelect';

import en from '../../localization/en.json';

const customRender = (
  ui: ReactNode,
  { providerProps, ...renderOptions }: { providerProps: { value: ContextProps } }
) => {
  return render(
    <userContext.Provider {...providerProps}>{ui}</userContext.Provider>,
    renderOptions
  );
};

describe('LanguageSelect component', () => {
  const mockContext: ContextProps = {
    localData: en,
    changeLocalData: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    customRender(<LanguageSelect />, { providerProps: { value: mockContext } });
    expect(screen.getByRole('button', { name: /ru/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /en/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /es/i })).toBeInTheDocument();
  });

  it('renders active button based on language in context', () => {
    customRender(<LanguageSelect />, { providerProps: { value: mockContext } });
    const activeButton = screen.getByRole('button', { name: /en/i });
    expect(activeButton).toHaveClass('language-button-active');
  });

  it('calls changeLocalData with correct language code when a button is clicked', () => {
    customRender(<LanguageSelect />, { providerProps: { value: mockContext } });

    const ruButton = screen.getByRole('button', { name: /ru/i });
    const enButton = screen.getByRole('button', { name: /en/i });
    const esButton = screen.getByRole('button', { name: /es/i });

    fireEvent.click(ruButton);
    expect(mockContext.changeLocalData).toHaveBeenCalledWith('ru');

    fireEvent.click(enButton);
    expect(mockContext.changeLocalData).toHaveBeenCalledWith('en');

    fireEvent.click(esButton);
    expect(mockContext.changeLocalData).toHaveBeenCalledWith('es');
  });
});
