import http from 'http'

export const shutDownServer = (server: http.Server) => {
  // attempt a gracefully shutdown
  server.close(() => {
    process.exit(1) // then exit
  })

  // If a graceful shutdown is not achieved after 1 second,
  // shut down the process completely
  setTimeout(() => {
    process.abort() // exit immediately and generate a core dump file
  }, 1000).unref()
}
