import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true, // used for searching
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    },
    
}, {timestamps: true});

// arrow function does not have its own this, but in this case we need the this reference, that's why classical arrow function is not recommended here
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
            return next();
    };
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// .methods already has many functions, also we can add our own custom function to it
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// .sign genertes the token, it takes 3 arguments, 1st is payload(data){}, 2nd is secret key, 3rd is expiry date{}
// .sign has basic encrption,( it's not the best way to encrypt, but it's good for small projects)
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        // here we're giving payload(data) to this token
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

// Refresh token has less info because it keeps on refreshing (it's not going to be sent to the client)
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        // here we're giving payload(data) to this token
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

export const User = mongoose.model("User", userSchema);