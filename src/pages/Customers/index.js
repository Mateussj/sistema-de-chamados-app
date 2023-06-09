import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { db } from '../../services/fireBaseConnection';
import { addDoc, collection} from 'firebase/firestore'
export default function Customers(){

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco]= useState('');


    async function handleRegister(e){
        e.preventDefault();

        if(nome !== '' && cnpj !== '' && endereco !== ''){
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            }).then(() => {
                setNome('');
                setCnpj('');
                setEndereco('');
                toast.sucess("Cadastrado com sucesso!");
            }).catch(err => {
                toast.error("Algo deu errado !");
            });
        } else {
            toast.error("Todos campos são obrigatorios !");
        }
    }
    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25}></FiUser>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label> Nome fantasia</label>
                        <input 
                            type="text" 
                            placeholder="Nome da empresa" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value) }
                        />

                        <label> Cnpj </label>
                        <input 
                            type="text" 
                            placeholder="Nome da empresa" 
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value) }
                        />

                        <label> Endereço </label>
                        <input 
                            type="text" 
                            placeholder="Nome da empresa" 
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value) }
                        />

                        <button type="submit">
                            Salvar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}