import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Badge from "../../components/UI/Badge";
import TableLoading from "../../components/UI/Loading";
import Table from "../../components/UI/Tables/Table";
import TableCell from "../../components/UI/Tables/TableCell";
import TableError from "../../components/UI/Tables/TableError";
import TableRow from "../../components/UI/Tables/TableRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config";
import Modal from "../../components/UI/Modal";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedChambre: Chambre,
}

export default function ViewChambreModal({ isOpen, close, selectedChambre} : Props) {
  const query = useQuery<Lit[]>({
    queryKey: ["lits", selectedChambre.num],
    queryFn: async () => {
      let data = (
        await axios.get(`${baseURL}/api/chambres/${selectedChambre.num}/lits`)
      ).data;
      return data;
    },
  });
  return(
    <Modal isOpen={isOpen} icon="fa fa-bed" theme="primary" size="sm:max-w-2xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Visualiser une chambre </h3>
      <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle chambre </p>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <label className="text-sm font-semibold">Numéro de chambre<span className="text-red-500">*</span> </label>
          <input type="text" className="primary" placeholder="Num" value={selectedChambre.num} disabled/>
        </div>

        <div className="col-span-4">
          <label className="text-sm font-semibold">Etage<span className="text-red-500">*</span> </label>
          <select className="primary" value={selectedChambre.etage} disabled>
            <option value={0}>RDC</option>
            <option value={1}>1er</option>
            <option value={2}>2éme</option>
            <option value={3}>3éme</option>
            <option value={4}>4éme</option>
            <option value={5}>5éme</option>
            <option value={6}>6éme</option>
          </select>
        </div>

        <div className="col-span-4">
          <label className="text-sm font-semibold">Nombre de lits<span className="text-red-500">*</span> </label>
          <input type="number" min="0" className="primary" placeholder="Nombre" value={selectedChambre.nombre_lits} disabled/>
        </div>
        
        <div className="col-span-12">
          <label className="text-sm font-semibold">Description </label>
          <textarea className="primary" placeholder="Description" value={selectedChambre.description} disabled/>
        </div>

        <div className="col-span-12">
          <label className="text-sm font-semibold">Lits </label>
          {
            query.isError ? 
              <div className="block w-full ">
                <TableError />
              </div> :

            query.isLoading ? 
              <div className="block w-full ">
                <TableLoading />
              </div> :

            <Table fields={["#", "Type", "Status", "Description"]} className="mb-4 col-span-12 max-h-72">
            {
              query.data!.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="font-bold">{t.num}</TableCell>
                  <TableCell> {t.type} </TableCell>
                  <TableCell>
                    {t.occupe ? <Badge bgColor={"#fee2e2"} textColor={"#991b1b"} className="ms-2">
                        <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />{" "}
                        Occupé
                      </Badge> : <Badge bgColor={"#dcfce7"} textColor={"#267142"} className="ms-2">
                        <CheckCircleIcon className="h-[1.7vh] mr-1" />
                        Disponible
                      </Badge>}
                  </TableCell>
                  <TableCell>{t.description}</TableCell>
                </TableRow>))
            }
            </Table>}
        </div>
      </div>

      <div className="flex justify-end gap-3">
          <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Fermer</button>
      </div>
    </Modal>);
}
  