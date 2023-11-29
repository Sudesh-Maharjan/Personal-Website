import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage';
import GalleryPage from './Pages/GalleryPage';
import ScrollToTop from './Pages/ScrollToTop';
import BooksInsidePage from './Pages/BooksInsidePage';
import MediaPage from './Pages/MediaPage';
import AdminDashboard from './components/admin/adminhome/AdminDashboard';
import AddIntro from './components/admin/adminhome/AddIntro';
import AdminPersonalUpdate from './components/admin/adminhome/AdminPersonalUpdate';
import BInside from './components/businessBanner/BInside';
import NewsBanner from './components/news/NewsBanner';
import NInside from './components/news/NInside';
import MyJourneyDetails from './components/resume/MyJourneyDetails';
// import AddICountry from './components/admin/adminhome/AddICountry';

const MyRoutes = () => {
  return (

    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/gallery" exact element={<GalleryPage />} />
          <Route path="/news" exact element={<NewsBanner />} />
          <Route path="/news/:id" exact element={<NInside />} />
          <Route path="/business/:id" exact element={<BInside />} />
          <Route path="/medias" exact element={<MediaPage />} />
          <Route path="/service/:id" exact element={<BooksInsidePage />} />
          <Route path="/pwadmin" exact element={<AdminDashboard />} />
          <Route path="/addintro" exact element={<AddIntro/>} />
          {/* <Route path="/addcont" exact element={<AddICountry/>} /> */}
          <Route path="/demo" exact element={<AdminPersonalUpdate/>} />
          <Route path="/MyJourneyDetails/:id" exact element={<MyJourneyDetails/>} />



        </Routes>
      </ScrollToTop>

    </BrowserRouter>


  )
}

export default MyRoutes
