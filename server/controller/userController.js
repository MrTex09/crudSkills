// controllers/userController.js
import User from '../models/userModel.js';
import Skill from '../models/skills.js';

export const getUsers = async (req, res) => {
  const users = await User.findAll({ include: Skill });
  res.json(users);
};

export const createUser = async (req, res) => {
  const { name, email, skillIds } = req.body;
  const user = await User.create({ name, email });
  if (skillIds && skillIds.length > 0) {
    const skills = await Skill.findAll({ where: { id: skillIds } });
    await user.addSkills(skills);
  }
  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const { name, email, skillIds } = req.body;
  const user = await User.findByPk(req.params.id);
  await user.update({ name, email });
  if (skillIds) {
    const skills = await Skill.findAll({ where: { id: skillIds } });
    await user.setSkills(skills);
  }
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.status(204).send();
};