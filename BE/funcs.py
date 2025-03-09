def get_powerlifting_age_bracket(age: int):
    if 14 <= age <= 18:
        return {"s": 14, "e": 18}
    elif 19 <= age <= 23:
        return {"s": 19, "e": 23}
    elif 24 <= age <= 34:
        return {"s": 24, "e": 34}
    elif 35 <= age <= 39:
        return {"s": 35, "e": 39}
    elif 40 <= age <= 49:
        return {"s": 40, "e": 49}
    elif 50 <= age <= 59:
        return {"s": 50, "e": 59}
    elif 60 <= age <= 69:
        return {"s": 60, "e": 69}
    elif age >= 70:
        return {"s": 70, "e": 100}
    else:
        return {"s": 0, "e": 13}
    
def get_powerlifting_weight_class(weight: float, gender: str):
    if gender.lower() == "m":
        if weight <= 53:
            return {"s": 0, "e": 53}
        elif weight <= 59:
            return {"s": 54, "e": 59}
        elif weight <= 66:
            return {"s": 60, "e": 66}
        elif weight <= 74:
            return {"s": 67, "e": 74}
        elif weight <= 83:
            return {"s": 75, "e": 83}
        elif weight <= 93:
            return {"s": 84, "e": 93}
        elif weight <= 105:
            return {"s": 94, "e": 105}
        elif weight <= 120:
            return {"s": 106, "e": 120}
        else:
            return {"s": 121, "e": 200}
    elif gender.lower() == "f":
        if weight <= 43:
            return {"s": 0, "e": 43}
        elif weight <= 47:
            return {"s": 44, "e": 47}
        elif weight <= 52:
            return {"s": 48, "e": 52}
        elif weight <= 57:
            return {"s": 53, "e": 57}
        elif weight <= 63:
            return {"s": 58, "e": 63}
        elif weight <= 69:
            return {"s": 64, "e": 69}
        elif weight <= 76:
            return {"s": 70, "e": 76}
        elif weight <= 84:
            return {"s": 77, "e": 84}
        else:
            return {"s": 85, "e": 200}
    
    else:
        return "Invalid gender"