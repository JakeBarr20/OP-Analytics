import pandas as pd

df = pd.read_csv("raw.csv")

columns_to_keep = [
    "Name", "Sex", "Event", "Equipment", "Age", "AgeClass", "Division",
    "BodyweightKg", "WeightClassKg", "Best3SquatKg", "Best3BenchKg", "Best3DeadliftKg", "TotalKg"
]
df_filtered = df[columns_to_keep]
df_filtered_cleaned = df_filtered.dropna(subset=["Sex", "Age", "BodyweightKg"])

print("Completed column removal and cleaned data...")

df_filtered_cleaned.to_csv("removed_columns.csv", index=False)
grouped_by_name = df_filtered_cleaned.groupby("Name")

def get_best_lifts(group):
    """Get the best lifts for each lifter."""
    best_squat = group["Best3SquatKg"].max() if not group["Best3SquatKg"].isna().all() else None
    best_bench = group["Best3BenchKg"].max() if not group["Best3BenchKg"].isna().all() else None
    best_deadlift = group["Best3DeadliftKg"].max() if not group["Best3DeadliftKg"].isna().all() else None

    best_lifts = group.iloc[0].copy()  
    best_lifts["Best3SquatKg"] = best_squat
    best_lifts["Best3BenchKg"] = best_bench
    best_lifts["Best3DeadliftKg"] = best_deadlift
    
    return best_lifts

best_lifts_df = grouped_by_name.apply(get_best_lifts).reset_index(drop=True)

print("Completed grouping and best lifts calculation...")

best_lifts_df.to_csv("best_lifts.csv", index=False)
