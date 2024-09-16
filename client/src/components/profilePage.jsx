import React, { useState } from 'react';
import SkillModal from './SkillModal';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ skills: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>Perfil</h1>
      <button onClick={openModal}>Agregar Habilidades</button>
      <div>
        <h2>Habilidades:</h2>
        <ul>
          {profile.skills.length > 0 ? (
            profile.skills.map(skill => (
              <li key={skill.id}>{skill.name}</li>
            ))
          ) : (
            <p>No tienes habilidades añadidas</p>
          )}
        </ul>
      </div>
      {isModalOpen && (
        <SkillModal
          onClose={closeModal}
          profile={profile}
          setProfile={setProfile}
        />
      )}
    </div>
  );
};

export default ProfilePage;
