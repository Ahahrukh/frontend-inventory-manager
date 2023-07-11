import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Home from './Home'
const Inventory = () => {
    const [data , setData]=useState([])
    const [warehouse , setWarehouse] = useState([])
    const [product , setProduct] = useState([])
    let [warehouseId , setWarehouseId] = useState([])
    let [selectWarehouse , setSelectWarehouse] = useState([])
    let [productId , setProductId] = useState([])
    let [selectProduct , setSelectProduct] = useState([])
    let [page , setPage] = useState(1)
    let [limit, setLimit] = useState(8)
    let token=localStorage.getItem('token')
    let requiredOptions ={
      1:'Home',
      2:'Inventory',
      3:'Orders',
      4:(<button type="button" className="btn btn-primary me-3">
      log out
    </button>)
  }
  let requiredPaths={
      1:'/',
      2:'/inventory',
      3:'/order',
  }

    useEffect(()=>{
      const getInventory = async (token,limit,page,selectWarehouse,selectProduct)=>{
          let url=`http://localhost:8080/api/v1/inventory/list?limit=${limit}`
          let params={}
          if(selectWarehouse.toString()!==""){params['warehouseId']=selectWarehouse.toString()}
          if(selectProduct.toString()!==""){params['productId']=selectProduct.toString()}
          try{
                let response = await axios.get(url,{params,headers:{Authorization:token}})
                setData([...response.data.result.data])
          }catch(error){
              console.log(error)
              alert("there is an error")
          }
      }
       getInventory(token,limit,page,selectWarehouse,selectProduct)
    },[token,limit,page,selectWarehouse,selectProduct]);

    useEffect(()=>{
        const getWarehouse = async (token) => {
            try{
                  let response = await axios.get(`http://localhost:8080/api/v1/warehouse`,{headers:{Authorization:token}})
                  let warehouse = response.data.result.data.map((elem)=>({
                    value: elem.id,
                    label: elem.name,
                  }))
                  setWarehouse(warehouse)
            }catch(error){
                alert("there is an error")
            }
        }

        const getProduct = async (token) => {
          try{
                let response = await axios.get(`http://localhost:8080/api/v1/product`,{headers:{Authorization:token}})
                let products = response.data.result.data.map((elem)=>({
                  value: elem.id,
                  label: elem.name,
                }))
                setProduct(products)
          }catch(error){
              alert("there is an error")
          }
        }
      getWarehouse(token)
      getProduct(token)
    },[token])  
  
  const handleSelectProduct =(data)=>{setProductId(data)
    let selectedProducts=data.map((elem)=>{
      return elem.value;
    })
    setSelectProduct(selectedProducts) ;
  }

  const handleSelectWarehouse =(data)=>{setWarehouseId(data)
    let selectedWarehouse=data.map((elem)=>{
      return elem.value;
    })
    setSelectWarehouse(selectedWarehouse) ;
  }

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight) {
        setPage(page+1)
        setLimit(limit+8)
    }
}

  return (
    <div>
      <Home options={requiredOptions} paths={requiredPaths} />
      <section className="vh-100">
        <div className="container-fluid h-custom">
        <div className='filters'>
            <div>
              <Select
                 options={warehouse}
                 isMulti
                 value={warehouseId}
                 onChange={handleSelectWarehouse}
              />
            </div>
            <div>
            <Select 
             options={product}
             isMulti
             value={productId}
             onChange={handleSelectProduct}
            />
            </div>
        </div>
        <div className="table-wrapper-scroll-y my-custom-scrollbar" onScroll={handleScroll}>
        <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Warehouse Name</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {data.map((elem)=>(
                  <tr>
                    <td>{elem.warehouse_name}</td>
                    <td>{elem.product_name}</td>
                    <td>{elem.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2023. All rights reserved.
            </div>
        </div>
        </section>
    </div>
  )
}

export default Inventory