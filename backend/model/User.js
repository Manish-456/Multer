const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
 username : {
  type : String,
  required : true,
  min : [3, 'Name must contain atleast 3 characters']
 },
 email : {
  type : String,
  required : true,
  unique : true
 },
 password : {
  type : String,
  required : true
 },
 
 likes : {
  type : Array,
  default : []
 },
 followers : {
  type : Array,
  default : []
 },
 following : {
  type : Array,
  default : []
 }
}, {
 timestamps : true
})

module.exports = mongoose.model('User', UserSchema)

