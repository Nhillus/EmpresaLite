import React, {Fragment, useState, useEffect } from "react";
import { Button, Table, Modal }  from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import  EditarEmpresa  from '../component/editarempresa.js';
import  CrearEmpresa  from '../component/crearempresa.js';





const App = () => {
	const [empresas, setEmpresas] = useState([]);
	const [editing, setEditing] = useState(false);
	const [creating, setCreating] = useState(0);
	const [show, setShow] = useState(false);
	const [idedit,setIdEdit]= useState();

	function editando(id) {
		isEditando();
		setIdEdit(id);
	}

	
	const isEditando = () => {
		setEditing(!editing);
		
	}
	const isCreando = () => {
		setCreating(!creating);
		
	}


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
		<Fragment>
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

							
						}}
						variant="danger"
						className='m-1'>
							eliminar
						
					</Button>
					<Button onClick={() =>editando(empresa.id)}> 
							editar
							
					</Button>
						
						
					</td>
					</tr> ))}
				</tbody>
				</Table>
						<button onClick={isCreando}> 
							crear empresa
							
						</button>
						
			</div>
			<div>
				{editing === true &&
				<div>
					<EditarEmpresa onClick={isEditando} id={idedit}/>
				</div>
				}
			</div>
			<div>
				{creating === true &&
				<div>
					<CrearEmpresa onClick={isCreando} bool={creating} />
				</div>
				}
			</div>
		
			</Fragment>

	);
};


export default App;