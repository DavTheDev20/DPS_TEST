import './App.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import { Form, InputGroup, Spinner, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [showAddDealMenu, setShowAddDealMenu] = useState(false);
  const [showEditDealMenu, setShowEditDealMenu] = useState(false);
  const [dealInFocus, setDealInFocus] = useState({
    id: '',
    name: '',
    relationshipManager: '',
    dealAmount: '',
  });
  const [newDealData, setNewDealData] = useState({
    name: '',
    relationshipManager: '',
    dealAmount: '',
  });
  const [dealData, setDealData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const relationshipManagers = [
    'Davin Reid',
    'Nina Goldfarb',
    'John Doe',
    'Jane Doe',
    'Mike Williams',
  ];

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

  const handleAddDealChange = ({ target }) => {
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
          dealAmount: value.toLocaleString(),
        };
      });
    }
  };

  // Complete this function when api is created for changing db data.
  const handleEditDealChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'focusedName') {
      setDealInFocus((prevValue) => {
        return {
          id: prevValue.id,
          name: value,
          relationshipManager: prevValue.relationshipManager,
          dealAmount: prevValue.dealAmount,
        };
      });
    } else if (name === 'focusedDealAmount') {
      setDealInFocus((prevValue) => {
        return {
          id: prevValue.id,
          name: prevValue.name,
          relationshipManager: prevValue.relationshipManager,
          dealAmount: value,
        };
      });
    }
  };

  const handleEditDealSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'PUT',
      url: `http://localhost:8080/api/deals/edit/${dealInFocus.id}`,
      data: { name: dealInFocus.name, dealAmount: dealInFocus.dealAmount },
    })
      .then((res) => {
        console.log(res);
        setShowEditDealMenu(false);
        getDealData();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
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
        setShowAddDealMenu(false);
        getDealData();
        return;
      })
      .catch((err) => {
        console.log(err);
        return alert(err.message);
      });
  };

  const handleDealDelete = () => {
    axios({
      method: 'DELETE',
      url: `http://localhost:8080/api/deals/delete/${dealInFocus.id}`,
    })
      .then((res) => {
        console.log(res);
        setShowEditDealMenu(false);
        getDealData();
        return;
      })
      .catch((err) => {
        console.log(err);
        return alert(err.message);
      });
  };

  const handleShowAddDealMenu = () => setShowAddDealMenu(true);
  const handleCloseAddDealMenu = () => setShowAddDealMenu(false);
  const handleShowEditDealMenu = () => setShowEditDealMenu(true);
  const handleCloseEditDealMenu = () => setShowEditDealMenu(false);

  const DEALS_TOTAL = () => {
    var totalDealsVal = 0;
    dealData.map((deal) => {
      return (totalDealsVal += deal.dealAmount);
    });
    return totalDealsVal;
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">
            <img
              src="https://img.icons8.com/clouds/100/000000/technology.png"
              alt="DaxTech Logo"
              width="60"
            />{' '}
            DaxTech
          </Navbar.Brand>
        </Container>
      </Navbar>
      <h1 style={{ textAlign: 'center', margin: '2% 0' }}>
        Welcome to DPS (Deal Processing System)
      </h1>
      <div>
        <Modal show={showAddDealMenu} onHide={handleCloseAddDealMenu}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Deal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                name="name"
                onChange={handleAddDealChange}
                value={newDealData.name}
              />
            </InputGroup>
            {/* Add Validations to Inputs */}
            <Form.Select
              className="mb-3"
              name="relationshipManager"
              onChange={handleAddDealChange}
              value={newDealData.relationshipManager}
            >
              <option>Select a Relationship Manager for your deal</option>
              {relationshipManagers.map((name, index) => {
                return (
                  <option value={name} key={index}>
                    {name.toUpperCase()}
                  </option>
                );
              })}
            </Form.Select>
            <InputGroup>
              <Form.Control
                name="dealAmount"
                onChange={handleAddDealChange}
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
          <thead className="mb-5">
            <tr>
              <th>Deal ID</th>
              <th>Name</th>
              <th>Relationship Manager</th>
              <th>Deal Amount</th>
              <th>Deal Date</th>
              <th>
                <Button
                  className="mx-2"
                  variant="success"
                  onClick={async (e) => {
                    e.preventDefault();
                    const res = await axios.get(
                      'http://localhost:8080/api/deals/extract'
                    );
                    console.log(res.data);
                    window.location.replace('/out/deals_extract.csv');
                  }}
                >
                  Export Deals
                </Button>
                <Button onClick={handleShowAddDealMenu}>Create New Deal</Button>
              </th>
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
                <>
                  <tr key={deal.id}>
                    <td>{deal.id}</td>
                    <td>{deal.name}</td>
                    <td>{deal.relationshipManager}</td>
                    <td>$ {deal.dealAmount.toLocaleString()}</td>
                    <td>{new Date(deal.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          handleShowEditDealMenu();
                          setDealInFocus({
                            id: deal.id,
                            name: deal.name,
                            relationshipManager: deal.relationshipManager,
                            dealAmount: deal.dealAmount,
                          });
                        }}
                      >
                        Edit Deal
                      </Button>
                    </td>
                  </tr>
                  <Modal
                    show={showEditDealMenu}
                    onHide={handleCloseEditDealMenu}
                  >
                    <Modal.Header closeButton>
                      Edit Deal ({dealInFocus.name})
                    </Modal.Header>
                    <Modal.Body>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>Name</InputGroup.Text>
                        <Form.Control
                          value={dealInFocus.name}
                          name="focusedName"
                          onChange={handleEditDealChange}
                        />
                      </InputGroup>
                      <Form.Select
                        value={dealInFocus.relationshipManager}
                        disabled
                        className="mb-3"
                      >
                        <option value={dealInFocus.relationshipManager}>
                          {dealInFocus.relationshipManager}
                        </option>
                      </Form.Select>
                      <InputGroup>
                        <Form.Control
                          value={dealInFocus.dealAmount}
                          name="focusedDealAmount"
                          onChange={handleEditDealChange}
                        />
                        <InputGroup.Text>Deal Amount</InputGroup.Text>
                      </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={handleDealDelete}>
                        Delete Deal
                      </Button>
                      <Button
                        variant="warning"
                        type="button"
                        onClick={handleEditDealSubmit}
                        closeButton
                      >
                        Submit Change
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              );
            }).reverse()}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td></td>
              <td></td>
              <td>
                <strong>$ {DEALS_TOTAL().toLocaleString()}</strong>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}

export default App;
