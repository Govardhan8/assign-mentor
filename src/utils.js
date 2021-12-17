import { client } from './index.js'
import { ObjectId } from 'mongodb'

//Utility functions
async function getUnassignedStudents() {
	const result = await client
		.db('myDB')
		.collection('student')
		.find({ mentorID: null })
		.toArray()
	return result
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

async function addMentor(body) {
	return await client.db('myDB').collection('mentor').insertOne(body)
}

async function addStudent(body) {
	return await client.db('myDB').collection('student').insertOne(body)
}

async function assignMentor(mentor, students) {
	students = students.map((student) => {
		return ObjectId(student)
	})

	await unassignAssignedStudents(students)

	const mentorData = await client
		.db('myDB')
		.collection('mentor')
		.updateOne(
			{ _id: ObjectId(mentor) },
			{
				$addToSet: {
					studentsID: {
						$each: students,
					},
				},
			}
		)
	const studentData = await client
		.db('myDB')
		.collection('student')
		.updateMany(
			{ _id: { $in: students } },
			{ $set: { mentorID: ObjectId(mentor) } }
		)

	return {
		studentData,
		mentorData,
	}
}

async function unassignAssignedStudents(students) {
	const studentList = await client
		.db('myDB')
		.collection('student')
		.find({ _id: { $in: students } })
		.toArray()
	studentList.forEach(async (student) => {
		if (student.mentorID) {
			const result = await client
				.db('myDB')
				.collection('mentor')
				.updateOne(
					{ _id: student.mentorID },
					{
						$pull: {
							studentsID: student._id,
						},
					}
				)
		}
	})
}

export {
	addMentor,
	addStudent,
	assignMentor,
	getStudentByMentorId,
	getUnassignedStudents,
}
