class Helper {
  static convertAuthErrorMessages(error: any) {
    error = error.toString();
    let finalMessage =
      error.charAt(error.indexOf("/") + 1).toUpperCase() +
      error
        .substring(error.indexOf("/") + 1, error.indexOf(")"))
        .replace("-", " ")
        .slice(1);

    return finalMessage;
  }

  static convertAgeToCategory(age: number) {
    if (age <= 18) return "SBJ";
    else if (age <= 23 && age > 18) return "JR";
    else if (age <= 39 && age > 23) return "OP";
    else if (age <= 49 && age > 39) return "MA1";
    else if (age <= 59 && age > 49) return "MA2";
    else if (age <= 69 && age > 59) return "MA3";
    else return "MA4";
  }

  static convertWeightToCategory(w: number, gender: string) {
    if (gender === "Male") {
      if (w < 52) return "U52";
      else if (w < 59 && w >= 52) return "U59";
      else if (w < 66 && w >= 59) return "U66";
      else if (w < 74 && w >= 66) return "U74";
      else if (w < 83 && w >= 74) return "U83";
      else if (w < 93 && w >= 83) return "U93";
      else if (w < 105 && w >= 93) return "U105";
      else if (w < 120 && w >= 105) return "U120";
      else return "120+";
    } else {
      if (w < 43) return "U43";
      else if (w < 47 && w >= 43) return "U47";
      else if (w < 52 && w >= 47) return "U52";
      else if (w < 57 && w >= 52) return "U57";
      else if (w < 63 && w >= 57) return "U63";
      else if (w < 69 && w >= 63) return "U69";
      else if (w < 76 && w >= 69) return "U76";
      else if (w < 84 && w >= 76) return "U84";
      else return "84+";
    }
  }

  static convertResponseToAverages(userLifter: any, lifterList: any) {
    let lesserSquats = 0;
    let lesserBenchs = 0;
    let lessDeadlifts = 0;
    lifterList = lifterList.filter(function (element: any) {
      return element !== undefined;
    });
    lifterList = lifterList.filter(
      (value: any, index: number) => lifterList.indexOf(value) === index
    );

    lifterList.forEach((lifter: any) => {
      if (typeof lifter !== "undefined") {
        if (lifter[19] !== "" && lifter[20] !== "" && lifter[21] !== "") {
          if (Number(lifter[19]) <= Number(userLifter.squat)) lesserSquats++;
          if (Number(lifter[20]) <= Number(userLifter.bench)) lesserBenchs++;
          if (Number(lifter[21]) <= Number(userLifter.deadlift))
            lessDeadlifts++;
        }
      }
    });

    const squatRating = (lesserSquats / lifterList.length) * 100;
    const benchRating = (lesserBenchs / lifterList.length) * 100;
    const deadliftRating = (lessDeadlifts / lifterList.length) * 100;
    const overallRatingPercentage =
      (squatRating + benchRating + deadliftRating) / 3;
    let overallRating = "";
    if (overallRatingPercentage < 15) overallRating = "BEGINNER";
    else if (overallRatingPercentage >= 15 && overallRatingPercentage < 30)
      overallRating = "INTERMEDIATE";
    else if (overallRatingPercentage >= 30 && overallRatingPercentage < 50)
      overallRating = "UPPER INTERMEDIATE";
    else if (overallRatingPercentage >= 50 && overallRatingPercentage < 75)
      overallRating = "ADVANCED";
    else if (overallRatingPercentage >= 75) overallRating = "ELITE";

    return {
      squat: squatRating,
      bench: benchRating,
      deadlift: deadliftRating,
      overall: overallRating,
      overallPercentage: overallRatingPercentage,
    };
  }

  static convertSearchToObject(lifter: any) {
    const nameArray = lifter[2].split(" ");
    const firstNameIn = nameArray[0].charAt(0).toUpperCase();
    const lastNameIn = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    let age = "";
    if (lifter[15] !== "") {
      age = "U" + lifter[15].charAt(0) + lifter[15].charAt(1);
    } else age = lifter[16].slice(-3);

    const formattedLifter = {
      name: firstNameIn + lastNameIn,
      gender: lifter[13],
      weight: "U" + lifter[18],
      age: age,
      squat: lifter[19] + "KG",
      bench: lifter[20] + "KG",
      deadlift: lifter[21] + "KG",
      total: lifter[22] + "KG",
      rating: "INT",
    };

    return formattedLifter;
  }

  static convertFilterToObject(lifterList: any) {
    let formattedLifterList: any[] = [];
    lifterList.map((lifter: any) => {
      formattedLifterList.push(this.convertSearchToObject(lifter));
    });
    return formattedLifterList;
  }

  static checkFiltersInvalid(filters: any) {
    let ageCounter = 0;
    let weightCounter = 0;
    let filterFinder = 0;
    let genderCounter = 0;

    for (const filter in filters) {
      if (filterFinder < 2) {
        if (filters[filter]) genderCounter++;
      } else if (filterFinder >= 2 && filterFinder <= 5) {
        if (filters[filter]) ageCounter++;
      } else {
        if (filters[filter]) weightCounter++;
      }
      filterFinder++;
    }

    return genderCounter > 1 || ageCounter > 1 || weightCounter > 1;
  }

  static convertFiltersToStats(filters: any) {
    let gender = null;
    let weight = null;
    let age = null;
    if (filters.male || filters.m) gender = "men";
    if (filters.female || filters.f) gender = "women";
    if (filters.sbj) age = "18-19";
    if (filters.junior || filters.jr) age = "20-23";
    if (filters.open || filters.op) age = "24-34";
    if (filters.masters1 || filters.ma1) age = "40-49";
    if (filters.masters2 || filters.ma2) age = "50-59";
    if (filters.masters3 || filters.ma3) age = "60-69";
    if (filters.masters4 || filters.ma4) age = "70-79";
    if (filters.plus120men) weight = "over120";
    if (filters.u120men) weight = "120";
    if (filters.u105men) weight = "105";
    if (filters.u93men) weight = "93";
    if (filters.u83men) weight = "83";
    if (filters.u74men) weight = "74";
    if (filters.u66men) weight = "66";
    if (filters.u59men) weight = "59";
    if (filters.u53men) weight = "53";
    if (filters.plus84women) weight = "over84";
    if (filters.u84women) weight = "84";
    if (filters.u76women) weight = "76";
    if (filters.u69women) weight = "69";
    if (filters.u63women) weight = "63";
    if (filters.u57women) weight = "57";
    if (filters.u52women) weight = "52";
    if (filters.u47women) weight = "47";
    if (filters.u43women) weight = "43";
    return { gender, weight, age };
  }

  static convertLifterToGraphHeader(lifter: any) {
    const initials =
      lifter.firstName.charAt(0).toUpperCase() +
      lifter.lastName.charAt(0).toUpperCase();
    const weight = this.convertWeightToCategory(
      lifter.weight - 1,
      lifter.gender
    );
    const age = this.convertAgeToCategory(lifter.age);

    const header =
      initials + "-" + lifter.gender.charAt(0) + "-" + weight + "-" + age;
    return header;
  }

  static convertGroupToGraphHeader(lifter: any) {
    const { gender, age, weight } = this.convertFiltersToStats(
      lifter.activeFilters
    );
    let formattedGender = "M";
    const formattedWeight = "U" + weight;
    const formattedAge = this.convertAgeToCategory(Number(age?.slice(2)));
    if (gender === "women") formattedGender = "F";

    const header = formattedGender + "-" + formattedWeight + "-" + formattedAge;
    return header;
  }

  static calculateAverage(lifterList: any) {
    lifterList = lifterList.filter(function (element: any) {
      return element !== undefined;
    });
    lifterList = lifterList.filter(
      (value: any, index: number) => lifterList.indexOf(value) === index
    );
    let squatTotal = 0;
    let benchTotal = 0;
    let deadliftTotal = 0;

    lifterList.forEach((lifter: any) => {
      if (typeof lifter !== "undefined") {
        if (lifter[19] !== "" && lifter[20] !== "" && lifter[21] !== "") {
          squatTotal = squatTotal + Number(lifter[19]);
          benchTotal = benchTotal + Number(lifter[20]);
          deadliftTotal = deadliftTotal + Number(lifter[21]);
        }
      }
    });

    const squatAvg = squatTotal / lifterList.length;
    const benchAvg = benchTotal / lifterList.length;
    const deadliftAvg = deadliftTotal / lifterList.length;
    return { squatAvg, benchAvg, deadliftAvg };
  }

  static validateSearch(query: string) {
    return /^[A-Za-z -]+$/.test(query);
  }

  static validateInputField(input: any) {
    let valid = true;

    for (const field in input) {
      if (field === "email") {
        valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          input[field]
        );
      }
      if (field === "password") {
        valid = /^[^';]*$/.test(input[field]);
      }
      if (field === "firstName") {
        valid = /^[A-Za-z -]+$/.test(input[field]);
      }
      if (field === "lastName") {
        valid = /^[A-Za-z -]+$/.test(input[field]);
      }
      if (field === "age") {
        valid = /\b(?:[1-9]|[1-9][0-9])\b/.test(input[field]);
      }
      if (field === "weight") {
        valid = /\b(?:[1-9]|[1-9][0-9]|[1-9][0-9][0-9])\b/.test(input[field]);
      }
      if (field === "bench") {
        valid = /\b(?:[1-9]|[1-9][0-9]|[1-9][0-9][0-9])\b/.test(input[field]);
      }
      if (field === "squat") {
        valid = /\b(?:[1-9]|[1-9][0-9]|[1-9][0-9][0-9])\b/.test(input[field]);
      }
      if (field === "deadlift") {
        valid = /\b(?:[1-9]|[1-9][0-9]|[1-9][0-9][0-9])\b/.test(input[field]);
      }

      if (!valid) return false;
    }

    return valid;
  }
}

export default Helper;
