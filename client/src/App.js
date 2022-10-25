import './App.css';
// import data from './fakedata.json';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [show, setShow] = useState(false);
  const [newDealData, setNewDealData] = useState({
    name: '',
    relationshipManager: '',
    dealAmount: '',
  });
  const [dealData, setDealData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const getDealData = async () => {
    setLoadingData(true);
    const response = await axios.get('http://localhost:8080/api/deals');
    const data = await response.data;
    setDealData(false);
    setDealData(data.deals);
  };

  useEffect(() => {
    getDealData();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'name') {
      setNewDealData((prevValue) => {
        return {
          name: value,
          relationshipManager: prevValue.relationshipManager,
          dealAmount: prevValue.dealAmount,
        };
      });
    } else if (name === 'relationshipManager') {
      setNewDealData((prevValue) => {
        return {
          name: prevValue.name,
          relationshipManager: value,
          dealAmount: prevValue.dealAmount,
        };
      });
    } else if (name === 'dealAmount') {
      setNewDealData((prevValue) => {
        return {
          name: prevValue.name,
          relationshipManager: prevValue.relationshipManager,
          dealAmount: value,
        };
      });
    }
  };

  const handleAddNewDeal = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/create/deal',
      data: newDealData,
    })
      .then((res) => {
        console.log(res);
        setNewDealData({
          name: '',
          relationshipManager: '',
          dealAmount: '',
        });
        setShow(false);
        getDealData();
        return;
      })
      .catch((err) => {
        console.log(err);
        return alert(err.message);
      });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '2% 0' }}>
        Welcome to DPS (Deal Processing System)
      </h1>
      <div>
        <Button
          style={{ position: 'absolute', right: '6%', top: '5%' }}
          onClick={handleShow}
        >
          Create New Deal
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Creat New Deal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                name="name"
                onChange={handleChange}
                value={newDealData.name}
              />
            </InputGroup>
            {/* Add Validations to Inputs */}
            <Form.Select
              className="mb-3"
              name="relationshipManager"
              onChange={handleChange}
              value={newDealData.relationshipManager}
            >
              <option>Select a Relationship Manager for your deal</option>
              <option value="Davin Reid">Davin Reid</option>
              <option value="Nina Goldfarb">Nina Goldfarb</option>
            </Form.Select>
            <InputGroup>
              <Form.Control
                name="dealAmount"
                onChange={handleChange}
                value={newDealData.dealAmount}
              />
              <InputGroup.Text>Deal Amount</InputGroup.Text>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleAddNewDeal}>
              Add New Deal
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Deal ID</th>
              <th>Name</th>
              <th>Relationship Manager</th>
              <th>Deal Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr hidden={loadingData}>
              <td>
                <Spinner animation="border"></Spinner>
              </td>
              <td>
                <Spinner animation="border"></Spinner>
              </td>
              <td>
                <Spinner animation="border"></Spinner>
              </td>
              <td>
                <Spinner animation="border"></Spinner>
              </td>
            </tr>
            {dealData.map((deal) => {
              return (
                <tr>
                  <td>{deal.id}</td>
                  <td>{deal.name}</td>
                  <td>{deal.relationshipManager}</td>
                  <td>{deal.dealAmount}</td>
                  <td>
                    <Button variant="danger">Edit Deal</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
