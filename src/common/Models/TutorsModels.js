class TutorModel {
  constructor (idStudent, name, lastName, secondSurname, sex, occupation, company, birthdayDate, placeOfBirthPostalcode, placeOfBirthState, placeOfBirthCountry, placeOfBirthLocation) {
    this.idStudent = idStudent
    this.name = name
    this.lastName = lastName
    this.secondSurname = secondSurname
    this.sex = sex
    this.occupation = occupation
    this.company = company
    this.birthdayDate = birthdayDate
    this.placeOfBirthPostalcode = placeOfBirthPostalcode
    this.placeOfBirthState = placeOfBirthState
    this.placeOfBirthCountry = placeOfBirthCountry
    this.placeOfBirthLocation = placeOfBirthLocation
  }
}

export default TutorModel

export function jsonToTutors (json) {
  return new TutorModel(json.idStudent, json.name, json.lastName, json.SecondSurname, json.sex,
    json.occupation, json.company, json.birthdayDate, json.placeOfBirthPostalcode,
    json.placeOfBirthState, json.placeOfBirthCountry, json.placeOfBirthLocation)
}

export function tutorToJson (tutor) {
  return {
    id: tutor.id_student,
    name: tutor.name,
    last_name: tutor.last_name,
    second_surname: tutor.second_surname,
    sex: tutor.sex,
    occupation: tutor.occupation,
    company: tutor.company,
    birthday_date: tutor.birthday_date,
    place_of_birth_postalcode: tutor.place_of_birth_postalcode,
    place_of_birth_state: tutor.place_of_birth_state,
    place_of_birth_country: tutor.place_of_birth_country,
    place_of_birth_location: tutor.place_of_birth_location

  }
}
