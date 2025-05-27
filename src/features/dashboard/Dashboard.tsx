import { useState } from "react"

import OverlayForm from "../../components/OverlayForm"
import Login from "../auth/login"

const Dashboard = () => {
  const [showOverlayForm, setOverlayForm] = useState(true)
  return (
    <main className="">
      <Login></Login>
      <OverlayForm title={"Novo estabelecimento"} show={showOverlayForm} setShow={setOverlayForm}>
        
      </OverlayForm>

    </main>
  )
}

export default Dashboard
