import React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Teste() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Ir para Outra Tela"
        onPress={() => navigation.navigate('teste')}
      />
    </View>
  );
}


