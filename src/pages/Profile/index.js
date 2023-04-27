
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'
import './profile.css';
import { toast } from 'react-toastify'
import {doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../services/fireBaseConnection'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function Profile(){

    const {user, storageUser, setUser, logout} = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    const [nome, setNome] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                toast.error('Envie uma imagem do tipo PNG ou JPEG.');
            }
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        if(imageAvatar === null && nome !== ''){
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                nome: nome
            }).then(()=>{

                let data = {
                    ...user,
                    name: nome
                }

                setUser(data);
                storageUser(data);
                toast.success('Perfil atualizado com sucesso!');
            }).catch((error) => {
                toast.error(error.message);
                console.log(error);
            })
        } else if(nome !== '' && imageAvatar !== null){
            handleUpload()
        }
    }

    async function handleUpload(){
        const currentUid = user.uid;
        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);
        const uploadTask = uploadBytes(uploadRef, imageAvatar).then((snapshot) => {
            getDownloadURL(snapshot.ref).then( async(downloadURL) => {
                let urlFoto = downloadURL;

                const docRef = doc(db, "users", user.uid);
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    nome: nome
                }).then(() => {
                    let data = {
                        ...user,
                        name: nome,
                        avatarUrl: urlFoto
                    }
    
                    setUser(data);
                    storageUser(data);
                    toast.success('Perfil atualizado com sucesso!');
                });
            }) 
        });
           
    }
    return(
        <div>
        <Header/>

        <div className="content">
            <Title name="Minha conta">
            <FiSettings size={25} />
            </Title>

            <div className='container'>
                <form className='form-profile' onSubmit={handleSubmit}>
                    <label className='label-avatar'>
                        <span>
                            <FiUpload color="#FFF" size={25}/>
                        </span>

                        <input type="file" accept="image/*" onChange={handleFile} /> <br/>
                        { avatarUrl == null ? 
                        ( <img src={avatar} alt="Foto de perfil" width={250} height={250}/>) : 
                        ( <img src={avatarUrl} alt="Foto de perfil" width={250} height={250}/>)}
                    </label>

                    <label>Nome</label>
                    <input type="text" value={nome} onChange={(e)=> setNome(e.target.value)}/>

                    <label>Email</label>
                    <input type="text" value={email} disabled/>

                    <button type="submit"> Salvar </button>
                    
                </form>             
            </div>
            <div className="container">
                    <button className="logout-btn" onClick={()=> logout()}>Sair</button>
            </div>
        </div>
        </div>
  )
}