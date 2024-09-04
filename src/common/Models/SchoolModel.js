class SchoolModel {
  constructor(
    id, address, clave, rfc, isActive, logo, name, stepSetting, uuid,
    razon_sat, regimen_sat, postal_code_sat, country_sat, state_sat, address_sat,
    phone_sat, type_person_sat, num_ext_sat,suburb_sat,bank_name,bank_convenio,bank_reference,
   cer_file, key_file, password_sat
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.clave = clave;
    this.rfc = rfc;
    this.isActive = isActive;
    this.logo = logo;
    this.stepSetting = stepSetting;
    this.uuid = uuid;
    this.razon_sat = razon_sat;
    this.regimen_sat = regimen_sat;
    this.postal_code_sat = postal_code_sat;
    this.country_sat = country_sat;
    this.state_sat = state_sat;
    this.address_sat = address_sat;
    this.phone_sat = phone_sat;
    this.type_person_sat = type_person_sat;
    this.num_ext_sat = num_ext_sat,
    this.suburb_sat = suburb_sat,
    this.bank_name = bank_name,
		this.bank_convenio = bank_convenio,
    this.bank_reference = bank_reference,
    this.cer_file = cer_file,
    this.key_file = key_file,
    this.password_sat = password_sat
  }
}

export default SchoolModel;

export function jsonToSchool(json) {
  // console.log(json)
  return new SchoolModel(
    json.id, json.address, json.clave, json.rfc, json.is_active, json.logo,
    json.name, json.step_settings_account, json.uuid, json.razon_sat,
    json.regimen_sat, json.postal_code_sat, json.country_sat, json.state_sat,
    json.address_sat, json.phone_sat, json.type_person_sat,json.num_ext_sat,json.suburb_sat,
    json.bank_name, json.bank_convenio, json.bank_reference, json.cer_file, json.key_file, json.password_sat
  );
}

export function schoolToJson(user) {
  return {
    name: user.name,
    is_active: user.is_active,
    address: user.address,
    clave: user.clave,
    rfc: user.rfc,
    razon_sat: user.razon_sat,
    regimen_sat: user.regimen_sat,
    postal_code_sat : user.postal_code_sat,
    country_sat: user.country_sat,
    state_sat: user.state_sat,
    address_sat: user.address_sat,
    phone_sat : user.phone_sat,
    type_person_sat : user.type_person_sat,
    num_ext_sat: user.num_ext_sat,
    suburb_sat: user.suburb_sat,
    bank_name: user.bank_name,
    bank_convenio: user.bank_convenio,
    bank_reference: user.bank_reference,
    cer_file: user.cer_file,
    key_file: user.key_file,
    password_sat: user.password_sat
  };
}
