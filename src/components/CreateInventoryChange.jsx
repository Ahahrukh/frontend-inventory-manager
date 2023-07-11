import React from 'react'
import Home from './Home'
import axios from 'axios'
import { useEffect , useState } from 'react'
const CreateInventoryChange = () => {
    const [warehouse , setWarehouse] = useState([])
    const [product , setProduct] = useState([])
    let [warehouseId, setWarehouseId]=useState()
    let [productId , setProductId] = useState()
    let [quantity , setQuantity] = useState()
    let [changeType , setChangeType] = useState()
    let [b2bPrice , setB2bPrice] = useState()
    let [retailPrice , setRetailPrice] = useState()
    let [disable , setDisable] = useState(false)
    let token=localStorage.getItem('token')
    let requiredOptions = {
        1:"Home",
        4:(<button type="button" className="btn btn-primary me-3">
        Logout
      </button>)
    }
    let requiredPaths={
        1:'/',
        
    }
   
    useEffect(()=>{
        const getWarehouse = async (token) => {
            try{
                    let response = await axios.get(`http://localhost:8080/api/v1/warehouse`,{headers:{Authorization:token}})
                    setWarehouse(response.data.result.data)
            }catch(error){
                alert("there is an error")
            }
        }

        const getProduct = async (token) => {
            try{
                let response = await axios.get(`http://localhost:8080/api/v1/product`,{headers:{Authorization:token}})
                setProduct(response.data.result.data)
            }catch(error){
                alert("there is an error")
            }
        }
        getWarehouse(token)
        getProduct(token)
    },[token])  
    const handleCreateInventoryChange = async (e) => {
        e.preventDefault()
        let data={
            warehouse_id:warehouseId,
            product_id:productId,
            quantity:Number(quantity),
            change_type:changeType,
            b2b_price:b2bPrice,
            retail_price:retailPrice
        }
        try {
            await axios.post('http://localhost:8080/api/v1/inventory-change',data,{headers:{Authorization:localStorage.getItem('token')}})
            alert("Inventory Change successful")
        } catch (error) { 
            console.log(error) 
            alert("there is an error")
        }
    }

    const handleChangeType=(e)=> {
        setChangeType(e.target.value)
        e.target.value==='OUTWARD' ? setDisable(true) : setDisable(false) ;
    }

  return (
    <div>
        <Home options={requiredOptions} paths={requiredPaths} />
        <form className="row g-3">
            <div className="col-md-6">
                <label for="inputAddress" className="form-label">Quantity</label>
                <input type="Number" className="form-control" id="inputAddress2" placeholder='Enter Quantity Here' onChange={(e)=> {setQuantity(e.target.value)}} />
            </div>
            <div className="col-md-6">
                <label for="inputAddress2" className="form-label">Change Type</label>
                <select onChange={handleChangeType} >
                    <option value="">select the change type</option>
                    <option value="INWARD">INWARD</option>
                    <option value="OUTWARD">OUTWARD</option>
                </select>
            </div>
            <div className="col-md-6">
                <label for="inputState" className="form-label">Retail Price</label>
                <input type="Number" disabled={disable} className="form-control" id="inputAddress2" placeholder='Enter Retail Price Here' onChange={(e)=> {setRetailPrice(e.target.value)}} />
            </div>
            <div className="col-md-6">
            <label for="inputEmail4" className="form-label">Warehouse</label>
                <select onChange={(e)=>{setWarehouseId(e.target.value)}} >
                    <option value="">select the Warehouse</option>
                    {warehouse.map((elem) => (
                      <option value={elem.id}>{elem.name}</option>  
                    ))}
                </select>
            </div>
            <div className="col-md-6">
                <label for="inputCity" className="form-label">B2B Price</label>
                <input type="Number" disabled={disable} className="form-control" id="inputAddress2" placeholder='Enter B2B Price Here' onChange={(e)=> {setB2bPrice(e.target.value)}} />
            </div>
            <div className="col-md-6">
                <label for="inputPassword4" className="form-label">Product</label>
                <select onChange={(e)=> {setProductId(e.target.value)}} >
                    <option value="">select the product</option>
                    {product.map((elem) => (
                      <option value={elem.id}>{elem.name}</option>  
                    ))}
                </select>
            </div>
            
            <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleCreateInventoryChange}>Create</button>
            </div>
        </form>
        <div className='hi'></div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">
                Copyright © 2023. All rights reserved.
            </div>
        </div> 
    </div>
  )
}

export default CreateInventoryChange