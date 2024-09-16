import React, { useState } from 'react';
import axios from 'axios';

const AddSkill = ({ onAddSkill, onClose }) => {
  const [skillName, setSkillName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skillName.trim() === '') {
      setError('El nombre de la habilidad no puede estar vacío.');
      return;
    }

    try {
      // Asegúrate de incluir el prefijo correcto para la URL del backend
      const response = await axios.post('http://localhost:4000/api/skills', { name: skillName });
      if (response.status === 200) {
        onAddSkill(response.data); // Pasa la nueva habilidad al componente padre
        setSkillName('');
        setError('');
        onClose(); // Cierra el modal después de agregar la habilidad
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      setError('Ocurrió un error al agregar la habilidad.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Agregar Nueva Habilidad</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="skillName">Nombre de la habilidad:</label>
            <input
              type="text"
              id="skillName"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="Escribe el nombre de la habilidad"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
