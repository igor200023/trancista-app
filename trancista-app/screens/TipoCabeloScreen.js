import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';

const { width } = Dimensions.get('window');

export default function TipoCabeloScreen({ navigation }) {
  const opcoes = [
    'Cabelo liso',
    'Cabelo cacheado',
    'Cabelo ondulado',
    'Cabelo curto',
  ];

  const selecionarTipoCabelo = (tipoSelecionado) => {
    navigation.navigate('Agendamento', { tipoCabelo: tipoSelecionado });
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        { 
          text: 'Sair', 
          onPress: () => navigation.replace('Login') 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Selecione seu tipo de cabelo</Text>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.opcoesContainer}
        showsVerticalScrollIndicator={false}
      >
        {opcoes.map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={styles.botao}
            onPress={() => selecionarTipoCabelo(tipo)}
          >
            <Text style={styles.textoBotao}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 40, 
    paddingHorizontal: width * 0.06 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF2D6B',
    flex: 1,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF2D6B',
  },
  logoutText: {
    color: '#FF2D6B',
    fontSize: 12,
    fontWeight: '600',
  },
  opcoesContainer: {
    paddingBottom: 20,
  },
  botao: {
    backgroundColor: '#FF2D6B',
    padding: 14,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF2D6B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  textoBotao: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});