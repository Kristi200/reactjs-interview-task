import React, { useEffect, useState } from 'react';
import { PlusIcon,Folder,DownArrow,RightArrow } from '../Icons';
import FileEditor from './FileEditor';
import data from '../Data/data.json';
import ContentWindow from './ContentWindow';
import CreateNote from './CreateNote';

const Main = () => {
    // Inital Data
    const [categoryData, setCategoryData] = useState([]);  
 
    
    // Store Initial Data
    useEffect(() => {
        setCategoryData(data.notesCategoryData)
    },[])
    
    // Store Selected Category Data 
    const [selectedCategory, setSelectedCategory] = useState([]);
    
    // Store Selected Field Data
    const [selectedField, setSelectedField] = useState([]);
    
    // Sub Categorys Array
    var elementSubCategoryCount = {};

    // Icon switcher
    const [click, setClick] = useState({
        button1: false,
        button2: false,
        button3: false
    });

    // Category Sub Categorys Counter
    if(categoryData){
        categoryData.forEach(function (item){
            var elementId = item.id;
            var subCategoryCount = item.subCategorys.length
            
            elementSubCategoryCount[elementId] = subCategoryCount
        })
    } 

    const buttonSwitcher = (e) => {
        setClick((value) => {
            const updatedState = {};
            Object.keys(value).forEach((key) => {
                updatedState[key] = key === e.target.name
            });
            return updatedState  
        })
    }
    
    const iconSwitcher = (buttonState) => {
        return buttonState ? RightArrow : DownArrow
    }

    return (
        <div>
            {/* Navbar */}
            <div className='bg-[#1F2A44] w-full text-white flex justify-between child:py-3 child:px-3'>
                <button type='button' onClick={() => setSelectedCategory("")}>Your Notes</button>
                <h1>X</h1>
            </div>
            {/* Main Content */}
            <div className='flex w-full bg-neutral-100'>
                {/* Sidebar Content */}
                <div className='bg-white m-2 rounded-md border  min-w-[280px] px-3 py-2 flex flex-col drop-shadow-md overflow-auto h-[90vh]'>
                    <div className='bg-[#71CF48]  rounded-md relative flex justify-center  px-[10px] py-1 cursor-pointer '>
                        <button type='button' className='text-white inline-block  '>Create Category</button>
                        <img src={PlusIcon} alt='Add Icon' width={25} className='  h-full  absolute top-1/2 -translate-y-1/2 right-3'/>
                    </div>
                    {/* Category List */}
                    <div className='gap-2 flex flex-col mt-2'>
                        {                      
                            categoryData.map(data => {       
                                
                                return(
                                    <div className='bg-[#1264A3] hover:bg-[#1264a3d5] cursor-pointer rounded-md items-center flex justify-between' key={data.id} onClick={(e) => {
                                            setSelectedCategory(data)
                                        }}>
                                        <div className='flex ml-4 items-center gap-2 py-1'>
                                            <img src={Folder} alt="Folder Icon" className='h-[36px]'/>
                                            <button type='button' onClick={buttonSwitcher} name={`button${data.id}`} className=' text-white '>{data.categoryName} ({elementSubCategoryCount[data.id]})</button>
                                        </div>
                                        <img src={iconSwitcher(click[`button${data.id}`])} className='w-4 mr-4' alt='Arrow Icon'/>
                                    </div>
                                )
                            })
                        }                

                    </div>
                </div>
                {
                    (selectedCategory.length === 0)
                    ?    
                        <CreateNote categoryData={categoryData} setCategoryData={setCategoryData} selectedCategory={selectedCategory}/>
                    : 
                        <ContentWindow selectedCategory={selectedCategory} setSelectedField={setSelectedField}/>
                }
                {
                    (selectedField.length !== 0)
                    ?
                        <FileEditor selectedField={selectedField} setSelectedField={setSelectedField} setCategoryData={setCategoryData}/>
                    : 
                        ""
                }
            </div>
        </div>
  )
}

export default Main
