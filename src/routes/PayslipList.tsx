import React from 'react';
import Card from '../Card';
interface Payslip {
    id: string;
    startDate: string;
    endDate: string;
    pdf: string;
}

const payslips: Payslip[] = Array.from({ length: 12 }, (_, index) => ({
    id: (index + 1) + "",
    startDate: `2023-01-${index + 1}`,
    endDate: `2023-01-${index + 15}`,
    pdf: `payslip${index + 1}.pdf`,
}));

const PayslipList: React.FC = () => {

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#001f3f' }}>Payslips List</h1>
            {payslips.map((payslip) => (
                <Card key={payslip.id} payslip={payslip} />
            ))}
        </div>
    );
};

export default PayslipList;
