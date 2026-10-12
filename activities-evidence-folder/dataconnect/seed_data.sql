query ListAssessment @auth(level: PUBLIC, insecureReason: "Anyone can list their results.") {
  movies {
    title imageUrl genre
    results {
      rating reviewDate
      user { username }
    }
  }
}