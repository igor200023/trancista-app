import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function AdminAgendamentosScreen({ navigation }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [agendamentoEditando, setAgendamentoEditando] = useState(null);
  const [novoDia, setNovoDia] = useState('');
  const [novaHora, setNovaHora] = useState('');
  const [loading, setLoading] = useState(false);

  const diasDisponiveis = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const horariosDisponiveis = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  const carregarAgendamentos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'agendamentos'));
      const dados = [];
      querySnapshot.forEach((documento) => {
        const data = documento.data();
        dados.push({ 
          id: documento.id, 
          ...data,
          dataFormatada: data.timestamp?.toDate().toLocaleString('pt-BR') || 'Data não disponível',
        });
      });

      dados.sort((a, b) => new Date(b.timestamp?.toDate()) - new Date(a.timestamp?.toDate()));
      setAgendamentos(dados);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os agendamentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarAgendamentos);
    return unsubscribe;
  }, [navigation]);

  const excluirAgendamento = async (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este agendamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'agendamentos', id));
              carregarAgendamentos();
              Alert.alert('Sucesso', 'Agendamento excluído com sucesso!');
            } catch (error) {
              console.error('Erro ao excluir:', error);
              Alert.alert('Erro', 'Falha ao excluir agendamento');
            }
          },
        },
      ]
    );
  };

  const abrirModalEdicao = (agendamento) => {
    setAgendamentoEditando(agendamento);
    setNovoDia(agendamento.dia);
    setNovaHora(agendamento.hora);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!novoDia || !novaHora) {
      Alert.alert('Atenção', 'Selecione dia e horário');
      return;
    }

    try {
      await updateDoc(doc(db, 'agendamentos', agendamentoEditando.id), {
        dia: novoDia,
        hora: novaHora,
        timestamp: new Date()
      });
      
      setModalVisible(false);
      carregarAgendamentos();
      Alert.alert('Sucesso', 'Agendamento atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      Alert.alert('Erro', 'Falha ao atualizar agendamento');
    }
  };

  const sair = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Painel Administrativo</Text>
        <TouchableOpacity onPress={sair} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      ) : (
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum agendamento encontrado</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Email:</Text>
                <Text style={styles.cardValue}>{item.email}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Tipo de cabelo:</Text>
                <Text style={styles.cardValue}>{item.tipo}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Dia/Horário:</Text>
                <Text style={styles.cardValue}>{item.dia} às {item.hora}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Data do agendamento:</Text>
                <Text style={styles.cardValue}>{item.dataFormatada}</Text>
              </View>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.editButton]}
                  onPress={() => abrirModalEdicao(item)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => excluirAgendamento(item.id)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Modal de Edição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Agendamento</Text>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Cliente: {agendamentoEditando?.nome}</Text>
              <Text style={styles.modalLabel}>Tipo: {agendamentoEditando?.tipo}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Novo Dia:</Text>
              <View style={styles.optionsContainer}>
                {diasDisponiveis.map(dia => (
                  <TouchableOpacity
                    key={dia}
                    style={[
                      styles.optionButton,
                      novoDia === dia && styles.optionButtonSelected
                    ]}
                    onPress={() => setNovoDia(dia)}
                  >
                    <Text style={
                      novoDia === dia ? 
                      styles.optionTextSelected : 
                      styles.optionText
                    }>
                      {dia}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Novo Horário:</Text>
              <View style={styles.optionsContainer}>
                {horariosDisponiveis.map(hora => (
                  <TouchableOpacity
                    key={hora}
                    style={[
                      styles.optionButton,
                      novaHora === hora && styles.optionButtonSelected
                    ]}
                    onPress={() => setNovaHora(hora)}
                  >
                    <Text style={
                      novaHora === hora ? 
                      styles.optionTextSelected : 
                      styles.optionText
                    }>
                      {hora}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={salvarEdicao}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6c757d',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cardLabel: {
    fontWeight: 'bold',
    width: 120,
    color: '#495057',
  },
  cardValue: {
    flex: 1,
    color: '#212529',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#17a2b8',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#495057',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    margin: 4,
    minWidth: 70,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  optionText: {
    color: '#495057',
  },
  optionTextSelected: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    marginLeft: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});