# Page snapshot

```yaml
- generic [ref=e5]:
  - heading "Login" [level=3] [ref=e6]
  - generic [ref=e7]:
    - generic [ref=e8]: Email
    - textbox "Email" [ref=e9]:
      - /placeholder: Enter email
  - generic [ref=e10]:
    - generic [ref=e11]: Password
    - textbox "Password" [ref=e12]:
      - /placeholder: Enter Password
  - generic [ref=e13]:
    - checkbox "Remember me" [ref=e14]
    - generic [ref=e15]: Remember me
  - button "Login" [disabled]
  - link "Register New User" [ref=e17] [cursor=pointer]:
    - /url: /register
```