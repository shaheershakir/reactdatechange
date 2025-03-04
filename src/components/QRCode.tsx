import React, { useState } from "react";

export default function QRCode() {
  const [QRCode, setQRCode] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.currentTarget);
    const input = formData.get("QRinput");

    // Call the function to get the date
    const response = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${input}`
    );
    const data = response.url;

    const QRCode = response.url;

    // setQRCode(QRCode);
    setQRCode(data);
    console.log(QRCode);
  }

  const currentDate = new Date().toISOString().split("T")[0];

  const exipyDateObj = new Date();

  exipyDateObj.setDate(exipyDateObj.getDate() + 60);

  const ExpiryDate = exipyDateObj.toISOString().split("T")[0];

  return (
    <div>
      <form method="post" onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <label
          style={{ display: "flex", padding: "20px", justifyContent: "center" }}
        >
          Code:{" "}
          <textarea
            style={{ margin: "10px", fontSize: "1.3em" }}
            name="QRinput"
            rows={4}
            cols={40}
            defaultValue={`{"id_number":2578439974,"occupation":" عامل انشاءات ","status":"ساري","issue_date":"${currentDate}","expiry_date":"${ExpiryDate}"}`}
          />
        </label>

        <button type="submit">QR Code</button>
      </form>
      {QRCode && <img src={QRCode} alt="QR Code" />}
    </div>
  );
}
