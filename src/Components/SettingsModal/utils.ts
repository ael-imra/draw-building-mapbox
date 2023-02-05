import { SettingsAction, SettingsActionKind, SettingsState } from './types';

export const settingReducer = (state: SettingsState, action: SettingsAction) => {
  const { value, type } = action;

  // Check the type of the action and update the properties in the state
  if (type === SettingsActionKind.STATE_COVERAGE) state.coverage = value;
  if (type === SettingsActionKind.STATE_FLOOR_NUMBER) state.floorNumber = value;
  if (type === SettingsActionKind.STATE_FLOOR_HEIGHT) state.floorHeight = value;

  // Return a new state object, which is a shallow copy of the original state object with the updated properties
  return { ...state };
};
