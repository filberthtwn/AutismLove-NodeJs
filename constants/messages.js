
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});
const lang = process.env.LANGUAGE;

exports.INCORRECT_ID_OR_PASSWORD = () => {
    if(lang == 'kr'){
        return '등록되지 않은 아이디이거나, 아이디 혹은 비밀번호를 잘못 입력했습니다.';
    }
    return 'Incorrect email or password';
}

