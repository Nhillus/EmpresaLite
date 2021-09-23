import React, { useState, useEffect } from "react";
import { Button, Table }  from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";




const App = () => {
	const [empresas, setEmpresas] = useState([]);


	useEffect(() => {
		fetch("http://localhost:8000/api/empresas/", {
			mode: "cors",
			method: "GET",
			json: true,
			headers: new Headers({
				"Content-Type": "application/json",
				Accept: "application/json"
			})
		})
			.then(res => res.json())
			.then(data => {
				setEmpresas(data.empresas);
			});
	}, []);

	

	return (
		
		<div className="container">
			<Table striped bordered hover>
			<thead>
				<tr>
				<th>#</th>
				<th>Nombre</th>
				<th>direccion</th>
				<th>NIT</th>
				<th>Telefono</th>
				<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
			{empresas.map(empresa => (
				<tr key={empresa.id}>
				<td>{empresa.id}</td>
				<td>{empresa.nombre}</td>
				<td>{empresa.direccion}</td>
				<td>{empresa.nit}</td>
				<td>{empresa.telefono}</td> 
				<td> 
				<Button
					onClick={async () => {
						
						const response = await fetch(
							"http://localhost:8000/api/empresas/" + empresa.id,
							{
								mode: "cors",
								method: "DELETE",
								json: true,
								headers: new Headers({
									"Content-Type": "application/json",
									Accept: "application/json"
								}),
							}
						);

						
					}}>
						eliminar
					
				</Button>
					
					
					</td>
				</tr> ))}
			</tbody>
			</Table>
                    <button> 
						crear empresa
					</button>
				</div>

	);
};


export default App;