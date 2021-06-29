import { createContext, useEffect, useState } from "react";
import { api } from "../services/apiClient";
import { ReactNode, useContext } from "react";

type Classroom = {
  url: string;
  owner: string;
  disciplina: string;
  professor: string;
  alunos: string[];
};

type ClassroomInput = Omit<Classroom, "id" | "owner" | "url">

interface ClassroomsProviderProps {
  children: ReactNode;
}

interface ClassroomsContextData {
  classrooms: Classroom[];
  createClassroom: (classroom: ClassroomInput) => Promise<void>;
}

const ClassroomsContext = createContext<ClassroomsContextData>(
  {} as ClassroomsContextData
);

export function ClassroomsProvider({children}: ClassroomsProviderProps){
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  useEffect(() => {
    api.get("salas")
    .then((response) => setClassrooms(response.data))
  }, []);

  async function createClassroom(classroomInput: ClassroomInput) {
    const response = await api.post("/salas/", classroomInput);
    const classroom = response.data;

    setClassrooms([...classrooms, classroom]);
  }

  return (
    <ClassroomsContext.Provider value={{ classrooms, createClassroom }}>
      {children}
    </ClassroomsContext.Provider>
  )
}

export function useClassrooms() {
  return useContext(ClassroomsContext);
}