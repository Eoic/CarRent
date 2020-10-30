const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    is_admin: {
        type: Boolean,
        default: false
    }
});

/**
 * Compare passed password with one in the database.
 * @param { password } password 
 * @param { object } callback 
 */
UserSchema.methods.isPasswordValid = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

UserSchema.pre('save', function saveHook(next) {
    const user = this;

    if (!user.isModified('password'))
        return next();

    return bcrypt.genSalt((saltError, salt) => {

        if (saltError)
            return next(saltError);

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            
            if (hashError)
                return next(hashError);

            user.password = hash;
            return next();
        });
    });
});

module.exports = User = mongoose.model('user', UserSchema);