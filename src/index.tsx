import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import SelectedPayslip from './routes/PayslipDetails';
import PayslipList from './routes/PayslipList';
import PayslipDetails from './routes/PayslipDetails';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<PayslipList />} />
          <Route path='/payslip/:id' element={<PayslipDetails />} />
          <Route path='*'
            element={
              <main style={{ padding: "1rem" }}>
                <p>There is nothing in this page</p>
                <Link to="/">Back Home!</Link>
              </main>
            }></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
