class MatterModel {
  constructor (id, value, name) {
    this.id = id
    this.value = value
    this.name = name
  }
}

export default MatterModel

// export function jsonToUser (json) {
//   return new UserModel(json.id, json.is_active,
//     json.rol.id, json.profile_photo, json.profile.email, json.profile.name, json.username)
// }

// export function userToJson (user) {
//   return {
//     name: user.name,
//     id_rol: parseInt(user.id_rol),
//     is_active: user.is_active,
//     email: user.email
//   }
// }
