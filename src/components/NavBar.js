import React from "react";
import { authProvider } from "../firebase/firebaseAuth";
import { Link } from "react-router-dom";

const NavBar = ({state}) => {

  return (
    <nav className="dark:bg-gray-800 text-white border flex justify-between px-12 py-2 font-semibold">
      <div>
        <Link to="/"> Inicio </Link>
      </div>
      {
        !state ?
        <div>
          <Link className="mx-5" to="/login"> Iniciar Sesión </Link>
          <Link className="ml-5" to="/register"> Registrarse </Link>
        </div>
        :
        <div>
          {/* <Link className="mx-5" to="/client"> Cliente </Link>
          <Link className="mx-5" to="/"> Deudas </Link> */}
          <button
            onClick={ ()=> authProvider.logOut() }
          > LogOut</button>
        </div>
      }
     

    </nav>
  );
};

export default NavBar;
