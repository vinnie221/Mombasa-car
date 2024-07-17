import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


import SummaryApi from '../common'
import VerticalCardAuto from '../components/VerticalCardAuto'
import autoProductCategory from '../helpers/autoProductsCategory'

const CaregoryAutoProduct = () => {

    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })



    const [selectCaregory,setSelectCaregory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")




    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterAutoProduct.url,{
        method : SummaryApi.filterAutoProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()

      setData(dataResponse?.data || [])
  
    }

    const handleSelectCaregory = (e)=>{
      const {name,value, checked} = e.target

      setSelectCaregory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCaregory).map(categoryKeyName =>{
        if(selectCaregory[categoryKeyName]){
          return categoryKeyName
        }

        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      //format for url change when change occurs on the check box
      const urlFormat = arrayOfCategory.map((el,index) =>{
        if((arrayOfCategory.length - 1) === index) {
          return `category=${el}`
        }

        return `category=${el}&&`
      })


      navigate("/autoproduct-category?"+urlFormat.join(""))

    },[selectCaregory])

    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }

      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])

  return (
    <div className='container mx-auto p-4'>

      {/**desktop version */}
      <div className='lg:grid grid-cols-[200px,1fr]'>
        {/**left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll hidden'>
          {/**sort by */}
          <div className=''>
            {/* <h3 className='text-base uppercase font-medium text-slate-600 border-b pb-1 border-slate-400'>Sort by</h3> */}

            {/* <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                <label>Price - High to Low</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                <label>Price - Low to High</label>
              </div>
            </form> */}
          </div>


          {/**filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-600 border-b pb-1 border-slate-400'>Category</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
                {
                   autoProductCategory.map((categoryName,index)=>{
                    return(
                      <div className='flex items-center gap-3'>
                        <input type='checkbox' name={"category"} checked={selectCaregory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCaregory}/>
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                   })
                }
            </form>
          </div>


        </div>


        {/**right side (product) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                data.length !== 0 && (
                  <VerticalCardAuto data={data} loading={loading}/>
                )
              }
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CaregoryAutoProduct
