export interface SettingsState {
  coverage: number;
  floorNumber: number;
  floorHeight: number;
}

export enum SettingsActionKind {
  STATE_COVERAGE = 'COVERAGE',
  STATE_FLOOR_NUMBER = 'FLOOR_NUMBER',
  STATE_FLOOR_HEIGHT = 'FLOOR_HEIGHT',
}

export interface SettingsAction {
  type: SettingsActionKind;
  value: number;
}
