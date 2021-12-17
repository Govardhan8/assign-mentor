import express from 'express'
import {
	addMentor,
	addStudent,
	assignMentor,
	getStudentByMentorId,
	getUnassignedStudents,
} from './utils.js'

const router = express.Router()

router.get('/', (request, response) => {
	response.send({ message: 'class api up and running' })
})

router.get('/get-students/:id', async (request, response) => {
	const { id } = request.params
	const result = await getStudentByMentorId(id)
	response.send(result)
})

router.get('/unassigned-students', async (request, response) => {
	const result = await getUnassignedStudents()
	response.send(result)
})

router.post('/add-mentor', async (request, response) => {
	const body = request.body
	const result = await addMentor(body)
	response.send(result)
})

router.post('/add-student', async (request, response) => {
	const body = request.body
	const result = await addStudent(body)
	response.send(result)
})

router.put('/assign-mentor', async (request, response) => {
	let { mentor, student } = request.body
	const result = await assignMentor(mentor, student)
	response.send(result)
})

export default router
