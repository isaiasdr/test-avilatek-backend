import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

userSchema.method('toJSON', function () {
    const { __v, password, ...user } = this.toObject();
    return user;
});

export const User = model('User', userSchema);