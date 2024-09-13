import express from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill, searchSkills } from '../controller/skillController.js';

const router = express.Router();

router.get('/', getSkills);
router.get('/search', searchSkills); // Agrega esta línea si estás usando búsqueda
router.post('/', createSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;
