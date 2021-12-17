import { client } from './index.js'
import { ObjectId } from 'mongodb'

//Utility functions

//For Transactions route
async function addMentor(body) {
	return await client.db('myDB').collection('mentor').insertOne(body)
}

async function addStudent(body) {
	return await client.db('myDB').collection('student').insertOne(body)
}

async function assignMentor(mentor, student) {
	student = student.map((student) => {
		return ObjectId(student)
	})

	const mentorData = await client
		.db('myDB')
		.collection('mentor')
		.updateOne(
			{ _id: ObjectId(mentor) },
			{
				$addToSet: {
					studentsID: {
						$each: student,
					},
				},
			}
		)
	const studentData = await client
		.db('myDB')
		.collection('student')
		.updateMany(
			{ _id: { $in: student } },
			{ $set: { mentorID: ObjectId(mentor) } }
		)
	return {
		studentData,
		mentorData,
	}
}

async function getStudentByMentorId(id) {
	const studentData = await client
		.db('myDB')
		.collection('mentor')
		.findOne({ _id: ObjectId(id) })

	const result = await client
		.db('myDB')
		.collection('student')
		.find({ _id: { $in: studentData.studentsID } })
		.toArray()
	return result
}

export { addMentor, addStudent, assignMentor, getStudentByMentorId }
