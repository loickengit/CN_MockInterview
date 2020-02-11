var sqlMap = {
    // 用户
    user: {
		add: 'insert into user(name, password, email) values (?, ?, ?)',
		getpsw: 'select id,password from user where email= ? '
    },
	// 面试
	interview:{
		add:'insert into interview(subject,date,intervieweeId,state,intervieweeEmail) values (?,?,?,?,?)',
		select: 'select id,intervieweeId,subject,date,state,intervieweeEmail from interview where state=?',
		update:'UPDATE interview SET interviewerId = CASE id WHEN ? THEN ? WHEN ? THEN ? END, state = 1 WHERE id IN (?,?)',
		
	},
// 	// 预约
// 	reservation:{
// 		add:'insert into reservation(subject,date,userid,state) values (?,?,?,?)',
// 		select: 'select id,userid,subject,date,state from reservation where state=?',
// 		update:'UPDATE reservation SET matchid = CASE id WHEN ? THEN ? WHEN ? THEN ? END, state = 1 WHERE id IN (?,?)',
// 		update2:'update reservation set matchid=?,state=1 where id=?'
// 	},
	// 反馈
	feedback:{
		add:'insert into feedback(coding,communication,solution,intervieweeId) values (?,?,?,?)',
		select: 'select coding,communication,solution from feedback where intervieweeId =?'
	}
}
    
module.exports = sqlMap;