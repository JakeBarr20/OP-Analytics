import Helper from "./Helper";

class OpenAPI {
  static handleRequest = async (header: string, w: any, a: any, g: any) => {
    let start = 0;
    let loop = true;
    const arrayOfObjects = [];

    while (loop) {
      const response = await fetch(header, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ w: w, g: g, s: start, a: a }),
      });

      const rows = await response.json();
      const totalLength = rows.total_length;
      const increment = Math.floor(totalLength / 10);

      if (rows?.rows?.length === 0) loop = false;
      arrayOfObjects.push(rows.rows);
      start += increment;
    }

    const data: object[] = [];
    for (const group of arrayOfObjects) {
      let counter = 0;
      while (counter < 100) {
        data.push(group[counter]);
        counter += 1;
      }
    }
    return data;
  };

  static GetDataByFilters = async (filters: any, recursive: boolean) => {
    const { gender, weight, age } = Helper.convertFiltersToStats(filters);

    let rows = { rows: "" };
    if (recursive) {
      return this.handleRequest(
        "http://localhost:3000/data-by-filters",
        weight,
        age,
        gender
      );
    } else {
      const response = await fetch("http://localhost:3000/data-by-filters", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ w: weight, s: 0, a: age, g: gender }),
      });
      rows = await response.json();
      return rows.rows;
    }
  };

  static getDataByAgeAndWeight = (
    weight: string,
    age: string,
    gender: string
  ) => {
    let requestAge = "";
    let requestGender = "";
    if (age === "SBJ") requestAge = "18-19";
    if (age === "JR") requestAge = "20-23";
    if (age === "OP") requestAge = "24-34";
    if (age === "MA1") requestAge = "40-49";
    if (age === "MA2") requestAge = "50-59";
    if (age === "MA3") requestAge = "60-69";
    if (age === "MA4") requestAge = "over70";
    if (gender === "Male") requestGender = "men";
    if (gender === "Female") requestGender = "women";

    return this.handleRequest(
      "http://localhost:3000/data-by-weight-age-give-value",
      weight,
      requestAge,
      requestGender
    );
  };

  static getDataByName = async (name: string) => {
    const indexReponse = await fetch("http://localhost:3000/index-by-name", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ n: name }),
    });
    const index = await indexReponse.json();

    if (index.next_index === null) return null;

    const lifterResponse = await fetch("http://localhost:3000/data-by-index", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ i: index.next_index.toString() }),
    });
    const data = await lifterResponse.json();
    return data.rows[0];
  };
}

export default OpenAPI;
