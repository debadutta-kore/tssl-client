import { Route, Routes, Navigate } from "react-router-dom"
import Layout from "./components/layout";
import Home from "./pages/Home";
import Settings from "./pages/settings";
import UseCaseSettings from "./pages/settings/usecaseSettings";
import AccessControls from "./pages/settings/accessControls";
import SettingsLayout from './components/layout/settingsLayout';
import ChatLayout from "./components/layout/chatLayout";
import NotFound from "./pages/notFound";
import { lazy } from "react";
const TextChat = lazy(()=>import('./pages/chat/text'))
const IVRChat = lazy(()=>import('./pages/chat/ivr'));

function App() {
  return (<>
    <Routes>
      <Route path="/chat" element={<ChatLayout />}>
        <Route path="text" element={<TextChat/>}/>
        <Route path="ivr" element={<IVRChat/>}/>
      </Route>
      <Route path="/*" element={<Layout />} >
        <Route element={<Navigate to='/home' />} index />
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
