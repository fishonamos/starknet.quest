import React, { FunctionComponent } from "react";
import styles from "@styles/components/quests/quiz.module.css";
import BackButton from "@components/UI/backButton";

type QuizControlsProps = {
  setStep: (s: number) => void;
  step: number;
  onCancel?: () => void;
};

const QuizControls: FunctionComponent<QuizControlsProps> = ({
  setStep,
  step,
  onCancel,
}) => {
  return (
    <div className={styles.controls}>
      <BackButton onClick={() => setStep(step - 1)} />
      <button onClick={() => (onCancel ? onCancel() : setStep(-2))}>
        Cancel
      </button>
    </div>
  );
};

export default QuizControls;
