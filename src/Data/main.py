import pandas as pd
from functools import reduce
import derive, create_csv
create_csv.create_csv(False,"Derived Data/df_choro.csv")
create_csv.create_csv(True,"Derived Data/df_imputed.csv")
df=pd.read_csv("Derived Data/df_choro.csv")
dims=df.columns[2:-6]
dimDesc={}
countries=df["country"].unique().tolist()
dimDict={}
for el in dims:
  dimDict[el]={}
  dimlst=df[el].tolist()
  for c in countries:
    cdf=df[df["country"]==c]
    lst=cdf[el].tolist()
    dimDict[el][c]=lst
  mini=min(dimlst)
  maxi=max(dimlst)
  if mini>0:
     dimDict[el]["mini"]=mini
  else:
     dimDict[el]["mini"]=0
  dimDict[el]["maxi"]=maxi

with open('Derived Data/dimsDict.js', 'w') as f:
    print('export let dimsDict=',dimDict,file=f)  
  