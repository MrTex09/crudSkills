import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SkillModal = ({ onClose, profile, setProfile }) => {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    axios.get('/api/skills')
      .then(response => {
        setSkills(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const timerId = setTimeout(() => {
        axios.get(`/api/skills/search?query=${searchQuery}`)
          .then(response => {
            // Asegúrate de que la respuesta sea un array
            setFilteredSkills(Array.isArray(response.data) ? response.data : []);
          })
          .catch(error => {
            console.error('Error searching skills:', error);
            setFilteredSkills([]);
          });
      }, 500);

      return () => clearTimeout(timerId);
    } else {
      setFilteredSkills([]);
    }
  }, [searchQuery]);

  const handleAddSkill = (skill) => {
    setSelectedSkills(prevSkills => [...prevSkills, skill]);
    setSearchQuery('');
  };

  const handleSaveSkills = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      skills: [...prevProfile.skills, ...selectedSkills]
    }));
    onClose();
  };

  const handleRemoveSkill = (skillId) => {
    setSelectedSkills(prevSkills => prevSkills.filter(skill => skill.id !== skillId));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Agregar Habilidades</h2>
        <input
          type="text"
          placeholder="Buscar habilidad"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="skill-results">
          {filteredSkills.length > 0 ? (
            <ul>
              {Array.isArray(filteredSkills) && filteredSkills.map(skill => (
                <li key={skill.id}>
                  {skill.name}
                  <button onClick={() => handleAddSkill(skill)}>Agregar</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay habilidades disponibles</p>
          )}
        </div>
        <div className="selected-skills">
          <h3>Habilidades Seleccionadas:</h3>
          <ul>
            {selectedSkills.length > 0 ? (
              selectedSkills.map(skill => (
                <li key={skill.id}>
                  {skill.name}
                  <button onClick={() => handleRemoveSkill(skill.id)}>Eliminar</button>
                </li>
              ))
            ) : (
              <p>No hay habilidades seleccionadas</p>
            )}
          </ul>
        </div>
        <button className="save-button" onClick={handleSaveSkills}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default SkillModal;
