import { createContext, useEffect, useState } from "react";
import { api } from "../services/apiClient";
import { ReactNode, useContext } from "react";

type Assignment = {
  id: string;
  url: string;
  sala: string;
  titulo: string;
  descricao: string;
  data_criado: string;
  data_entrega: string;
};

type AssignmentInput = Omit<Assignment, "id" | "url" | "data_criado" | "data_entrega">

interface AssignmentsProviderProps {
  children: ReactNode;
}

interface AssignmentsContextData {
  assignments: Assignment[];
  createAssignment: (assigment: AssignmentInput) => Promise<void>;
}

const AssignmentsContext = createContext<AssignmentsContextData>(
  {} as AssignmentsContextData
);

export function AssignmentsProvider({children}: AssignmentsProviderProps){
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    api.get("atividades")
    .then((response) => setAssignments(response.data))
  }, []);

  async function createAssignment(assignmentsInput: AssignmentInput) {
    const response = await api.post("/atividades/", assignmentsInput);
    const assignment = response.data;

    setAssignments([...assignments, assignment]);
  }

  return (
    <AssignmentsContext.Provider value={{ assignments, createAssignment }}>
      {children}
    </AssignmentsContext.Provider>
  )
}

export function useAssignments() {
  return useContext(AssignmentsContext);
}