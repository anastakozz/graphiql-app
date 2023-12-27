import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import JsonEditor from './JsonEditor';

describe('JsonEditor component', () => {
  it('renders codemirror with defined value', () => {
    render(<JsonEditor language="json" value="codemirror test value" className="" />);
    const editor = screen.getByText('codemirror test value');
    expect(editor).toBeDefined();
  });
});
