const robot = require('robotjs')
const myIp = require('my-local-ip')
const hapi = require('hapi')
const socketio = require('socket.io')

const server = new hapi.Server()
server.connection({ port: 4000, host: '0.0.0.0' })

const handleClick = button => robot.mouseClick(button)

const handleScroll = (event) => {
  robot.scrollMouse(event.scrollAmount, event.direction)
}

const handleMove = (distance) => {
  const currentPos = robot.getMousePos()

  robot.moveMouse(
    currentPos.x + distance.x,
    currentPos.y + distance.y
  )
}

const handleConection = (socket) => {
  console.log('New client conected')
  socket.on('move', handleMove)
  socket.on('click', handleClick)
  socket.on('scroll', handleScroll)
}

socketio(server.listener).on('connection', handleConection)

server.start()
console.log(`Listening on http://${myIp()}:4000`)
