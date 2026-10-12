type learner @table {
  # Every table has an implicit primary key field that looks something like:
  #  id: UUID! @default(expr: "uuidV4()")
  title: String!
  imageUrl: String!
  genre: String
}

type Review @table(key: ["assessment", "user"]) {
  user: User!
  movie: Movie!
  rating: Int
  reviewText: String
  reviewDate: Date! @default(expr: "request.time")
}