import React, { Fragment, useEffect } from 'react'

interface Props {
  file: any
}

function UploadFile ({ file } :Props) {
  useEffect(() => {
    const reader = new FileReader();
    if (file) {
      reader.onload = function(){
        const output = document.getElementById('output-'+ file.name) as any
        output.src = reader.result;
      };
    }
    reader.readAsDataURL(file);
  },[file])
  return (
    <Fragment>
      {!file && <div></div>}
      {file && <div style={{ width: '100px', height: '100px', marginRight: '20px'}}>
      <img className="img-responsive w-100" id={"output-" + file.name}></img>
      </div>}
    </Fragment>
  )
}

export default UploadFile