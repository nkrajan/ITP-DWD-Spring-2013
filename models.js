function buildModels(mongoose) {

    var Schema = mongoose.Schema;
    var passportLocalMongoose = require('passport-local-mongoose');

    var userSchema = new Schema({});
    userSchema.plugin(passportLocalMongoose);
    mongoose.model('User', userSchema);

    
    var ClassNote = new Schema({
        classdate   : Date,
        urltitle    : { type: String, lowercase: true, unique: true },
        title       : String,
        intro       : String,
        intro_md    : String,
        notes       : String,
        notes_md    : String,
        assignment  : String,
        assignment_md : String,
        notesReady  : String,
        published : String,
        lastupdated : { type: Date, default: Date.now }
    });
    
    mongoose.model('ClassNote',ClassNote);

    var pageSchema = new Schema({
        title     : String,
        body      : String,
        publishedstatus : String,
        lastupdated : { type: Date, default: Date.now }
    });
    mongoose.model('Page', pageSchema);

    
}

module.exports.buildModels = buildModels;