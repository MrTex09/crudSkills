import React from 'react';
import PropTypes from 'prop-types';

const SkillList = ({ skills }) => {
  if (!Array.isArray(skills)) {
    return <p>No skills available.</p>;
  }

  return (
    <ul>
      {skills.length > 0 ? (
        skills.map((skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))
      ) : (
        <p>No skills available.</p>
      )}
    </ul>
  );
};

SkillList.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SkillList;
