import React, { useRef, useState, useEffect,useCallback } from 'react'
import './FileDialog.css'
import  { useDropzone }  from  'react-dropzone'
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";

/* 
voy a utilizar un servicio de la nube el cual va a ser claudinary, 
la idea es que con el tiempo se va a conectar el formulario 
con el backend y se va a enviar la imagen a claudinary, 
pero por ahora solo se va a mostrar la imagen en la consola
para verificar que se esta capturando correctamente el archivo seleccionado por el usuario.

lo que se hace acontinuacion es considerado como una mala practica :v
*/

function FileDialog() {
   /*  const [file, setFile] = useState() */ // estado para almacenar el archivo seleccionado
    const [preview, setPreview] = useState(null) // estado para almacenar la url de la imagen seleccionada
  
    const onDrop =  useCallback ( acceptedFiles  =>  {   
        //se encarga de manejar el evento de selcion de el archivo
        const file = acceptedFiles[0] // se obtiene el primer archivo seleccionado por el usuario
        if (file) { 
            setPreview(URL.createObjectURL(file)) // se crea una url para mostrar la imagen seleccionada por el usuario
        }
    },  [] ) 
    
    const  { getRootProps , getInputProps , isDragActive, acceptedFiles }  =  useDropzone ( { onDrop } )//
    
    const handleChanfeImage = () => {
        setPreview(null) // se limpia la url de la imagen seleccionada por el usuario
    }
// para capturar los datos, toca capturar el evento de envio de el formulario
    const handleSubmit = async event => {
        event.preventDefault()// esto es para evitar que se recargue la pagina cuando se envie el formulario
        const formData = new FormData() // se crea un objeto de tipo FormData para enviar el archivo al backend
        formData.append('file', acceptedFiles[0]) // se agrega el archivo al objeto FormData con la clave 'file'
        formData.append('upload_preset', 'dav32erzro') // se agrega el preset de claudinary para que se pueda subir la imagen a la nube
        formData.append('api_key', '172463377995151') // se agrega la api key de claudinary para que se pueda autenticar la solicitud
        
        const res = await fetch('https://api.cloudinary.com/v1_1/dz6ohgjub/image/upload', {
            method: 'POST',
            body: formData
        });

    const data = await res.json()
    console.log(data) // aqui se muestra la respuesta de claudinary en la consola, la cual contiene la url de la imagen subida a la nube
}



return (
    <>
        <div  { ... getRootProps ( ) } className="file-dialog">
            <form onSubmit={handleSubmit}>
                {preview ? ( /* si hay una imagen , muestra la imagen y el boton para cambiarla  */
                    <div className="preview-container">
                        <img src={preview} alt="preview" />
                        <div className='preview-buttons'>
                            <button type='button' onClick={handleChanfeImage}>Cambiar Imagen</button>
                            <button type="submit">Subir</button>
                        </div>
                        <p><AiOutlineDashboard /> Asegúrate de que la imagen sea nítida y muestre el vehículo completo. Esto agiliza el proceso de validación.</p>
                    </div>
                ):(// si no hay una imagen, muestra el area de dropzone para seleccionar una imagen
                    < div  className='preview-container'>
                        <input {...getInputProps ( ) } /> 
                        {isDragActive ? ( 
                            <p>Suelta la imagen aquí...</p>
                        ) : ( 
                            <p>Arrastra la imagen aquí o haz clic para seleccionar una imagen<BiImageAdd /></p>
                            )}
                        </ div >
                )}
            </form>
        </ div >     
    </>
    )
}




/*         <div className="file-dialog">
            <div className='conainer-data'>
                    <p>Arrastra la imagen aquí o</p>
                  
            </div>
        </div> */


export default FileDialog