var sqlMap = {
    // 用户
    user: {
		add: 'insert into user(name, password, email) values (?, ?, ?)',
		getpsw: 'select password from user where email= ? '
    },
	// 面试
	interview:{
		add:'insert into interview(subject,date) values (?,?)'
	},
	// 反馈
	feedback:{
		add:'insert into feedback(coding,communication,solution) values (?,?,?)',
		select: 'select coding,communication,solution from feedback where intervieweeId =?'
	}
}
    
module.exports = sqlMap;