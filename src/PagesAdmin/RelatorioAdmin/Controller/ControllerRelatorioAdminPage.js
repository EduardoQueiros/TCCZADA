import { useState } from "react";

function ControllerRelatorioAdminPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedCategory,
    setSelectedCategory,
  };
}

export default ControllerRelatorioAdminPage;
