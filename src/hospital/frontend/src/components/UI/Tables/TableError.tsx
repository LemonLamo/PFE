import Alert from "../Alert";

function TableError({ }) {
    return <Alert color='bg-red-400' className='text-center'> Échec Réseau - Serveur injoignable en ce moment. Veuillez réessayer ultérieurement. </Alert>;
}
export default TableError;