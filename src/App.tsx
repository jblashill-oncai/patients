import * as React from "react";

// Use to find, create, update and delete patients
import { patientService } from "./ApiService";
import { List } from "./pages/List";

export const App: React.FC = () => {
  return <List />;
};
