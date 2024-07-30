const { mongoose, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Add method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         // next();
//     }

//     let salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     console.log("Hash password: ", this.password);
//     // next();
// });


//* Don't use arrow function for pre method.
//Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    let salt = await bcrypt.genSalt(16)
    this.password = await bcrypt.hash(this.password, salt)
})

// Create the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
