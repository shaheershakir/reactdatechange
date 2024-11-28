import React, { useState } from "react";

export default function DateInputForm() {
  const [hijriDate, setHijriDate] = useState<string | null>(null);

  function getDate(date: string) {
    const newDate = date.split("/").join("-");
    console.log(newDate);
    return newDate;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.currentTarget);
    const date = formData.get("DateInput");
    const dateType = formData.get("dateType");
    console.log(date);
    console.log(dateType);

    // Call the function to get the date
    const newDate = getDate(date as string);

    if (dateType === "gregorian") {
      const response = await fetch(
        `https://api.aladhan.com/v1/hToG/${newDate}`
      );
      const data = await response.json();
      const gregorianDate = data.data.gregorian.date.split("-").join("/");
      setHijriDate(gregorianDate);
    }
    if (dateType === "hijri") {
      const response = await fetch(
        `https://api.aladhan.com/v1/gToH/${newDate}`
      );
      const data = await response.json();
      const hijriDate = data.data.hijri.date.split("-").join("/");
      setHijriDate(hijriDate);
    }
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label style={{ padding: "10px", display: "block" }}>
          Text input: <input name="DateInput" defaultValue="" />
        </label>
        <label>
          <input
            type="radio"
            name="dateType"
            value="hijri"
            defaultChecked={true}
          />{" "}
          Hijri
        </label>
        <label>
          <input type="radio" name="dateType" value="gregorian" /> Gregorian
        </label>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <button style={{ padding: "8px 16px" }} type="submit">
            Convert
          </button>
        </div>
      </form>
      <p style={{ fontSize: "2em" }}>{hijriDate}</p>
    </div>
  );
}
