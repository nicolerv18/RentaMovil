import React, { useRef, useState, useEffect } from 'react'
import './FileDialog.css'

function FileDialog() {

    return (
        <div className="file-dialog">
            <div className='conainer-data'>
                <p>Arrastra la imagen aquí o</p>
                <button type="button"className="btn">Seleccionar imagen</button>
            </div>
        </div>
    )
}

export default FileDialog