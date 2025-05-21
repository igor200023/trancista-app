import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Alert, 
  Vibration, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function AgendamentoScreen({ navigation }) {
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [tipoCabelo, setTipoCabelo] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const diasDisponiveis = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const horariosDisponiveis = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const userData = await AsyncStorage.getItem('usuarioLogado');
        const user = JSON.parse(userData);
        setUsuario(user);
        setTipoCabelo(user?.tipoCabelo || '');

        if (diaSelecionado) {
          const q = query(collection(db, 'agendamentos'), where('dia', '==', diaSelecionado));
          const snapshot = await getDocs(q);
          const dados = snapshot.docs.map(doc => doc.data());
          setAgendamentos(dados);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, [diaSelecionado]);

  const handleSelecionarDia = (dia) => {
    setDiaSelecionado(dia);
    setHorarioSelecionado(null);
  };

  const handleAgendar = async (horario) => {
    if (!diaSelecionado) {
      Alert.alert("Erro", "Selecione um dia primeiro.");
      return;
    }

    try {
      const novoAgendamento = {
        dia: diaSelecionado,
        hora: horario,
        tipo: tipoCabelo,
        nome: usuario?.nome || 'Teste',
        email: usuario?.email || '',
      };

      await addDoc(collection(db, 'agendamentos'), novoAgendamento);
      setAgendamentos([...agendamentos, novoAgendamento]);
      setHorarioSelecionado(horario);
      Vibration.vibrate(100);

      Alert.alert('Agendamento Confirmado', `Você agendou para ${diaSelecionado} às ${horario}`);
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      Alert.alert('Erro', 'Não foi possível agendar.');
    }
  };

  const isHorarioOcupado = (hora) =>
    agendamentos.some(a => a.hora === hora);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tipoCabeloText}>Agendamento para: {tipoCabelo}</Text>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Escolha um dia:</Text>
      <View style={styles.diasContainer}>
        {diasDisponiveis.map((dia) => (
          <TouchableOpacity
            key={dia}
            style={[
              styles.botaoDia, 
              diaSelecionado === dia && styles.botaoSelecionado
            ]}
            onPress={() => handleSelecionarDia(dia)}
          >
            <Text style={styles.textoBotao}>{dia}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {diaSelecionado && (
        <>
          <Text style={styles.title}>Horários para {diaSelecionado}:</Text>
          <View style={styles.horariosContainer}>
            {horariosDisponiveis.map((horario) => {
              if (isHorarioOcupado(horario)) return null;

              return (
                <TouchableOpacity
                  key={horario}
                  style={[
                    styles.botaoHorario,
                    horarioSelecionado === horario && styles.botaoSelecionado
                  ]}
                  onPress={() => handleAgendar(horario)}
                >
                  <Text style={styles.textoBotao}>{horario}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      {horarioSelecionado && (
        <View style={styles.confirmacaoContainer}>
          <Text style={styles.confirmado}>
            Agendado: {diaSelecionado} às {horarioSelecionado}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.05,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tipoCabeloText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF2D6B',
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF2D6B',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  diasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  horariosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  botaoDia: {
    backgroundColor: '#FFE4ED',
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    width: width * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoHorario: {
    backgroundColor: '#FFE4ED',
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    width: width * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSelecionado: {
    backgroundColor: '#FF2D6B',
    shadowColor: '#FF2D6B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  textoBotao: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmacaoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  confirmado: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
});