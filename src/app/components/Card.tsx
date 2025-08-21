// /src/app/components/Card.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { softUI } from '../theme/softUI';
import ProgressBar from './ProgressBar';
import { spacing } from '../theme/spacing';

interface CardProps {
  title: string;
  subtitle?: string;
  progress?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ title, subtitle, progress, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, softUI.cardShadow, style]} activeOpacity={0.8}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {progress !== undefined && <ProgressBar progress={progress} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.medium,
    marginBottom: spacing.medium,
  },
  title: {
    ...typography.body,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: spacing.small,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.medium,
  },
});

export default Card;```

#### **/src/app/components/SoftButton.tsx**

```tsx
// /src/app/components/SoftButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PhosphorIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { softUI } from '../theme/softUI';
import { spacing } from '../theme/spacing';

interface SoftButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof PhosphorIcons.glyphMap;
  type?: 'primary' | 'secondary';
}

const SoftButton: React.FC<SoftButtonProps> = ({ title, onPress, icon, type = 'primary' }) => {
  const containerStyle = type === 'primary' ? styles.primaryContainer : styles.secondaryContainer;
  const textStyle = type === 'primary' ? styles.primaryText : styles.secondaryText;
  
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress} activeOpacity={0.8}>
      {icon && <PhosphorIcons name={icon} size={20} color={textStyle.color} style={styles.icon} />}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 12,
    ...softUI.buttonShadow,
  },
  primaryContainer: { backgroundColor: colors.primary },
  secondaryContainer: { backgroundColor: colors.secondary },
  primaryText: { color: '#FFFFFF', fontWeight: 'bold' },
  secondaryText: { color: colors.textPrimary, fontWeight: 'bold' },
  icon: { marginRight: spacing.small },
});

export default SoftButton;
