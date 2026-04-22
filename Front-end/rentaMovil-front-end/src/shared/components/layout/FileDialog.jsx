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

function FileDialog({onFileChange, file}) {
   /*  const [file, setFile] = useState() */ // estado para almacenar el archivo seleccionado
    const [preview, setPreview] = useState(null) // estado para almacenar la url de la imagen seleccionada
  
    const onDrop =  useCallback ( acceptedFiles  =>  {   
        //se encarga de manejar el evento de selcion de el archivo
        const selectedFile = acceptedFiles[0] // se obtiene el primer archivo seleccionado por el usuario
        if (selectedFile) { 
            setPreview(URL.createObjectURL(selectedFile)) // se crea una url para mostrar la imagen seleccionada por el usuario
            onFileChange(selectedFile); 
        }
    },  [onFileChange] )//aca se anade onFileChange a las dependenciasaaaa     
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    
    const handleChangeImage = () => {
        setPreview(null); // se limpia la url de la imagen seleccionada por el usuario
        if (typeof onFileChange === 'function') onFileChange(null); // notifica que se quito el archivo
    }



return (
    <>
        <div {...getRootProps()} className="file-dialog">
            <div>
                {preview ? ( /* si hay una imagen , muestra la imagen y el boton para cambiarla  */
                    <div className="preview-container">
                        <img src={preview} alt="preview" />
                        <div className='preview-buttons'>
                            <button type='button' onClick={handleChangeImage}>Cambiar Imagen</button>
                        </div>
                        <p><AiOutlineDashboard /> Asegúrate de que la imagen sea nítida y muestre el vehículo completo. Esto agiliza el proceso de validación.</p>
                    </div>
                ) : ( // si no hay una imagen, muestra el area de dropzone para seleccionar una imagen
                    <div className='preview-container'>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Suelta la imagen aquí...</p>
                        ) : (
                            <p>Arrastra la imagen aquí o haz clic para seleccionar una imagen<BiImageAdd /></p>
                        )}
                    </div>
                )}
            </div>
        </div>
    </>
    )
}




/*         <div className="file-dialog">
            <div className='conainer-data'>
                    <p>Arrastra la imagen aquí o</p>
                  
            </div>
        </div> */


export default FileDialog