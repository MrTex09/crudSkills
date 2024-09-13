// models/Skill.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Skill = sequelize.define('Skill', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Skill;