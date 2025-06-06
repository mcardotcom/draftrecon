/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { usePlayerCard } from './usePlayerCard';

describe('usePlayerCard', () => {
  it('should toggle shortlist state', () => {
    const { result } = renderHook(() => usePlayerCard(false));

    expect(result.current.isShortlisted).toBe(false);

    act(() => {
      result.current.toggleShortlist();
    });

    expect(result.current.isShortlisted).toBe(true);
  });
}); 