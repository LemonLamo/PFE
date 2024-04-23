import Alert from "../Alert";

function TableError({ }) {
    return <Alert color='bg-red-400' className='text-center absolute !mb-0'> Échec Réseau - Service injoignable en ce moment. Veuillez réessayer ultérieurement. </Alert>;
}
export default TableError;