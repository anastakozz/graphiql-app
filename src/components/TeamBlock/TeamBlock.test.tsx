import { render, screen } from '@testing-library/react';
import TeamBlock from './TeamBlock';
import { AboutUsType } from '../../lib/commonTypes/types';
import en from '../../localization/en.json';

const mockItem: AboutUsType = {
  fullName: 'Kuzich Yulia',
  img: 'mock-image-url',
  github: 'https://github.com/mockuser',
  nameKey: 'yuliaName',
  roleKey: 'yuliaRole',
  bioKey: 'yuliaBio',
};

describe('TeamBlock component', () => {
  it('renders TeamBlock with correct data', () => {
    render(<TeamBlock data={en.welcomePage} item={mockItem} index={0} />);

    const teamBlock = screen.getByTestId('team-block');
    expect(teamBlock).toBeInTheDocument();

    expect(screen.getByText(en.welcomePage.yuliaName)).toBeInTheDocument();
    expect(screen.getByText(en.welcomePage.yuliaRole)).toBeInTheDocument();
    expect(screen.getByText(/First and foremost/i)).toBeInTheDocument();

    const githubLink = screen.getByTestId('github-link');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', mockItem.github);

    const teamMatePhoto = screen.getByAltText(/team-mate/i);
    expect(teamMatePhoto).toBeInTheDocument();
    expect(teamMatePhoto).toHaveAttribute('src', mockItem.img);
  });

  it('applies the "revert" class when index is odd', () => {
    render(<TeamBlock data={en.welcomePage} item={mockItem} index={1} />);

    const teamBlock = screen.getByTestId('team-block');
    expect(teamBlock).toHaveClass('our-team-section__item_revert');
  });

  it('does not apply the "revert" class when index is even', () => {
    render(<TeamBlock data={en.welcomePage} item={mockItem} index={2} />);

    const teamBlock = screen.getByTestId('team-block');
    expect(teamBlock).not.toHaveClass('our-team-section__item_revert');
  });
});
