const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});
const lang = process.env.LANGUAGE;

exports.LOGIN = () => {
    if(lang == 'kr'){
        return '로그인';
    }
    return 'Login';
}

exports.PASSWORD = () => {
    if(lang == 'kr'){
        return '비밀번호';
    }
    return 'Password';
}

exports.USER_MANAGEMENT = () => {
    if(lang == 'kr'){
        return '회원 관리';
    }
    return 'User Management';
}

exports.DATA_MANAGEMENT = () => {
    if(lang == 'kr'){
        return '데이터 관리';
    }
    return 'Data Management';
}

exports.NOTICE_FAQ = () => {
    if(lang == 'kr'){
        return '공지사항 및 FAQ';
    }
    return 'Notice & FAQ';
}

exports.APP_MANAGEMENT = () => {
    if(lang == 'kr'){
        return '앱 관리';
    }
    return 'App Management';
}

exports.LOGOUT = () => {
    if(lang == 'kr'){
        return '로그아웃';
    }
    return 'Logout';
}

exports.SEARCH = () => {
    if(lang == 'kr'){
        return '검색';
    }
    return 'Search';
}

exports.EXCEL_DOWNLOAD = () => {
    if(lang == 'kr'){
        return 'EXCEL';
    }
    return 'Excel Download';
}

exports.CREATED_AT = () => {
    if(lang == 'kr'){
        return '생성일자';
    }
    return 'Created at';
}

exports.ID = () => {
    if(lang == 'kr'){
        return '아이디';
    }
    return 'ID';
}

exports.NAME = () => {
    if(lang == 'kr'){
        return '이름';
    }
    return 'Name';
}

exports.PHONE_NUMBER = () => {
    if(lang == 'kr'){
        return '휴대폰';
    }
    return 'Phone Number';
}

exports.ANTICANCER_MED_TYPE = () => {
    if(lang == 'kr'){
        return '항암제 종류';
    }
    return 'Anticancer Med. Typ';
}

exports.ACTION = () => {
    if(lang == 'kr'){
        return '상세보기';
    }
    return 'Action';
}

exports.DETAILS = () => {
    if(lang == 'kr'){
        return '상세보기';
    }
    return 'Details';
}

exports.USER_DETAIL = () => {
    if(lang == 'kr'){
        return '회원관리 상세보기';
    }
    return 'User Detail';
}

exports.NICKNAME = () => {
    if(lang == 'kr'){
        return '닉네임';
    }
    return 'Nickname';
}

exports.BIRTHYEAR = () => {
    if(lang == 'kr'){
        return '출생년도';
    }
    return 'Birthyear';
}

exports.GENDER = () => {
    if(lang == 'kr'){
        return '성별';
    }
    return 'Gender';
}

exports.LAST_LOGIN_AT = () => {
    if(lang == 'kr'){
        return '최근 접속 시간';
    }
    return 'Last login at';
}

exports.SIGN_UP_DATE = () => {
    if(lang == 'kr'){
        return '가입일자';
    }
    return 'Sign up date';
}

exports.NOTE_OPTIONAL = () => {
    if(lang == 'kr'){
        return '특이사항';
    }
    return 'Note (Optional)';
}

exports.HOSPITAL = () => {
    if(lang == 'kr'){
        return '치료중인 병원';
    }
    return 'Hospital';
}

exports.SURGERY_DATE = () => {
    if(lang == 'kr'){
        return '수술일';
    }
    return 'Surgery Date';
}

exports.ANTICANCER_ROUTE = () => {
    if(lang == 'kr'){
        return '둘래길 정보';
    }
    return 'Anticancer Route';
}

exports.SEE_DETAILS = () => {
    if(lang == 'kr'){
        return '상세보기';
    }
    return 'See Details';
}

exports.ACTIVED = () => {
    if(lang == 'kr'){
        return '활성';
    }
    return 'Actived';
}

exports.DEACTIVATED = () => {
    if(lang == 'kr'){
        return '비활성';
    }
    return 'Deactivated';
}

exports.SAVE = () => {
    if(lang == 'kr'){
        return '저장';
    }
    return 'Save';
}

exports.ANTICANCER_ROUTE_NAME = () => {
    if(lang == 'kr'){
        return '둘래길 요소명';
    }
    return 'Anticancer Route Name';
}

exports.WEEK = () => {
    if(lang == 'kr'){
        return '주';
    }
    return 'Week';
}

exports.ROUTE = () => {
    if(lang == 'kr'){
        return '둘레길';
    }
    return 'Route';
}

exports.DATE = () => {
    if(lang == 'kr'){
        return '날짜';
    }
    return 'Date';
}

exports.STATUS = () => {
    if(lang == 'kr'){
        return '상태';
    }
    return 'Status';
}

exports.EDIT = () => {
    if(lang == 'kr'){
        return '수정';
    }
    return 'Edit';
}

exports.ROUTE = () => {
    if(lang == 'kr'){
        return '둘레길';
    }
    return 'Route';
}

exports.DATE = () => {
    if(lang == 'kr'){
        return '날짜';
    }
    return 'Date';
}

exports.STATUS = () => {
    if(lang == 'kr'){
        return '상태';
    }
    return 'Status';
}

exports.UPDATE_INJECTION_ROUTE = () => {
    if(lang == 'kr'){
        return '날짜 변경';
    }
    return 'Update Injection Route';
}

exports.CANCEL = () => {
    if(lang == 'kr'){
        return '취소';
    }
    return 'Cancel';
}

exports.SAVE = () => {
    if(lang == 'kr'){
        return '저장';
    }
    return 'Save';
}

exports.ANTICANCER_RECORD = () => {
    if(lang == 'kr'){
        return '항암 기록 관리';
    }
    return 'Anticancer Record';
}

exports.SURVEY_LIST = () => {
    if(lang == 'kr'){
        return '설문 리스트';
    }
    return 'Survey List';
}

exports.ADD_NEW_ANTICANCER_RECORD = () => {
    if(lang == 'kr'){
        return '항암기록 추가';
    }
    return 'Add New Anticancer Record';
}

exports.CREATE_NEW_RECORD = () => {
    if(lang == 'kr'){
        return '항암 기록 추가';
    }
    return 'Create New Record';
}

exports.VISIT_PURPOSE = () => {
    if(lang == 'kr'){
        return '방문 목적';
    }
    return 'Visit Purpose';
}

exports.ANC_NEUTOPHIL = () => {
    if(lang == 'kr'){
        return 'ANC(호중구)';
    }
    return 'ANC (Neutrophil)';
}

exports.ANTICANCER_INJECTION = () => {
    if(lang == 'kr'){
        return '항암주사';
    }
    return 'Anticancer Injection';
}

exports.LEUKOCTYE_STIMULATOR = () => {
    if(lang == 'kr'){
        return '백혈구 촉진제';
    }
    return 'Leukocyte Stimulator';
}

exports.DELETE = () => {
    if(lang == 'kr'){
        return '삭제';
    }
    return 'Delete';
}

exports.ALARM_SETTING_DESC = () => {
    if(lang == 'kr'){
        return '설문 예정일 수정<br>(이후 생성되는 설문은 수정된 설문일 + 생성주기 일 뒤에 자동 생성됩니다)';
    }
    return 'Change latest survey expected date<br>(All auto created survey date will follow this setting)';
}

exports.SURVEY_DURATION_SETTING_DESC = () => {
    if(lang == 'kr'){
        return '다음 설문일 주기 설정<br>(이후 생성되는 설문에만 반영됩니다)';
    }
    return 'Survey auto create duration setting<br>(All auto created survey date will follow this setting)';
}

exports.ALARM_DATE_SETTING = () => {
    if(lang == 'kr'){
        return '알람 일자 설정';
    }
    return 'Alarm date setting';
}

exports.CREATE_DURATION_SET = () => {
    if(lang == 'kr'){
        return '생성 주기 설정';
    }
    return 'Create duration set';
}

exports.ALARM_SETTING = () => {
    if(lang == 'kr'){
        return '알람 설정';
    }
    return 'Alarm Setting';
}

exports.ROUTE_NAME = () => {
    if(lang == 'kr'){
        return '둘레길 요소명';
    }
    return 'Route Name';
}

exports.ROUTE_NAME_02 = () => {
    if(lang == 'kr'){
        return '요소명';
    }
    return 'Name';
}

exports.INJECTION_DATE = () => {
    if(lang == 'kr'){
        return '항암제 투여일';
    }
    return 'Injection Date';
}

exports.SURVEY_EXPECTED_DATE = () => {
    if(lang == 'kr'){
        return '설문 작성(예정)일';
    }
    return 'Survey Expected Date';
}

exports.CONDITION = () => {
    if(lang == 'kr'){
        return '상태';
    }
    return 'Condition';
}

exports.SURVEY = () => {
    if(lang == 'kr'){
        return '설문';
    }
    return 'Survey';
}

exports.NOTICE = () => {
    if(lang == 'kr'){
        return '공지사항';
    }
    return 'Notice';
}

exports.FAQ = () => {
    if(lang == 'kr'){
        return 'FAQ';
    }
    return 'FAQ';
}

exports.CREATE_NOTICE = () => {
    if(lang == 'kr'){
        return '공지사항 생성';
    }
    return 'Create Notice';
}

exports.NOTICE_DETAIL = () => {
    if(lang == 'kr'){
        return '공지사항 상세';
    }
    return 'Notice Detail';
}

exports.NOTICE_TITLE = () => {
    if(lang == 'kr'){
        return '제목';
    }
    return 'Notice Title';
}

exports.TITLE = () => {
    if(lang == 'kr'){
        return '제목';
    }
    return 'Title';
}

exports.DESCRIPTION = () => {
    if(lang == 'kr'){
        return '본문';
    }
    return 'Description';
}

exports.NOTICE_MANAGEMENT = () => {
    if(lang == 'kr'){
        return '공지사항 관리';
    }
    return 'Notice Management';
}

exports.CREATE_FAQ = () => {
    if(lang == 'kr'){
        return 'FAQ 생성';
    }
    return 'Create FAQ';
}

exports.FAQ_QUESTION = () => {
    if(lang == 'kr'){
        return 'FAQ 질문';
    }
    return 'FAQ Question';
}

exports.QUESTION = () => {
    if(lang == 'kr'){
        return '질문';
    }
    return 'Question';
}

exports.ANSWER = () => {
    if(lang == 'kr'){
        return '답변';
    }
    return 'Answer';
}

exports.FAQ_MANAGEMENT = () => {
    if(lang == 'kr'){
        return 'FAQ 관리';
    }
    return 'FAQ Management';
}

exports.FAQ_DETAIL = () => {
    if(lang == 'kr'){
        return 'FAQ 상세보기';
    }
    return 'FAQ Detail';
}

exports.ANTICANCER_MED = () => {
    if(lang == 'kr'){
        return '항암제';
    }
    return 'Anticancer Med.';
}

exports.ANTICANCER_MED_DESIGN_TYPE = () => {
    if(lang == 'kr'){
        return '둘레길 디자인 명칭';
    }
    return 'Anticancer Med. Design Type';
}

exports.ANTICANCER_MED_DESIGN_NO = () => {
    if(lang == 'kr'){
        return '항암제 요소 개수';
    }
    return 'Anticancer Med. Design No.';
}

exports.ANTICANCER_RECORD_BG_COLOR = () => {
    if(lang == 'kr'){
        return '항암기록 배경 색상';
    }
    return 'Anticancer Record BG Color';
}

exports.ANTICANCER_RECORD_TABLE_COLOR = () => {
    if(lang == 'kr'){
        return '항암기록 테이블 색상';
    }
    return 'Anticancer Record Table Color';
}

exports.CREATE_SURVEY = () => {
    if(lang == 'kr'){
        return '새로운 그룹 추가';
    }
    return 'Create Survey';
}

exports.SURVEY_COUNT = () => {
    if(lang == 'kr'){
        return '설문 총 개수';
    }
    return 'Survey Count';
}

exports.SEVERITY_COUNT = () => {
    if(lang == 'kr'){
        return '심각도 개수';
    }
    return 'Severity Count';
}

exports.FREQUENCY_COUNT = () => {
    if(lang == 'kr'){
        return '빈도 개수';
    }
    return 'Frequency Count';
}

exports.DAILY_LIFE_COUNT = () => {
    if(lang == 'kr'){
        return '일상생활 영향 개수';
    }
    return 'Daily Life Count';
}

exports.YES_NO_COUNT = () => {
    if(lang == 'kr'){
        return '이상유무 개수';
    }
    return 'Yes/ No Count Count';
}

exports.SURVEY_KIND = () => {
    if(lang == 'kr'){
        return '설문 명칭';
    }
    return 'Survey Kind';
}

exports.SURVEY_Q_SHORT = () => {
    if(lang == 'kr'){
        return '설문질문 (부작용)';
    }
    return 'Survey Q Short';
}

exports.A_TYPE = () => {
    if(lang == 'kr'){
        return '질의 구분';
    }
    return 'A Type';
}

exports.Q_LONG = () => {
    if(lang == 'kr'){
        return '질의 내용';
    }
    return 'Q Long';
}

exports.SIDE_EFFECT = () => {
    if(lang == 'kr'){
        return '부작용';
    }
    return 'Side Effect';
}

exports.SIDE_EFFECT_RECORD_MANAGEMENT = () => {
    if(lang == 'kr'){
        return '부작용 기록 관리';
    }
    return 'Side Effect Record Management';
}

exports.ANC_SIDE_EFFECT_MANAGEMENT = () => {
    if(lang == 'kr'){
        return 'ANC 부작용 관리';
    }
    return 'ANC Side Effect Management';
}

exports.SIDE_EFFECT_MANAGEMENT = () => {
    if(lang == 'kr'){
        return '부작용 관리';
    }
    return 'Side Effect Management';
}

exports.EDIT_SIDE_EFFECT = () => {
    if(lang == 'kr'){
        return '부작용 수정';
    }
    return 'Edit Side Effect';
}

exports.PUSH_NOTIF = () => {
    if(lang == 'kr'){
        return '푸시 관리';
    }
    return 'Push Notif';
}

exports.CREATE_PUSH = () => {
    if(lang == 'kr'){
        return '푸시 생성';
    }
    return 'Create Push';
}

exports.PUSH_ID = () => {
    if(lang == 'kr'){
        return '푸시 ID';
    }
    return 'Push ID';
}

exports.TITLE = () => {
    if(lang == 'kr'){
        return '제목';
    }
    return 'Title';
}

exports.IMAGE_OPTIONAL = () => {
    if(lang == 'kr'){
        return '이미지 (선택)';
    }
    return 'Image (Optional)';
}

exports.UPLOAD = () => {
    if(lang == 'kr'){
        return '업로드';
    }
    return 'Upload';
}

exports.NO_IMAGE_SELECTED = () => {
    if(lang == 'kr'){
        return '이미지가 선택되지 않음';
    }
    return 'No image selected';
}

exports.LINK_OPTIONAL = () => {
    if(lang == 'kr'){
        return '링크 (선택)';
    }
    return 'Link (Optional)';
}

exports.USER_SELECTED = () => {
    if(lang == 'kr'){
        return '사용자 선택됨';
    }
    return 'user selected';
}

exports.SELECT_USER = () => {
    if(lang == 'kr'){
        return '사용자 선택';
    }
    return 'Select User';
}

exports.SELECT_ALL = () => {
    if(lang == 'kr'){
        return '모두 선택';
    }
    return 'Select All';
}

exports.DONE = () => {
    if(lang == 'kr'){
        return '완료';
    }
    return 'Done';
}

exports.POPUP = () => {
    if(lang == 'kr'){
        return '팝업';
    }
    return 'Popup';
}

exports.CREATE_POPUP = () => {
    if(lang == 'kr'){
        return '팝업 생성';
    }
    return 'Create Popup';
}

exports.POPUP_ID = () => {
    if(lang == 'kr'){
        return '팝업 ID';
    }
    return 'Popup ID';
}

exports.EXPOSE_DURATION = () => {
    if(lang == 'kr'){
        return '노출 기간';
    }
    return 'Expose Duration';
}

exports.POPUP_MANAGEMENT = () => {
    if(lang == 'kr'){
        return '팝업 관리';
    }
    return 'Popup Management';
}

exports.CREATE_POPUP = () => {
    if(lang == 'kr'){
        return '팝업 생성';
    }
    return 'Create Popup';
}

exports.EXPOSE_START_DATE = () => {
    if(lang == 'kr'){
        return '노출 시작일';
    }
    return 'Expose Start Date';
}

exports.EXPOSE_END_DATE = () => {
    if(lang == 'kr'){
        return '노출 종료일';
    }
    return 'Expose End Date';
}

exports.POPUP_TYPE = () => {
    if(lang == 'kr'){
        return '팝업 종류';
    }
    return 'Popup Type';
}

exports.BUTTON_TYPE = () => {
    if(lang == 'kr'){
        return '하단 버튼 종류';
    }
    return 'Button Type';
}

exports.AUTHORITY = () => {
    if(lang == 'kr'){
        return '권한 관리';
    }
    return 'Authority';
}

exports.ANTICANCER_RECORD_EDIT_AUTHORITY = () => {
    if(lang == 'kr'){
        return '항암기록 수정권한';
    }
    return 'Anticancer Record Edit Authority';
}

exports.PUSH_NOTIFICATION_DETAIL = () => {
    if(lang == 'kr'){
        return '푸시 상세';
    }
    return 'Push Notification Detail';
}

exports.UPDATE_PUSH_NOTIFICATION = () => {
    if(lang == 'kr'){
        return '푸시 업데이트';
    }
    return 'Update Push Notification';
}

exports.SEND_PUSH = () => {
    if(lang == 'kr'){
        return '푸시 보내기';
    }
    return 'Send Push';
}

exports.DATA_DETAIL = () => {
    if(lang == 'kr'){
        return '데이터 상세';
    }
    return 'Data Detail';
}

exports.SURVEY_DETAIL = () => {
    if(lang == 'kr'){
        return '설문 상세';
    }
    return 'Survey Detail';
}

exports.SURVEY_MANAGEMENT = () => {
    if(lang == 'kr'){
        return '설문 관리';
    }
    return 'Survey Management';
}

exports.IMAGE = () => {
    if(lang == 'kr'){
        return '이미지';
    }
    return 'Image';
}

exports.UPDATE_POPUP = () => {
    if(lang == 'kr'){
        return 'Update Popup';
    }
    return 'Update Popup';
}

exports.TEXT = () => {
    if(lang == 'kr'){
        return '텍스트';
    }
    return 'Text';
}

exports.SHOW_ONLY = () => {
    if(lang == 'kr'){
        return '단순 노출 용';
    }
    return 'Show Only';
}

exports.LINK = () => {
    if(lang == 'kr'){
        return '링크 용';
    }
    return 'Link';
}

exports.MALE = () => {
    if(lang == 'kr'){
        return '남자';
    }
    return 'MALE';
}

exports.FEMALE = () => {
    if(lang == 'kr'){
        return '여자';
    }
    return 'FEMALE';
}

exports.POSITIVE = () => {
    if(lang == 'kr'){
        return '양성';
    }
    return 'POSITIVE';
}

exports.NEGATIVE = () => {
    if(lang == 'kr'){
        return '음성';
    }
    return 'NEGATIVE';
}

exports.I_DONT_KNOW = () => {
    if(lang == 'kr'){
        return '모름';
    }
    return "I DON'T KNOW";
}

exports.CALCULATE_METHOD = () => {
    if(lang == 'kr'){
        return 'ANC 수치 상세내용';
    }
    return "Calculate Method";
}

exports.CALCULATED_RESULT = () => {
    if(lang == 'kr'){
        return '추정지인 경우';
    }
    return "Calculated Result";
}

exports.CHANGE = () => {
    if(lang == 'kr'){
        return '변경';
    }
    return 'Change';
}

exports.CHANGE_PASSWORD = () => {
    if(lang == 'kr'){
        return '비밀번호 변경';
    }
    return 'Change Password';
}

exports.NEW_PASSWORD = () => {
    if(lang == 'kr'){
        return '새로운 비밀번호';
    }
    return 'New Password';
}

exports.CONFIRM_NEW_PASSWORD = () => {
    if(lang == 'kr'){
        return '새로운 비밀번호 확인';
    }
    return 'Confirm New Password';
}

exports.THIS_IS_INACTIVE_ACCOUNT = () => {
    if(lang == 'kr'){
        return '비활성 계정입니다';
    }
    return 'User deactivated';
}

exports.DAY = () => {
    if(lang == 'kr'){
        return '일';
    }
    return 'day';
}

exports.MONTH = () => {
    if(lang == 'kr'){
        return '월';
    }
    return 'month';
}

exports.YEAR = () => {
    if(lang == 'kr'){
        return '년';
    }
    return 'year';
}

exports.SURVEY_NAME = () => {
    if(lang == 'kr'){
        return '설문명칭';
    }
    return 'Survey Name';
}

exports.SURVEY_NO = () => {
    if(lang == 'kr'){
        return '설문 번호';
    }
    return 'Survey No.';
}

exports.ANTICANCER_MED_ELEMENT = () => {
    if(lang == 'kr'){
        return '둘래길 요소';
    }
    return 'Anticancer Med. Element';
}

exports.ANTICANCER_MED_MANAGEMENT = () => {
    if(lang == 'kr'){
        return '둘래길 요소 관리';
    }
    return 'Anticancer Med. Management';
}

exports.NO = () => {
    if(lang == 'kr'){
        return 'No';
    }
    return 'No';
}

exports.HEXCODE = () => {
    if(lang == 'kr'){
        return 'HEXCODE';
    }
    return 'HEXCODE';
}

exports.MUST_BE_LESS_THAN_TWENTY_CHAR = () => {
    if(lang == 'kr'){
        return '20자 이내로 작성';
    }
    return '*Must be less than 20 chars';
}

exports.MUST_BE_LESS_THAN_TEN_CHAR = () => {
    if(lang == 'kr'){
        return '10자 이내로 작성';
    }
    return '*Must be less than 10 chars';
}

exports.START_TIME = () => {
    if(lang == 'kr'){
        return '시작시간';
    }
    return 'Start Time';
}

exports.END_TIME = () => {
    if(lang == 'kr'){
        return '마감시간';
    }
    return 'End Time';
}

exports.NO_SURVEY_LINKED = () => {
    if(lang == 'kr'){
        return '설문 연동안됨';
    }
    return 'No Survey Linked';
}