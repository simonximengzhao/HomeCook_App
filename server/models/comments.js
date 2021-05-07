const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    agree: {
        type: Boolean,
        required: true,
        default: false
    },
    contactType: {
        type: String,
        required: true,
        default: 'Phone'
    },
    message:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;