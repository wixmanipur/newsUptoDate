import React, {FC} from 'react';

import {Pressable, Text, StyleSheet} from 'react-native';

type ButtonType = 'primary' | 'secondary';

interface CTAButtonProps {
  title: string;
  variant: ButtonType;
  onPress: () => void;
  disabled: boolean;
}

export const CTAButton: FC<CTAButtonProps> = ({
  title,
  onPress,
  variant,
  disabled,
}) => {
  const containerStyle =
    variant === 'primary' ? styles.containerPrimary : styles.containerSecondary;

  const textStyle =
    variant === 'primary' ? styles.textPrimary : styles.textSecondary;
  return (
    <Pressable onPress={onPress} style={containerStyle} disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerPrimary: {
    height: 60,
    backgroundColor: 'purple',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSecondary: {
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPrimary: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  textSecondary: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});
