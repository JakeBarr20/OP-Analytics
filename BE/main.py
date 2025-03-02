from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

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
    gender_filter = filters.g

    filtered_df = df[
        (df['BodyweightKg'] == weight_filter) & 
        (df['Age'] == age_filter) & 
        (df['Sex'] == gender_filter)
    ]
    
    filtered_data = filtered_df.to_dict(orient="records")
    return JSONResponse(content={"rows": filtered_data})

#what if two people have the same name?
async def get_lifter(name: str):
    lifter_df = df[df['Name'].str.lower() == name.lower()]
    if lifter_df.empty:
        raise HTTPException(status_code=404, detail="Lifter not found")

    lifter_data = lifter_df.to_dict(orient="records")[0]
    return JSONResponse(content=lifter_data)