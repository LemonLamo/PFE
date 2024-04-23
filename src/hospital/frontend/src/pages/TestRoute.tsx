import Card from "../components/UI/Card";
import Button from "../components/UI/Buttons/Button";
import AlertsContext from "../hooks/AlertsContext";
import { useContext } from "react";

function TestRoute() {
  const { showAlert } = useContext(AlertsContext);

  return (
    <>
      <Card title="Testing route v2.0 REVAMPED" className="w-full max-w-4xl">
        <Button theme="primary"  onClick={() => showAlert("error", "Hiii all")}>
          This is gonna error out
        </Button>
      </Card>
    </>
  );
}

export default TestRoute;
