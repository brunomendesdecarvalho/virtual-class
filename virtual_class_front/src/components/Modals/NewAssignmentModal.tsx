import React, { FormEvent, useState } from 'react';

import { AssignmentsProvider, useAssignments } from '../../hooks/useAssignments';

import {
  Input,
  Textarea,
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

interface NewAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AssignmentInput = {
  sala: string;
  descricao: string;
  titulo: string;
  data_criado: string;
};

export function NewAssignmentModal({ isOpen, onClose }: NewAssignmentModalProps) {
  const { handleSubmit, formState, register } = useForm<AssignmentInput>();
  const { createAssignment } = useAssignments();

  const onSubmit: SubmitHandler<AssignmentInput> = async data => {

    try {
      await createAssignment({...data, data_criado: new Date().toISOString()} as AssignmentInput);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  return (
    <AssignmentsProvider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Criar nova Atividade</ModalHeader>
          <ModalBody>
            <FormControl>
              <Input
                name="titulo"
                placeholder="Título"
                {...register('titulo')}
                mb="4"
              />
              <Textarea
                name="descricao"
                placeholder="Descrição"
                type="text"
                {...register('descricao')}
                mb="4"
                rows={5}
              />
              <Input
                name="sala"
                placeholder="Sala"
                {...register('sala')}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Criar</Button>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AssignmentsProvider>
  );
}
