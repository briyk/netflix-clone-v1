
# NETFLIX Clone | Firebase, Context, Tailwind, React

## Packages

- **Tailwind**
- **Firebase**
- **axios**
- **react-icons**
- **tailwind-scrollbar-hide**
- **postcss**
- **Vite**

## Installation

```bash
npm create vite@latest my-project -- --template react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install firebase tailwind-scrollbar-hide axios
```

## Structure

![App.png](https://i.ibb.co/60MVrQt/App.png)

## <App>

- In APP in only use for Routes and render all visible pages
- and i will wrap this component later with Context Provider

# pages

## <Home>

![App (1).png](https://i.ibb.co/TtbVRQY/App-1.png)

## <Navbar>

- Our Navbar will have logo and two buttons for sing in and sign up and when user sign up or in should be Account and log out button

---

1. create our buttons will be according to state change we can use normal state for testing then later we use context state
2. we need to check if (`user?.email`) true or false to render buttons based on condition
    
    <aside>
    💡 check if user is truth and have property called email , **`?.`**operator is used to safely access the **`email`**property of the **`user`**object.
    
    </aside>
    
    ```bash
    //equalvalient 
    if (user != null) {
      console.log(user.email);
    } else {
      console.log(undefined);
    }
    ```
    
    1. we also will handle access to pages with type of button there
    2. we will need Routing for Sign in , sign up and for account
    3. we will need handler for log out button to remove user and navigate back to home page
    4. **`handleLogOut`**

## initialize firebase

- we will add authentication first then later we add firestore

```jsx
import { initializeApp } from "firebase/app";
//configureation
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  databaseURL: 'your-database-url',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id'
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
```

- With this **`auth`**object, you can now perform operations on Firebase `auth`, such as signing up new users or logging in existing users.

## initialize Context

```jsx
import { createContext, useContext, useState, useEffect } from "react";
```

1. define our Context 

```jsx
const AuthContext = createContext() ;
```

1. create our Provider and return the context with Provider and values that will be shared in components

    

```jsx
export const AuthProvider = ({children}) =>{
		//states and logics

return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
	
}
```

1. wrap our app with Provider

```jsx
<AuthProvider> 
      <Navbar/>   //navbar and footer will be shared during components
      <Routes>
					          <Route path='/' element={<Home />} />
					          <Route path="signin" element={<SignIn/>} />
					          <Route path="signup" element={<SignUp/>} />
					          <Route path="account" element={<ProtectedRoute> <Account/></ProtectedRoute>} />
        </Routes>
        <Footer />
</AuthProvider>
```

1. now lets add our firebase `auth` and functions and state will be shared to components at context file

```jsx
import { auth , db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut,
    onAuthStateChanged } from "firebase/auth";
```

1. create a state for user because it will be update always according to sign in , out 

```jsx
const [user,setUser] = useState({}) ;        //inside out Provider where write logics
```

1. Create our handlers first sign up handler

```jsx
function signUpHandler(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
      }
```

<aside>
💡 **`signUpHandler`**is a function that takes an email address and a password as arguments, and calls the **`createUserWithEmailAndPassword`**function with these arguments. and `auth` passed with them

</aside>

<aside>
💡 i used handler because i dont want pass **`createUserWithEmailAndPassword`**function to each component

</aside>

1. Sign in will be same but with different firebase method
    
    ```jsx
    function signInHandler(email,pass){
            return signInWithEmailAndPassword(auth,email,pass)
        }
    ```
    
2. handle log out will be only like this and other work will be at Navbar `Component`

```
function logOutHandler(){
        return signOut(auth);
    }
```

1. follow user change case

```jsx
useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
        } )
        return () => unSubscribe() ;
    } )
```

<aside>
💡 `**useEffect**` is being used to set up an effect that listens for changes in the authenticated user's state.
———————————————-
When the authenticated user's state changes, the effect calls the **`onAuthStateChanged`
——————————————-
`useEffect`**hook returns a function that can be used to clean up the effect when the component unmounts.
———————————————
this case, the returned function calls the **`unSubscribe`**
 function, which is likely a function that unregisters the listener that was set up by **`onAuthStateChanged`**

</aside>

```jsx
const unsubscribe = auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
  } else {
    // User is signed out.
  }
});
```

1. now pass values that will be used at components

```jsx
<AuthContext.Provider value={{user,signUpHandler , signInHandler, logOutHandler}}>
            {children}
        </AuthContext.Provider>
```

## <Navbar>

 - lets use context to render routing and users

```jsx
import { useUserAuth } from "../context/authContext";
```

```jsx
const { user, logOutHandler } = useUserAuth();
  const navigate = useNavigate() ;
  //handl log ou
  const handleLogOut = async () =>{
    try{
        await logOutHandler(user)
        navigate('/')
    } catch(error){
      console.log(err)
    }
  }
```

- now we can call it inside logout button when clicked

## api file

## <Main>

- this the component that have hero section and will have API Call
- we will import Array of api from separated file
    
    ```jsx
    import requests from "../Request";
    import axios from "axios";
    ```
    
- initilaize state and `useEffect` to render once page loaded
    
    ```jsx
        const [movies, setMovies] = React.useState([]);
        React.useEffect(() => {
            axios.get(**requests**.requestPopular).then((res) => {
                setMovies(res.data.results);
            });
        }, []);
    ```
    
    **`requests**.requestPopulal` is array object category  
    
    <aside>
    💡 callback function in this case makes an HTTP GET request using Axios and passes the response data to the **`setMovies`** function, which is used to update the **`movies`**state variable.
    
    </aside>
    
- Choose single and random movie each time
    
    ```
    //[3] Pick a movie each time
        const movie = movies[Math.floor(Math.random() * movies.length)];
    ```
    
- we will use this movie to render image and data each time page loaded
    
    ```jsx
    <img
                        className="w-full h-full object-cover"
                        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                        alt={movie?.title}
                    />
    ```
    
- note if we wanna reduce number of words in overview of movie we will use this function
    
    ```
    const truncateString = (str, num) =>{
            if(str?.length > num){
                return str.slice(0,num) + "..."
            } else{
                return str
            }
        }
    ```
    

## <Row/>

<aside>
💡 this component will make API call at other component which will be render at Row ,  render movies in slider with scroll

</aside>

- Row Component will be render at <`Home`> Page , i will import APIURL and pass it as props in each component to use it at `<Row/>`
    
    ```jsx
    <Row rowID="1" title="Up Coming" fetchURL={requests.requestUpcoming} />
              <Row rowID="2" title="Top Rated" fetchURL={requests.requestTopRated} />
              <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
              <Row rowID="4" title="Popular Movies" fetchURL={requests.requestPopular} />
              <Row rowID="5" title="Horror Movies" fetchURL={requests.requestHorror} />
    ```
    
- we will add state to get state
    
    ```jsx
    const [movies, setMovies] = React.useState([]);
    ```
    
- render movies once page loaded
    
    ```jsx
    React.useEffect(() => {
            axios.get(fetchURL).then(res => {
                setMovies(res.data.results)
            })
        }, [fetchURL])
    ```
    
- i saved results at movies state and will use that to render it to `<Movies/>`
    
    ```jsx
    {
    				  movies.map((item, index) => (
    					<Movies item={item} key={index}/>
    	   ))
    }
    ```
    
- create Slider Functions to scroll left and right

```jsx
// Create Sliders
    const sliderLeft = () =>{
        const slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft - 500
    }
    const sliderRight = () =>{
        const slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft + 500
    }
```

## <Movies/>
