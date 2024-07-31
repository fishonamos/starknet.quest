import React from "react";
import styles from "@styles/components/notifications.module.css";
import { FunctionComponent } from "react";
import { Modal } from "@mui/material";
import NotificationDetail from "./notificationDetail";
import CloseIcon from "@components/UI/iconsComponents/icons/closeIcon";
import InformativeNotification from "../infomativeNotifications";
import Typography from "../typography/typography";
import { TEXT_TYPE } from "@constants/typography";

type ModalNotificationsProps = {
  closeModal: () => void;
  open: boolean;
  notifications: SQNotification<NotificationData>[];
  informationNotifications: SQInfoData[];
};

const ModalNotifications: FunctionComponent<ModalNotificationsProps> = ({
  closeModal,
  open,
  notifications,
  informationNotifications,
}) => {
  return (
    <Modal
      disableAutoFocus
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.menu}>
        <button className={styles.menu_close} onClick={closeModal}>
          <CloseIcon width="24" />
        </button>
        <Typography type={TEXT_TYPE.BODY_NORMAL} color="secondary" className={styles.menu_title}>Notifications</Typography>
        <div className={styles.menu_line} />
        <div className={styles.notif_section}>
          {informationNotifications.length > 0
            ? informationNotifications.map((notification, index) => {
                // check if notification is empty
                if (
                  !(notification.title.length > 0) &&
                  !(notification.subtext.length > 0)
                )
                  return;
                return (
                  <InformativeNotification
                    closeModal={closeModal}
                    key={index}
                    notification={notification}
                  />
                );
              })
            : null}
          {notifications.length > 0 ? (
            notifications.map((notification, index) => {
              return (
                <NotificationDetail
                  key={index}
                  notification={notification}
                  isLastItem={index === notifications.length - 1}
                />
              );
            })
          ) : (
            <Typography type={TEXT_TYPE.BODY_DEFAULT}>You don&apos;t have any notifications yet. Start some quests!</Typography>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default ModalNotifications;
