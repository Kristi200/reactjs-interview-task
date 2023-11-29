import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';

const CreateNote = ({ categoryData,setCategoryData }) => {
    const [formData, setFormData] = useState({
        id: uuidv4(),
        title: '',
        comment: ''
    });

    const handleChange = ( e ) => {
        setFormData((prevData) => ({
            ...prevData,[e.target.name]: e.target.value
        }))
    };

    const onSubmitHandle = (e) => {
        e.preventDefault();

        const newNote = {
            id: formData.id,
            title: formData.title,
            comment: formData.comment
        };

        setCategoryData((prev) => {
            if(prev.length > 0){
                return [{
                    ...prev[0],
                    subCategorys: [
                        ...prev[0].subCategorys, newNote
                    ]
                },
                ...prev.slice(1)
            ]
            }
        })

        setFormData({
            id: "",
            title: "",
            comment: ""
        })
    }
    
    return (
    <div className="bg-white text-black my-2 mr-1 rounded-md border w-full px-3 py-2 flex flex-col drop-shadow-md">    
        {/* Buttons */}
        <div className='flex justify-between'>
            <div className='flex gap-2 child:w-20 child:h-[34px] child:rounded-md'>
                <button className='bg-[#1264A3] hover:bg-[#1264a3de]' type="button"/>
                <button className='bg-[#1264A3] hover:bg-[#1264a3de]' type="button"/>
                <button className='bg-[#71CF48] hover:bg-[#71cf48de]' type="button"/>
            </div>
            <div className='flex gap-2 child:bg-[#1264A3] child:w-8 child:h-[34px] child:rounded-md child-hover:bg-[#1264a3de]'>
                <button type="button"/>
                <button type="button"/>
                <button type="button"/>
            </div>
        </div>
        {/* Content */}
        <form onSubmit={onSubmitHandle}>
            <input type='text' placeholder='Add a title' name='title' className='mt-4 p-2 border-b w-full pb-5 outline-none' onChange={handleChange} value={formData.title || ''}/>    
            <textarea  placeholder='Write your note here...' name='comment' className='text-sm my-4 p-2 w-full outline-none resize-none h-full' onChange={handleChange}  value={formData.comment || ''}/>   
            <div className="flex justify-between flex-row-reverse child:w-32 child:text-white child:h-[34px] child:rounded-md">
                <button type="submit" className="bg-[#71CF48] hover:bg-[#71cf48d3]">Save Changes</button>
            </div>
        </form>
    </div>
  )
}

export default CreateNote
