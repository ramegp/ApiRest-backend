import React from 'react'

function Productos(props) {
    return (
        <>
        
        {props.productos?.map((p,i)=>{return(
            <>
            <tr>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.stock}</td>
                <td>{p.price}</td>
                <td>{p.codigo}</td>
            </tr>
            </>
        )})}
        </>
        
    )
}

export default Productos;