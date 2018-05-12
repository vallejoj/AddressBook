let env = process.env.NODE_ENV || 'development';
console.log(env);
if (env === "development") {
    process.env.PORT = 4000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/AddressBook';
} else if (env === 'test') {
    console.log("TEST")
    process.env.PORT = 4000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/AddressBookTest';
}