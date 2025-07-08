
import React from 'react';
import SkillLevelIndicator from '@/components/SkillLevelIndicator';
import { SkillLevel } from '@/types/learning';

interface UserSkillsSectionProps {
  userSkills: SkillLevel[];
}

const UserSkillsSection: React.FC<UserSkillsSectionProps> = ({ userSkills }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Skill Levels</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userSkills.map((skill, index) => (
          <SkillLevelIndicator
            key={index}
            skill={skill.skill}
            level={skill.level}
            progress={skill.progress}
            xp={skill.xp}
          />
        ))}
      </div>
    </div>
  );
};

export default UserSkillsSection;
