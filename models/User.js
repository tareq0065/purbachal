import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
const SALT_WORK_FACTOR = 10;

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a name.'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
    },
    fullname: {
        type: String,
    },
    userType: {
        type: String,
        default: "user",
        enum: ['admin', 'user'],
    }
}, { timestamps: true })


UserSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
