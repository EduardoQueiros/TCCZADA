import React from "react";
import DashController from "../Controller/DashController";
import DashView from "./DashView";

function DashPage() {
  const controller = DashController();

  return <DashView {...controller} />;
}

export default DashPage;
