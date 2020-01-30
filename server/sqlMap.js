var sqlMap = {
    // 用户
    user: {
		add: 'insert into user(name, password, email) values (?, ?, ?)',
		getpsw: 'select id,password from user where email= ? '
    },
	// 面试
	interview:{
		add:'insert into interview(subject,date,intervieweeId) values (?,?,?)'
	},
	// 反馈
	feedback:{
		add:'insert into feedback(coding,communication,solution,intervieweeId) values (?,?,?,?)',
		select: 'select coding,communication,solution from feedback where intervieweeId =?'
	}
}
    
module.exports = sqlMap;