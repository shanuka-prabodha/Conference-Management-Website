import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default function UploadFile(){


    const [file,setFile] = useState(null);
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const dropRef = useRef();


    const onDrop = (files)=>{
        const[uploadedFile] = files;
        setFile(uploadedFile)
    }

    const updateBorder=(dragState)=>{
        if (dragState === 'over') {
            dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
            dropRef.current.style.border = '2px dashed #e9ebeb';
        }
    }


    function handleOnSubmit(e){
        alert(file);
        e.preventDefault();


        const formData = new FormData();

        formData.append('title',title);
        formData.append('description',description);
        formData.append('file',file);
        formData.append('userId',"user id eka");
        formData.append('state',"pending");

        axios.post("http://localhost:8070/upload", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((response) => {
            alert(response.data);

        }).catch((error) => {

            alert(error);
        });
    }


    return (

        <div>
            5
            <form onSubmit={handleOnSubmit} >


                <hr/>
                <label className="font-weight-bold">Enter Title</label>
                <div className="form-check "  >
                    <input  type="text" name="type"
                            onChange={(event)=>{
                                setTitle(event.target.value)
                            }}/>
                </div>

                <label className="font-weight-bold">Enter Description</label>
                <div className="form-check "  >
                    <input  type="text" name="type"
                            onChange={(event)=>{
                                setDescription(event.target.value)
                            }}/>
                </div>

                <div className="upload-section" style={{width:'800px' }}>
                    <Dropzone
                        onDrop={onDrop}
                        onDragEnter={() => updateBorder('over')}
                        onDragLeave={() => updateBorder('leave')}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}   style={{border :'1px solid #000' , height:'200px'}}>
                                <input {...getInputProps()} />
                                <p>Drag and drop a file OR click here to select a file</p>
                                {file && (
                                    <div>
                                        <strong>Selected file:</strong> {file.name}
                                    </div>
                                )}
                            </div>
                        )}
                    </Dropzone>
                </div>


                <button type="submit" className="btn btn-danger" style={{marginLeft:'20px'}}>Upload</button>

            </form>


        </div>

    )





}