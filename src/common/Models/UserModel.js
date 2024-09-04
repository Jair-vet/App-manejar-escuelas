class UserModel {
  constructor (id, isActive, rol, profilePhoto, email, name, username) {
    this.id = id
    this.isActive = isActive
    this.profilePhoto = profilePhoto
    this.rol = rol
    this.email = email
    this.name = name
    this.username = username
  }
}

export default UserModel

export function jsonToUser (json) {
  return new UserModel(json.id, json.is_active,
    json.rol.id, json.profile_photo, json.profile.email, json.profile.name, json.username)
}

export function userToJson (user) {
  return {
    name: user.name,
    id_rol: parseInt(user.id_rol),
    is_active: user.is_active,
    email: user.email
  }
}
