import axios from "axios";
import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Modal from "../components/Modal";
import SpinnerFloating from "../components/SpinnerFloating";
import toast, { Toaster } from 'react-hot-toast';

export const DebtPage = () => {
  const [reload, setReload] = useState(false);
  const [client_id, setClientId] = useState(null);
  const [debts, setDebts] = useState([]);
  const [clients, setClients] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [details, setDetails] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [checked, setChecked] = useState([]);
  const [amount, setAmount] = useState([]);

  const hanldeSearch = (e) => {
    if (client_id !== null && e.key === "Enter") {
      console.log(e.key);
      setReload(true);
      axios
        .get(`http://localhost:8080/debt/query?client_id=${client_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.data !== null) setDebts(response.data);
          else setDebts([]);
          setReload(false);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`http://localhost:8080/client/${client_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.data !== null) setClients([response.data]);
          else setClients([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handlePayDebts = (e) => {
    e.preventDefault();
    checked.map( (debt, index) => {
      axios({
        method: 'post',
        url: "http://localhost:8080/payment",
        data: {
          description: "Pago exitoso",
          direction: "Satelito Norte",
          date: Date.now(),
          amount: amount[index],
          debtId: debt
      }
      })
      .then( res => {
        console.log(res);
        toast.success('Pago realizado exitosamente!');
      })
      .catch( err=> {
        console.log(err)
      });
      
    });
    setShowPayment(false)
    setChecked([]);
    setAmount([]);
    setDebts([]);
  };

  const handleAddChecked = (e, id, monto) => {
    console.log(e.target.checked)
    if(e.target.checked && !checked.includes(id)){
      setChecked([
        ...checked,
        id
      ])
      setAmount([
        ...amount,
        monto
      ])
    } else {
      let array = [];
      let array2 = [];
      for (let index = 0; index < checked.length; index++) {
        const element = checked[index];
        if(element !== id){
          array.push(element)
          array2.push(amount[index]);
        }
      }
      setChecked(array);
      setAmount(array2);
    }
    console.log(checked);
  }

  const handleDetailandConcept = (id) => {
    axios
      .get(`http://localhost:8080/debt/concepts/query?debt_id=${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data !== null) setConcepts(response.data);
        else setConcepts([]);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8080/debtdetail/query?debt_id=${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data !== null) setDetails(response.data);
        else setDetails([]);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowDetail(true);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-5/6 mx-2 mt-10 overflow-y-scroll">
        <div className="text-center">
          <p className="font-bold text-2xl text-black/80"> Realizar Pagos </p>
        </div>
        { reload &&
          <SpinnerFloating/>
        }
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="flex justify-between items-center pb-4">
            <div>
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <svg
                  className="mr-2 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Last 30 days
                <svg
                  className="ml-2 w-3 h-3"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                id="dropdownRadio"
                className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="top"
                // style={"position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px)"}
              >
                <ul
                  className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownRadioButton"
                >
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="filter-radio-example-1"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="filter-radio-example-1"
                        className="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last day
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <label for="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="client_id"
                value={client_id}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Buscar deudas"
                onKeyDown={hanldeSearch}
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  {/* <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div> */}
                </th>
                <th scope="col" className="py-3 px-6">
                  Codigo Cliente
                </th>
                <th scope="col" className="py-3 px-6">
                  Ci
                </th>
                <th scope="col" className="py-3 px-6">
                  Nombre
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            {clients.map((client) => (
              <tbody id={client.id}>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4 w-4">
                    {/* <div className="flex items-center">
                      <input
                        id="checkbox-table-3"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-3" className="sr-only">
                        checkbox
                      </label>
                    </div> */}
                  </td>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {client.id}
                  </th>
                  <td className="py-4 px-6">{client.ci}</td>
                  <td className="py-4 px-6">{client.name}</td>

                  <td className="py-4 px-6">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Ver detalle
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  {/* <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div> */}
                </th>
                <th scope="col" className="py-3 px-6">
                  Codigo Deuda
                </th>
                <th scope="col" className="py-3 px-6">
                  Fecha Creación
                </th>
                <th scope="col" className="py-3 px-6">
                  Fecha Expiración
                </th>
                <th scope="col" className="py-3 px-6">
                  Total
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            {debts.map((debt) => (
              <tbody id={debt.id}>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4 w-4">
                    {/* <div className="flex items-center">
                      <input
                        id={debt.id}
                        type="checkbox"
                        name=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-3" className="sr-only">
                        checkbox
                      </label>
                    </div> */}
                  </td>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {debt.id}
                  </th>
                  <td className="py-4 px-6">{debt.dateCreate}</td>
                  <td className="py-4 px-6">{debt.dateExpiration}</td>
                  <td className="py-4 px-6">{debt.total}</td>
                  <td className="py-4 px-6">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDetailandConcept(debt.id)}
                    >
                      {" "}
                      Ver detalle
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <button
          className="w-96 border p-2 bg-blue-900 rounded-sm text-white mt-2 right-10 absolute"
          onClick={() => { setChecked([]); setShowPayment(true) }}
        >
          {" "}
          Realizar Pago{" "}
        </button>
      </div>
      <Modal
        title="Detalles de Deuda"
        show={showDetail}
        onHidde={() => setShowDetail(false)}
        onCancel={() => setShowDetail(false)}
        titleButton="Aceptar"
      >
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                {/* <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div> */}
              </th>
              <th scope="col" className="py-3 px-6">
                Codigo Detalle
              </th>
              <th scope="col" className="py-3 px-6">
                Monto
              </th>
              <th scope="col" className="py-3 px-6">
                Concepto de Deuda
              </th>
            </tr>
          </thead>
          {details.map((detail, index) => (
            <tbody id={detail.id}>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  {/* <div className="flex items-center">
                      <input
                        id="checkbox-table-3"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-3" className="sr-only">
                        checkbox
                      </label>
                    </div> */}
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {detail.id}
                </th>
                <td className="py-4 px-6">{detail.amount}</td>
                <td className="py-4 px-6">
                  {concepts.length > 0 && concepts.length === details.length ? concepts[index].description : null}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </Modal>
      <Modal
        show={showPayment}
        onCancel={() => setShowPayment(false)}
        onHidde={handlePayDebts}
        title="Pago de Deudas"
        titleButton="Realizar Pagos"
      >
        <div>
          <p className="font-bold text-xl text-blue-900 mb-2"> Resumen </p>
          <form className="mx-3"
            onSubmit = { handlePayDebts }
          >
            {debts.map((debt) => (
              <>
                <hr id={debt.id}></hr>
                <div className="flex justify-between" id={debt.id}>
                  <div className="my-1">
                    <p className="text-black/80 font-medium"> {debt.id} </p>
                    <p className="text-black/80 font-medium"> {debt.dateCreate} </p>
                    {/* <p> Fecha </p> */}
                  </div>
                  <div className="flex">
                    <div className="mr-5">
                      <p className="text-black/80 font-medium"> monto</p>
                      <p className="text-black/80 font-medium"> {debt.total} </p>
                    </div>
                    <input type="checkbox" className=""
                      id={debt.id}
                      name={`input${debt.id}`}
                      onChange = { (e) => handleAddChecked(e, debt.id, debt.total) }
                    />
                  </div>
                </div>
                <hr id={debt.id}></hr>
              </>
            ))}
            <button type="submit" className="text-white bg-blue-800 w-full mt-3 py-1 rounded-sm"
            > Realizar Pago </button> 
          </form>
        </div>
      </Modal>
      <Toaster 
        position="bottom-right"
      />
    </div>
  );
};
