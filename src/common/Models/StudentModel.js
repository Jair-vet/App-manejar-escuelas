class StudentModel {
  constructor (id, createDate, updatDate, name, lastName, secondSurname, birthdayDate, curp, idInstitution, email, grado) {
    this.id = id
    this.createDate = createDate
    this.updatDate = updatDate
    this.name = name
    this.lastName = lastName
    this.secondSurname = secondSurname
    this.birthdayDate = birthdayDate
    this.curp = curp
    this.idInstitution = idInstitution
    this.email = email
    this.grado = grado
  }
}

export default StudentModel

export function jsonToStudent (json) {
  return new StudentModel(json.id, json.created_date, json.update_date,
    json.name, json.last_name, json.second_surname,
    json.birthday_date, json.curp, json.id_institution, json.email, json.grado)
}

export function studentToJson (student) {
  return {
    id: student.id,
    name: student.name,
    created_date: student.created_date,
    last_name: student.last_name,
    second_surname: student.second_surname,
    birthday_date: student.birthday_date,
    curp: student.curp,
    id_institution: student.id_institution,
    email: student.email,
    grado: student.grado
  }
}
