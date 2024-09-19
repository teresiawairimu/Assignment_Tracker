import { jest } from '@jest/globals';

const mockAuth = {
  currentUser: null,
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
};

export const initializeApp = jest.fn();
export const getFirestore = jest.fn();
export const getAuth = jest.fn(() => mockAuth);
export const getAnalytics = jest.fn();
export const createUserWithEmailAndPassword = jest.fn();
export const signInWithEmailAndPassword = jest.fn();

export { mockAuth as auth };
export const db = {};

