import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import InscriptionStyled from './InscriptionStyled'

import { lsSchoolId, lsSection } from '@/Common/constants/localStorageConstants'
import Button from '@/common/Components/Buttons'
import { FormGlobal, InputGroup, InputLabel, Select } from '@/common/Components/Form'
// import ModalCustom from '@/common/Components/Modals'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'
// import useOpenModalHandling from '@/common/hooks/useModal'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'
import StudentService from '@/services/student.service'

const Inscription = ({ students, action }) => {
  const idSchool = localStorage.getItem(lsSchoolId, 1)
  const idSection = localStorage.getItem(lsSection)
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm()
  const [watchCycle, watchSection, watchLevel] = watch(['cycles', 'sections', 'levels'])

  // const [modalStatus, setmodalStatus] = useState(PageStatus.SUCCESS)
  const [cycles, setCycles] = useState([])
  const [sections, setSections] = useState([])
  const [levels, setLevels] = useState([])
  const [groups, setGroups] = useState([])

  // const { viewModal, openOrClose, closeModal } = useOpenModalHandling()

  const init = async () => {
    try {
      // debugger
      const response = await SchoolsCyclesService.getCycles(idSchool, 1, [1, 2])
      setCycles(response)
      console.log(response)
    } catch (error) {
      console.log(error)
      handleErrors(errorMessage)
      toast.error(error)
      setPageStatus(PageStatus.ERROR)
    }
  }

  const getSection = async () => {
    if (watchCycle && watchCycle !== '') {
      try {
        const response = await SchoolsSectionsService.getSectionByCycles(idSchool, watchCycle)
        if (idSchool && idSection !== undefined) {
          setPageStatus(PageStatus.LOADING)
          setSections(response)
          console.log(response)
        }
      } catch (error) {
        console.log(error)
        handleErrors(errorMessage)
        toast.error(error)
      }
    }
  }

  useEffect(() => {
    getSection()
  }, [watchCycle])

  const getLevel = async () => {
    if (watchSection && watchSection !== '') {
      try {
        const response = await SchoolsCyclesService.getCycleLevelsBySection(idSchool, watchCycle, watchSection)
        setPageStatus(PageStatus.LOADING)
        setLevels(response)
        console.log(response)
      } catch (error) {
        console.log(error)
        handleErrors(errorMessage)
        toast.error(error)
      }
    }
  }

  useEffect(() => {
    getLevel()
  }, [watchSection])

  const getGroup = async () => {
    if (watchLevel && watchLevel !== '') {
      try {
        const response = await SchoolsCyclesService.getCycleGroupsByLevel(idSchool, watchLevel)
        setPageStatus(PageStatus.LOADING)
        setGroups(response)
        console.log(response)
      } catch (error) {
        console.log(error)
        handleErrors(errorMessage)
        toast.error(error)
      }
    }
  }

  useEffect(() => {
    getGroup()
  }, [watchLevel])

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    console.log(errorMessage)
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  const onSubmit = async (data) => {
    try {
      const group = getValues('group')
      data = {
        id_cycle_group: group,
        students
        // unique_uuid: student.unique_uuid
      }
      await StudentService.inscriptionStudent(idSchool, data)
      await action()
      toast.success('Alumno inscrito correctamente')
    } catch (e) {
      handleErrors(e)
    }
  }

  return (
    <>
      <InscriptionStyled>
        {students.length > 1
          ? (
            <> <InputLabel weight='bold' >Total de alumnos a inscribir: {students.length} </InputLabel>
            </>)
          : (
            <>
              <InputLabel weight='bold' >Alumno a inscribir: {students[0].name + ' ' + students[0].last_name + ' ' + students[0].second_surname} </InputLabel>
              <InputLabel weight='bold' >Grado actual: {students[0].section_name} | {students[0].level_name} {students[0].group_name} </InputLabel>
            </>
            )
        }

        <FormGlobal bottom='1rem' width='95%' direction='column' onSubmit={handleSubmit(onSubmit)} >
          <div className='container-fileds'>
            <InputGroup className='item'>
              <InputLabel>Selecciona un ciclo </InputLabel>
              <Select {...register('cycles', { required: 'El ciclo es requerido' })}>
                <option>Selecciona un elemento</option>
                {
                  cycles.map((cycle) => (
                    <option key={cycle.id} value={cycle.id}>
                      {`${cycle.start} - ${cycle.end} / ${cycle.status_label}`}
                    </option>
                  ))}
              </Select>
            </InputGroup>
            <InputGroup className='item'>
              <InputLabel>Selecciona la sección </InputLabel>
              <Select {...register('sections', { required: 'La sección es requerida' })}>
                <option>Selecciona un elemento</option>
                {
                  sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))
                }
              </Select>
            </InputGroup>
            <InputGroup className='item'>
              <InputLabel>Selecciona un grado </InputLabel>
              <Select {...register('levels', { required: 'El grado es requerido' })}>
                <option>Selecciona un elemento</option>
                {
                  levels && levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}

              </Select>
            </InputGroup>
            <InputGroup className='item'>
              <InputLabel>Selecciona un grupo </InputLabel>
              <Select {...register('group', { required: 'El grupo es requerido' })}>
                <option>Selecciona un elemento</option>
                {groups && groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))
                }
              </Select>
            </InputGroup>
          </div>
          <Button type='submmit'>Inscribir</Button>
        </FormGlobal>
      </InscriptionStyled>
    </>
  )
}

Inscription.propTypes = {
  students: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired
}

export default Inscription
