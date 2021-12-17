**To install node modules:** npm install

**To run on local:** npm run dev

**PRODUCTION URL:** https://mentor-g.herokuapp.com

**GITHUB URL:** https://github.com/Govardhan8/assign-mentor

**_End Points:_**

**To check if Class api is up:** https://mentor-g.herokuapp.com/class

**To get all students:**

**url:** https://mentor-g.herokuapp.com/class/students

**method:** get

**To get all mentors:**

**url:** https://mentor-g.herokuapp.com/class/mentors

**method:** get

**To get students by mentor id:**

**url:** https://mentor-g.herokuapp.com/class/get-students/:id

**method:** get

**To get all unassigned students:**

**url:** https://mentor-g.herokuapp.com/class/unassigned-students

**method:** get

**To add a new mentor:**

**url:** https://mentor-g.herokuapp.com/class/add-mentor

**method:** post

**sample request:**

{
"name":mentor-name,
"topic":Topic-name,  
}

**To add a new student:**

**url:** https://mentor-g.herokuapp.com/class/add-student

**method:** post

**sample request:**

{
"name":student name,
}

**To assign mentor to student/s:**

**url:** https://mentor-g.herokuapp.com/class/assign-mentor

**method:** put

**sample request:**

{
"mentor":mentor-id,
"student":[student-id/s]
}
