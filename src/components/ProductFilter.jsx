import * as React from 'react';
import { useEffect } from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import './default.css';
import * as data from './dataSource.json';
const Default = () => {
    const temp = 'sportsData';
    // define the JSON of data
    const sportsData = data[temp];
    // maps the appropriate column to fields property
    const fields = { text: 'Game', value: 'Id' };
    // set the value to select an item based on mapped value at initial rendering
    return (<div className='control-pane'>
            <div>
            <div>
                <select onChange={(e)=>{setWarehouseId(e.target.value)}} >
                    <option value="">select the Warehouse</option>
                    {warehouse.map((elem) => (
                      <option value={elem.id}>{elem.name}</option>  
                    ))}
                </select>
            </div>
            <div>
                <select onChange={(e)=> {setProductId(e.target.value)}} >
                    <option value="">select the product</option>
                    {product.map((elem) => (
                      <option value={elem.id}>{elem.name}</option>  
                    ))}
                </select>
            </div>
            <div>
                <input type="Number" placeholder='Enter Quantity Here' onChange={(e)=> {setQuantity(e.target.value)}} />
            </div>
            <div>
                <select onChange={(e)=> {setChangeType(e.target.value)}} >
                    <option value="">select the change type</option>
                    <option value="INWARD">INWARD</option>
                    <option value="OUTWARD">OUTWARD</option>
                </select>
            </div>
            <div>
                <input type="Number" placeholder='Enter B2B Price Here' onChange={(e)=> {setB2bPrice(e.target.value)}} />
                <input type="Number" placeholder='Enter Retail Price Here' onChange={(e)=> {setRetailPrice(e.target.value)}} />
            </div>
            <button onClick={handleCreateInventoryChange}>Create</button>
         </div>
        </div>);
};
export default Default;