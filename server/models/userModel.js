// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Skill from './skills.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

User.belongsToMany(Skill, { through: 'UserSkills' });
Skill.belongsToMany(User, { through: 'UserSkills' });

export default User;