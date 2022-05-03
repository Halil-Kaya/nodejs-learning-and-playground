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
        posts : [Post!]
        post(id : ID) : Post
      }
      type Post{
          id : ID!
          title : String!
          userId : ID!
          user : User
      }
    `,
    resolvers: {
      Query: {
        users : (parent,args,context) => {
            return Users
        },
        user : (parent,args,context) => {
            const {id} = args
            const user = Users.find(user => user.id == id)
            return user
        },
        post : (parent,args,context) => {
            const {id} = args
            const post = Posts.find(post => post.id == id)
            return post
        }
      },
      Post : {
          user : (parent,args,context) => {
              const {userId} = parent
              return Users.find(user => user.id == userId)
          }
      },
      User : {
        post : (parent,args,context) => {
            const { id } = args
            return Posts.find(post => post.id == id)
        },
        posts : (parent,args,context) => {
            return Posts.filter(post => post.userId == parent.id)
        }
      }
    },
  },
})

// Start the server and explore http://localhost:4000/graphql
server.start()