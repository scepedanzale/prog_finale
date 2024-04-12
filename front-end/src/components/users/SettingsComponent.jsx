import React, { useEffect, useState } from 'react'
import useAuthContext from '../../context/AuthContext'
import { server } from '../../api/axios';
import { Alert } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

export default function SettingsComponent() {

    const {user, csrf, logout, destroy} = useAuthContext();

    const [errors, setErrors] = useState([])
    const [alertMsg, setAlertMsg] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword_confirmation, setNewPassword_confirmation] = useState('')

    useEffect(() => {
        const modals = document.querySelectorAll('.modal');
        const modalInstances = Array.from(modals).map(modal => new bootstrap.Modal(modal));
        
        return () => {
            modalInstances.forEach(modal => modal.hide()); // Chiude tutti i modali prima dello smontaggio del componente
        };
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await csrf();
    
        try {
            const response = await server.post('/api/change-password', { old_password: oldPassword, password: newPassword, password_confirmation: newPassword_confirmation });
            if(response.status === 200){
                console.log(response)
                setAlertMsg(response.data.message)
                setShowAlert(true)
            }
        } catch (e) {
            if(e.response.status == 422)
            if(e.response)
              setErrors(e.response.data.error)
        }
    }

    useEffect(()=>{
        console.log(errors)
    } ,[errors])

  return (
    <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5 h-100">
        {showAlert && 
            <Alert variant='success' className='flex items-center gap-2'  onClose={() => setShowAlert(false)} dismissible>
                <FaCheck className='text-success text-lg'/>{alertMsg}
            </Alert>}
        <div className="container-fluid order-1 order-sm-2 border-2 p-3 rounded-md h-100">
            <h1 className='font-bold text-2xl mb-3'>Impostazioni account</h1>
            <div className="row mb-4">
                <p className='font-bold text-xl text-gray-500'>Informazioni personali</p>
                <div className='mt-1 ml-2'>
                    <p>Data di nascita</p>
                    <p>Email</p>
                </div>
            </div>
            {/* password */}
            <div className="row mb-4">
                <p className='font-bold text-xl text-gray-500'>Sicurezza</p>
                <div className='mt-1 ml-2'>
                    <p type="button" data-bs-toggle="modal" data-bs-target="#password_modal" className='max-w-max'>Modifica password</p>
                    <div class="modal fade" id="password_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Cambia immagine profilo</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit}>

                                {/* old password */}
                                <div className="mb-4">
                                    <label htmlFor="old_password" className="block  font-medium leading-6 text-gray-900">Password attuale</label>
                                    <div className="mt-2">
                                        <input 
                                        id="old_password" 
                                        name="old_password" 
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e)=>setOldPassword(e.target.value)}
                                        minLength="8"
                                        required
                                        className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
                                    </div>
                                    {errors.includes('vecchia password') && <div className='text-red-500 text-xs mt-1'>{errors}</div>}
                                </div>
                                {/* new password */}
                                <div className="mb-4">
                                    <label htmlFor="new_password" className="block  font-medium leading-6 text-gray-900">Nuova password</label>
                                    <div className="mt-2">
                                        <input 
                                        id="new_password" 
                                        name="new_password" 
                                        type="password"
                                        value={newPassword}
                                        onChange={(e)=>setNewPassword(e.target.value)}
                                        minLength="8"
                                        required
                                        className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
                                    </div>
                                </div>
                                {/* new password_confirmation */}
                                <div className="mb-4">
                                    <label htmlFor="password_confirmation" className="block  font-medium leading-6 text-gray-900">Password Confirm</label>
                                    <div className="mt-2">
                                        <input 
                                        id="password_confirmation" 
                                        name="password_confirmation" 
                                        type="password"
                                        value={newPassword_confirmation}
                                        onChange={(e)=>setNewPassword_confirmation(e.target.value)}
                                        minLength="8"
                                        required
                                        className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
                                    </div>
                                    {errors.includes('nuova password') && <div className='text-red-500 text-xs mt-1'>{errors}</div>}
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                <button type="submit" class="btn main-color-btn">Salva</button>
                            </div>
                            </form>
                        </div>
                        
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
            <div className="row mt-5 mb-2 flex flex-col">
            {/* logout */}
                <p className='font-semibold text-lg text-red-600 hover:text-red-800 mb-2 max-w-max' type="button" data-bs-toggle="modal" data-bs-target="#logout_modal">
                    Disconnettiti
                </p>
                <div class="modalfade" id="logout_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" className='modal'>
                    <div class="modal-dialog">
                        <div class="modal-content p-3">
                            <div class="text-end">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="text-center">
                                <h1 class="modal-title fs-5 mb-4" id="exampleModalLabel">Vuoi disconnetterti?</h1>
                                <button type="button" class="btn btn-secondary w-25 mr-3" data-bs-dismiss="modal">Annulla</button>
                                <button type="button" class="btn bg-red-700 hover:bg-red-800 text-white w-25" onClick={logout}>Esci</button>
                            </div>
                        </div>
                    </div>
                </div>
            {/* eliminazione */}
                <p className='font-semibold text-lg text-red-600 hover:text-red-800 max-w-max' type="button" data-bs-toggle="modal" data-bs-target="#destroy_account_modal">
                    Elimina Account
                </p>
                <div class="modalfade" id="destroy_account_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" className='modal'>
                    <div class="modal-dialog">
                        <div class="modal-content p-3">
                            <div class="text-end">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="text-center">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Vuoi eliminare il tuo account?</h1>
                                <div class="modal-body mb-2">
                                    <p>Una volta eliminato non potrai più recuperare i tuoi dati.</p>
                                </div>
                                <button type="button" class="btn btn-secondary w-25 mr-3" data-bs-dismiss="modal">Annulla</button>
                                <button type="button" class="btn bg-red-700 hover:bg-red-800 text-white w-25" onClick={()=>destroy(user.id)}>Elimina</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}