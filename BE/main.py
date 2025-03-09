from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from funcs import get_powerlifting_age_bracket, get_powerlifting_weight_class
import pandas as pd

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

CSV_FILE_PATH = "./clean_csv/best_lifts.csv"
df = pd.read_csv(CSV_FILE_PATH)

class FilterRequest(BaseModel):
    w: float  
    a: float  
    g: str   

@app.post("/data-by-filters")
async def data_by_filters(filters: FilterRequest):
    weight_filter = filters.w
    age_filter = filters.a
    gender_filter = filters.g[0]

    age_class = get_powerlifting_age_bracket(age_filter)
    weight_class = get_powerlifting_weight_class(weight_filter, gender_filter)


    if age_class is None:
        return JSONResponse(content={"error": "Age not eligible"}, status_code=400)
    
    if weight_class is None:
        return JSONResponse(content={"error": "Weight not eligible"}, status_code=400)

    filtered_df = df[
        (df['BodyweightKg'].astype(float) > weight_class["s"]) & 
        (df['BodyweightKg'].astype(float) < weight_class["e"]) &
        (df['Age'].astype(float) > age_class["s"]) & 
        (df['Age'].astype(float) < age_class["e"]) & 
        (df['Sex'] == gender_filter)
    ]

    filtered_data = filtered_df.to_dict(orient="records")
    return JSONResponse(content={"rows": filtered_data})

#what if two people have the same name?
@app.get("/data-by-name/{name}")
async def get_lifter(name: str):
    lifter_df = df[df['Name'].str.lower() == name.lower()]
    if lifter_df.empty:
        raise HTTPException(status_code=404, detail="Lifter not found")

    lifter_data = lifter_df.to_dict(orient="records")[0]
    lifter_data = {k: (None if pd.isna(v) else v) for k, v in lifter_data.items()}

    print(lifter_data)
    return JSONResponse(content=lifter_data)