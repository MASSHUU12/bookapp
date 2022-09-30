import { createNavigationContainerRef } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/**
 * A navigational function that does not throw errors unreasonably.
 */
export const navigate = (target: string): void => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(target));
  }
};
