import { useState, useCallback } from 'react';
import { Component } from '@/types';

const MAX_HISTORY = 50;

export function useHistory(initialState: Component[]) {
  const [history, setHistory] = useState<Component[][]>([initialState]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushToHistory = useCallback((newState: Component[]) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(newState))); // Deep clone
      
      // Limit history size
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
        return newHistory;
      }
      
      return newHistory;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  const undo = useCallback((): Component[] | null => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      return JSON.parse(JSON.stringify(history[newIndex])); // Deep clone
    }
    return null;
  }, [history, historyIndex]);

  const redo = useCallback((): Component[] | null => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      return JSON.parse(JSON.stringify(history[newIndex])); // Deep clone
    }
    return null;
  }, [history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    pushToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    historyIndex,
    historyLength: history.length,
  };
}

