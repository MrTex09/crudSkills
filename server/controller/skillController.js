// controllers/skillController.js
import Skill from '../models/skills.js';

export const getSkills = async (req, res) => {
  const skills = await Skill.findAll();
  res.json(skills);
};

export const createSkill = async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json(skill);
};

export const updateSkill = async (req, res) => {
  const skill = await Skill.findByPk(req.params.id);
  await skill.update(req.body);
  res.json(skill);
};

export const deleteSkill = async (req, res) => {
  const skill = await Skill.findByPk(req.params.id);
  await skill.destroy();
  res.status(204).send();
};
export const searchSkills = async (req, res) => {
    const query = req.query.search || '';
    const skills = await Skill.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`
        }
      }
    });
    res.json(skills);
  };