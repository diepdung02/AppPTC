import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import COLORS from '../../../../constants/Color'; // Đảm bảo bạn đã định nghĩa các màu ở đây


const VoteScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = () => {
    if (selectedOption) {
      Alert.alert('Bầu chọn thành công', `Bạn đã bầu chọn: ${selectedOption}`);
    } else {
      Alert.alert('Lỗi', 'Vui lòng chọn một tùy chọn trước khi gửi.');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-${COLORS.colorMain}`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-4 text-${COLORS.black}`}>
          Chọn món quà Trung Thu:
        </Text>
        <TouchableOpacity
          style={[
            tw`p-4 rounded-lg mb-2 border border-${COLORS.border} bg-${selectedOption === 'Bánh Trung Thu' ? COLORS.primary : COLORS.white}`,
            { borderColor: selectedOption === 'Bánh Trung Thu' ? COLORS.primary : COLORS.border }
          ]}
          onPress={() => setSelectedOption('Bánh Trung Thu')}
        >
          <Text style={tw`text-lg text-${selectedOption === 'Bánh Trung Thu' ? COLORS.white : COLORS.black}`}>
            Bánh Trung Thu
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw`p-4 rounded-lg mb-2 border border-${COLORS.border} bg-${selectedOption === 'Đèn lồng' ? COLORS.primary : COLORS.white}`,
            { borderColor: selectedOption === 'Đèn lồng' ? COLORS.primary : COLORS.border }
          ]}
          onPress={() => setSelectedOption('Đèn lồng')}
        >
          <Text style={tw`text-lg text-${selectedOption === 'Đèn lồng' ? COLORS.white : COLORS.black}`}>
            Đèn lồng
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw`p-4 rounded-lg mb-2 border border-${COLORS.border} bg-${selectedOption === 'Kẹo' ? COLORS.primary : COLORS.white}`,
            { borderColor: selectedOption === 'Kẹo' ? COLORS.primary : COLORS.border }
          ]}
          onPress={() => setSelectedOption('Kẹo')}
        >
          <Text style={tw`text-lg text-${selectedOption === 'Kẹo' ? COLORS.white : COLORS.black}`}>
            Kẹo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[tw`p-4 rounded-lg  mt-4`, {backgroundColor:COLORS.primary}]}
          onPress={handleVote}
        >
          <Text style={tw`text-lg text-white text-center`}>
            Gửi bầu chọn
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VoteScreen;
