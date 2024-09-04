import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StarRatingProps {
  rating: number;
  maxRating: number;
  starSize?: number;
  starColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating,
  starSize = 24,
  starColor = '#FFD700',
}) => {
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <MaterialCommunityIcons
        key={i}
        name={i <= rating ? 'star' : 'star-outline'}
        size={starSize}
        color={starColor}
      />
    );
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default StarRating;
