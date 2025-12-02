/**
 * Encryption utilities for Lighter credentials
 */

import CryptoJS from 'crypto-js';

export interface LighterCredentials {
  apiKey: string;
  apiSecret: string;
  accountIndex: string;
  apiKeyIndex: string;
  l1Address: string;
}

// Use a fixed key or derive from wallet signature
const ENCRYPTION_KEY = 'brightside-lighter-2024'; // In production, derive this from user's wallet

export function encryptCredentials(credentials: LighterCredentials): string {
  const jsonString = JSON.stringify(credentials);
  const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
  return encrypted;
}

export function decryptCredentials(encryptedData: string): LighterCredentials | null {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to decrypt credentials:', error);
    return null;
  }
}

