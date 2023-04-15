import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log('Usuário deslogado');
        // Adicione aqui o código para redirecionar o usuário para a página de login, por exemplo.
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
};
