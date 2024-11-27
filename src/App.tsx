import "./App.css";
import DateInputForm from "./components/DateInputForm";
import QRCode from "./components/QRCode";

function App() {
  return (
    <div className="app" style={{ margin: "100px" }}>
      <div>
        <DateInputForm />
      </div>
      <div>
        <QRCode />
      </div>
    </div>
  );
}

export default App;
