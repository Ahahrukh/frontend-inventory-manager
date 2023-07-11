import axios from 'axios';
import React, { useEffect , useState } from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Home from './Home';
const InventoryChange = () => {
    const [data , setData]=useState([])
    let [page , setPage] = useState(1)
    let [limit, setLimit] = useState(8)
    const [warehouse , setWarehouse] = useState([])
    const [product , setProduct] = useState([])
    let [warehouseId , setWarehouseId] = useState([])
    let [selectWarehouse , setSelectWarehouse] = useState([])
    let [productId , setProductId] = useState([])
    let [changetype , setChangeType]=useState([])
    let [selectProduct , setSelectProduct] = useState([])
    let [selectChangeType , setSelectChangeType] = useState([])
    const [startDate, setStartDate] = useState(new Date('2023-06-05'));
    const [endDate, setEndDate] = useState(new Date());
    let requiredOptions = {
        1:"Home",
        2:'Create-Inventory-Change',
        4:(<button type="button" className="btn btn-primary me-3">
        Logout
      </button>)
    }
    let requiredPaths={
        1:'/',
        2:'/create-inventory',
        
    }
    let token=localStorage.getItem('token')
    let changeTypeFilters=[
        {
            value:'inward',
            label:'INWARD',
        },
        {
            value:'outward',
            label:'OUTWARD',   
        }
    ]
    useEffect(() => {
        async function inventoryChange(token,limit,selectWarehouse,selectProduct,selectChangeType,startDate,endDate) {
            let url=`http://localhost:8080/api/v1/inventory-change/list?limit=${limit}`
            let params={}
            if(selectWarehouse.toString()!==""){params['warehouseId']=selectWarehouse.toString()}
            if(selectProduct.toString()!==""){params['productId']=selectProduct.toString()}
            if(selectChangeType!==[]){params['changetype']=selectChangeType.toString()}
            //if (startDate!=='' && endDate!==''){
                let startDateStatus = new Date(startDate.toISOString().substring(0,10)) ;
                let endDateStatus = new Date(endDate.toISOString().substring(0,10)) ;
                if(endDateStatus < startDateStatus){
                    alert('Please enter a valid date') ;
                    window.location.reload() ;
                }
            //}
            // if(startDate!==''){params['startdate']=startDate.toISOString().substring(0,10)}
            // if(startDate!==''){params['enddate']=endDate.toISOString().substring(0,10)}
            params['startdate']=startDate.toISOString().substring(0,10)
            params['enddate']=endDate.toISOString().substring(0,10)
             try {
                let response=await axios.get(url,{params,headers:{Authorization:token}})
                setData([...response.data.result.data])
             } catch (error) {
                console.log(error);
             }
        }
        inventoryChange(token,limit,selectWarehouse,selectProduct,selectChangeType,startDate,endDate);
    },[token,limit,selectWarehouse,selectProduct,selectChangeType,startDate,endDate])

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
    const handleSelectChangeType =(data)=>{setChangeType(data)
        let selectedChangeType=data.map((elem)=>{
            return elem.value;
        })
    
        setSelectChangeType(selectedChangeType); ;
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
        <section className="vh-100">
                <div className="container-fluid h-custom">
                 <Home options={requiredOptions} paths={requiredPaths} />
                <div className='filtersInventoryChange'>
                
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
                    <div>
                        <Select 
                        options={changeTypeFilters}
                        isMulti
                        value={changetype}
                        onChange={handleSelectChangeType}
                        />
                    </div>
                </div>
                <div className='dateFilter'>
                    <div>
                     <label>Start Date : </label>
                        <DatePicker  selected={startDate}  onChange={(date) => setStartDate(date)} />
                    </div>
                    <div>
                        <lable>End Date :</lable>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </div>
                </div>
                <div className="table-wrapper-scroll-y my-custom-scrollbar" onScroll={handleScroll}>
                <table className="table table-bordered table-striped mb-0">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col">B2B Price</th>
                        <th scope="col">Retail Price</th>
                        <th scope="col">Change Type</th>
                        <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((elem)=>(
                            <tr>
                                <td>{elem.b2b_price!==null?elem.b2b_price:"-"}</td>
                                <td>{elem.retail_price!==null?elem.retail_price:'-'}</td>
                                <td>{elem.change_type}</td>
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

export default InventoryChange 