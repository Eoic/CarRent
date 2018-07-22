const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        index: { unique: true }
    },
    password: String,
    email: String
});

/**
 * Compare passed password with one in the database.
 * @param { password } password 
 * @param { object } callback 
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback){
    bcrypt.compare(password, this.password, callback);
}

UserSchema.pre('save', function saveHook(next) {
    const user = this;

    // Proceed if password is modified or new.
    if(!user.isModified('password'))
        return next();

    return bcrypt.genSalt((saltError, salt) => {

        if(saltError)
            return next(saltError);

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if(hashError)
                return next(hashError);

            // Replace password string with hash.
            user.password = hash;
            
            return next();
        });
    });
});

module.exports = User = mongoose.model('user', UserSchema);