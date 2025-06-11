<<<<<<< HEAD
=======
// App.js
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

<<<<<<< HEAD
=======
// Telas
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import TipoCabeloScreen from './screens/TipoCabeloScreen';
import AgendamentoScreen from './screens/AgendamentoScreen';
import ConfirmacaoScreen from './screens/ConfirmacaoScreen';
import AdminAgendamentosScreen from './screens/AdminAgendamentosScreen';
import TesteFirebase from './screens/TesteFirebase';

<<<<<<< HEAD
=======
// Firebase (isso importa e garante que está inicializado)
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
import './firebaseConfig';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="TipoCabelo" component={TipoCabeloScreen} options={{ title: 'Tipo de Cabelo' }} />
        <Stack.Screen name="Agendamento" component={AgendamentoScreen} options={{ title: 'Agendar Horário' }} />
        <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} options={{ title: 'Confirmação' }} />
        <Stack.Screen name="AdminAgendamentos" component={AdminAgendamentosScreen} options={{ title: 'Painel Admin' }} />
        <Stack.Screen name="TesteFirebase" component={TesteFirebase} options={{ title: 'Teste Firebase' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}