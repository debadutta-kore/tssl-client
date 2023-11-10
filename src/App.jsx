import { Route, Routes, Navigate } from "react-router-dom"
import Layout from "./components/layout";
import Home from "./pages/Home";
import Settings from "./pages/settings";
import UseCaseSettings from "./pages/settings/usecaseSettings";
import AccessControls from "./pages/settings/accessControls";
import SettingsLayout from './components/layout/settingsLayout';
import ChatLayout from "./components/layout/chatLayout";
import NotFound from "./pages/notFound";

function App() {
  return (<>
    <Routes>
      <Route path="/chat/:id" element={<ChatLayout />} />
      <Route path="/*" element={<Layout />} >
        <Route element={<Navigate to='home' />} index />
        <Route path="home" element={<Home />} />
        <Route path="settings" element={<SettingsLayout />}>
          <Route index element={<Settings />} />
          <Route path='usecases' element={<UseCaseSettings />} />
          <Route path='access' element={<AccessControls />} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  </>)
}

export default App
