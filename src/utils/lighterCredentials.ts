/**
 * Lighter Credentials Storage
 * Manages storing and retrieving Lighter API credentials
 */

export interface LighterCredentials {
  apiKey: string;
  apiSecret: string;
  accountKey: string;
  apiKeyIndex: string;
  accountIndex: string;
  l1Address: string;
}

const STORAGE_KEY = 'lighter_credentials';

export async function saveLighterCredentials(credentials: LighterCredentials): Promise<void> {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
    console.log('✅ Lighter credentials saved successfully');
  } catch (error) {
    console.error('❌ Failed to save Lighter credentials:', error);
    throw error;
  }
}

export async function getLighterCredentials(): Promise<LighterCredentials | null> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('❌ Failed to get Lighter credentials:', error);
    return null;
  }
}

export async function hasLighterCredentials(): Promise<boolean> {
  const credentials = await getLighterCredentials();
  return credentials !== null;
}

export async function clearLighterCredentials(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ Lighter credentials cleared');
  } catch (error) {
    console.error('❌ Failed to clear Lighter credentials:', error);
    throw error;
  }
}

