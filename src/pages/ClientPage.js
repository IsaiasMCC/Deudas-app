import React, { useState } from "react";
import SideBar from "../components/SideBar";
import ModalGeneric, {} from '../components/ModalGeneric';
import axios from "axios";
import SpinnerFloating from "../components/SpinnerFloating";

import toast, { Toaster } from 'react-hot-toast';

const ClientPage = () => {
  const [reload, setReload] = useState(false);
  const [clients, setClients] = useState([]);
  const [client_ci, setClientCi] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [client, setClient] = useState("");
  const [ci, setCi] = useState("");

  const hanldeSearch = (e) => {
    if (client_ci !== null && e.key === "Enter") {
      console.log(e.key);
      setReload(true);
      axios
        .get(`http://localhost:8080/client/query?ci=${client_ci}`)
        .then((response) => {
          console.log(response.data);
          if (response.data !== null) setClients([response.data]);
          else setClients([]);
          setReload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleAddClient = () => {
    if(![client, ci].includes("")){
      axios({
        method: 'post',
        url: `http://localhost:8080/client`,
        data: {
          name: client,
          ci: ci
        }
      })
      .then( res => {
        console.log(res);
        toast.success('Nuevo usuario agregado exitosamente!');
      })
      .catch( err=> {
        console.log(err)
      });
      // toast.success('Nuevo usuario agregado exitosamente!');
    }
    setShowModal(false)
  }
  return (
    <div className="flex">
      <SideBar/>
      <div className="w-5/6 mx-2 mt-10">
        <div className="text-center">
          <p className="font-bold text-2xl text-black/80"> Buscar Cliente </p>
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
              </div>
            </div>
            <div className="relative">
            <button className="font-medium text-gray-500 dark:text-gray-400 bg-gray-900 mb-3 text-center p-1 shadow-md rounded-md hover:bg-gray-800"
                onClick={ ()=> setShowModal(true)}
              > Agregar Usuario </button>
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pt-10 pointer-events-none">
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
                value={client_ci}
                onChange={(e) => setClientCi(e.target.value)}
                placeholder="Buscar cliente"
                onKeyDown={hanldeSearch}
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
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
              <tbody>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-3"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-3" className="sr-only">
                        checkbox
                      </label>
                    </div>
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
                    <button
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <ModalGeneric
        title="Agregar Cliente"
        titleButton="Agregar Usuario"
        onHidden={ handleAddClient }
        onCancel = {()=> setShowModal(false)}
        show={ showModal}
      >
        <form className="flex flex-col">
        <div className="flex flex-col">
          <label for="client" className="font-medium"> Nombre cliente</label>
          <input className="border-2 border-black/50 bg-gray-200 w-96 pl-2 font-medium py-1 mt-1 rounded-sm"
            id="client"
            type="text"
            name="client"
            value={client}
            onChange = { (e)=> setClient(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-1">
          <label for="client" className="font-medium"> Ci cliente</label>
          <input className="border-2 border-black/50 bg-gray-200 w-96 pl-2 font-medium py-1 mt-1 rounded-sm"
            id="client"
            type="number"
            name="client"
            value={ci}
            onChange = { (e)=> setCi(e.target.value)}
          />
        </div>
        </form>
      </ModalGeneric>
      <Toaster 
        // position="bottom-right"
      />
    </div>
  );
};

export default ClientPage;
