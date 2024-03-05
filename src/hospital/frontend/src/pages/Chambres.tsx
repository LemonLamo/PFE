import Card from "../components/UI/Card";
import CreatePatientModal from "../components/CreatePatientModal";
import Table from "../components/UI/Tables/Table";
import TableEntry from "../components/UI/Tables/TableEntry";
import { useMemo } from "react";

function Chambres() {
  const chambres = useMemo<Chambre[]>(() => {
    let data = [{ num: "13", etage: "123", nb_lits: "8", taux: "4/8 (50%)" }];
    return data
  }, []);

  return (
    <>
      <Card title="Chambres" action={<CreatePatientModal />}>
        <Table fields={["Num", "Etage", "Nombre de lits", "Taux d'occupation", "", ]}>
          {chambres.map((chambre) => (<TableEntry data={Object.values(chambre)}></TableEntry>))}
        </Table>
      </Card>
    </>
  );
}

export default Chambres;
