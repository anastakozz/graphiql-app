import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('renders GitHub link with correct attributes', () => {
    render(<Footer />);
    const githubLink = screen.getAllByRole('link')[0];

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/anastakozz/graphiql-app/');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders RS School link with correct attributes', () => {
    render(<Footer />);
    const rsSchoolLink = screen.getAllByRole('link')[1];

    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/react/');
    expect(rsSchoolLink).toHaveAttribute('target', '_blank');
    expect(rsSchoolLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/useBrain 2023/i);

    expect(copyrightText).toBeInTheDocument();
  });
});
