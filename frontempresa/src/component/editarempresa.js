import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//react-bootstrap
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

    const EditarEmpresaComponent = ({onClick,id},props) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const [shownegative, setShownegative] = useState(false);
	const handleCloses = () => setShownegative(false);
	const [datos, setDatos] = useState({
		id: "",
		nombre: "",
		direccion: "",
		nit: "",
		telefono: "",
		
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
                "http://localhost:8000/api/empresas/" + datos.id,
                {
                //.put(`${this.baseUrl}` + todo.id, todo,this.httpOptions);
                    mode: "cors",
                    method: "PUT",
                    json: true,
                    headers: new Headers({
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }),
                    body: JSON.stringify(datos)
                }
            );
			//alert("Contrato actualizado exitosamente");
			console.log("res", res);
			setShow(true);
		} catch (error) {
			setShownegative(true);
			//alert("Ocurrió un error al actualizar el contrato");
			console.error("error al actualizar contrato", error);
		}
	};
	useEffect(
		() => {
			setDatos({
				id: props.id,
				nombre: props.nombre,
				direccion: props.direccion,
				nit: props.nit,
				telefono: props.telefono
				
			});
		},
		[props.direccion, props.id, props.nit, props.nombre, props.telefono, setDatos]
	);
	return (
		<div className="ml-5 border p-2">
			<h2>Contrato</h2>
			<Form onSubmit={enviarDatos}>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>id</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							type="text"
							placeholder=""
							value={id}
							onChange={handleInputChange}
							name="id"
							disabled={true}
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>Nombre</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							type="text"
							value={datos.nombre}
							onChange={handleInputChange}
							name="nombre"
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
							type="text"
							value={datos.direccion}
							onChange={handleInputChange}
							name="direccion"
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>nit</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							type="text"
							value={datos.nit}
							onChange={handleInputChange}
							name="nit"
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>telefono</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							type="text"
							value={datos.telefono}
							onChange={handleInputChange}
							name="telefono"
						/>
					</Col>
				</Row>

				{/* <Button className="my-2" variant="primary" type="submit">
					Enviar
				</Button>{" "} */}
				{/* <Button className="my-3" variant="primary" onClick={handleShow} type="submit">
					Enviar
				</Button> */}
				<Button className="my-3" variant="primary" type="submit">
					Enviar
				</Button>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton />
					<Modal.Body>Contrato actualizado exitosamente</Modal.Body>
					<Modal.Footer>
						<Button variant="success" onClick={handleClose,onClick}>
							OK
						</Button>
					</Modal.Footer>
				</Modal>
			</Form>
		</div>
	);
};
EditarEmpresaComponent.propTypes = {
	//general
	id: PropTypes.string,
	nombre: PropTypes.string,
	direccion: PropTypes.string,
	nit: PropTypes.string,
	telefono: PropTypes.string,
	
};
export default EditarEmpresaComponent;