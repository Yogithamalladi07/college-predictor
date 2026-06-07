import pandas as pd

df = pd.read_csv("Josaa_2025.csv", sep="\t")

branches = sorted(df["Academic Program Name"].dropna().unique())

for branch in branches:
    print(branch)