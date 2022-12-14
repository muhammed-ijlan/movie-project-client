import { Box, Container, } from "@mui/material";
import Navbar from "./Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Profile from "./pages/Profile";
import SignIn from "./pages/Signin"
import SignUp from "./pages/SignUp"
import Movie from "./pages/Movie";
import { useSelector } from "react-redux"
import MovieCard from "./Card";
import Charts from "./Charts";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StepperComponent from "./Stepper";

function App() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#16213E", }}>
        <Navbar />
        {/* <Container sx={{ mt: 2 }}> */}
        <Routes>

          <Route path="/">
            <Route index element={<MovieCard />} />
            <Route path="user/:id" element={currentUser ? <Profile /> : <SignIn />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="movie/:id" element={currentUser ? <Movie /> : <SignIn />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="stepper" element={<StepperComponent />} />
          </Route>

        </Routes>
        {/* </Container> */}
      </Box>
    </BrowserRouter>
  );
}

export default App;
