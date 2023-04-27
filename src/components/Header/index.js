import './header.css'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import avatarImg from '../../assets/avatar.png'
import { FiHome, FiUser, FiSettings, FiUsers, FiPower } from 'react-icons/fi'
export default function Header(){

    const { user } = useContext(AuthContext);
    const {logout} = useContext(AuthContext);

    async function handleLogout(){
        await logout();
    }

    return (
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt='foto do usuario'></img>
            </div>
            <Link to="/dashboard">
                <FiHome color="#FFF" size={24}/>
                Chamados
            </Link>

            <Link to="/customers">
                <FiUser color="#FFF" size={24}/>
                Clientes
            </Link>

            <Link to="/profile">
                <FiSettings color="#FFF" size={24}/>
                Perfil
            </Link>
            <Link onClick={handleLogout}>
                <FiPower color="#FFF" size={24}/>
                Sair da conta
            </Link>

        </div>
    );
}