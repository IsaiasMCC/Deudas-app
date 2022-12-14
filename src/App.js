import AuthProvider from "./auth/AuthProvider";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <PublicRoute> 
      </PublicRoute>
    </AuthProvider>
  );
}

export default App;
