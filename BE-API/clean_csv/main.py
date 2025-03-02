import pandas as pd

df = pd.read_csv('openipf.csv')

#remove columns
columns_to_keep = ['Name', 'Sex', 'Event', 'Equipment', 'Age', 'AgeClass', 'Division', 'BodyweightKg', 'WeightClassKg', 'Best3SquatKg', 'Best3BenchKg', 'Best3DeadliftKg', 'TotalKg']
df_filtered = df[columns_to_keep]
cleaned_df = df_filtered.dropna()
print('Completed column removal...')
cleaned_df.to_csv('removed_columns.csv', index=False)

#group by name
grouped_by_name = df_filtered.groupby('Name')

def get_best_lifts(group):
    best_squat = group['Best3SquatKg'].max()  
    best_bench = group['Best3BenchKg'].max()  
    best_deadlift = group['Best3DeadliftKg'].max()  
    
    best_lifts = group.iloc[0].copy()  
    best_lifts['Best3SquatKg'] = best_squat
    best_lifts['Best3BenchKg'] = best_bench
    best_lifts['Best3DeadliftKg'] = best_deadlift
    return best_lifts

best_lifts_df = grouped_by_name.apply(get_best_lifts).reset_index(drop=True)
print('Completed grouping...')
best_lifts_df.to_csv('best_lifts.csv', index=False)