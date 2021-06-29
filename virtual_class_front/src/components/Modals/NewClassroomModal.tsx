import React, { FormEvent, useState } from 'react';

import { ClassroomsProvider, useClassrooms } from '../../hooks/useClassrooms';

import {
  Input,
  InputGroup,
  Select,
  Flex,
  Text,
  FormControl,
  Stack,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface NewClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ClassroomInput = {
  disciplina: string;
  professor: string;
  alunos: string[];
};

export function NewClassroomModal({ isOpen, onClose }: NewClassroomModalProps) {
  const { handleSubmit, formState, register } = useForm<ClassroomInput>();
  const { createClassroom } = useClassrooms();

  const onSubmit: SubmitHandler<ClassroomInput> = async data => {
    const alunosInput = String(data.alunos);

    try {
      await createClassroom({ ...data, alunos: alunosInput.split(', ') });
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  return (
    <ClassroomsProvider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Criar nova sala</ModalHeader>
          <ModalBody>
            <FormControl>
              <Input
                name="disciplina"
                placeholder="Disciplina"
                {...register('disciplina')}
              />
              <Input
                name="professor"
                placeholder="Professor"
                {...register('professor')}
              />
              <Input
                name="alunos"
                placeholder="Alunos"
                {...register('alunos')}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Criar</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ClassroomsProvider>
  );
}
