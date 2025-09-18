# PROJECT TITLE

A simple webpage that include login, logout, Dashboard, Table, Form

# In Front-End

  1--Create 2 folder in  src

  a-API
	a.1--api.js

  b-Component
	b.1--Login-Form
		
		b.1.1--Login.js
		b.1.2--LoginStylesheet.css

		b.1.3--Header.js
		b.1.4--Layout.js
		b.1.5--LeftSidebar.js
		
		b.1.6--Dashboard.js
		b.1.7--Forms.js
		b.1.8--FormRightTable.js
		b.1.9--Table.js

 c-.env file

# Package Notes

Import and Export are used for sharing components, functions, and classes between files.

When we create a component in React and import it into another file, we can use it like this:

<Component />

# Package installed

Core react dependencies

1---react
2---react-dom
3---react dependencies

# Styling Library

1--@mui/material
2--@mui/icons-material
3--@emotion/react & @emotion/styled
4--react-icons


# Routing

1--react-router-dom

# Data Handling

1--axios

	Axios is an HTTP client used to fetch (GET) or send (POST, PUT, DELETE) data from/to a Backend API (like Node.js/Express, etc.).

2--recharts

	For Data visualization (charts, graphs, pie charts etc.)



# ---For creating Header, Layout, LeftSidebar

--------In all component I used Meterial UI 

   this is very popular UI library

(for use install it by    

npm install @mui/material @emotion/react @emotion/styled)

and using in it all component by import it.

#     ----For Creating Header.js------- 

1--Meterial Ui component :-Appbar, Toolbar  ,Typography  ,IconButton  , Avatar,Menu,MenuItem,Box,IONotification 

 

2---in Header.js used  

	--LocalStorage and token for logout  

	--LocalStorge—StorageSpace of browser 

        Token—Server give to a Client 


#   -----For Creating Layout.js


1--use header component by import
2--LeftSidebar
3--RightSidebar


# ----for Creating LeftSidebar

1--import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

	    <ListItemButton component={Link} to="/Forms">
		

# ----for RightSidebar

1---In layoutjs    const Layout = ({ children })
			for using wrapper component


# -----for app.js file

1--All components are import here
2--import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



# ---for Login page

1---const [state, setState] = useState(initialValue);
	This is React hook which is used for handle data
2---username and password validation 


# ---DashBoard

1---Two graph use for showing data from MongoDB   (import from rechart)
	1.a--BarChart
	2.b--Pie chart

    ---UseEffect used  for get data (fetch API) For :--

		Dashboard
		Table
		Form

# How Login Page work


        [ User (Browser) ]
        |
        | (1) Enter username + password
        v
[ React Frontend ]
        |
        | (2) Call LOGIN_API(username, password)
        |     → fetch("http://localhost:8000/chartDB/logins")
        v
[ Express Backend (Node.js) ]
        |
        | (3) Route matches: POST /chartDB/logins
        v
[ Controller: getuserLogin() ]
        |
        | (4) Extract { username, password } from req.body
        | (5) Query MongoDB → login.findOne({ username, password })
        v
[ MongoDB Database ]
        |
        | (6) Returns User Document if found
        v
[ Controller ]
        |
        | (7) if user → res.json({ success: true, message: "Login successful" })
        |     else     → res.json({ success: false, message: "Invalid username or password" })
        v
[ React Frontend ]
        |
        | (8) if data.success → navigate("/Dashboard")
        |     else → show error message
        v
[ User (Browser) ]
        |
        | (9) Sees Dashboard (success) 
        |     OR Error message ( failure)








