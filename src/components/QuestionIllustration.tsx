import React from 'react';
import {renderScenePart1} from './illustrations/ScenesPart1';
import {renderScenePart2} from './illustrations/ScenesPart2';

interface QuestionIllustrationProps {
  questionId: number;
  compact?: boolean;
}

export const QuestionIllustration: React.FC<QuestionIllustrationProps> = ({
  questionId,
  compact = false,
}) => {
  const scene =
    questionId <= 16
      ? renderScenePart1(questionId)
      : renderScenePart2(questionId);

  return (
    <div
      className={`w-full overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] ${
        compact ? 'aspect-[2/1] max-h-44' : 'aspect-[2/1]'
      }`}
    >
      {scene}
    </div>
  );
};
