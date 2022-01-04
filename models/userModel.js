'use strict';
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.AnticancerMed, {
        foreignKey : 'anticancer_med_id', 
        as: 'anticancer_med'
      }),
      User.hasMany(models.InjectionRoute, {
        foreignKey : 'user_id', 
        as: 'injection_routes'
      }),
      User.hasMany(models.AnticancerRecord, {
        foreignKey : 'user_id', 
        as: 'anticancer_med_records'
      })
    }
  };

  User.init({
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    pattern: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.STRING,
    gender: DataTypes.ENUM('MALE', 'FEMALE'),
    role: DataTypes.ENUM('ADMIN', 'USER'),
    hospital_name: DataTypes.STRING,
    hormone_receptor: DataTypes.ENUM('POSITIVE', 'NEGATIVE', 'I_DONT_KNOW'),
    human_epidermal_receptor: DataTypes.ENUM('POSITIVE', 'NEGATIVE', 'I_DONT_KNOW'),
    note: DataTypes.STRING,
    surgery_date: DataTypes.STRING,
    survey_duration: DataTypes.INTEGER,
    is_alarm_on: DataTypes.BOOLEAN,
    alarm_type: DataTypes.STRING,
    alarm_time: DataTypes.STRING,
    fcm_token: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    kakao_id: DataTypes.STRING,
    naver_id: DataTypes.STRING,
    main_visited: DataTypes.BOOLEAN,
    survey_visited: DataTypes.BOOLEAN,
    record_visited: DataTypes.BOOLEAN,
    side_effect_visited: DataTypes.BOOLEAN,
    last_login_at: DataTypes.DATE,
    password_reset_token: DataTypes.STRING,
    password_reset_expires: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      attributes: { exclude: [
        'anticancer_med_id',
        'password', 
        'last_login_at', 
        'pattern', 
        'password_reset_token', 
        'password_reset_expires'
      ]},
    },
    scopes: {
      showPassword: {
        attributes: { include: ['password'] },
      },
      showLastLoginAt: {
        attributes: { include: ['last_login_at'] },
      }
    }
  });

  User.afterCreate(async (user, options) => {
    hideSensitiveField(user);
  })

  User.beforeSave(async (user, options) => {
    user.id = uuidv4();
    if (user.password && user.password != ""){
      user.password = bcrypt.hashSync(user.password, 12);
    }

    if (user.pattern && user.pattern != ""){
      console.log("ABC");
      console.log(user.pattern);
      user.pattern = bcrypt.hashSync(user.pattern, 12);
    }
  });

  User.afterSave(async (user, options) => {
    hideSensitiveField(user);
  })

  User.afterUpdate(async (user, options) => {
    hideSensitiveField(user);
  })

  User.prototype.isCorrectPassword = async function(
    candidatePassword, 
    userPassword
  ){
    return await bcrypt.compare(candidatePassword, userPassword);
  };

  User.prototype.isCorrectPattern = async function(
    candidatePattern, 
    userPattern
  ){
    return await bcrypt.compare(candidatePattern, userPattern);
  };

  User.prototype.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.password_reset_token = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

      console.log("ABC");
      console.log(new Date());
    this.password_reset_expires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
};

  const hideSensitiveField = (user) => {
    user.password = undefined;
    user.last_login_at = undefined;
    // user.anticancer_med_id = undefined;
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
  }

  return User;
};