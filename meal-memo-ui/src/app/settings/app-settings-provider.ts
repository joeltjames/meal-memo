import { InjectionToken } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SettingsProvider {
}

export const SETTINGS_PROVIDER = new InjectionToken<SettingsProvider>(
    'SettingsProvider'
);
