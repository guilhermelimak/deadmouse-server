const Hapi = require('hapi')
const server = new Hapi.Server()

const robot = require('robotjs')
const myIp = require('my-local-ip')

server.connection({ port: 4000, host: '0.0.0.0' })
const io = require('socket.io')(server.listener)

io.on('connection', socket => {
  console.log('connected')

  socket.on('move', (a, e) => {
    const {x, y} = a
    const mousePos = robot.getMousePos()

    robot.moveMouse(mousePos.x + x, mousePos.y + y)
  })

  socket.on('click', a => robot.mouseClick(a.button))
  socket.on('scroll', a => robot.scrollMouse(a.dy, a.direction))
})

server.start()
console.log(`Listening on http://${myIp()}:4000`)
