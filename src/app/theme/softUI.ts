import { ViewStyle } from 'react-native';

export const softUI: { [key: string]: ViewStyle } = {
  cardShadow: {
    shadowColor: '#B0C4DE',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonShadow: {
    shadowColor: '#8A5CFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  navShadow: {
    shadowColor: '#B0C4DE',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  }
};
