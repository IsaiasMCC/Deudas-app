import axios from "axios";
import React, {useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import Spinner from "../components/Spinner";

const DebtConceptPage = () => {
  const [concepts, setConcepts] = useState([]);
  const [state, setState] = useState(false);
  useEffect( ()=> {
    axios
        .get(`http://localhost:8080/debtconcept`)
        .then((response) => {
          console.log(response.data);
          if (response.data !== null) setConcepts(response.data);
          else setConcepts([]);
          setState(true);
        })
        .catch((err) => {
          console.log(err);
        });
  });

  return (
    <div className="flex">
      <SideBar />
      { !state ? 
        <Spinner/>
        :
        <div className="w-full mx-2">
        <div className="my-10">
          <p className="text-center font-bold text-2xl text-black/80"> Concepto de Deudas </p>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
              </th>
              <th scope="col" className="py-3 px-6">
                Codigo Concepto
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Accion
              </th>
            </tr>
          </thead>
          {concepts.map((concept, index) => (
          <tbody>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4 w-4">
              </td>
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {concept.id}
              </th>
              <td className="py-4 px-6">{concept.description}</td>
              <td className="py-4 px-6">{"modificar"}</td>
            </tr>
          </tbody>
          ))}
        </table>
      </div>
      }
    </div>
  );
};

export default DebtConceptPage;
