import React, { useEffect, useState } from 'react'
import { PlusIcon } from '../Icons';

const ContentWindow = ({selectedCategory,setSelectedField}) => {
    const [subCategorys,setSubCategorys] = useState([]);
    const [searchText, setSearchText] = useState([]);

    useEffect(() => {
        if(selectedCategory && selectedCategory.id){
            setSubCategorys(selectedCategory.subCategorys)
        }
    },[selectedCategory])

    // Search Function
    const searchHandler = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchText(subCategorys.filter(item => item.title.toLowerCase().includes(inputValue)))
    }

    return (
        <div className={(subCategorys.length === 0) ? "hidden" : "bg-white text-black my-2 mr-1 rounded-md  border w-full px-3 py-2 flex flex-col drop-shadow-md overflow-auto"}>
            <div className='flex flex-row gap-2 '>
                {/* Create Note Button */}
                <div  className="bg-[#71CF48] hover:bg-[#71cf48d2] min-w-[200px] w-1/4 border rounded-md relative flex justify-center px-[10px] py-1 cursor-pointer" onClick={() => setSelectedField(selectedCategory)}>
                    <button type='button' className='text-white inline-block'>Create Note</button>
                    <img src={PlusIcon} alt='Add Icon' width={25} className='h-full  absolute top-1/2 -translate-y-1/2 right-3'/>
                </div>
                {/* Search Button */}
                <div className='flex flex-row min-w-[200px] w-1/4 relative'>
                    <input type='text' placeholder='Search' className='pl-3 p-1 w-full outline-none border rounded-md focus:border-neutral-400' onChange={searchHandler} />
                </div>
            </div>
            {/* Notes List */}
            {
                (searchText.length > 0)
                    ?
                        searchText.map(item => {
                            return(
                                <div key={item.id} className='hover:bg-neutral-200 hover:rounded-md hover:p-1 p-1 cursor-pointer my-2' onClick={() => {
                                    setSelectedField(item)
                                }}>
                                    <h1 className='font-medium text-lg'>{item.title}</h1>
                                    <p className='text-sm'>{item.comment}</p>
                                </div>
                            )
                        })

                    :
                        subCategorys.map(item => {
                            return(
                                <div key={item.id} className='hover:bg-neutral-200 hover:rounded-md hover:p-1 p-1 cursor-pointer my-2' onClick={() => {
                                    setSelectedField(item)
                                }}>
                                    <h1 className='font-medium text-lg'>{item.title}</h1>
                                    <p className='text-sm'>{item.comment}</p>
                                </div>
                            )    
                        })
            }
        </div>
    )
}

export default ContentWindow
