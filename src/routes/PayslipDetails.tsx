import { useLocation } from 'react-router-dom';
import { FaFilePdf } from "react-icons/fa";
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';


interface PayslipParams {
    payslip: {
        id: string;
        startDate: string;
        endDate: string;
        pdf: string;
    }
}

function PayslipDetails() {
    const location = useLocation();
    const payslip = location.state.payslip;

    const containerStyle: React.CSSProperties = {
        maxWidth: '600px',
        margin: '20px auto', // Center horizontally with auto left and right margins
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#001f3f',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const detailsStyle: React.CSSProperties = {
        marginTop: '20px',
        textAlign: 'center',
        margin: '30px',
        fontWeight: 'bold',
        fontSize: '1.2em',
        color: '#001f3f',
    };


    const NativeDownload = async (url: string) => {

        const fileUri = (await Filesystem.getUri({
            path: 'public/payslip_temp.pdf',
            directory: Directory.Documents,
        })).uri;


        const link = document.createElement('a');
        link.href = fileUri;
        link.download = 'samplePayslip.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };





    const handleDownloadFile = async () => {
        try {
            const writePermission = await checkWritePermission();
            if (!writePermission) {
                await requestWritePermission();
            }
            const writePermissionAfterRequest = await checkWritePermission();
            if (writePermissionAfterRequest) {
                const fileName = '../../payslip_temp.pdf';
                await saveFile('base64 data', fileName);
            } else {
                console.error('Write permission not granted');
            }
        } catch (error) {
            console.error('Error during file download:', error);
        }
    };

    const checkWritePermission = async () => {
        const permissionResult = await Filesystem.checkPermissions()
        return permissionResult.publicStorage === 'granted';
    };

    const requestWritePermission = async () => {
        const permissionResult = await Filesystem.requestPermissions()
        return permissionResult.publicStorage === 'granted';
    };

    const saveFile = async (content: string, fileName: string) => {
        try {
            const response = await fetch(fileName);
            const pdfBlob = await response.blob();


            if (Capacitor.isNativePlatform()) {

                const fileUri = (await Filesystem.getUri({
                    path: 'public/payslip_temp.pdf',
                    directory: Directory.Documents,
                })).uri;


                NativeDownload(fileUri);
            } else {
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const downloadLink = document.createElement('a');
                downloadLink.href = pdfUrl;
                downloadLink.download = 'samplePayslip.pdf';
                document.body.appendChild(downloadLink);
                downloadLink.click();

                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(pdfUrl);
            }

        } catch (error) {
            console.error('Error saving file:', error);
        }
    };


    return (
        <div style={containerStyle}>
            <h1>Payslip Details</h1>
            <div style={detailsStyle}>
                <p>ID:  {payslip.id}</p>
                <p>Start Date:  {payslip.startDate}</p>
                <p>End Date:    {payslip.endDate}</p>
                <button onClick={handleDownloadFile}><FaFilePdf color='#001f3f' size={'2rem'} /></button>
            </div>
        </div>
    );
};

export default PayslipDetails;
