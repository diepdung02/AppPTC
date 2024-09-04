import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type StarRatingProps = {
  rating: number;
  maxRating: number;
  starSize: number;
  starColor: string;
  onRatingChange?: (rating: number) => void; // Callback để thay đổi rating
};

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating, starSize, starColor, onRatingChange }) => {
  const handlePress = (index: number) => {
    if (onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const stars = Array.from({ length: maxRating }, (_, index) => (
    <TouchableOpacity key={index} onPress={() => handlePress(index)}>
      <MaterialCommunityIcons
        name={index < rating ? 'star' : 'star-outline'}
        size={starSize}
        color={starColor}
      />
    </TouchableOpacity>
  ));

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars}
    </View>
  );
};

export default StarRating;
