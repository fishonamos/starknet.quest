import React, { FunctionComponent } from "react";
import styles from "@styles/admin.module.css";
import Typography from "@components/UI/typography/typography";
import { TEXT_TYPE } from "@constants/typography";

type FormContainerProps = {
  headingText: string;
  children: React.ReactNode;
  steps: string[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const FormContainer: FunctionComponent<FormContainerProps> = ({
  children,
  steps,
  currentPage,
  setCurrentPage,
  headingText,
}) => {
  return (
    <div className={styles.formContainerBox}>
      <div className={`flex w-100 flex-col ${styles.formContainerTitle}`}>
        <Typography type={TEXT_TYPE.H4} color="secondary">
          {headingText}
        </Typography>
        <Typography type={TEXT_TYPE.BODY_MICRO} color="secondary">
          This form guides you through creating a new quest for your company,
          covering setup, rewards, tasks, and preview before publishing.
        </Typography>
      </div>
      <div className="w-100 flex flex-col sm:flex-row">
        <div className={`w-full sm:w-1/4 flex ${styles.formContainerSideBar}`}>
          {steps.map((eachOption, index) => {
            return (
              <div
                key={"sidebaroption-index" + index}
                className={styles.sidebarOptions}
                onClick={() => setCurrentPage(index)}
                style={{
                  backgroundColor:
                    index === currentPage ? "#f4faff" : "inherit",
                }}
              >
                <Typography
                  type={TEXT_TYPE.BODY_MIDDLE}
                  color={index !== currentPage ? "secondary" : "background"}
                >
                  {eachOption}
                </Typography>
              </div>
            );
          })}
        </div>
        <div className={`flex-1  ${styles.formContainerChildren}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
