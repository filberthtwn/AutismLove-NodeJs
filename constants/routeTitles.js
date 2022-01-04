const MEDICINE_TYPE = require('../constants/medicineType');

module.exports = {
    [MEDICINE_TYPE.AC_TC]: [
        "진단", "수술", "AC1차", "AC2차", "AC3차", "AC4차", "TC1차", "TC2차", "TC3차", "TC4차", "도착"
    ],
    [MEDICINE_TYPE.AC_PACLITAAXEL]: [
        "진단", "수술", "AC1차", "AC2차", "AC3차", "AC4차", "Paclitaxel 1차", "Paclitaxel 2차", "Paclitaxel 3차", "Paclitaxel 4차", "Paclitaxel 5차",
        "Paclitaxel 6차", "Paclitaxel 7차", "Paclitaxel 8차", "Paclitaxel 9차", "Paclitaxel 10차", "Paclitaxel 11차", "Paclitaxel 12차", "도착"
    ],
    [MEDICINE_TYPE.I_DONT_KNOW]: [
        "진단", "수술", "AC1차", "AC2차", "AC3차", "AC4차", "도착"
    ]
}