import { Route, Routes } from "react-router"
import Layout from "./components/layout";
import Home from "./pages/Home";
import Settings from "./pages/settings";
import UseCaseSettings from "./pages/settings/usecaseSettings";
import AccessControls from "./pages/settings/accessControls";
import SettingsLayout from './components/layout/settingsLayout';
import ChatLayout from "./components/layout/chatLayout";
function App() {
  return (<>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="home" element={<Home />} />
        <Route path="settings" element={<SettingsLayout/>}>
          <Route index element={<Settings />} />
          <Route path='usecases' element={<UseCaseSettings />} />
          <Route path='access' element={<AccessControls />} />
        </Route>
        <Route path="/chat/:id" element={<ChatLayout/>} />
      </Route>
    </Routes>
  </>)
}

export default App
