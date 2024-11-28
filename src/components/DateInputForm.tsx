import React, { useState } from "react";

export default function DateInputForm() {
  const [hijriDate, setHijriDate] = useState<string | null>(null);
  const [dateInputValue, setDateInputValue] = useState("");

  function handleDateInput(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target.value;

    // Remove any non-digit characters
    input = input.replace(/\D/g, "");

    let formattedDate = "";
    const day = input.substring(0, 2);
    const month = input.substring(2, 4);
    const year = input.substring(4, 8);

    if (day) {
      formattedDate += day;
      if (day.length === 2) {
        formattedDate += "/";
      }
    }

    if (month) {
      if (month.length === 1) {
        const monthDigit = parseInt(month);
        if (monthDigit >= 2 && monthDigit <= 9) {
          // Prefix zero for months 2-9
          formattedDate += "0" + monthDigit + "/";
        } else {
          formattedDate += month;
        }
      } else if (month.length === 2) {
        formattedDate += month + "/";
      }
    }

    if (year) {
      formattedDate += year;
    }

    setDateInputValue(formattedDate);
  }

  function getDate(date: string) {
    const newDate = date.split("/").join("-");
    console.log(newDate);
    return newDate;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const date = formData.get("DateInput");
    const dateType = formData.get("dateType");
    console.log(date);
    console.log(dateType);

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
          Text input:{" "}
          <input
            name="DateInput"
            value={dateInputValue}
            onChange={handleDateInput}
            placeholder="DD/MM/YYYY"
            maxLength={10}
          />
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
          <button
            style={{ padding: "8px 16px", marginRight: "10px" }}
            type="button"
            onClick={() => setDateInputValue("")}
          >
            Clear
          </button>
          <button style={{ padding: "8px 16px" }} type="submit">
            Convert
          </button>
        </div>
      </form>
      <p style={{ fontSize: "2em" }}>{hijriDate}</p>
    </div>
  );
}
