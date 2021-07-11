// file: HalloMongoose_FindById01.js

// TODO: Erst Datenbank und Modell anlegen

function f() { return UserInfo.find({id: request.user.id}).then((user) => { return user})}