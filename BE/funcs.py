def get_powerlifting_age_bracket(age: int):
    age_brackets = [
        (18, {"s": 14, "e": 18}),
        (23, {"s": 19, "e": 23}),
        (34, {"s": 24, "e": 34}),
        (39, {"s": 35, "e": 39}),
        (49, {"s": 40, "e": 49}),
        (59, {"s": 50, "e": 59}),
        (69, {"s": 60, "e": 69}),
    ]

    for max_age, bracket in age_brackets:
        if age <= max_age:
            return bracket

    return {"s": 70, "e": 100} if age >= 70 else {"s": 0, "e": 13}

    
    
    
def get_powerlifting_weight_class(weight: float, gender: str):
    gender = gender.lower()
    
    if gender not in ["male", "female"]:
        raise ValueError(f"Invalid gender: {gender}")
    
    male_classes = [
        (53, {"s": 0, "e": 53}), (59, {"s": 54, "e": 59}), (66, {"s": 60, "e": 66}),
        (74, {"s": 67, "e": 74}), (83, {"s": 75, "e": 83}), (93, {"s": 84, "e": 93}),
        (105, {"s": 94, "e": 105}), (120, {"s": 106, "e": 120})
    ]
    
    female_classes = [
        (43, {"s": 0, "e": 43}), (47, {"s": 44, "e": 47}), (52, {"s": 48, "e": 52}),
        (57, {"s": 53, "e": 57}), (63, {"s": 58, "e": 63}), (69, {"s": 64, "e": 69}),
        (76, {"s": 70, "e": 76}), (84, {"s": 77, "e": 84})
    ]
    
    weight_classes = male_classes if gender == "male" else female_classes
    
    for max_weight, category in weight_classes:
        if weight <= max_weight:
            return category
    
    return {"s": 121, "e": 200} if gender == "male" else {"s": 85, "e": 200}
