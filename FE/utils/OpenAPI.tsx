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

  static getDataByFilters = async (filters: any, recursive: boolean) => {
    const { gender, weight, age } = Helper.convertFiltersToStats(filters);

    const response = await fetch("http://127.0.0.1:8000/data-by-filters", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        w: weight,
        a: age,
        gender: gender
      })
    })

    const responseJson = await response.json()
    console.log(response)

    // let rows = { rows: "" };
    // if (recursive) {
    //   return this.handleRequest(
    //     "http://127.0.0.1:8000/data-by-filters",
    //     weight,
    //     age,
    //     gender
    //   );
    // } else {
    //   const response = await fetch("http://127.0.0.1:8000/data-by-filters", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ w: weight, s: 0, a: age, g: gender }),
    //   });
    //   rows = await response.json();
    //   return rows.rows;
    // }
  };

  static getDataByName = async (name: string) => {
    const indexReponse = await fetch(`http://127.0.0.1:8000/data-by-name/${name}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const index = await indexReponse.json();
    return index
  };
}

export default OpenAPI;
