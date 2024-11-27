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
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input}`
    );
    const data = response.url;

    const QRCode = response.url;

    // setQRCode(QRCode);
    setQRCode(data);
    console.log(QRCode);
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <label
          style={{ display: "flex", padding: "20px", justifyContent: "center" }}
        >
          Code:{" "}
          <textarea
            style={{ margin: "10px" }}
            name="QRinput"
            rows={4}
            cols={40}
          />
        </label>

        <button type="submit">QR Code</button>
      </form>
      {QRCode && <img src={QRCode} alt="QR Code" />}
    </div>
  );
}
