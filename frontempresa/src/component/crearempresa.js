import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//react-bootstrap
import {Row, Col, Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

 const CrearempresaComponent = props => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	const [datos, setDatos] = useState({
		nombre: '',
		direccion: '',
		nit: '',
		telefono: ''
		
	});
	const handleInputChange = event => {
		setDatos({
			...datos,
			[event.target.name]: event.target.value
		});
	};
	const enviarDatos = async event => {
		try {
			event.preventDefault();
			console.log("enviando datos...", datos);
			const res = await fetch(
                "http://localhost:8000/api/empresas/",
                {
                    mode: "cors",
                    method: "POST",
                    json: true,
                    headers: new Headers({
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }),
                    body: JSON.stringify(datos)
                }
            );
			console.log("res", res);
		} catch (error) {
			alert("Ocurrió un error al crear el contrato");
			console.error("error en contrato", error);
		}
	};
	useEffect(
		() => {
            
            setDatos({
				nombre: props.nombre,
				direccion: props.direccion,
				nit: props.nit,
				telefono: props.telefono
				
			});
		},
		[props.direccion, props.nit, props.nombre, props.telefono, setDatos]
	);
	return (
		<div>
			<h2>Crear contrato</h2>
			<Form onSubmit={enviarDatos}>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>Nombre</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							value={datos.nombre}
							name="nombre"
							type="text"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>direccion</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							value={datos.direccion}
							name="direccion"
							type="text"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>NIT</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							value={datos.nit}
							type="text"
							name="nit"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>Telefono</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							value={datos.telefono}
							type="text"
							name="telefono"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
				<Button className="my-3" variant="primary" onClick={handleShow} type="submit">
					Crear
				</Button>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton />
					<Modal.Body>Contrato creado exitosamente</Modal.Body>
					<Modal.Footer>
						<Button variant="success" onClick={handleClose}>
							Ok
						</Button>
					</Modal.Footer>
				</Modal>
				;{/* <Button className="my-3" variant="primary" type="submit">
					Crear
				</Button>{" "} */}
			</Form>
		</div>
	);
};
CrearempresaComponent.propTypes = {
	nombre: PropTypes.string,
	direccion: PropTypes.string,
	nit: PropTypes.string,
	telefono: PropTypes.string
	
};

export default CrearempresaComponent;