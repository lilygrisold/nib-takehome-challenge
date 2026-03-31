import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { server } from '../test/mocks/server';
import RecipeSearch from './RecipeSearch.tsx';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RecipeSearch', () => {
  it('searches and displays recipes', async () => {
    render(<RecipeSearch />);
    
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'beef' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText(/search/i), { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Beef Stew')).toBeDefined();
    });
  });
});