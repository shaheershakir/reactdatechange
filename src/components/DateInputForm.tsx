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
    console.log(date);

    // Call the function to get the date
    const newDate = getDate(date as string);
    const response = await fetch(`http://api.aladhan.com/v1/gToH/${newDate}`);
    const data = await response.json();

    const hijriDate = data.data.hijri.date.split("-").join("/");

    console.log(hijriDate);
    setHijriDate(hijriDate);
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label style={{ padding: "10px" }}>
          Text input: <input name="DateInput" defaultValue="" />
        </label>

        <button type="submit">Convert</button>
      </form>
      <p style={{ fontSize: "2em" }}>{hijriDate}</p>
    </div>
  );
}
