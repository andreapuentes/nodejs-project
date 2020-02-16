const mongoose = require('mongoose');  //Usamos para conectarnos a la base de datos
const myApp = require('./myApp');
const port = 3001;
const db = require('./data/db');

comments=[
    {
      "userName": "Hugo",
      "email": "hubravo@gmail.com",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis nisi a sapien laoreet eleifend. Mauris ex ligula, porttitor ac volutpat eu, finibus ac arcu. Maecenas euismod ante ac justo pulvinar, non volutpat ligula bibendum. Donec ipsum velit, auctor eget cursus et, convallis id nulla."
    },
    {
      "userName": "Pity Martinez",
      "email": "y_vaeltercerom@gmail.com",
      "comment": "Quisque consectetur dolor diam, et molestie magna finibus id. Sed feugiat malesuada tortor ut cursus. Integer id porta urna, eget sollicitudin ex. Integer nec velit nec libero lacinia luctus ut sit amet lacus. Sed euismod, massa quis varius ultricies, dui urna mattis quam, quis vehicula sem metus sed lacus."
    },
    {
      "userName": "Sandra Naranjo",
      "email": "CoquitaNaranjo@gmail.com",
      "comment": "Integer facilisis viverra massa, id semper tellus lobortis id. Ut condimentum semper maximus. In commodo sit amet nisl eu vulputate. Cras vehicula elit quis est posuere ultrices. Cras ipsum diam, fermentum at enim in, fringilla iaculis neque. Donec finibus leo vitae eleifend auctor."
    },
    {
      "userName": "Lucia Manca",
      "email": "Arrocito@gmail.com",
      "comment": "Donec laoreet magna sit amet auctor ultricies. Integer egestas aliquam nunc, id pellentesque leo sodales sed. Cras auctor, erat vel aliquet placerat, ligula metus convallis elit, a viverra mi dui in ex. In varius sollicitudin enim at ullamcorper. Duis mauris magna, lacinia nec varius et, accumsan a augue."
    }
];

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/test_com_8')
    .then(() => {
        console.log('Connected was successfully...');
        //Define schema
        const userSchema = mongoose.Schema({
            userName: String,
            password: String
        });
        //Pasa Schema a model
        const User = mongoose.model('User', userSchema);
        db.users.map(users => {

            const { userName, password} = users; 
             //Nueva instancia del documento
            const andreaUser = new User({
                _id: mongoose.Types.ObjectId(),
                userName,
                password

            });
            //Guardo
            andreaUser.save(() => {
                console.log('User was added');
            });
        }); 
       
        //COMMENTS
        //Define schema
        const commentSchema = mongoose.Schema({
            userName: String,
            email: String,
            comment: String
        });
        //Pasa Schema a model
        const Comment = mongoose.model('Comment', commentSchema);
        //Nueva instancia del documento
        db.comments.map(comments => {

            const { userName, email, comment } = comments; 
            const andreaComment = new Comment({
                _id: mongoose.Types.ObjectId(),
                userName: userName,
                email: email,
                comment: comment
            });
            //Guardo
            andreaComment.save(() => {
                console.log('Comment was added');
            });

        });
        
        //ARTICLES
        //Define schema
        const articleSchema = mongoose.Schema({
            title: String,
            date: { type: Date, default: Date.now },
            copete: String,
            image: String,
            description: String
        });
        db.articles.map(articles => {
            const { title, copete, image, description } = articles; 
            //Pasa Schema a model
            const Article = mongoose.model('Article', articleSchema);
            //Nueva instancia del documento
            const andreaArticle = new Article({
                _id: mongoose.Types.ObjectId(),
                title,
                copete,
                image,
                description
            });
            //Guardo
            andreaArticle.save(() => {
                console.log('Article was added');
            });
        });
        
        myApp.listen(port, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });
    })
    .catch(error => console.log(error));

