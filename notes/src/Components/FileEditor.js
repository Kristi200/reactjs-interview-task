import React, { useState,useEffect } from 'react'
import {v4 as uuidv4} from 'uuid';

const FileEditor = ({setSelectedField, selectedField, setCategoryData }) => {
    const [formData, setFormData] = useState({
        title: '',
        comment: ''
    });
    

    console.log(selectedField)
    
    useEffect(() => {
        if(selectedField){
            setFormData(selectedField)
        }
    },[selectedField])

    const handleChange = ( e ) => {
        setFormData((prevData) => ({
            ...prevData,[e.target.name]: e.target.value
        }))
    };

    const deleteNoteHandler = () => {
        setFormData({
            title: "",
            comment: ""
        })

        if(selectedField && selectedField.id){
            setCategoryData((prevCategoryData) => {
                const updatedCategoryData = prevCategoryData.map((category) => {
                    if(category.subCategorys.some((note) => note.id === selectedField.id)){
                        const updatedSubCategorys = category.subCategorys.filter((note) => note.id !== selectedField.id);
                        return {
                            ...category,
                            subCategorys: updatedSubCategorys
                        }
                    }
                    return category;
                })
                return updatedCategoryData
            })
        }
        
        setSelectedField("");
    }

    const onSubmitHandle = (e) => {
        e.preventDefault();
        
        // Create new note
        if(selectedField.categoryName){
            setCategoryData((prevData) => { 
                const updatedData = prevData.map((category) => {
                    if(category.id === selectedField.id){
                        const newSubCategory = {
                            id: uuidv4(),
                            title: formData.title,
                            comment: formData.comment
                        }
                        return {
                            ...category,
                            subCategorys: [...category.subCategorys,newSubCategory]
                        }
                    }
                    return category
                })
                console.log(updatedData)
                return updatedData
            })
        }

        // Update note
        else{
            setCategoryData((prevData) => {
                const updatedNote = prevData.map((category) => {
                    if(category.id === selectedField.id){
                        const updatedSubCategorys = category.subCategorys.map((subItem) => {
                            if(subItem.id === selectedField.id){
                                return {
                                    ...subItem,
                                    title: formData.title,
                                    comment: formData.comment,
                                };
                            }
                            return subItem
                        });
                        return {
                            ...category,
                            subCategorys: updatedSubCategorys
                        }
                    }
                    return category
                })
                return updatedNote
            })
        }

        setSelectedField("")

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
                <button type="button" className={(selectedField.length !== 0) ? " bg-[#FE4C4A] hover:bg-[#fe4d4acc]" : "hidden"} onClick={deleteNoteHandler}>Delete Note</button>
            </div>
        </form>
    </div>
  )
}

export default FileEditor
