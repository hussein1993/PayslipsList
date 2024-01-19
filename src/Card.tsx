// Card.tsx
import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

interface Payslip {
    id: string;
    startDate: string;
    endDate: string;
}

interface CardProps {
    payslip: Payslip;
}

const Card: React.FC<CardProps> = ({ payslip }) => {
    const payslipPath = `/payslip/${payslip.id}`;
    return (
        <Link to={payslipPath} color='#001f3f' state={{ payslip: payslip }}>
            <div className="card">
                <h3 color='#001f3f'>
                    {payslip.startDate} - {payslip.endDate}
                </h3>
            </div>
        </Link>
    );
};

export default Card;
