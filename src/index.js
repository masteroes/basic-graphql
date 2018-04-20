const { GraphQLServer } = require('graphql-yoga')

// 1
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
  },
  Mutation: {
	  post: (root,args) => {
		const link = {
			id: `link-${idCount++}`,
			url: args.url,
			description: args.description,
		}
		links.push(link);
		return link;
	  },
	  deletePost: (root,args) => {
		var index = links.findIndex(function(o){
			return o.id === args.id;
		})
		if (index !== -1) {
			let deletedObj=links[index];
			links.splice(index, 1);
			return deletedObj;
		}
	  }
  },  
}

// 3
const server = new GraphQLServer({
  typeDefs:'./src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))