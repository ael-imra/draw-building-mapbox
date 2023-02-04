import { SettingsAction, SettingsActionKind, SettingsState } from './types';

export const settingReducer = (state: SettingsState, action: SettingsAction) => {
  const { value, type } = action;
  console.log(type === SettingsActionKind.STATE_COVERAGE, value, 'PPPP');
  if (type === SettingsActionKind.STATE_COVERAGE) state.coverage = value;
  if (type === SettingsActionKind.STATE_FLOOR_NUMBER) state.floorNumber = value;
  if (type === SettingsActionKind.STATE_FLOOR_HEIGHT) state.floorHeight = value;
  return { ...state };
};
