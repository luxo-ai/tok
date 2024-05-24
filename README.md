# tok 🧱

A light-weight text tokenizer.


tok can identify pieces of text and classify them into a small subset of known categories. 

Example:

`example.txt`
```
05/24/24 - i'm 28 and ran 5.1 miles at 12:23pm
```

`example.out.txt`
```
<TYPE=Date,VALUE="05/24/24"><TYPE=Punct,VALUE="-"><TYPE=Word,VALUE="i'm"><TYPE=Int,VALUE="28"><TYPE=Word,VALUE="and"><TYPE=Word,VALUE="ran"><TYPE=Float,VALUE="5.1"><TYPE=Word,VALUE="miles"><TYPE=Word,VALUE="at"><TYPE=Time,VALUE="12:23pm">
```
