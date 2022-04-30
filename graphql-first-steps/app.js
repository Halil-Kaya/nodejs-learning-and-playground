const { createServer } = require('@graphql-yoga/node')

const Users = [
  {
    id: 1,
    username: "Uma Sherman",
    city: "Simpang"
  },
  {
    id: 2,
    username: "Solomon Vazquez",
    city: "Baracaldo"
  },
  {
    id: 3,
    username: "Gannon Fulton",
    city: "Flint"
  },
]

const Posts = [
  {
		id: 1,
		title: "metus. Aliquam erat volutpat.",
		userId: 1
	},
	{
		id: 3,
		title: "natoque penatibus et magnis dis",
		userId: 3
	},
  {
		id: 2,
		title: "nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum",
		userId: 2
	}
]


// Provide your schema
const server = createServer({
  schema: {
    typeDefs: `
      type Query {
        users : [User!]
        user(id : ID!) : User!
        posts : [Post!]
        post(id : ID) : Post!
      }
      type User{
        id : ID!
        username : String!
        city : String!
      }
      type Post{
          id : ID!
          title : String!
          userId : ID!
      }
    `,
    resolvers: {
      Query: {
        users : (parent,args,context) => {
          return Users
        },
        user : (parent,args,context) => {
          const {id} = args
          const {req,res} = context
          return Users.find(user => user.id == id)
        },
        posts : (parent,args,context) => {
          return Posts
        },
        post : (parent,args,context) => {
          const {id} = args
          const {req,res} = context
          return Posts.find(post => post.id == id)
        }
      },
    },
  },
})

// Start the server and explore http://localhost:4000/graphql
server.start()