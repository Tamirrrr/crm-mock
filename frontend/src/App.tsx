import {RootStoreProvider} from "./providers/RootStoreProvider";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Auth from "./pages/auth/Auth";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import CustomersPage from "@/pages/crm/Customers.tsx";
import CustomerPage from "@/pages/crm/Customer.tsx";

const App = () => {
    return (
        <RootStoreProvider>
            <Router>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/" element={<Auth/>}/>
                        <Route path="/customers" element={<CustomersPage/>}/>
                        <Route path="/customers/:customerId" element={<CustomerPage/>}/>
                    </Route>
                </Routes>
            </Router>
        </RootStoreProvider>
    );
}

export default App
