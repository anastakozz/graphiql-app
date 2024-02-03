import { screen } from '@testing-library/react';
import WelcomePage from './WelcomePage';
import en from '../localization/en.json';
import { customRender } from '../lib/utils/testUtils';

describe('WelcomePage component', () => {
  const mockContext = {
    localData: {
      ...en,
      welcomePage: {
        title: 'Welcome',
        aboutUsTitle: 'About Us',
        aboutProjectTitle: 'About the Project',
        aboutCourseTitle: 'About the Course',
        projectInfo: 'Project information goes here.',
        courseInfo: 'Course information goes here.',
      },
    },
    changeLocalData: vi.fn(),
  };

  vi.mock('../components/AutorizationLinks/AutorizationLinks', () => ({
    __esModule: true,
    default: vi.fn(() => <div data-testid="mocked-autorization-links" />),
  }));

  it('renders WelcomePage with correct content', () => {
    customRender(<WelcomePage />, { providerProps: { value: mockContext } });

    const welcomePage = screen.getByRole('welcome-page');
    expect(welcomePage).toBeInTheDocument();

    const mainTitle = screen.getByRole('heading', { name: /Welcome/i });
    expect(mainTitle).toBeInTheDocument();

    const aboutUsTitle = screen.getByRole('heading', { name: /About Us/i });
    expect(aboutUsTitle).toBeInTheDocument();

    const aboutProjectTitle = screen.getByRole('heading', { name: /About the Project/i });
    expect(aboutProjectTitle).toBeInTheDocument();

    const aboutCourseTitle = screen.getByRole('heading', { name: /About the Course/i });
    expect(aboutCourseTitle).toBeInTheDocument();

    const projectInfo = screen.getByText('Project information goes here.');
    expect(projectInfo).toBeInTheDocument();

    const courseInfo = screen.getByText('Course information goes here.');
    expect(courseInfo).toBeInTheDocument();
  });
});
