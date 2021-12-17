import express from 'express'
import {
	addMentor,
	addStudent,
	assignMentor,
	getStudentByMentorId,
} from './utils.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.route('/add-mentor').post(async (request, response) => {
	const body = request.body
	const result = await addMentor(body)
	response.send(result)
})

router.route('/add-student').post(async (request, response) => {
	const body = request.body
	const result = await addStudent(body)
	response.send(result)
})

router.put('/assign-mentor', async (request, response) => {
	let { mentor, student } = request.body
	const result = await assignMentor(mentor, student)
	response.send(result)
})

router.get('/', (request, response) => {
	response.send({ message: 'class api up and running' })
})

router.get('/get-students/:id', async (request, response) => {
	const { id } = request.params
	const result = await getStudentByMentorId(id)
	response.send(result)
})

export default router
